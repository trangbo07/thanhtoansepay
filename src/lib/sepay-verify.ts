import { isCatalogInvoice } from "@/lib/order-code";
import { getSepayEnvironment } from "@/lib/sepay-config";
import { isOrderPaid, markOrderPaid } from "@/lib/payment-store";

type SepayOrderDetail = {
  order_id?: string;
  order_invoice_number?: string;
  order_status?: string;
  order_amount?: string;
};

type SepayOrderDetailResponse = {
  data?: SepayOrderDetail;
};

function getSepayPgApiBase() {
  return getSepayEnvironment() === "production"
    ? "https://pgapi.sepay.vn"
    : "https://pgapi-sandbox.sepay.vn";
}

function getSepayBasicAuth() {
  const merchantId = process.env.SEPAY_MERCHANT_ID?.trim();
  const secretKey = process.env.SEPAY_SECRET_KEY?.trim();
  if (!merchantId || !secretKey) {
    return null;
  }
  return Buffer.from(`${merchantId}:${secretKey}`).toString("base64");
}

export function resolveSepayOrderIdFromQuery(
  query: Record<string, string | string[] | undefined>,
): string | null {
  const raw =
    (typeof query.sepay_order_id === "string" ? query.sepay_order_id : undefined) ??
    (typeof query.order_id === "string" ? query.order_id : undefined);
  const trimmed = raw?.trim();
  return trimmed || null;
}

/** GET /v1/order/detail/{order_id} — xác minh đúng giao dịch PAY… / SEPAY-… */
export async function fetchSepayOrderDetail(sepayOrderId: string): Promise<SepayOrderDetail | null> {
  const auth = getSepayBasicAuth();
  if (!auth) {
    return null;
  }

  const base = getSepayPgApiBase();

  try {
    const res = await fetch(`${base}/v1/order/detail/${encodeURIComponent(sepayOrderId)}`, {
      headers: { Authorization: `Basic ${auth}` },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const json = (await res.json()) as SepayOrderDetailResponse;
    return json.data ?? null;
  } catch {
    return null;
  }
}

export async function verifySepayOrderCaptured(
  sepayOrderId: string,
  expectedInvoice?: string,
): Promise<boolean> {
  const detail = await fetchSepayOrderDetail(sepayOrderId);
  if (!detail || detail.order_status !== "CAPTURED") {
    return false;
  }

  if (expectedInvoice && detail.order_invoice_number !== expectedInvoice) {
    return false;
  }

  const invoice = detail.order_invoice_number ?? expectedInvoice;
  if (!invoice) {
    return false;
  }

  markOrderPaid({
    invoice,
    amount: detail.order_amount != null ? Number(detail.order_amount) : undefined,
    paidAt: new Date().toISOString(),
    sepayOrderId: detail.order_id ?? sepayOrderId,
  });

  return true;
}

/**
 * Chỉ coi đã thanh toán khi:
 * - IPN đã ghi nhận (cùng mã đơn), hoặc
 * - Có sepay_order_id và API detail trả CAPTURED khớp mã đơn.
 */
export async function verifyOrderPaid(
  invoice: string,
  sepayOrderId?: string | null,
): Promise<boolean> {
  if (sepayOrderId) {
    return verifySepayOrderCaptured(sepayOrderId, invoice);
  }

  if (isCatalogInvoice(invoice)) {
    return false;
  }

  return isOrderPaid(invoice);
}

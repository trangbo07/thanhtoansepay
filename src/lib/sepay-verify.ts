import { getSepayEnvironment } from "@/lib/sepay-config";
import { isOrderPaid, markOrderPaid } from "@/lib/payment-store";

type SepayOrderRow = {
  order_id?: string;
  order_invoice_number?: string;
  order_status?: string;
  order_amount?: string;
};

type SepayOrderListResponse = {
  data?: SepayOrderRow[];
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

async function fetchCapturedOrderByInvoice(invoice: string): Promise<SepayOrderRow | null> {
  const auth = getSepayBasicAuth();
  if (!auth) {
    return null;
  }

  const base = getSepayPgApiBase();
  const queries = [
    `per_page=20&page=1&q=${encodeURIComponent(invoice)}&order_status=CAPTURED&sort=created_at%3Adesc`,
    `per_page=20&page=1&q=${encodeURIComponent(invoice)}&sort=created_at%3Adesc`,
  ];

  for (const query of queries) {
    try {
      const res = await fetch(`${base}/v1/order?${query}`, {
        headers: { Authorization: `Basic ${auth}` },
        cache: "no-store",
      });

      if (!res.ok) {
        continue;
      }

      const json = (await res.json()) as SepayOrderListResponse;
      const rows = json.data ?? [];
      const match = rows.find(
        (row) =>
          row.order_invoice_number === invoice && row.order_status === "CAPTURED",
      );

      if (match) {
        return match;
      }
    } catch {
      // try next query variant
    }
  }

  return null;
}

/** True only when IPN/store or SePay API reports CAPTURED for this invoice. */
export async function verifyOrderPaid(invoice: string): Promise<boolean> {
  if (isOrderPaid(invoice)) {
    return true;
  }

  const captured = await fetchCapturedOrderByInvoice(invoice);
  if (!captured) {
    return false;
  }

  markOrderPaid({
    invoice,
    amount: captured.order_amount != null ? Number(captured.order_amount) : undefined,
    paidAt: new Date().toISOString(),
    sepayOrderId: captured.order_id,
  });

  return true;
}

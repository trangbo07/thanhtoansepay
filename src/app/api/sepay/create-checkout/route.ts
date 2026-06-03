import { isCatalogInvoice } from "@/lib/order-code";
import { getSepayEnvironment } from "@/lib/sepay-config";
import { getPublicSiteUrl } from "@/lib/sepay-site";
import { SePayPgClient } from "sepay-pg-node";
import { NextResponse } from "next/server";

function extractSepayOrderId(fields: Record<string, unknown>): string | null {
  const raw = fields.order_id;
  if (typeof raw === "string" && raw.trim()) {
    return raw.trim();
  }
  if (typeof raw === "number" && Number.isFinite(raw)) {
    return String(raw);
  }
  return null;
}

function withSepayOrderId(path: string, siteUrl: string, sepayOrderId: string) {
  const url = new URL(path, siteUrl);
  url.searchParams.set("sepay_order_id", sepayOrderId);
  return url.toString();
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  const {
    order_invoice_number,
    order_amount,
    order_description,
    payment_method = "BANK_TRANSFER",
    currency = "VND",
    customer_id,
    success_path,
    error_path,
    cancel_path,
    custom_data,
  } = body;

  const merchantId = process.env.SEPAY_MERCHANT_ID;
  const secretKey = process.env.SEPAY_SECRET_KEY;
  const sepayEnv = getSepayEnvironment();
  const siteUrl = getPublicSiteUrl(request);

  if (!order_invoice_number || !order_amount || !success_path || !error_path || !cancel_path) {
    return NextResponse.json(
      { error: "Missing required checkout fields" },
      { status: 400 },
    );
  }

  if (isCatalogInvoice(String(order_invoice_number))) {
    return NextResponse.json(
      {
        error:
          "Mã đơn không hợp lệ (đang dùng mã sản phẩm cố định). Tải lại trang đặt hàng để nhận mã đơn mới.",
      },
      { status: 400 },
    );
  }

  const normalizedAmount = Number(order_amount);

  if (!Number.isFinite(normalizedAmount) || normalizedAmount <= 0) {
    return NextResponse.json(
      { error: "order_amount must be a positive number" },
      { status: 400 },
    );
  }

  if (!merchantId || !secretKey) {
    return NextResponse.json({ error: "Missing SePay configuration" }, { status: 500 });
  }

  const client = new SePayPgClient({
    env: sepayEnv,
    merchant_id: merchantId,
    secret_key: secretKey,
  });

  const checkoutUrl = client.checkout.initCheckoutUrl();

  const fields = client.checkout.initOneTimePaymentFields({
    operation: "PURCHASE",
    payment_method,
    order_invoice_number,
    order_amount: normalizedAmount,
    currency,
    order_description,
    customer_id,
    success_url: new URL(success_path, siteUrl).toString(),
    error_url: new URL(error_path, siteUrl).toString(),
    cancel_url: new URL(cancel_path, siteUrl).toString(),
    custom_data,
  }) as Record<string, unknown>;

  const sepayOrderId = extractSepayOrderId(fields);
  if (sepayOrderId) {
    fields.success_url = withSepayOrderId(success_path, siteUrl, sepayOrderId);
  }

  try {
    console.log("[sepay:create-checkout] requestBody:", JSON.stringify(body));
    console.log("[sepay:create-checkout] checkoutUrl:", checkoutUrl);
    console.log("[sepay:create-checkout] sepayOrderId:", sepayOrderId);
    console.log("[sepay:create-checkout] fields:", JSON.stringify(fields));
  } catch {
    // ignore logging errors
  }

  return NextResponse.json({
    checkoutUrl,
    fields,
    sepayOrderId,
  });
}

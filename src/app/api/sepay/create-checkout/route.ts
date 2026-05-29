import { getSepayEnvironment } from "@/lib/sepay-config";
import { SePayPgClient } from "sepay-pg-node";
import { NextResponse } from "next/server";

function resolvePublicBaseUrl(request: Request) {
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const forwardedHost = request.headers.get("x-forwarded-host") ?? request.headers.get("host");

  if (forwardedHost) {
    return `${forwardedProto ?? "https"}://${forwardedHost}`;
  }

  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
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
  const siteUrl = resolvePublicBaseUrl(request);

  if (!order_invoice_number || !order_amount || !success_path || !error_path || !cancel_path) {
    return NextResponse.json(
      { error: "Missing required checkout fields" },
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
  });

  // Debug logs to help diagnose "Yêu cầu không hợp lệ" from SePay.
  // Visible in server logs (local terminal or Vercel function logs).
  try {
    console.log("[sepay:create-checkout] requestBody:", JSON.stringify(body));
    console.log("[sepay:create-checkout] checkoutUrl:", checkoutUrl);
    console.log("[sepay:create-checkout] fields:", JSON.stringify(fields));
  } catch {
    // ignore logging errors
  }

  return NextResponse.json({ checkoutUrl, fields });
}

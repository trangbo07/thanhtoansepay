import { markOrderPaid } from "@/lib/payment-store";
import { getPublicSiteUrl } from "@/lib/sepay-site";
import { NextResponse } from "next/server";

function verifyIpnSecret(request: Request) {
  const expected = process.env.SEPAY_IPN_SECRET_KEY?.trim();
  if (!expected) {
    return true;
  }
  const received = request.headers.get("x-secret-key");
  return received === expected;
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "SePay IPN endpoint — dùng POST từ SePay",
    site: getPublicSiteUrl(),
    docs: "https://developer.sepay.vn/vi/cong-thanh-toan/IPN",
  });
}

export async function POST(request: Request) {
  if (!verifyIpnSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json().catch(() => null);

  if (!payload) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  console.log("[sepay:ipn] received:", JSON.stringify(payload));

  const notificationType = payload.notification_type as string | undefined;
  const order = payload.order as Record<string, unknown> | undefined;
  const invoiceNumber = order?.order_invoice_number as string | undefined;

  if (notificationType === "ORDER_PAID" && invoiceNumber) {
    const orderAmount = order?.order_amount;
    markOrderPaid({
      invoice: invoiceNumber,
      amount: orderAmount != null ? Number(orderAmount) : undefined,
      paidAt: new Date().toISOString(),
      sepayOrderId: typeof order?.order_id === "string" ? order.order_id : undefined,
    });
    console.log(`[sepay:ipn] ORDER_PAID invoice=${invoiceNumber}`);
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

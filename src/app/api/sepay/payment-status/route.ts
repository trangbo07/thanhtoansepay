import { getPaidOrder } from "@/lib/payment-store";
import { verifyOrderPaid } from "@/lib/sepay-verify";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const invoice = url.searchParams.get("invoice")?.trim();
  const sepayOrderId =
    url.searchParams.get("sepay_order_id")?.trim() ??
    url.searchParams.get("order_id")?.trim() ??
    null;

  if (!invoice) {
    return NextResponse.json({ error: "Missing invoice" }, { status: 400 });
  }

  if (!sepayOrderId) {
    return NextResponse.json({
      paid: false,
      invoice,
      error: "missing_sepay_order_id",
      message: "Cần mã giao dịch SePay (order_id) để xác minh thanh toán.",
    });
  }

  const paid = await verifyOrderPaid(invoice, sepayOrderId);
  const record = getPaidOrder(invoice);

  return NextResponse.json({
    paid,
    invoice,
    sepayOrderId,
    paidAt: record?.paidAt ?? null,
    amount: record?.amount ?? null,
  });
}

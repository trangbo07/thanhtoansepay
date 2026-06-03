import { getPaidOrder } from "@/lib/payment-store";
import { verifyOrderPaid } from "@/lib/sepay-verify";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const invoice = new URL(request.url).searchParams.get("invoice")?.trim();

  if (!invoice) {
    return NextResponse.json({ error: "Missing invoice" }, { status: 400 });
  }

  const paid = await verifyOrderPaid(invoice);
  const record = getPaidOrder(invoice);

  return NextResponse.json({
    paid,
    invoice,
    paidAt: record?.paidAt ?? null,
    amount: record?.amount ?? null,
  });
}

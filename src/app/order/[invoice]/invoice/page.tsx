import { InvoiceActions } from "@/components/invoice-actions";
import { InvoiceDocument } from "@/components/invoice-document";
import { buildInvoiceNumber } from "@/lib/invoice";
import { getProductByInvoice } from "@/lib/products";

type InvoicePageProps = {
  params: Promise<{ invoice: string }>;
  searchParams: Promise<{
    amount?: string;
    description?: string;
    product?: string;
    status?: string;
    method?: string;
    customer?: string;
    email?: string;
  }>;
};

export default async function InvoicePage({ params, searchParams }: InvoicePageProps) {
  const { invoice } = await params;
  const query = await searchParams;

  const amount = Number(query.amount ?? 0);
  const description = query.description ?? `Thanh toán đơn hàng ${invoice}`;
  const productName = query.product ?? description;
  const product = getProductByInvoice(invoice);
  const resolvedAmount = amount > 0 ? amount : (product?.amount ?? 0);
  const status = query.status === "pending" ? "pending" : "paid";
  const paymentMethod =
    query.method === "vietqr"
      ? "VietQR — Chuyển khoản ngân hàng"
      : query.method === "sepay"
        ? "SePay — Cổng thanh toán"
        : undefined;

  const data = {
    invoiceNumber: buildInvoiceNumber(invoice),
    orderCode: invoice,
    productName,
    description,
    amount: resolvedAmount,
    customerName: query.customer,
    customerEmail: query.email,
    paidAt: new Date(),
    status: status as "paid" | "pending",
    paymentMethod,
  };

  return (
    <div className="invoice-page min-h-screen bg-neutral-100 py-8 print:bg-white print:py-0">
      <InvoiceActions invoiceNumber={data.invoiceNumber} />
      <div className="px-4 pb-12 print:px-0 print:pb-0">
        <InvoiceDocument data={data} />
      </div>
    </div>
  );
}

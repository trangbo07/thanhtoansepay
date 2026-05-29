import { InvoiceActions } from "@/components/invoice-actions";
import { InvoiceDocument } from "@/components/invoice-document";
import { SiteHeader } from "@/components/site-header";
import { buildInvoiceNumber } from "@/lib/invoice";
import { getProductByInvoice } from "@/lib/products";

type InvoicePageProps = {
  params: Promise<{ invoice: string }>;
  searchParams: Promise<{
    amount?: string;
    description?: string;
    product?: string;
    status?: string;
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
  };

  return (
    <div className="invoice-page min-h-screen bg-slate-100">
      <div className="no-print">
        <SiteHeader />
      </div>
      <InvoiceActions />
      <div className="px-4 pb-12">
        <InvoiceDocument data={data} />
      </div>
    </div>
  );
}

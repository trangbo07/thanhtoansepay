import { PaymentResultPoller } from "@/components/payment-result-poller";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { verifyOrderPaid } from "@/lib/sepay-verify";
import { resolveProductByOrderCode } from "@/lib/order-code";
import { redirect } from "next/navigation";

type PaymentResultPageProps = {
  params: Promise<{ invoice: string }>;
  searchParams: Promise<{
    amount?: string;
    description?: string;
    product?: string;
  }>;
};

export default async function PaymentResultPage({ params, searchParams }: PaymentResultPageProps) {
  const { invoice } = await params;
  const query = await searchParams;

  const product = resolveProductByOrderCode(invoice);
  const amount = Number(query.amount ?? product?.amount ?? 0);
  const description = query.description ?? product?.name ?? `Đơn hàng ${invoice}`;
  const productName = query.product ?? description;

  const baseQuery = `amount=${amount}&description=${encodeURIComponent(description)}&product=${encodeURIComponent(productName)}`;
  const successUrl = `/order/${invoice}/success?${baseQuery}`;
  const orderUrl = `/order/${invoice}?${baseQuery}&payment=pending`;

  if (await verifyOrderPaid(invoice)) {
    redirect(successUrl);
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f0f4f8]">
      <SiteHeader />

      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-10">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
          <h1 className="text-center text-lg font-bold text-slate-900">Xác minh thanh toán</h1>
          <p className="mt-2 text-center text-sm text-slate-500">{productName}</p>
          <div className="mt-8">
            <PaymentResultPoller
              invoice={invoice}
              successUrl={successUrl}
              orderUrl={orderUrl}
            />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

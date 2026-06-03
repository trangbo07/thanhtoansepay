import { PaymentResultPoller } from "@/components/payment-result-poller";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { isCatalogInvoice, resolveProductByOrderCode } from "@/lib/order-code";
import { buildOrderUrl } from "@/lib/products";
import { resolveSepayOrderIdFromQuery, verifyOrderPaid } from "@/lib/sepay-verify";
import { redirect } from "next/navigation";

type PaymentResultPageProps = {
  params: Promise<{ invoice: string }>;
  searchParams: Promise<{
    amount?: string;
    description?: string;
    product?: string;
    sepay_order_id?: string;
    order_id?: string;
  }>;
};

function buildQueryString(params: Record<string, string>) {
  return new URLSearchParams(params).toString();
}

export default async function PaymentResultPage({ params, searchParams }: PaymentResultPageProps) {
  const { invoice } = await params;
  const query = await searchParams;

  if (isCatalogInvoice(invoice)) {
    const catalogProduct = resolveProductByOrderCode(invoice);
    redirect(catalogProduct ? buildOrderUrl(catalogProduct) : "/");
  }

  const product = resolveProductByOrderCode(invoice);
  const amount = Number(query.amount ?? product?.amount ?? 0);
  const description = query.description ?? product?.name ?? `Đơn hàng ${invoice}`;
  const productName = query.product ?? description;
  const sepayOrderId = resolveSepayOrderIdFromQuery(query);

  const baseParams: Record<string, string> = {
    amount: String(amount),
    description,
    product: productName,
  };
  if (sepayOrderId) {
    baseParams.sepay_order_id = sepayOrderId;
  }

  const baseQuery = buildQueryString(baseParams);
  const successUrl = `/order/${invoice}/success?${baseQuery}`;
  const orderUrl = `/order/${invoice}?${baseQuery}&payment=pending`;

  if (sepayOrderId && (await verifyOrderPaid(invoice, sepayOrderId))) {
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
            {sepayOrderId ? (
              <PaymentResultPoller
                invoice={invoice}
                sepayOrderId={sepayOrderId}
                successUrl={successUrl}
                orderUrl={orderUrl}
              />
            ) : (
              <div className="space-y-4 text-center text-sm text-slate-700">
                <p className="font-medium text-amber-800">
                  Thiếu mã giao dịch SePay — không thể xác minh tự động.
                </p>
                <p className="text-xs text-slate-500">
                  Vui lòng bấm thanh toán lại từ trang đơn hàng (mã đơn mới sẽ có mã giao dịch PAY… riêng).
                </p>
                <a
                  href={orderUrl}
                  className="inline-flex text-sm font-medium text-[#1d6fd8] hover:underline"
                >
                  Quay lại trang thanh toán
                </a>
              </div>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

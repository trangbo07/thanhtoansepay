import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildInvoiceUrl } from "@/lib/invoice";
import { formatCurrency, formatPrice } from "@/lib/format";
import { getProductByInvoice } from "@/lib/products";

type SuccessPageProps = {
  params: Promise<{ invoice: string }>;
  searchParams: Promise<{
    amount?: string;
    description?: string;
    product?: string;
    method?: string;
  }>;
};

export default async function OrderSuccessPage({ params, searchParams }: SuccessPageProps) {
  const { invoice } = await params;
  const query = await searchParams;

  const product = getProductByInvoice(invoice);
  const amount = Number(query.amount ?? product?.amount ?? 0);
  const description = query.description ?? `Thanh toán đơn hàng ${invoice}`;
  const productName = query.product ?? product?.name ?? description;
  const paymentMethod = "SePay";

  const invoiceUrl = buildInvoiceUrl(invoice, {
    amount,
    description,
    product: productName,
    status: "paid",
  });

  return (
    <div className="flex min-h-screen flex-col bg-[#f0f4f8]">
      <SiteHeader />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 px-8 py-10 text-center text-white">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-3xl">
              ✓
            </div>
            <p className="text-sm font-medium uppercase tracking-wider opacity-90">Thanh toán thành công</p>
            <h1 className="mt-2 text-2xl font-bold">Cảm ơn bạn đã mua hàng!</h1>
            <p className="mt-3 text-sm text-emerald-50">
              Đơn {invoice} đã được ghi nhận. Tài khoản / quyền truy cập sẽ được bàn giao trong vài phút.
            </p>
          </div>

          <div className="grid gap-4 p-6 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center">
              <p className="text-xs text-slate-500">Trạng thái</p>
              <p className="mt-1 font-bold text-emerald-600">Đã thanh toán</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center">
              <p className="text-xs text-slate-500">Mã đơn</p>
              <p className="mt-1 font-bold text-slate-800">{invoice}</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center">
              <p className="text-xs text-slate-500">Số tiền</p>
              <p className="mt-1 font-bold text-rose-600">
                {amount > 0 ? formatPrice(amount) : "—"}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 px-6 py-5">
            <p className="text-sm font-semibold text-slate-800">{productName}</p>
            <p className="mt-2 text-sm text-slate-500">{description}</p>
            {amount > 0 ? (
              <p className="mt-3 text-xs text-slate-400">
                Số tiền: {formatCurrency(amount)} VND · Cổng: {paymentMethod}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-3 border-t border-slate-100 bg-slate-50/80 px-6 py-5">
            <a
              href={invoiceUrl}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#1d6fd8] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1558b0] sm:flex-none"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
              </svg>
              Xem & in hóa đơn
            </a>
            <a
              href={`/order/${invoice}?amount=${amount}&description=${encodeURIComponent(description)}&product=${encodeURIComponent(productName)}`}
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Chi tiết đơn
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Tiếp tục mua
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

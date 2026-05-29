import { SepayEnvBanner } from "@/components/sepay-env-banner";
import { SePayCheckoutForm } from "@/components/sepay-checkout-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatCurrency } from "@/lib/format";
import { getProductByInvoice } from "@/lib/products";
import { redirect } from "next/navigation";

type OrderPageProps = {
  params: Promise<{ invoice: string }>;
  searchParams: Promise<{
    amount?: string;
    description?: string;
    product?: string;
    payment?: string;
  }>;
};

export default async function OrderPage({ params, searchParams }: OrderPageProps) {
  const { invoice } = await params;
  const query = await searchParams;

  const product = getProductByInvoice(invoice);
  const amount = Number(query.amount ?? product?.amount ?? 0);
  const productName = query.product ?? product?.name ?? `Đơn hàng ${invoice}`;
  const description = query.description ?? productName;
  const paymentState = query.payment;
  const shouldAutoStart = !paymentState || paymentState === "pending";

  const successUrl = `/order/${invoice}/success?amount=${encodeURIComponent(String(amount))}&description=${encodeURIComponent(description)}&product=${encodeURIComponent(productName)}`;

  if (paymentState === "success") {
    redirect(successUrl);
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f0f4f8]">
      <SiteHeader />

      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-10">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
          <div className="border-b border-slate-100 bg-gradient-to-r from-[#1d6fd8] to-blue-600 px-6 py-5 text-white">
            <p className="text-xs font-medium uppercase tracking-wider opacity-90">Thanh toán đơn hàng</p>
            <h1 className="mt-1 text-2xl font-bold">{invoice}</h1>
            <p className="mt-2 text-sm text-blue-100">{productName}</p>
          </div>

          <div className="space-y-4 p-6">
            <SepayEnvBanner />
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Số tiền</p>
                <p className="mt-1 text-xl font-bold text-rose-600">
                  {amount > 0 ? `${formatCurrency(amount)}đ` : "Chưa có số tiền"}
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Trạng thái</p>
                <p className="mt-1 text-sm font-semibold text-[#1d6fd8]">Chuyển sang SePay...</p>
              </div>
            </div>

            {paymentState && paymentState !== "pending" ? (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                {paymentState === "cancel"
                  ? "Bạn đã hủy thanh toán. Bạn có thể thử lại bên dưới."
                  : "Thanh toán gặp lỗi. Vui lòng thử lại hoặc liên hệ hỗ trợ."}
              </div>
            ) : (
              <p className="rounded-xl border border-sky-100 bg-sky-50 p-4 text-sm text-sky-900">
                Trang sẽ tự tạo checkout và chuyển sang cổng SePay khi bạn mở đơn hàng.
              </p>
            )}

            <SePayCheckoutForm
              orderInvoiceNumber={invoice}
              orderAmount={amount > 0 ? amount : 10000}
              orderDescription={description}
              successPath={successUrl}
              errorPath={`/order/${invoice}?payment=error&amount=${amount}&description=${encodeURIComponent(description)}&product=${encodeURIComponent(productName)}`}
              cancelPath={`/order/${invoice}?payment=cancel&amount=${amount}&description=${encodeURIComponent(description)}&product=${encodeURIComponent(productName)}`}
              paymentMethod="BANK_TRANSFER"
              autoStart={shouldAutoStart}
            />
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-slate-500">
          <a href="/" className="font-medium text-[#1d6fd8] hover:underline">
            ← Quay lại cửa hàng
          </a>
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}

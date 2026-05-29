import { OrderPayment } from "@/components/order-payment";
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

  const baseQuery = `amount=${amount}&description=${encodeURIComponent(description)}&product=${encodeURIComponent(productName)}`;
  const successUrl = `/order/${invoice}/success?${baseQuery}`;
  const orderPath = `/order/${invoice}?${baseQuery}`;

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
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Số tiền</p>
                <p className="mt-1 text-xl font-bold text-rose-600">
                  {amount > 0 ? `${formatCurrency(amount)}đ` : "Chưa có số tiền"}
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Trạng thái</p>
                <p className="mt-1 text-sm font-semibold text-slate-700">Chờ chọn cổng thanh toán</p>
              </div>
            </div>

            {paymentState && paymentState !== "pending" ? (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                {paymentState === "cancel"
                  ? "Bạn đã hủy thanh toán SePay. Chọn lại cổng bên dưới."
                  : "Thanh toán SePay gặp lỗi. Thử lại hoặc dùng VietQR."}
              </div>
            ) : null}

            <OrderPayment
              invoice={invoice}
              amount={amount}
              productName={productName}
              description={description}
              successUrl={successUrl}
              errorPath={`${orderPath}&payment=error`}
              cancelPath={`${orderPath}&payment=cancel`}
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

import { SePayCheckoutForm } from "@/components/sepay-checkout-form";
import { redirect } from "next/navigation";

type OrderPageProps = {
  params: { invoice: string };
  searchParams: {
    amount?: string;
    description?: string;
    payment?: string;
  };
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("vi-VN").format(amount);
}

export default function OrderPage({ params, searchParams }: OrderPageProps) {
  const { invoice } = params;

  const amount = Number(searchParams.amount ?? 0);
  const description = searchParams.description ?? `Thanh toan don hang ${invoice}`;
  const paymentState = searchParams.payment;
  const shouldAutoStart = !paymentState || paymentState === "pending";
  const successUrl = `/order/${invoice}/success?amount=${encodeURIComponent(String(amount))}&description=${encodeURIComponent(description)}`;

  if (paymentState === "success") {
    redirect(successUrl);
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_30%),linear-gradient(180deg,_#07111f_0%,_#0b1524_42%,_#09111d_100%)] px-6 py-10 text-white sm:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 shadow-2xl shadow-black/20 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.25em] text-emerald-200/70">Đơn hàng</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">{invoice}</h1>
          <p className="mt-3 text-slate-300">{description}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Số tiền</p>
              <p className="mt-2 text-xl font-semibold text-white">
                {amount > 0 ? `${formatCurrency(amount)} VND` : "Chưa có số tiền"}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Trạng thái</p>
              <p className="mt-2 text-xl font-semibold text-white">Đang chuyển sang SePay</p>
            </div>
          </div>

          {paymentState && paymentState !== "pending" ? (
            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-200">
              {paymentState === "success"
                ? "Thanh toán đã thành công."
                : paymentState === "cancel"
                  ? "Bạn đã hủy thanh toán."
                  : "Thanh toán gặp lỗi."}
            </div>
          ) : null}
        </div>

        <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6">
          <p className="text-sm text-emerald-100/80">
            Trang này sẽ tự tạo checkout và chuyển sang SePay ngay khi mở.
          </p>
        </div>

        <SePayCheckoutForm
          orderInvoiceNumber={invoice}
          orderAmount={amount > 0 ? amount : 10000}
          orderDescription={description}
          successPath={successUrl}
          errorPath={`/order/${invoice}?payment=error`}
          cancelPath={`/order/${invoice}?payment=cancel`}
          paymentMethod="BANK_TRANSFER"
          autoStart={shouldAutoStart}
        />
      </div>
    </main>
  );
}
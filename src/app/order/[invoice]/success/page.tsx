type SuccessPageProps = {
  params: { invoice: string };
  searchParams: {
    amount?: string;
    description?: string;
  };
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("vi-VN").format(amount);
}

export default function OrderSuccessPage({ params, searchParams }: SuccessPageProps) {
  const amount = Number(searchParams.amount ?? 0);
  const description = searchParams.description ?? `Thanh toan don hang ${params.invoice}`;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_32%),linear-gradient(180deg,_#06131f_0%,_#0b1727_50%,_#08101b_100%)] px-6 py-10 text-white sm:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-8 shadow-2xl shadow-black/20 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-100/80">Thanh toán thành công</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Đơn hàng {params.invoice} đã được xác nhận</h1>
          <p className="mt-4 max-w-2xl leading-8 text-emerald-50/85">
            SePay đã trả về trạng thái thành công. Hệ thống có thể tiếp tục bàn giao sản phẩm, cấp quyền truy cập,
            hoặc cập nhật trạng thái đơn hàng ở backend của bạn.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Mã đơn hàng</p>
            <p className="mt-2 text-2xl font-semibold text-white">{params.invoice}</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Số tiền</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {amount > 0 ? `${formatCurrency(amount)} VND` : "Chưa có số tiền"}
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-slate-200">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-200/70">Mô tả</p>
          <p className="mt-3 text-lg leading-8 text-white">{description}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={`/order/${params.invoice}?amount=${amount}&description=${encodeURIComponent(description)}`}
            className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
          >
            Về trang đơn hàng
          </a>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Về trang chủ
          </a>
        </div>
      </div>
    </main>
  );
}
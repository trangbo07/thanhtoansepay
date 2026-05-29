import { SePayCheckoutForm } from "@/components/sepay-checkout-form";

export default function Home() {
  const featuredApis = [
    {
      name: "AI Chatbot Pro",
      category: "Chatbot",
      price: "149.000đ / tháng",
      description: "Bot hỗ trợ đa kênh, tự động trả lời và chuyển tiếp cho đội ngũ.",
    },
    {
      name: "Developer API Vault",
      category: "API Access",
      price: "299.000đ / tháng",
      description: "Bộ API key, quota và dashboard dùng cho team dev và startup.",
    },
    {
      name: "Commerce Bot Suite",
      category: "Automation",
      price: "199.000đ / tháng",
      description: "Kịch bản bán hàng, lead gen và chăm sóc khách hàng tích hợp CRM.",
    },
  ];

  const trustSignals = [
    "Xác minh nhà cung cấp",
    "Thanh toán qua cổng uy tín",
    "Bàn giao tự động",
    "Hỗ trợ kỹ thuật 24/7",
  ];

  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_30%),radial-gradient(circle_at_80%_20%,_rgba(59,130,246,0.16),_transparent_26%),linear-gradient(180deg,_#07111f_0%,_#0b1524_42%,_#09111d_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-white/10" />

      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 text-white sm:px-8 lg:px-10">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/80">API Hub VN</p>
            <h1 className="text-lg font-semibold tracking-tight">Marketplace cho API và chatbot cho developer</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200/90">
            <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1">Thanh toán an toàn</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Giao hàng tự động</span>
          </div>
        </header>

        <div className="grid flex-1 gap-8 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-16">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              Dành cho team dev, startup và người bán chatbot
            </div>

            <div className="space-y-5">
              <h2 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
                Mua bán API, chatbot và gói automation trong một storefront chuyên nghiệp.
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Nền tảng này được thiết kế như một marketplace đáng tin cậy cho dịch vụ số: xem gói,
                đánh giá nhà cung cấp, thanh toán qua cổng an toàn SePay và nhận bàn giao tự động ngay sau khi
                giao dịch thành công.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#catalog"
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
              >
                Khám phá gói nổi bật
              </a>
              <a
                href="#payment"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Xem tích hợp thanh toán
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {trustSignals.map((signal) => (
                <div
                  key={signal}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200 shadow-lg shadow-black/10 backdrop-blur"
                >
                  {signal}
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(2,6,23,0.92))] p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">Trust Panel</p>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                  <p className="text-sm text-emerald-100/80">Tổng giao dịch tháng này</p>
                  <p className="mt-2 text-3xl font-semibold">1.284</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-slate-200">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-slate-400">Tỷ lệ thành công</p>
                    <p className="mt-2 text-xl font-semibold">99.2%</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-slate-400">Thời gian bàn giao</p>
                    <p className="mt-2 text-xl font-semibold">&lt; 2 phút</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Cổng thanh toán</p>
                  <p className="mt-2 text-xl font-semibold">SePay</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <section id="catalog" className="grid gap-5 border-t border-white/10 py-10 lg:grid-cols-3">
          {featuredApis.map((item) => (
            <article
              key={item.name}
              className="group rounded-[1.75rem] border border-white/10 bg-white/6 p-6 shadow-xl shadow-black/15 transition hover:-translate-y-1 hover:border-emerald-400/25 hover:bg-white/8"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-emerald-100">
                  {item.category}
                </span>
                <span className="text-sm text-slate-300">Verified</span>
              </div>
              <h3 className="mt-5 text-2xl font-semibold text-white">{item.name}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
              <div className="mt-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Giá bán</p>
                  <p className="mt-1 text-xl font-semibold text-white">{item.price}</p>
                </div>
                <a
                  href="#payment"
                  className="rounded-full border border-white/12 bg-slate-900/70 px-4 py-2 text-sm font-medium text-white transition group-hover:border-emerald-400/30 group-hover:bg-emerald-400/15"
                >
                  Mua ngay
                </a>
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-6 pb-16 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-200/70">Luồng mua hàng</p>
            <h3 className="mt-3 text-3xl font-semibold text-white">Thanh toán giống sản phẩm thật, nhưng an toàn để triển khai</h3>
            <p className="mt-4 leading-8 text-slate-300">
              Tách riêng trang bán hàng, trạng thái thanh toán và bàn giao quyền truy cập. Khi cắm gateway thật,
              bạn chỉ thay phần cấu hình webhook, phần giao diện và luồng xử lý vẫn giữ nguyên.
            </p>
          </div>

          <div id="payment" className="grid gap-5 rounded-[2rem] border border-white/10 bg-slate-950/60 p-7 shadow-2xl shadow-black/20">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-emerald-200/70">Tích hợp thanh toán</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">SePay sandbox hoặc production</h3>
              </div>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-100">
                Secure Checkout
              </span>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
              <p className="text-slate-400">Cấu hình thanh toán</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Mã đơn hàng</p>
                  <p className="mt-2 text-lg font-semibold text-white">DH123</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Số tiền</p>
                  <p className="mt-2 text-lg font-semibold text-white">10.000 VND</p>
                </div>
              </div>
            </div>

            <SePayCheckoutForm
              orderInvoiceNumber="DH123"
              orderAmount={10000}
              orderDescription="Thanh toan don hang DH123"
              successPath="/order/DH123?payment=success"
              errorPath="/order/DH123?payment=error"
              cancelPath="/order/DH123?payment=cancel"
              paymentMethod="BANK_TRANSFER"
            />

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Tạo đơn hàng",
                "Ký dữ liệu bằng secret key",
                "Redirect sang trang SePay",
                "Webhook cập nhật trạng thái thanh toán",
              ].map((step, index) => (
                <div key={step} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Bước {index + 1}</p>
                  <p className="mt-2 font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
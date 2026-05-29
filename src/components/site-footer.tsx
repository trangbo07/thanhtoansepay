import { SITE } from "@/lib/products";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-10 lg:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xl font-bold text-[#1d6fd8]">{SITE.name}</p>
            <p className="mt-2 text-sm text-slate-500">{SITE.tagline}</p>
            <p className="mt-3 text-sm text-slate-600">MST: {SITE.taxCode}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-800">Hỗ trợ</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li>Hướng dẫn thanh toán SePay</li>
              <li>Chính sách bàn giao tài khoản</li>
              <li>Đổi trả & hoàn tiền</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-800">Sản phẩm</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li>Tài khoản Merchant</li>
              <li>API & Webhook</li>
              <li>Gói hỗ trợ tích hợp</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-800">Liên hệ</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li>{SITE.phone}</li>
              <li>{SITE.email}</li>
              <li>{SITE.address}</li>
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} {SITE.name}. Thanh toán qua cổng SePay — xuất hóa đơn điện tử chuẩn.
        </p>
      </div>
    </footer>
  );
}

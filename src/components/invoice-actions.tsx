"use client";

export function InvoiceActions() {
  return (
    <div className="no-print mx-auto flex max-w-[820px] flex-wrap gap-3 px-4 py-6">
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 rounded-lg bg-[#1d6fd8] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1558b0]"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9V2h12v7M6 18H4v4h16v-4h-2M6 14h12v8H6z" />
        </svg>
        In hóa đơn / Lưu PDF
      </button>
      <a
        href="/"
        className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        Về trang chủ
      </a>
    </div>
  );
}

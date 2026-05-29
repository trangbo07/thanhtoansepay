"use client";

type InvoiceActionsProps = {
  invoiceNumber?: string;
};

export function InvoiceActions({ invoiceNumber }: InvoiceActionsProps) {
  return (
    <div className="no-print mx-auto mb-6 flex max-w-[210mm] flex-wrap items-center justify-between gap-3 px-4">
      <div>
        <p className="text-sm font-semibold text-slate-800">Xem trước hóa đơn</p>
        {invoiceNumber ? (
          <p className="text-xs text-slate-500">Số HĐ: {invoiceNumber}</p>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-slate-900"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9V2h12v7M6 18H4v4h16v-4h-2M6 14h12v8H6z" />
          </svg>
          In / Lưu PDF
        </button>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          Về cửa hàng
        </a>
      </div>
    </div>
  );
}

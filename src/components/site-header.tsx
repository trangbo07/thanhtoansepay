import Link from "next/link";
import { SITE } from "@/lib/products";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200/80 bg-white shadow-sm">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-4 px-4 py-4 lg:px-6">
        <Link href="/" className="flex min-w-[180px] flex-col">
          <span className="flex items-center gap-1.5 text-2xl font-bold tracking-tight text-[#1d6fd8]">
            <span className="text-lg" aria-hidden>
              👑
            </span>
            {SITE.name}
          </span>
          <span className="text-xs text-slate-500">{SITE.tagline}</span>
        </Link>

        <div className="mx-auto flex min-w-[240px] flex-1 items-center">
          <label className="relative w-full max-w-xl">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3-3" />
              </svg>
            </span>
            <input
              type="search"
              placeholder="Tìm sản phẩm SePay, API, merchant..."
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#1d6fd8] focus:bg-white focus:ring-2 focus:ring-[#1d6fd8]/20"
            />
          </label>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={`https://zalo.me/${SITE.phone.replace(/\s/g, "")}`}
            className="hidden items-center gap-2 text-sm font-medium text-slate-700 sm:flex"
            target="_blank"
            rel="noreferrer"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0068ff] text-xs font-bold text-white">
              Z
            </span>
            {SITE.phone}
          </a>

          <div className="flex items-center gap-3 text-slate-600">
            <button type="button" className="rounded-full p-2 hover:bg-slate-100" aria-label="Tài khoản">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" />
              </svg>
            </button>
            <button type="button" className="relative rounded-full p-2 hover:bg-slate-100" aria-label="Yêu thích">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 21s-7-4.4-9.5-8.5C.5 9.5 2.5 5 6.5 5c2 0 3.5 1.2 5.5 3.5C14 6.2 15.5 5 17.5 5c4 0 6 4.5 4.5 7.5C19 16.6 12 21 12 21z" />
              </svg>
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                0
              </span>
            </button>
            <button
              type="button"
              className="relative flex items-center gap-2 rounded-full bg-[#1d6fd8] px-3 py-2 text-sm font-semibold text-white"
              aria-label="Giỏ hàng"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="20" r="1.5" fill="currentColor" />
                <circle cx="18" cy="20" r="1.5" fill="currentColor" />
                <path d="M2 2h2l2.5 12h11l2-8H6" />
              </svg>
              <span>0đ</span>
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

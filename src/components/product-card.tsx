import Link from "next/link";
import { buildOrderUrl, discountPercent, type Product } from "@/lib/products";
import { formatCurrency, formatPrice, formatUsd } from "@/lib/format";
import { USD_TO_VND } from "@/lib/products";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={i < Math.round(rating) ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 2l2.9 6.9H22l-5.5 4.5 2.1 6.6L12 17.3 5.4 19.9l2.1-6.6L2 8.9h7.1z" />
        </svg>
      ))}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const discount = discountPercent(product.amount, product.originalAmount);
  const stockPercent = Math.round((product.stockLeft / product.stockTotal) * 100);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative p-4 pb-0">
        <span className="absolute left-6 top-6 z-10 rounded-md bg-rose-600 px-2 py-0.5 text-[11px] font-bold uppercase text-white shadow">
          {product.badge}
        </span>
        <div
          className={`flex aspect-[4/3] items-center justify-center rounded-xl bg-gradient-to-br ${product.accent} text-white shadow-inner`}
        >
          <span className="text-3xl font-black tracking-tight opacity-95">{product.icon}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 pt-3">
        <h3 className="line-clamp-2 min-h-[2.75rem] text-sm font-bold leading-snug text-slate-900 group-hover:text-[#1d6fd8]">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
          <Stars rating={product.rating} />
          <span className="font-semibold text-slate-700">{product.rating}</span>
          <span>·</span>
          <span>{product.sold} đã bán</span>
        </div>

        <div className="mt-3">
          <p className="text-xs text-slate-500">Chỉ từ</p>
          {product.priceUsd != null ? (
            <>
              <p className="text-xl font-bold text-rose-600">{formatUsd(product.priceUsd)}</p>
              <p className="mt-0.5 text-xs text-slate-500">
                ≈ {formatPrice(product.amount)} · quy đổi {formatCurrency(USD_TO_VND)}đ/USD
              </p>
            </>
          ) : (
            <p className="text-xl font-bold text-rose-600">{formatPrice(product.amount)}</p>
          )}
          {discount > 0 ? (
            <p className="mt-0.5 text-xs text-slate-400">
              {product.priceUsd != null ? (
                <span className="line-through">
                  {formatUsd(product.originalAmount / USD_TO_VND)}
                </span>
              ) : (
                <span className="line-through">{formatPrice(product.originalAmount)}</span>
              )}
              <span className="ml-1 font-semibold text-rose-500">-{discount}%</span>
            </p>
          ) : null}
        </div>

        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1">
              <span>🔥</span>
              Còn {product.stockLeft}/{product.stockTotal} suất
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 transition-all"
              style={{ width: `${stockPercent}%` }}
            />
          </div>
        </div>

        <Link
          href={buildOrderUrl(product)}
          className="mt-4 inline-flex w-full items-center justify-center rounded-lg border border-[#1d6fd8]/30 bg-sky-50 py-2.5 text-sm font-semibold text-[#1d6fd8] transition group-hover:bg-[#1d6fd8] group-hover:text-white"
        >
          Mua ngay
        </Link>
      </div>
    </article>
  );
}

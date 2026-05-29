const items = [
  { icon: "🏷️", label: "GIÁ TỐT MỖI NGÀY" },
  { icon: "✅", label: "TÀI KHOẢN CHẤT LƯỢNG" },
  { icon: "⚡", label: "HỖ TRỢ NHANH CHÓNG" },
];

export function PromoBanner() {
  return (
    <div className="border-b border-rose-100 bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-8 px-4 py-2.5 text-xs font-bold tracking-wide text-rose-700 sm:gap-16 lg:px-6">
        {items.map((item) => (
          <span key={item.label} className="inline-flex items-center gap-2">
            <span>{item.icon}</span>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

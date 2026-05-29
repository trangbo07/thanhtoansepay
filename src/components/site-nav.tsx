import Link from "next/link";

const links = [
  { href: "#catalog", label: "Giới thiệu" },
  { href: "#catalog", label: "Hướng dẫn mua hàng" },
  { href: "#catalog", label: "Blog tin tức" },
];

export function SiteNav() {
  return (
    <nav className="border-b border-slate-200/80 bg-white">
      <div className="mx-auto flex max-w-[1400px] items-center gap-6 px-4 py-2.5 lg:px-6">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-[#1d6fd8] px-4 py-2 text-sm font-semibold text-white shadow-sm"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Tất cả danh mục
        </button>
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-sm font-medium text-slate-600 transition hover:text-[#1d6fd8]"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

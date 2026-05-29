import { ProductCard } from "@/components/product-card";
import { PromoBanner } from "@/components/promo-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteNav } from "@/components/site-nav";
import { PRODUCTS } from "@/lib/products";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <SiteNav />
      <PromoBanner />

      <main id="catalog" className="flex-1">
        <div className="mx-auto max-w-[1400px] px-4 py-6 lg:px-6">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Tài khoản & gói SePay nổi bật</h2>
              <p className="mt-1 text-sm text-slate-500">
                Thanh toán qua SePay · Bàn giao tự động · Xuất hóa đơn chuẩn sau khi thanh toán
              </p>
            </div>
            <p className="text-sm text-slate-500">
              Hiển thị <span className="font-semibold text-[#1d6fd8]">{PRODUCTS.length}</span> sản phẩm
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

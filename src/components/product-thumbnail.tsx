import Image from "next/image";
import type { Product } from "@/lib/products";

type ProductThumbnailProps = {
  product: Product;
};

export function ProductThumbnail({ product }: ProductThumbnailProps) {
  if (!product.imageUrl) {
    return (
      <div
        className={`flex aspect-[4/3] items-center justify-center rounded-xl bg-gradient-to-br ${product.accent} text-white shadow-inner`}
      >
        <span className="text-3xl font-black tracking-tight opacity-95">{product.icon}</span>
      </div>
    );
  }

  const isSvg = product.imageUrl.includes(".svg");

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className={
          isSvg ||
          product.imageUrl?.includes("sepay.vn") ||
          product.imageUrl?.includes("pngtree.com")
            ? "object-contain p-4"
            : "object-cover"
        }
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 240px"
        unoptimized={isSvg}
      />
    </div>
  );
}

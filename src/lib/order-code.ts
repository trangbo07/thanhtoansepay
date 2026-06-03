import { PRODUCTS, type Product } from "@/lib/products";

const catalogInvoices = new Set(PRODUCTS.map((p) => p.invoice));

/** Mã cố định trên catalog (SP2411, AI9182787…) — không dùng làm mã thanh toán SePay. */
export function isCatalogInvoice(code: string) {
  return catalogInvoices.has(code);
}

/** Mã đơn duy nhất cho mỗi lần bấm Mua ngay / tạo checkout. */
export function createOrderInvoiceNumber(catalogInvoice: string) {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${catalogInvoice}-${ts}${rand}`;
}

export function resolveProductByOrderCode(orderCode: string): Product | undefined {
  const exact = PRODUCTS.find((p) => p.invoice === orderCode);
  if (exact) return exact;

  for (const product of PRODUCTS) {
    if (orderCode.startsWith(`${product.invoice}-`)) {
      return product;
    }
  }

  return undefined;
}

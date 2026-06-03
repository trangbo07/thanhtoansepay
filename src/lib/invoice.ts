import { getPublicSiteUrl } from "@/lib/sepay-site";
import { SITE } from "@/lib/products";

/** Mẫu hóa đơn bán hàng (kiểu MISA / TT78) */
export const INVOICE_FORM = {
  templateCode: "2C22TBH/001",
  seriesPrefix: "SP",
} as const;

export function buildInvoiceNumber(orderCode: string, date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const suffix = orderCode.replace(/[^A-Z0-9]/gi, "").slice(-6).toUpperCase();
  return `HD${y}${m}${d}-${suffix}`;
}

export function buildInvoiceSeries(date = new Date()) {
  const yy = String(date.getFullYear()).slice(-2);
  return `${INVOICE_FORM.seriesPrefix}/${yy}E`;
}

export function buildInvoiceSerialNo(invoiceNumber: string) {
  const digits = invoiceNumber.replace(/\D/g, "");
  return digits.slice(-7) || "0000001";
}

export function formatInvoiceDateLong(date: Date) {
  return `Ngày ${date.getDate()} tháng ${date.getMonth() + 1} năm ${date.getFullYear()}`;
}

export function buildLookupCode(invoiceNumber: string, orderCode: string) {
  const raw = `${invoiceNumber}-${orderCode}`.replace(/[^A-Z0-9]/gi, "");
  return raw.slice(-12).toUpperCase() || "000000000000";
}

export function buildInvoiceLookupUrl(lookupCode: string) {
  return `${getPublicSiteUrl()}/tra-cuu?ma=${lookupCode}`;
}

export function buildInvoiceQrUrl(lookupCode: string) {
  const data = buildInvoiceLookupUrl(lookupCode);
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&margin=8&data=${encodeURIComponent(data)}`;
}

export function buildInvoiceUrl(
  orderCode: string,
  params: {
    amount: number;
    description: string;
    product?: string;
    status?: "paid" | "pending";
    method?: string;
  },
) {
  const search = new URLSearchParams({
    amount: String(params.amount),
    description: params.description,
    product: params.product ?? params.description,
    status: params.status ?? "paid",
  });
  if (params.method) {
    search.set("method", params.method);
  }
  return `/order/${orderCode}/invoice?${search.toString()}`;
}

export const INVOICE_ISSUER_LINE = `Phát hành bởi ${SITE.name} — Hóa đơn điện tử`;

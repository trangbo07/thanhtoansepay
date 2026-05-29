import { getProductByInvoice, SITE } from "@/lib/products";

/** VietQR — Vietcombank (template compact2 + tham số động) */
export const VIETQR = {
  bankName: "Vietcombank",
  bankCode: "VCB",
  accountNo: "1037938021",
  /** Tên hiển thị trên ảnh QR (không dùng tên quỹ/ ví dụ cũ) */
  accountName: SITE.name,
  template: "compact2",
  baseImageUrl: "https://img.vietqr.io/image/VCB-1037938021-compact2.jpg",
  /** Giới hạn ký tự nội dung CK (Napas / ngân hàng) */
  maxTransferLength: 50,
} as const;

/** Bỏ dấu, ký tự đặc biệt — chuẩn nội dung chuyển khoản */
function toTransferAscii(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/gi, "d")
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .trim()
    .replace(/\s+/g, " ")
    .toUpperCase();
}

export type VietQrOrderContext = {
  invoice: string;
  productName?: string;
  description?: string;
};

/** Nội dung CK theo đúng đơn: mã đơn + tên SP từ catalog (ưu tiên) */
export function buildVietQrTransferContent(ctx: VietQrOrderContext): string {
  const orderCode = ctx.invoice.replace(/\s/g, "").toUpperCase();
  const catalogProduct = getProductByInvoice(ctx.invoice);
  const productName =
    catalogProduct?.name ?? ctx.productName ?? ctx.description ?? "DON HANG";

  const label = toTransferAscii(productName);
  const prefix = "MUA ";
  const suffix = ` ${orderCode}`;
  const maxLabelLen = VIETQR.maxTransferLength - prefix.length - suffix.length;

  const trimmedLabel = label.length > maxLabelLen ? label.slice(0, maxLabelLen).trim() : label;
  return `${prefix}${trimmedLabel}${suffix}`.replace(/\s+/g, " ").trim();
}

export function resolveVietQrOrder(ctx: VietQrOrderContext) {
  const catalogProduct = getProductByInvoice(ctx.invoice);
  return {
    orderCode: ctx.invoice.replace(/\s/g, "").toUpperCase(),
    productName: catalogProduct?.name ?? ctx.productName ?? ctx.description ?? "—",
    productId: catalogProduct?.id,
    transferContent: buildVietQrTransferContent(ctx),
  };
}

export function buildVietQrImageUrl(ctx: VietQrOrderContext & { amount: number }) {
  const { amount } = ctx;
  const params = new URLSearchParams();

  if (amount > 0) {
    params.set("amount", String(Math.round(amount)));
  }

  params.set("addInfo", buildVietQrTransferContent(ctx));
  params.set("accountName", VIETQR.accountName);

  return `${VIETQR.baseImageUrl}?${params.toString()}`;
}

export type PaymentGateway = "sepay" | "vietqr";

export const PAYMENT_GATEWAYS: {
  id: PaymentGateway;
  title: string;
  description: string;
}[] = [
  {
    id: "sepay",
    title: "SePay",
    description: "Cổng thanh toán tự động — chuyển hướng và xác nhận qua SePay",
  },
  {
    id: "vietqr",
    title: "VietQR / VNPay",
    description: "Quét mã QR chuyển khoản — xác nhận thủ công sau khi nhận tiền",
  },
];

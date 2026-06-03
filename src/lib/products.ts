import { PRODUCT_IMAGES } from "@/lib/product-images";

/** API Chatbot AI: $20 thanh toán đúng 526.550đ qua SePay */
export const CHATBOT_AI_USD = 20;
export const CHATBOT_AI_VND = 526_550;

export type Product = {
  id: string;
  invoice: string;
  name: string;
  category: string;
  description: string;
  /** Số tiền VND gửi sang SePay (phải khớp số hiển thị) */
  amount: number;
  originalAmount: number;
  /** Giá hiển thị USD, ví dụ 20 → "$20" */
  priceUsd?: number;
  originalPriceUsd?: number;
  rating: number;
  sold: string;
  stockTotal: number;
  stockLeft: number;
  badge: string;
  accent: string;
  icon: string;
  imageUrl?: string;
};

export const SITE = {
  name: "taikhoantech.store",
  legalName: "CÔNG TY TNHH SEPAYHUB",
  tagline: "TIN CẬY - TIỆN ÍCH - TẬN TÌNH",
  phone: "0865 890 208",
  email: "hotro@sepayhub.vn",
  address: "24 Công viên phần mềm Quang Trung, Trung Mỹ Tây, Hồ Chí Minh",
  taxCode: "0312345678",
  bankAccount: "1037938021 — Vietcombank",
  lookupWebsite: "https://thanhtoansepay.vercel.app",
};

export const PRODUCTS: Product[] = [
  {
    id: "sp-chatbot",
    invoice: "AI9182787",
    name: "API Chatbot",
    category: "Chatbot",
    description:
      "API chatbot đa kênh, tự động trả lời, webhook và quota hàng tháng — tích hợp nhanh cho web/app.",
    priceUsd: CHATBOT_AI_USD,
    originalPriceUsd: 35,
    amount: CHATBOT_AI_VND,
    originalAmount: 921_463,
    rating: 4.9,
    sold: "6,8k",
    stockTotal: 500,
    stockLeft: 214,
    badge: "Giá tốt",
    accent: "from-indigo-500 to-violet-700",
    icon: "AI",
    imageUrl: PRODUCT_IMAGES.chatbotAi,
  },
  {
    id: "sp-01",
    invoice: "SP2401",
    name: "Tài khoản SePay Merchant Cơ bản",
    category: "Merchant",
    description: "Kích hoạt cổng QR, chuyển khoản ngân hàng, webhook IPN và dashboard đối soát.",
    amount: 199000,
    originalAmount: 349000,
    rating: 4.8,
    sold: "12,4k",
    stockTotal: 200,
    stockLeft: 87,
    badge: "Giảm sâu",
    accent: "from-sky-500 to-blue-700",
    icon: "SP",
    imageUrl: PRODUCT_IMAGES.sepayIcon,
  },
  {
    id: "sp-02",
    invoice: "SP2402",
    name: "SePay Pro — VNPay, Momo, ZaloPay",
    category: "Cổng thanh toán",
    description: "Gói đa kênh: thẻ nội địa, ví điện tử, sandbox + production, hỗ trợ tích hợp 1:1.",
    amount: 449000,
    originalAmount: 699000,
    rating: 4.9,
    sold: "8,1k",
    stockTotal: 150,
    stockLeft: 42,
    badge: "Bán chạy",
    accent: "from-violet-500 to-purple-700",
    icon: "PR",
    imageUrl: PRODUCT_IMAGES.momoVnpay,
  },
  {
    id: "sp-03",
    invoice: "SP2403",
    name: "API Checkout & Webhook Bundle",
    category: "Developer",
    description: "SDK Node/PHP, mẫu IPN, log giao dịch, retry webhook và tài liệu triển khai đầy đủ.",
    amount: 299000,
    originalAmount: 499000,
    rating: 4.7,
    sold: "5,6k",
    stockTotal: 300,
    stockLeft: 156,
    badge: "Giảm sâu",
    accent: "from-emerald-500 to-teal-700",
    icon: "API",
    imageUrl: PRODUCT_IMAGES.webhooks,
  },
  {
    id: "sp-04",
    invoice: "SP2404",
    name: "Hỗ trợ tích hợp SePay 7 ngày",
    category: "Dịch vụ",
    description: "Kỹ sư hỗ trợ cài đặt, test sandbox, go-live production và xử lý lỗi giao dịch.",
    amount: 890000,
    originalAmount: 1290000,
    rating: 5,
    sold: "2,3k",
    stockTotal: 80,
    stockLeft: 19,
    badge: "Premium",
    accent: "from-amber-500 to-orange-600",
    icon: "7D",
    imageUrl: PRODUCT_IMAGES.sepayIcon,
  },
  {
    id: "sp-05",
    invoice: "SP2405",
    name: "Tài khoản đối soát & xuất hóa đơn",
    category: "Kế toán",
    description: "Xuất hóa đơn PDF, báo cáo doanh thu theo ngày, mã đơn chuẩn và lưu trữ 12 tháng.",
    amount: 159000,
    originalAmount: 259000,
    rating: 4.6,
    sold: "9,5k",
    stockTotal: 500,
    stockLeft: 184,
    badge: "Giảm sâu",
    accent: "from-rose-500 to-red-600",
    icon: "HD",
    imageUrl: PRODUCT_IMAGES.invoice,
  },
  {
    id: "sp-06",
    invoice: "SP2406",
    name: "Gói Startup — 3 tháng SePay",
    category: "Combo",
    description: "Merchant + API + hỗ trợ kỹ thuật, phù hợp shop online và SaaS mới go-live.",
    amount: 999000,
    originalAmount: 1590000,
    rating: 4.9,
    sold: "3,8k",
    stockTotal: 100,
    stockLeft: 31,
    badge: "Combo tiết kiệm",
    accent: "from-cyan-500 to-blue-600",
    icon: "ST",
    imageUrl: PRODUCT_IMAGES.startup,
  },
  {
    id: "sp-07",
    invoice: "SP2407",
    name: "Sandbox Unlimited — Dev Team",
    category: "Developer",
    description: "Môi trường test không giới hạn giao dịch, mock IPN và công cụ debug request.",
    amount: 99000,
    originalAmount: 199000,
    rating: 4.5,
    sold: "15,2k",
    stockTotal: 999,
    stockLeft: 412,
    badge: "Giá tốt",
    accent: "from-indigo-500 to-blue-800",
    icon: "SB",
    imageUrl: PRODUCT_IMAGES.genericAi,
  },
  {
    id: "sp-08",
    invoice: "SP2408",
    name: "White-label Checkout Page",
    category: "Branding",
    description: "Trang thanh toán tuỳ thương hiệu, logo, màu sắc và domain riêng cho doanh nghiệp.",
    amount: 1290000,
    originalAmount: 1890000,
    rating: 4.8,
    sold: "1,1k",
    stockTotal: 50,
    stockLeft: 8,
    badge: "Còn ít",
    accent: "from-fuchsia-500 to-pink-600",
    icon: "WL",
    imageUrl: PRODUCT_IMAGES.whiteLabelCheckout,
  },
  {
    id: "sp-09",
    invoice: "SP2409",
    name: "IPN Relay & Queue Worker",
    category: "Hạ tầng",
    description: "Hàng đợi webhook, retry tự động, alert Telegram khi giao dịch lỗi hoặc timeout.",
    amount: 349000,
    originalAmount: 549000,
    rating: 4.7,
    sold: "4,2k",
    stockTotal: 120,
    stockLeft: 55,
    badge: "Giảm sâu",
    accent: "from-slate-600 to-slate-800",
    icon: "IPN",
    imageUrl: PRODUCT_IMAGES.webhooks,
  },
  {
    id: "sp-10",
    invoice: "SP2410",
    name: "SePay Enterprise — SLA 99.9%",
    category: "Doanh nghiệp",
    description: "Tài khoản doanh nghiệp, hợp đồng SLA, kênh hỗ trợ ưu tiên và báo cáo tuỳ chỉnh.",
    amount: 2490000,
    originalAmount: 3490000,
    rating: 5,
    sold: "680",
    stockTotal: 30,
    stockLeft: 6,
    badge: "Enterprise",
    accent: "from-yellow-500 to-amber-600",
    icon: "EN",
    imageUrl: PRODUCT_IMAGES.sepayIcon,
  },
   {
    id: "sp-11",
    invoice: "SP2411",
    name: "Thẻ cào 20K",
    category: "Thẻ cào",
    description: "Thẻ cào 20K được thanh toán qua SePay",
    amount: 20000,
    originalAmount: 19500,
    rating: 5,
    sold: "0",
    stockTotal: 1000,
    stockLeft: 1000,
    badge: "Thẻ cào",
    accent: "from-yellow-500 to-amber-600",
    icon: "TC",
    imageUrl: PRODUCT_IMAGES.sepayIcon,
  }
];

export function getProductByInvoice(invoice: string) {
  return PRODUCTS.find((p) => p.invoice === invoice);
}

function newOrderCode(catalogInvoice: string) {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${catalogInvoice}-${ts}${rand}`;
}

export function buildOrderUrl(product: Product) {
  const orderCode = newOrderCode(product.invoice);
  const params = new URLSearchParams({
    amount: String(product.amount),
    description: product.name,
    product: product.name,
    payment: "pending",
  });
  return `/order/${orderCode}?${params.toString()}`;
}

export function discountPercent(amount: number, original: number) {
  if (original <= amount) return 0;
  return Math.round(((original - amount) / original) * 100);
}

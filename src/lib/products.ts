/** Tỷ giá quy đổi khi thanh toán SePay (VND) */
export const USD_TO_VND = 25_000;

export type Product = {
  id: string;
  invoice: string;
  name: string;
  category: string;
  description: string;
  /** Số tiền VND gửi sang SePay */
  amount: number;
  originalAmount: number;
  /** Giá hiển thị USD, ví dụ 20 → "$20" */
  priceUsd?: number;
  rating: number;
  sold: string;
  stockTotal: number;
  stockLeft: number;
  badge: string;
  accent: string;
  icon: string;
};

export function usdToVnd(usd: number) {
  return usd * USD_TO_VND;
}

export const SITE = {
  name: "SepayHub",
  tagline: "Tài khoản hỗ trợ thanh toán online",
  phone: "0865 890 208",
  email: "hotro@sepayhub.vn",
  address: "Tầng 8, Tòa nhà Innovation, Quận 1, TP.HCM",
  taxCode: "0312345678",
};

export const PRODUCTS: Product[] = [
  {
    id: "sp-chatbot",
    invoice: "DH123",
    name: "API Chatbot AI",
    category: "Chatbot",
    description:
      "API chatbot đa kênh, tự động trả lời, webhook và quota hàng tháng — tích hợp nhanh cho web/app.",
    priceUsd: 20,
    amount: usdToVnd(20),
    originalAmount: usdToVnd(35),
    rating: 4.9,
    sold: "6,8k",
    stockTotal: 500,
    stockLeft: 214,
    badge: "Giá tốt",
    accent: "from-indigo-500 to-violet-700",
    icon: "AI",
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
  },
];

export function getProductByInvoice(invoice: string) {
  return PRODUCTS.find((p) => p.invoice === invoice);
}

export function buildOrderUrl(product: Product) {
  const params = new URLSearchParams({
    amount: String(product.amount),
    description: product.name,
    product: product.name,
    payment: "pending",
  });
  return `/order/${product.invoice}?${params.toString()}`;
}

export function discountPercent(amount: number, original: number) {
  if (original <= amount) return 0;
  return Math.round(((original - amount) / original) * 100);
}

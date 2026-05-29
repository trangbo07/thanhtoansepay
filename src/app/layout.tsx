import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "SepayHub — Tài khoản hỗ trợ thanh toán online SePay",
  description:
    "Mua tài khoản SePay, cổng thanh toán, API checkout và hỗ trợ tích hợp. Thanh toán an toàn, bàn giao nhanh, xuất hóa đơn chuyên nghiệp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#f0f4f8] text-slate-800">{children}</body>
    </html>
  );
}

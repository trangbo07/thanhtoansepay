"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/format";
import {
  buildVietQrImageUrl,
  resolveVietQrOrder,
  VIETQR,
} from "@/lib/payment-config";

type VietQrPaymentProps = {
  invoice: string;
  amount: number;
  productName: string;
  description: string;
  successUrl: string;
  onBack: () => void;
};

export function VietQrPayment({
  invoice,
  amount,
  productName,
  description,
  successUrl,
  onBack,
}: VietQrPaymentProps) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);

  const orderCtx = useMemo(
    () => ({ invoice, productName, description }),
    [invoice, productName, description],
  );

  const order = useMemo(() => resolveVietQrOrder(orderCtx), [orderCtx]);
  const qrUrl = useMemo(
    () => buildVietQrImageUrl({ ...orderCtx, amount }),
    [orderCtx, amount],
  );

  function handleConfirmReceived() {
    setConfirming(true);
    const url = new URL(successUrl, window.location.origin);
    url.searchParams.set("method", "vietqr");
    router.push(`${url.pathname}${url.search}`);
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
        <p className="font-semibold">Chuyển khoản VietQR — {VIETQR.bankName}</p>
        <p className="mt-1 text-emerald-800/90">
          Chủ TK: <span className="font-semibold">{VIETQR.accountName}</span>
        </p>
        <p className="mt-1 text-emerald-800/90">
          STK: <span className="font-mono font-bold">{VIETQR.accountNo}</span>
        </p>
        <dl className="mt-3 space-y-1 border-t border-emerald-200/80 pt-3 text-xs">
          <div className="flex justify-between gap-4">
            <dt className="text-emerald-800/80">Mã đơn hàng</dt>
            <dd className="font-mono font-bold">{order.orderCode}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-emerald-800/80">Sản phẩm</dt>
            <dd className="max-w-[58%] text-right font-semibold">{order.productName}</dd>
          </div>
          {amount > 0 ? (
            <div className="flex justify-between gap-4">
              <dt className="text-emerald-800/80">Số tiền</dt>
              <dd className="font-bold text-rose-700">{formatCurrency(amount)}đ</dd>
            </div>
          ) : null}
          <div className="flex flex-col gap-1 pt-1">
            <dt className="text-emerald-800/80">Nội dung chuyển khoản (ghi đúng dòng này)</dt>
            <dd className="rounded-md bg-white/80 px-2 py-1.5 font-mono text-sm font-bold text-emerald-950">
              {order.transferContent}
            </dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-4">
        <p className="mb-3 text-sm font-medium text-slate-700">Quét mã VietQR để thanh toán</p>
        <div className="relative h-80 w-full max-w-sm overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
          <Image
            src={qrUrl}
            alt={`VietQR ${order.orderCode}`}
            fill
            className="object-contain p-2"
            sizes="256px"
            unoptimized
            priority
          />
        </div>
        <p className="mt-2 text-center text-[11px] text-slate-500">
          QR đã gắn số tiền và nội dung CK theo đơn <span className="font-mono font-semibold">{order.orderCode}</span>
        </p>
      </div>

      <p className="text-center text-xs leading-relaxed text-slate-500">
        Sau khi khách chuyển khoản đúng số tiền và đúng nội dung CK, bấm xác nhận để hoàn tất đơn.
      </p>

      <button
        type="button"
        onClick={handleConfirmReceived}
        disabled={confirming}
        className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
      >
        {confirming ? "Đang xử lý..." : "Xác nhận đã nhận tiền"}
      </button>

      <button
        type="button"
        onClick={onBack}
        className="inline-flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
      >
        ← Chọn cổng thanh toán khác
      </button>
    </div>
  );
}

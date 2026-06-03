"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type PaymentResultPollerProps = {
  invoice: string;
  sepayOrderId: string;
  successUrl: string;
  orderUrl: string;
};

export function PaymentResultPoller({
  invoice,
  sepayOrderId,
  successUrl,
  orderUrl,
}: PaymentResultPollerProps) {
  const router = useRouter();
  const [message, setMessage] = useState("Đang xác minh giao dịch SePay...");
  const maxAttempts = 30;
  const pollIntervalMs = 2000;

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function check() {
      try {
        const params = new URLSearchParams({
          invoice,
          sepay_order_id: sepayOrderId,
        });
        const res = await fetch(`/api/sepay/payment-status?${params.toString()}`, {
          cache: "no-store",
        });
        const data = await res.json();

        if (cancelled) return;

        if (data.paid) {
          router.replace(successUrl);
          return;
        }

        attempts += 1;
        if (attempts >= maxAttempts) {
          setMessage(
            "Chưa nhận xác nhận thanh toán cho giao dịch này. Nếu đã quét QR, đợi thêm vài phút rồi tải lại trang.",
          );
          return;
        }

        timer = setTimeout(() => {
          void check();
        }, pollIntervalMs);
      } catch {
        if (!cancelled) {
          setMessage("Không kiểm tra được trạng thái. Vui lòng thử lại sau.");
        }
      }
    }

    void check();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [invoice, router, sepayOrderId, successUrl]);

  return (
    <div className="space-y-4 text-center">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#1d6fd8]" />
      <p className="text-sm text-slate-700">{message}</p>
      <p className="text-xs text-slate-500">
        Mã đơn: <span className="font-mono font-semibold">{invoice}</span>
      </p>
      <p className="text-xs text-slate-500">
        Mã SePay: <span className="font-mono font-semibold">{sepayOrderId}</span>
      </p>
      <p className="text-xs leading-relaxed text-slate-500">
        Chỉ xác nhận khi đúng giao dịch <span className="font-mono">{sepayOrderId}</span> ở trạng thái CAPTURED.
      </p>
      <a
        href={orderUrl}
        className="inline-flex text-sm font-medium text-[#1d6fd8] hover:underline"
      >
        Quay lại trang thanh toán
      </a>
    </div>
  );
}

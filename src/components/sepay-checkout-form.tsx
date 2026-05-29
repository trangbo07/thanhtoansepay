"use client";

import { useEffect, useRef, useState } from "react";

type SePayCheckoutFormProps = {
  orderInvoiceNumber: string;
  orderAmount: number;
  orderDescription: string;
  successPath: string;
  errorPath: string;
  cancelPath: string;
  paymentMethod?: "BANK_TRANSFER" | "NAPAS_BANK_TRANSFER";
  currency?: string;
  autoStart?: boolean;
};

type CheckoutFieldValue = string | number | boolean | null | undefined;

type CheckoutResponse = {
  checkoutUrl: string;
  fields: Record<string, CheckoutFieldValue>;
};

export function SePayCheckoutForm({
  orderInvoiceNumber,
  orderAmount,
  orderDescription,
  successPath,
  errorPath,
  cancelPath,
  paymentMethod = "BANK_TRANSFER",
  currency = "VND",
  autoStart = false,
}: SePayCheckoutFormProps) {
  const [checkout, setCheckout] = useState<CheckoutResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  async function createCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/sepay/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_invoice_number: orderInvoiceNumber,
          order_amount: orderAmount,
          order_description: orderDescription,
          payment_method: paymentMethod,
          currency,
          success_path: successPath,
          error_path: errorPath,
          cancel_path: cancelPath,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Failed to create checkout");
      }

      const body = await res.json();
      setCheckout(body);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (autoStart && !checkout && !loading && !error) {
      void createCheckout();
      return;
    }

    if (checkout && formRef.current) {
      formRef.current.submit();
    }
  }, [autoStart, checkout, error, loading]);

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-500/20 bg-rose-500/8 p-4 text-rose-100">
        Lỗi: {error}
      </div>
    );
  }

  if (!checkout) {
    return (
      <div className="space-y-3">
        <div className="grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200 sm:grid-cols-2">
          <div>
            <p className="text-slate-400">Mã đơn hàng</p>
            <p className="mt-1 font-medium text-white">{orderInvoiceNumber}</p>
          </div>
          <div>
            <p className="text-slate-400">Số tiền</p>
            <p className="mt-1 font-medium text-white">{orderAmount.toLocaleString("vi-VN")} {currency}</p>
          </div>
        </div>

        <button
          onClick={createCheckout}
          className="inline-flex w-full items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
          disabled={loading}
        >
          {loading ? "Đang tạo đơn..." : "Thanh toán ngay qua SePay"}
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} action={checkout.checkoutUrl} method="POST" className="space-y-3">
      {Object.entries(checkout.fields)
        .filter(([, value]) => value !== undefined && value !== null && value !== "")
        .map(([name, value]) => (
          <input key={name} type="hidden" name={name} value={String(value)} />
      ))}
      <button type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">
        Chuyển sang SePay
      </button>
    </form>
  );
}
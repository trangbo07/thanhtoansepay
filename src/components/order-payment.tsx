"use client";

import Image from "next/image";
import { useState } from "react";
import { SepayEnvBanner } from "@/components/sepay-env-banner";
import { SePayCheckoutForm } from "@/components/sepay-checkout-form";
import { VietQrPayment } from "@/components/vietqr-payment";
import { PAYMENT_GATEWAYS, type PaymentGateway } from "@/lib/payment-config";
import { PRODUCT_IMAGES } from "@/lib/product-images";

type OrderPaymentProps = {
  invoice: string;
  amount: number;
  productName: string;
  description: string;
  successUrl: string;
  errorPath: string;
  cancelPath: string;
};

export function OrderPayment({
  invoice,
  amount,
  productName,
  description,
  successUrl,
  errorPath,
  cancelPath,
}: OrderPaymentProps) {
  const [gateway, setGateway] = useState<PaymentGateway | null>(null);
  const orderAmount = amount > 0 ? amount : 10000;

  if (gateway === "vietqr") {
    return (
      <VietQrPayment
        invoice={invoice}
        amount={orderAmount}
        productName={productName}
        description={description}
        successUrl={successUrl}
        onBack={() => setGateway(null)}
      />
    );
  }

  if (gateway === "sepay") {
    return (
      <div className="space-y-4">
        <SepayEnvBanner />
        <SePayCheckoutForm
          orderInvoiceNumber={invoice}
          orderAmount={orderAmount}
          orderDescription={description}
          successPath={successUrl}
          errorPath={errorPath}
          cancelPath={cancelPath}
          paymentMethod="BANK_TRANSFER"
          autoStart={false}
        />
        <button
          type="button"
          onClick={() => setGateway(null)}
          className="inline-flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          ← Chọn cổng thanh toán khác
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-slate-700">Chọn cổng thanh toán</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {PAYMENT_GATEWAYS.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setGateway(g.id)}
            className="flex flex-col items-start rounded-xl border-2 border-slate-200 bg-white p-4 text-left transition hover:border-[#1d6fd8] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#1d6fd8]/30"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-slate-50">
              {g.id === "sepay" ? (
                <Image
                  src={PRODUCT_IMAGES.sepayIcon}
                  alt="SePay"
                  width={40}
                  height={40}
                  className="object-contain"
                  unoptimized
                />
              ) : (
                <span className="text-lg font-bold text-emerald-700">QR</span>
              )}
            </div>
            <span className="font-semibold text-slate-900">{g.title}</span>
            <span className="mt-1 text-xs leading-relaxed text-slate-500">{g.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

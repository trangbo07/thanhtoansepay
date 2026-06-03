"use client";

import { SePayCheckoutForm } from "@/components/sepay-checkout-form";

type OrderPaymentProps = {
  invoice: string;
  amount: number;
  description: string;
  successUrl: string;
  errorPath: string;
  cancelPath: string;
  autoStart?: boolean;
};

export function OrderPayment({
  invoice,
  amount,
  description,
  successUrl,
  errorPath,
  cancelPath,
  autoStart = false,
}: OrderPaymentProps) {
  const orderAmount = amount > 0 ? amount : 10000;

  return (
    <SePayCheckoutForm
      orderInvoiceNumber={invoice}
      orderAmount={orderAmount}
      orderDescription={description}
      successPath={successUrl}
      errorPath={errorPath}
      cancelPath={cancelPath}
      paymentMethod="BANK_TRANSFER"
      autoStart={autoStart}
    />
  );
}

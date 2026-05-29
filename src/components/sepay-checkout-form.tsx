import { SePayPgClient } from "sepay-pg-node";

type SePayCheckoutFormProps = {
  orderInvoiceNumber: string;
  orderAmount: number;
  orderDescription: string;
  successPath: string;
  errorPath: string;
  cancelPath: string;
  paymentMethod?: "BANK_TRANSFER" | "NAPAS_BANK_TRANSFER";
  currency?: string;
  customerId?: string;
  customData?: string;
};

function resolveSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

function createAbsoluteUrl(pathname: string) {
  return new URL(pathname, resolveSiteUrl()).toString();
}

export function SePayCheckoutForm({
  orderInvoiceNumber,
  orderAmount,
  orderDescription,
  successPath,
  errorPath,
  cancelPath,
  paymentMethod = "BANK_TRANSFER",
  currency = "VND",
  customerId,
  customData,
}: SePayCheckoutFormProps) {
  const merchantId = process.env.SEPAY_MERCHANT_ID;
  const secretKey = process.env.SEPAY_SECRET_KEY;
  const sepayEnv = process.env.SEPAY_ENV === "production" ? "production" : "sandbox";

  if (!merchantId || !secretKey) {
    return (
      <div className="rounded-[2rem] border border-amber-400/20 bg-amber-400/10 p-6 text-amber-50">
        <p className="text-sm uppercase tracking-[0.25em] text-amber-100/80">Cấu hình còn thiếu</p>
        <p className="mt-3 text-sm leading-7 text-amber-50/90">
          Hãy tạo <span className="font-semibold">.env.local</span> với <span className="font-semibold">SEPAY_MERCHANT_ID</span>,
          <span className="font-semibold"> SEPAY_SECRET_KEY</span> và <span className="font-semibold">NEXT_PUBLIC_SITE_URL</span>.
        </p>
        <p className="mt-3 text-sm leading-7 text-amber-50/80">
          IPN phải trỏ đến URL public như <span className="font-semibold">/api/sepay/ipn</span>, còn <span className="font-semibold">localhost</span>
          chỉ dùng cho success/cancel khi test local hoặc khi đi qua tunnel như ngrok.
        </p>
      </div>
    );
  }

  const client = new SePayPgClient({
    env: sepayEnv,
    merchant_id: merchantId,
    secret_key: secretKey,
  });

  const checkoutUrl = client.checkout.initCheckoutUrl();
  const checkoutFields = client.checkout.initOneTimePaymentFields({
    operation: "PURCHASE",
    payment_method: paymentMethod,
    order_invoice_number: orderInvoiceNumber,
    order_amount: orderAmount,
    currency,
    order_description: orderDescription,
    customer_id: customerId,
    success_url: createAbsoluteUrl(successPath),
    error_url: createAbsoluteUrl(errorPath),
    cancel_url: createAbsoluteUrl(cancelPath),
    custom_data: customData,
  });

  return (
    <form action={checkoutUrl} method="POST" className="space-y-5">
      <div className="grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200 sm:grid-cols-2">
        <div>
          <p className="text-slate-400">Mã đơn hàng</p>
          <p className="mt-1 font-medium text-white">{orderInvoiceNumber}</p>
        </div>
        <div>
          <p className="text-slate-400">Số tiền</p>
          <p className="mt-1 font-medium text-white">
            {orderAmount.toLocaleString("vi-VN")} {currency}
          </p>
        </div>
        <div>
          <p className="text-slate-400">Phương thức</p>
          <p className="mt-1 font-medium text-white">{paymentMethod}</p>
        </div>
        <div>
          <p className="text-slate-400">Môi trường</p>
          <p className="mt-1 font-medium text-white">{sepayEnv}</p>
        </div>
      </div>

      {Object.entries(checkoutFields).map(([field, value]) => (
        <input key={field} type="hidden" name={field} value={String(value)} />
      ))}

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
      >
        Thanh toán ngay qua SePay
      </button>
    </form>
  );
}
export function buildInvoiceNumber(orderCode: string, date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const suffix = orderCode.replace(/[^A-Z0-9]/gi, "").slice(-6).toUpperCase();
  return `HD${y}${m}${d}-${suffix}`;
}

export function buildInvoiceUrl(
  orderCode: string,
  params: {
    amount: number;
    description: string;
    product?: string;
    status?: "paid" | "pending";
  },
) {
  const search = new URLSearchParams({
    amount: String(params.amount),
    description: params.description,
    product: params.product ?? params.description,
    status: params.status ?? "paid",
  });
  return `/order/${orderCode}/invoice?${search.toString()}`;
}

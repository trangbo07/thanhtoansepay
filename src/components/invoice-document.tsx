import { formatCurrency, formatDateShort, formatDateVi, formatPrice } from "@/lib/format";
import { SITE, getProductByInvoice } from "@/lib/products";

export type InvoiceData = {
  invoiceNumber: string;
  orderCode: string;
  productName: string;
  description: string;
  amount: number;
  customerName?: string;
  customerEmail?: string;
  paidAt?: Date;
  status: "paid" | "pending";
};

function vatFromGross(gross: number) {
  const net = Math.round(gross / 1.08);
  const vat = gross - net;
  return { net, vat };
}

export function InvoiceDocument({ data }: { data: InvoiceData }) {
  const issuedAt = data.paidAt ?? new Date();
  const { net, vat } = vatFromGross(data.amount);
  const product = getProductByInvoice(data.orderCode);
  const unit = "Gói";
  const qty = 1;

  return (
    <div className="invoice-sheet mx-auto max-w-[820px] overflow-hidden rounded-sm border border-slate-200 bg-white shadow-xl print:shadow-none">
      {/* Header band */}
      <div className="border-b-4 border-[#1d6fd8] bg-gradient-to-r from-slate-50 to-white px-8 py-6">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#1d6fd8] text-lg font-black text-white">
                SP
              </div>
              <div>
                <h1 className="text-xl font-bold uppercase tracking-wide text-[#1d6fd8]">
                  {SITE.name}
                </h1>
                <p className="text-xs text-slate-600">{SITE.tagline}</p>
              </div>
            </div>
            <div className="mt-4 space-y-0.5 text-xs text-slate-600">
              <p>
                <span className="font-semibold text-slate-800">Địa chỉ:</span> {SITE.address}
              </p>
              <p>
                <span className="font-semibold text-slate-800">MST:</span> {SITE.taxCode} ·{" "}
                <span className="font-semibold text-slate-800">Email:</span> {SITE.email}
              </p>
              <p>
                <span className="font-semibold text-slate-800">Hotline:</span> {SITE.phone}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-2xl font-black uppercase tracking-widest text-slate-800">
              Hóa đơn
            </p>
            <p className="text-sm font-medium text-slate-500">Bán hàng / Sales Invoice</p>
            <div className="mt-3 inline-block rounded border border-slate-200 bg-white px-4 py-2 text-left text-xs">
              <p>
                <span className="text-slate-500">Số HĐ:</span>{" "}
                <span className="font-mono font-bold text-slate-900">{data.invoiceNumber}</span>
              </p>
              <p className="mt-1">
                <span className="text-slate-500">Ngày lập:</span>{" "}
                <span className="font-semibold">{formatDateShort(issuedAt)}</span>
              </p>
              <p className="mt-1">
                <span className="text-slate-500">Mã đơn:</span>{" "}
                <span className="font-mono font-semibold">{data.orderCode}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative px-8 py-6">
        {data.status === "paid" ? (
          <div
            className="pointer-events-none absolute right-8 top-6 rotate-[-12deg] rounded-lg border-4 border-emerald-600 px-6 py-2 text-center font-black uppercase tracking-widest text-emerald-600 opacity-80"
            aria-hidden
          >
            Đã thanh toán
          </div>
        ) : null}

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-[#1d6fd8]">
              Người mua / Buyer
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-900">
              {data.customerName ?? "Khách hàng lẻ"}
            </p>
            <p className="mt-1 text-xs text-slate-600">
              {data.customerEmail ?? "—"}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-[#1d6fd8]">
              Thanh toán / Payment
            </p>
            <p className="mt-2 text-sm text-slate-700">
              Cổng: <span className="font-semibold">SePay</span>
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Thời gian: {formatDateVi(issuedAt)}
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Trạng thái:{" "}
              <span
                className={
                  data.status === "paid"
                    ? "font-bold text-emerald-700"
                    : "font-bold text-amber-700"
                }
              >
                {data.status === "paid" ? "Đã thanh toán" : "Chờ thanh toán"}
              </span>
            </p>
          </div>
        </div>

        <table className="mt-6 w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#1d6fd8] text-left text-xs font-bold uppercase tracking-wide text-white">
              <th className="border border-[#1558b0] px-3 py-2.5">STT</th>
              <th className="border border-[#1558b0] px-3 py-2.5">Tên hàng hóa, dịch vụ</th>
              <th className="border border-[#1558b0] px-3 py-2.5 text-center">ĐVT</th>
              <th className="border border-[#1558b0] px-3 py-2.5 text-center">SL</th>
              <th className="border border-[#1558b0] px-3 py-2.5 text-right">Đơn giá</th>
              <th className="border border-[#1558b0] px-3 py-2.5 text-right">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-slate-800">
              <td className="border border-slate-200 px-3 py-3 text-center">1</td>
              <td className="border border-slate-200 px-3 py-3">
                <p className="font-semibold">{data.productName}</p>
                <p className="mt-1 text-xs text-slate-500">{data.description}</p>
                {product ? (
                  <p className="mt-1 text-xs text-slate-400">SKU: {product.id}</p>
                ) : null}
              </td>
              <td className="border border-slate-200 px-3 py-3 text-center">{unit}</td>
              <td className="border border-slate-200 px-3 py-3 text-center">{qty}</td>
              <td className="border border-slate-200 px-3 py-3 text-right font-medium">
                {formatCurrency(net)}đ
              </td>
              <td className="border border-slate-200 px-3 py-3 text-right font-semibold">
                {formatCurrency(net)}đ
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-6 flex flex-wrap justify-end gap-8">
          <div className="w-full max-w-xs space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Cộng tiền hàng (chưa VAT)</span>
              <span className="font-medium">{formatCurrency(net)}đ</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Thuế GTGT (8%)</span>
              <span className="font-medium">{formatCurrency(vat)}đ</span>
            </div>
            <div className="flex justify-between border-t-2 border-[#1d6fd8] pt-2 text-base font-bold text-slate-900">
              <span>Tổng thanh toán</span>
              <span className="text-rose-600">{formatPrice(data.amount)}</span>
            </div>
            <p className="text-xs italic text-slate-500">
              Bằng chữ: {amountInWords(data.amount)} đồng.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 border-t border-dashed border-slate-200 pt-8 sm:grid-cols-2">
          <div className="text-center text-xs text-slate-500">
            <p className="font-semibold text-slate-700">Người mua hàng</p>
            <p className="mt-1">(Ký, ghi rõ họ tên)</p>
            <div className="mt-16 border-t border-slate-300" />
          </div>
          <div className="text-center text-xs text-slate-500">
            <p className="font-semibold text-slate-700">Người bán hàng</p>
            <p className="mt-1">(Ký, đóng dấu)</p>
            <p className="mt-12 font-semibold text-[#1d6fd8]">{SITE.name}</p>
          </div>
        </div>

        <p className="mt-8 text-center text-[10px] leading-relaxed text-slate-400">
          Hóa đơn điện tử được phát hành tự động sau khi giao dịch SePay thành công. Mã tra cứu:{" "}
          <span className="font-mono text-slate-600">{data.invoiceNumber}</span>
        </p>
      </div>
    </div>
  );
}

/** Số tiền bằng chữ (đơn giản, đủ dùng cho hóa đơn demo) */
function amountInWords(n: number): string {
  if (n <= 0) return "Không";
  const units = ["", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
  const scales = ["", "nghìn", "triệu", "tỷ"];

  function readTriple(num: number, showZeroHundred: boolean): string {
    const h = Math.floor(num / 100);
    const t = Math.floor((num % 100) / 10);
    const u = num % 10;
    let s = "";
    if (h > 0) s += `${units[h]} trăm `;
    else if (showZeroHundred) s += "không trăm ";
    if (t > 1) s += `${units[t]} mươi `;
    else if (t === 1) s += "mười ";
    else if (t === 0 && u > 0 && (h > 0 || showZeroHundred)) s += "lẻ ";
    if (t === 1 && u === 5) s += "lăm ";
    else if (u > 0) s += `${units[u]} `;
    return s.trim();
  }

  let remaining = n;
  let scaleIdx = 0;
  const parts: string[] = [];

  while (remaining > 0) {
    const chunk = remaining % 1000;
    if (chunk > 0) {
      const text = readTriple(chunk, remaining >= 1000);
      parts.unshift(`${text} ${scales[scaleIdx]}`.trim());
    }
    remaining = Math.floor(remaining / 1000);
    scaleIdx += 1;
  }

  const result = parts.join(" ").replace(/\s+/g, " ").trim();
  return result.charAt(0).toUpperCase() + result.slice(1);
}

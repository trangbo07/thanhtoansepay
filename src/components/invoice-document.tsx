import Image from "next/image";
import type { ReactNode } from "react";
import { amountInWords } from "@/lib/amount-words";
import { formatCurrency } from "@/lib/format";
import {
  buildInvoiceQrUrl,
  buildInvoiceSerialNo,
  buildInvoiceSeries,
  buildLookupCode,
  formatInvoiceDateLong,
  INVOICE_FORM,
  INVOICE_ISSUER_LINE,
} from "@/lib/invoice";
import { PRODUCT_IMAGES } from "@/lib/product-images";
import { resolveProductByOrderCode } from "@/lib/order-code";
import { SITE } from "@/lib/products";

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
  paymentMethod?: string;
};

function vatFromGross(gross: number) {
  const net = Math.round(gross / 1.08);
  const vat = gross - net;
  return { net, vat };
}

function LabelLine({
  label,
  value,
  bold,
}: {
  label: string;
  value: ReactNode;
  bold?: boolean;
}) {
  return (
    <p className="leading-relaxed text-black">
      <span>{label} </span>
      <span className={bold ? "font-bold uppercase" : ""}>{value}</span>
    </p>
  );
}

const thClass =
  "border border-black px-1.5 py-1 text-center text-[11px] font-normal text-black";
const tdClass = "border border-black px-1.5 py-1.5 text-[12px] text-black";

export function InvoiceDocument({ data }: { data: InvoiceData }) {
  const issuedAt = data.paidAt ?? new Date();
  const { net, vat } = vatFromGross(data.amount);
  const total = data.amount;
  const product = resolveProductByOrderCode(data.orderCode);
  const lookupCode = buildLookupCode(data.invoiceNumber, data.orderCode);
  const qrUrl = buildInvoiceQrUrl(lookupCode);
  const paymentLabel =
    data.paymentMethod ??
    (data.status === "paid" ? "TM/CK" : "Chưa thanh toán");
  const invoiceSeries = buildInvoiceSeries(issuedAt);
  const invoiceSerial = buildInvoiceSerialNo(data.invoiceNumber);
  const isPaid = data.status === "paid";
  const signedDate = formatInvoiceDateLong(issuedAt).replace("Ngày ", "");

  return (
    <div className="invoice-sheet mx-auto max-w-[210mm] bg-white font-sans text-[13px] leading-normal text-black antialiased shadow-lg print:max-w-none print:shadow-none">
      <div className="border border-black p-5 print:p-4">
        {/* Hàng đầu: logo | tiêu đề | mẫu số */}
        <div className="flex gap-4 border-b border-black pb-4">
          <div className="w-[28%] shrink-0">
            <div className="relative h-14 w-full max-w-[140px]">
              <Image
                src={PRODUCT_IMAGES.sepayIcon}
                alt={SITE.name}
                fill
                className="object-contain object-left grayscale"
                unoptimized
              />
            </div>
            <p className="mt-1 text-[11px] text-neutral-600">{SITE.tagline}</p>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <h1 className="text-xl font-bold uppercase tracking-wide text-black">
              Hóa đơn bán hàng
            </h1>
            <p className="mt-0.5 text-[12px] text-neutral-700">
              (Bản thể hiện của hóa đơn điện tử)
            </p>
            <p className="mt-2 font-medium text-black">{formatInvoiceDateLong(issuedAt)}</p>
          </div>

          <div className="w-[26%] shrink-0 space-y-0.5 text-[12px]">
            <p>
              <span className="text-neutral-600">Mẫu số</span> (Form):{" "}
              <span className="font-semibold">{INVOICE_FORM.templateCode}</span>
            </p>
            <p>
              <span className="text-neutral-600">Ký hiệu</span> (Serial):{" "}
              <span className="font-semibold">{invoiceSeries}</span>
            </p>
            <p>
              <span className="text-neutral-600">Số</span> (No.):{" "}
              <span className="font-semibold">{invoiceSerial}</span>
            </p>
          </div>
        </div>

        {/* Người bán + QR */}
        <div className="mt-3 flex gap-4 border-b border-black pb-3">
          <div className="min-w-0 flex-1 space-y-0.5">
            <LabelLine label="Đơn vị bán:" value={SITE.legalName} bold />
            <LabelLine label="Mã số thuế:" value={SITE.taxCode} />
            <LabelLine label="Địa chỉ:" value={SITE.address} />
            <LabelLine label="Điện thoại:" value={SITE.phone} />
            <LabelLine label="Số tài khoản:" value={SITE.bankAccount} />
          </div>
          <div className="shrink-0 border border-black p-1">
            <Image
              src={qrUrl}
              alt="Mã QR tra cứu"
              width={120}
              height={120}
              className="block"
              unoptimized
            />
          </div>
        </div>

        {/* Người mua */}
        <div className="mt-3 space-y-0.5 border-b border-black pb-3">
          <LabelLine
            label="Họ tên người mua hàng:"
            value={data.customerName ?? "Khách hàng lẻ"}
          />
          <LabelLine label="Tên đơn vị:" value={data.customerName ? "—" : "Khách lẻ"} />
          <LabelLine label="Mã số thuế:" value="—" />
          <LabelLine label="Địa chỉ:" value="—" />
          <LabelLine label="Hình thức thanh toán:" value={paymentLabel} />
          <LabelLine label="Số tài khoản:" value="—" />
        </div>

        {/* Bảng hàng hóa */}
        <table className="mt-3 w-full border-collapse">
          <thead>
            <tr>
              <th className={`${thClass} w-8`}>
                STT
                <br />
                <span className="text-[10px] font-normal">(A)</span>
              </th>
              <th className={`${thClass} min-w-[200px] text-left`}>
                Tên hàng hóa, dịch vụ
                <br />
                <span className="text-[10px] font-normal">(B)</span>
              </th>
              <th className={`${thClass} w-14`}>
                Đơn vị
                <br />
                tính
                <br />
                <span className="text-[10px] font-normal">(C)</span>
              </th>
              <th className={`${thClass} w-12`}>
                Số
                <br />
                lượng
                <br />
                <span className="text-[10px] font-normal">(1)</span>
              </th>
              <th className={`${thClass} w-24`}>
                Đơn giá
                <br />
                <span className="text-[10px] font-normal">(2)</span>
              </th>
              <th className={`${thClass} w-28`}>
                Thành tiền
                <br />
                <span className="text-[10px] font-normal">(3=1×2)</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={`${tdClass} text-center align-top`}>1</td>
              <td className={`${tdClass} align-top`}>
                <span className="font-semibold">{data.productName}</span>
                {data.description !== data.productName ? (
                  <span className="block text-[11px] text-neutral-700">{data.description}</span>
                ) : null}
                {product ? (
                  <span className="mt-0.5 block text-[10px] text-neutral-500">
                    Mã: {product.id}
                  </span>
                ) : null}
              </td>
              <td className={`${tdClass} text-center align-top`}>Gói</td>
              <td className={`${tdClass} text-center align-top`}>1</td>
              <td className={`${tdClass} text-right align-top tabular-nums`}>
                {formatCurrency(net)}
              </td>
              <td className={`${tdClass} text-right align-top font-semibold tabular-nums`}>
                {formatCurrency(net)}
              </td>
            </tr>
            {/* Hàng trống giống mẫu MISA */}
            {Array.from({ length: 4 }).map((_, i) => (
              <tr key={i}>
                <td className={`${tdClass} h-7 text-center`}>&nbsp;</td>
                <td className={tdClass}>&nbsp;</td>
                <td className={tdClass}>&nbsp;</td>
                <td className={tdClass}>&nbsp;</td>
                <td className={tdClass}>&nbsp;</td>
                <td className={tdClass}>&nbsp;</td>
              </tr>
            ))}
            <tr>
              <td
                colSpan={5}
                className="border border-black px-2 py-1.5 text-right text-[12px] font-semibold"
              >
                Cộng tiền bán hàng hóa, dịch vụ
              </td>
              <td className="border border-black px-2 py-1.5 text-right text-[12px] font-bold tabular-nums">
                {formatCurrency(net)}
              </td>
            </tr>
            <tr>
              <td
                colSpan={6}
                className="border border-black px-2 py-1.5 text-[12px]"
              >
                <span className="font-semibold">Số tiền viết bằng chữ: </span>
                {amountInWords(total)} đồng.
              </td>
            </tr>
          </tbody>
        </table>

        <p className="mt-1 text-[10px] text-neutral-600">
          Thuế GTGT (8%): {formatCurrency(vat)} đ — Tổng thanh toán (gồm thuế):{" "}
          <span className="font-bold">{formatCurrency(total)} đ</span>
        </p>

        {/* Chữ ký */}
        <div className="mt-6 grid grid-cols-2 gap-6">
          <div className="text-center">
            <p className="font-bold text-black">Người mua hàng</p>
            <p className="text-[12px] text-neutral-600">(Ký, ghi rõ họ tên)</p>
            <div className="mt-16" />
          </div>

          <div className="relative text-center">
            <p className="font-bold text-black">Người bán hàng</p>
            <p className="text-[12px] text-neutral-600">(Ký, ghi rõ họ tên, đóng dấu)</p>

            {isPaid ? (
              <div className="absolute left-1/2 top-10 w-[200px] -translate-x-1/2 border-2 border-black bg-white px-3 py-2 text-left shadow-sm">
                <p className="flex items-center gap-1 text-[11px] font-bold text-black">
                  <span className="text-base leading-none">✓</span> Chữ ký số hợp lệ
                </p>
                <p className="mt-1 text-[10px] text-black">Ký bởi: {SITE.legalName}</p>
                <p className="text-[10px] text-black">Ký ngày: {signedDate}</p>
              </div>
            ) : (
              <div className="mt-16" />
            )}
          </div>
        </div>

        {/* Footer tra cứu */}
        <div className="mt-8 border-t border-black pt-3 text-center text-[11px] leading-relaxed text-black">
          <p>
            <span className="font-semibold">Mã tra cứu hóa đơn: </span>
            <span className="font-mono font-bold tracking-wider">{lookupCode}</span>
          </p>
          <p className="mt-1">
            Tra cứu tại Website:{" "}
            <span className="underline">{SITE.lookupWebsite}</span>
          </p>
          <p className="mt-2 text-[11px] text-neutral-600">
            (Tổ chức cung ứng dịch vụ HĐĐT không có trách nhiệm giải quyết tranh chấp hóa đơn
            nếu người mua không tra cứu và đối chiếu.)
          </p>
          <p className="mt-2 text-[10px] text-neutral-800">{INVOICE_ISSUER_LINE}</p>
          <p className="mt-0.5 text-[10px] text-neutral-600">
            Mã đơn: {data.orderCode} · Số HĐ: {data.invoiceNumber}
          </p>
        </div>
      </div>
    </div>
  );
}

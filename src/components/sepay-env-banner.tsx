import { getSepayEnvironment } from "@/lib/sepay-config";

export function SepayEnvBanner() {
  const env = getSepayEnvironment();

  if (env === "production") {
    return null;
  }

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
      <p className="font-semibold">Đang dùng Sandbox (test) — chưa thu tiền thật</p>
      <p className="mt-1 leading-relaxed text-amber-900/90">
        Để thanh toán thật: (1) Vào{" "}
        <a
          href="https://my.sepay.vn"
          className="font-medium text-[#1d6fd8] underline"
          target="_blank"
          rel="noreferrer"
        >
          my.sepay.vn
        </a>{" "}
        → liên kết tài khoản ngân hàng → <strong>Chuyển sang Production</strong> → lấy Merchant ID &
        Secret mới. (2) Sửa file <code className="rounded bg-amber-100 px-1">.env</code>:{" "}
        <code className="rounded bg-amber-100 px-1">SEPAY_ENV=production</code> và cập nhật key production.
        (3) Deploy domain public (không dùng localhost) cho callback & IPN. (4) Restart server (
        <code className="rounded bg-amber-100 px-1">npm run build && npm start</code>).
      </p>
    </div>
  );
}

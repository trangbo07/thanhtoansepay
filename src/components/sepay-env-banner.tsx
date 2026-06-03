import { getSepayEnvironment } from "@/lib/sepay-config";
import { getSepayIpnUrl, SEPAY_DASHBOARD_IPN } from "@/lib/sepay-site";

export function SepayEnvBanner() {
  const env = getSepayEnvironment();
  const ipnUrl = getSepayIpnUrl();

  if (env === "production") {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
        <p className="font-semibold text-slate-900">SePay Production</p>
        <p className="mt-1 text-xs leading-relaxed">
          IPN:{" "}
          <code className="rounded bg-white px-1 py-0.5 text-[11px]">{ipnUrl}</code>
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
      <p className="font-semibold">Đang dùng Sandbox (test)</p>
      <p className="mt-1 leading-relaxed text-amber-900/90">
        Production: đặt <code className="rounded bg-amber-100 px-1">SEPAY_ENV=production</code> trên
        Vercel và IPN URL:{" "}
        <code className="rounded bg-amber-100 px-1 text-[11px]">{SEPAY_DASHBOARD_IPN.ipnUrl}</code>
      </p>
    </div>
  );
}

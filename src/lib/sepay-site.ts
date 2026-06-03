/** Domain production mặc định (Vercel) */
export const DEFAULT_SITE_URL = "https://thanhtoansepay.vercel.app";

export function normalizeSiteUrl(url: string) {
  return url.replace(/\/$/, "");
}

export function getPublicSiteUrl(request?: Request) {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return normalizeSiteUrl(fromEnv);
  }

  if (request) {
    const forwardedProto = request.headers.get("x-forwarded-proto");
    const forwardedHost =
      request.headers.get("x-forwarded-host") ?? request.headers.get("host");

    if (forwardedHost) {
      return normalizeSiteUrl(`${forwardedProto ?? "https"}://${forwardedHost}`);
    }
  }

  return DEFAULT_SITE_URL;
}

export function getSepayIpnPath() {
  return "/api/sepay/ipn";
}

export function getSepayIpnUrl(request?: Request) {
  return `${getPublicSiteUrl(request)}${getSepayIpnPath()}`;
}

/** Giá trị copy vào my.sepay.vn → Cổng thanh toán → Cấu hình IPN */
export const SEPAY_DASHBOARD_IPN = {
  ipnUrl: `${DEFAULT_SITE_URL}${getSepayIpnPath()}`,
  contentType: "application/json",
  authType: "Secret Key (khuyến nghị) — header X-Secret-Key",
  status: "Bật (Kích hoạt IPN)",
} as const;

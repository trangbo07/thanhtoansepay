export type SepayEnvironment = "sandbox" | "production";

export function getSepayEnvironment(): SepayEnvironment {
  return process.env.SEPAY_ENV === "production" ? "production" : "sandbox";
}

export function isSepayProduction() {
  return getSepayEnvironment() === "production";
}

export const SEPAY_CHECKOUT_URLS = {
  sandbox: "https://pay-sandbox.sepay.vn",
  production: "https://pay.sepay.vn",
} as const;

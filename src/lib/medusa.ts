// ============================================================
// GoNuts Bites — Medusa JS SDK Client (singleton)
// Used in both Server Components (SSR fetch) and Client Components (cart ops)
// ============================================================

import Medusa from "@medusajs/js-sdk";

const baseUrl =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";

const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;

export const sdk = new Medusa({
  baseUrl,
  debug: process.env.NODE_ENV === "development",
  publishableKey,
  // Force fresh fetch on every request in dev, bypass Next.js cache in prod
  fetchOptions: {
    cache: "no-store",
  },
});


// Convenience: region code untuk Indonesia
export const INDONESIA_CURRENCY_CODE = "idr";
export const GONUTS_PRODUCT_HANDLE = "gado-gado-roll";

import type { Package } from "@/src/core/booking/package";
import type { PricingBreakdown } from "@/src/core/booking/booking";

/** Quebec sales tax rates (applied on subtotal, not compounded). */
const GST_RATE = 0.05; // TPS
const QST_RATE = 0.09975; // TVQ

export function computeSubtotal(pkg: Package, hours: number): number {
  return pkg.pricing.kind === "flat"
    ? pkg.pricing.flatPrice
    : pkg.pricing.hourlyRate * hours;
}

export function computePricing(pkg: Package, hours: number): PricingBreakdown {
  const subtotal = computeSubtotal(pkg, hours);
  const gst = round2(subtotal * GST_RATE);
  const qst = round2(subtotal * QST_RATE);
  const total = round2(subtotal + gst + qst);
  return { subtotal: round2(subtotal), gst, qst, total };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Locale-aware currency formatter (CAD). */
export function formatCAD(amount: number, locale: string): string {
  return new Intl.NumberFormat(locale === "fr" ? "fr-CA" : "en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

import type { Package } from "@/src/core/booking/package";
import type { PricingBreakdown } from "@/src/core/booking/booking";
import type { BookingPricingCents } from "@/src/core/booking/persisted-booking";

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

/**
 * Cents-based pricing for persistence/Stripe. **Always** use this on the server
 * — float dollars are display-only.
 */
export function computePricingCents(
  pkg: Package,
  hours: number,
): BookingPricingCents {
  const subtotalCents = Math.round(computeSubtotal(pkg, hours) * 100);
  const gstCents = Math.round(subtotalCents * GST_RATE);
  const qstCents = Math.round(subtotalCents * QST_RATE);
  const totalCents = subtotalCents + gstCents + qstCents;
  return {
    currency: "CAD",
    subtotalCents,
    gstCents,
    qstCents,
    totalCents,
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Locale-aware currency formatter.
 * Always shows the explicit "CAD" / "$ CA" marker so the currency is
 * unambiguous (Canadian dollars, not USD).
 */
export function formatCAD(amount: number, locale: string): string {
  if (locale === "fr") {
    const n = new Intl.NumberFormat("fr-CA", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
    return `${n} $ CA`;
  }
  // en-US locale forces the "CA$" prefix even for CAD.
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD",
    currencyDisplay: "symbol",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

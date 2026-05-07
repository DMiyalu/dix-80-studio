import type { Package } from "./package";

/** A category groups packages (e.g. "studio", "wedding", "portrait"). */
export type BookingCategoryId = "studio" | string;

/** Workflow step inside the booking modal. */
export type BookingStep = "package" | "datetime" | "contact";

export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneCountry: string; // ISO-2 (e.g. "CA")
  phone: string; // E.164-formatted, e.g. "+15145551234"
  message: string;
  terms: boolean;
}

export interface PricingBreakdown {
  subtotal: number;
  gst: number;
  qst: number;
  total: number;
}

/** Snapshot of a complete booking selection (still client-side, not persisted). */
export interface BookingDraft {
  category: BookingCategoryId;
  package: Package;
  durationHours: number;
  date: string; // ISO YYYY-MM-DD
  time: string; // HH:mm
  contact: ContactInfo;
  pricing: PricingBreakdown;
}

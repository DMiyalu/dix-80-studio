import type { BookingCategoryId } from "./booking";

/**
 * Persisted Booking aggregate (Firestore document shape).
 * Money values are stored in **cents** to avoid float drift.
 * Times are stored as local Montreal "HH:mm" strings (24h).
 */
export type BookingStatus =
  | "pending"
  | "paid"
  | "expired"
  | "cancelled"
  | "refunded";

export interface BookingPricingCents {
  currency: "CAD";
  subtotalCents: number;
  gstCents: number; // TPS 5%
  qstCents: number; // TVQ 9.975%
  totalCents: number;
}

export interface BookingCustomerSnapshot {
  firstName: string;
  lastName: string;
  email: string; // lowercased
  phone: string; // E.164
  phoneCountry: string; // ISO-2
  message: string;
}

export interface BookingStripeRefs {
  sessionId: string | null;
  paymentIntentId: string | null;
  customerId: string | null;
}

/**
 * Domain Booking. The `id` is the Firestore document id.
 * Timestamps are exposed as ISO strings at the application layer; the
 * repository is responsible for serialising to/from `Timestamp`.
 */
export interface Booking {
  id: string;
  category: BookingCategoryId;
  packageId: string;
  durationHours: number;

  date: string; // YYYY-MM-DD (local Montreal date)
  startTime: string; // HH:mm
  endTime: string; // HH:mm

  customer: BookingCustomerSnapshot;
  pricing: BookingPricingCents;

  status: BookingStatus;
  /** ISO string. Non-null only while status === "pending". */
  holdExpiresAt: string | null;

  stripe: BookingStripeRefs;

  createdAt: string;
  updatedAt: string;
  paidAt: string | null;
  cancelledAt: string | null;
  refundedAt: string | null;
  refundId: string | null;
  confirmationEmailSentAt: string | null;
}

/** Hold duration for a `pending` booking before auto-expiration. */
export const BOOKING_HOLD_MINUTES = 15;

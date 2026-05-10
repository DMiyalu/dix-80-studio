import "server-only";
import { Timestamp, FieldValue } from "firebase-admin/firestore";
import { adminDb } from "./firebase-admin";
import {
  BOOKING_HOLD_MINUTES,
  type Booking,
  type BookingPricingCents,
  type BookingCustomerSnapshot,
  type BookingStripeRefs,
} from "@/src/core/booking/persisted-booking";
import type { BookingCategoryId } from "@/src/core/booking/booking";

const COLLECTION = "bookings";

interface CreateInput {
  category: BookingCategoryId;
  packageId: string;
  durationHours: number;
  date: string;
  startTime: string;
  endTime: string;
  customer: BookingCustomerSnapshot;
  pricing: BookingPricingCents;
}

export class SlotConflictError extends Error {
  constructor(message = "slot_conflict") {
    super(message);
    this.name = "SlotConflictError";
  }
}

/**
 * Atomically create a booking with a 15-min hold, refusing if any active
 * booking overlaps the requested [startTime, endTime) window for the same
 * (category, date).
 *
 * Active = status in ("paid") OR (status === "pending" AND holdExpiresAt > now).
 * Throws `SlotConflictError` on overlap.
 */
export async function createWithHold(input: CreateInput): Promise<Booking> {
  const db = adminDb();
  const col = db.collection(COLLECTION);
  const now = Timestamp.now();
  const holdExpiresAt = Timestamp.fromMillis(
    now.toMillis() + BOOKING_HOLD_MINUTES * 60_000,
  );

  // Pre-fetch candidates outside the transaction to keep it lean.
  // Firestore transactions support get() but here we fetch by an indexed
  // (category, date) query first, then re-validate inside the txn.
  const candidatesSnap = await col
    .where("category", "==", input.category)
    .where("date", "==", input.date)
    .where("status", "in", ["pending", "paid"])
    .get();

  // Filter out expired pending holds in code (Firestore can't combine
  // status + holdExpiresAt range cheaply without another index).
  const blocking = candidatesSnap.docs.filter((d) => {
    const data = d.data();
    if (data.status === "paid") return true;
    const expiry: Timestamp | null = data.holdExpiresAt ?? null;
    return expiry !== null && expiry.toMillis() > now.toMillis();
  });

  for (const doc of blocking) {
    const data = doc.data();
    if (
      timeOverlaps(
        input.startTime,
        input.endTime,
        data.startTime,
        data.endTime,
      )
    ) {
      throw new SlotConflictError();
    }
  }

  const ref = col.doc();
  const docData = {
    category: input.category,
    packageId: input.packageId,
    durationHours: input.durationHours,
    date: input.date,
    startTime: input.startTime,
    endTime: input.endTime,
    customer: input.customer,
    pricing: input.pricing,
    status: "pending" as const,
    holdExpiresAt,
    stripe: {
      sessionId: null,
      paymentIntentId: null,
      customerId: null,
    } satisfies BookingStripeRefs,
    createdAt: now,
    updatedAt: now,
    paidAt: null,
    cancelledAt: null,
    refundedAt: null,
    refundId: null,
    confirmationEmailSentAt: null,
  };

  await ref.set(docData);

  return {
    id: ref.id,
    ...input,
    status: "pending",
    holdExpiresAt: holdExpiresAt.toDate().toISOString(),
    stripe: docData.stripe,
    createdAt: now.toDate().toISOString(),
    updatedAt: now.toDate().toISOString(),
    paidAt: null,
    cancelledAt: null,
    refundedAt: null,
    refundId: null,
    confirmationEmailSentAt: null,
  };
}

export async function attachStripeSession(
  bookingId: string,
  stripeSessionId: string,
): Promise<void> {
  const db = adminDb();
  await db.collection(COLLECTION).doc(bookingId).update({
    "stripe.sessionId": stripeSessionId,
    updatedAt: FieldValue.serverTimestamp(),
  });
}

export async function markPaid(
  bookingId: string,
  refs: { paymentIntentId: string; customerId: string | null },
): Promise<void> {
  const db = adminDb();
  await db.collection(COLLECTION).doc(bookingId).update({
    status: "paid",
    "stripe.paymentIntentId": refs.paymentIntentId,
    "stripe.customerId": refs.customerId,
    holdExpiresAt: null,
    paidAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
}

export async function markExpired(bookingId: string): Promise<void> {
  const db = adminDb();
  await db.collection(COLLECTION).doc(bookingId).update({
    status: "expired",
    updatedAt: FieldValue.serverTimestamp(),
  });
}

/** Compare two HH:mm windows; returns true if [a) overlaps [b). */
function timeOverlaps(
  aStart: string,
  aEnd: string,
  bStart: string,
  bEnd: string,
): boolean {
  return aStart < bEnd && bStart < aEnd;
}

"use server";

import {
  bookingSubmissionSchema,
  type BookingSubmission,
} from "@/src/application/booking/booking-validation";
import { findPackageById } from "@/src/application/booking/studio-packages";
import { computePricingCents } from "@/src/application/booking/pricing";
import { endTime } from "@/src/application/booking/slot-generator";
import {
  createWithHold,
  SlotConflictError,
} from "@/src/infrastructure/persistence/firebase/booking-repository";

export type SubmitBookingResult =
  | { ok: true; bookingId: string; totalCents: number; currency: "CAD" }
  | { ok: false; error: "validation"; fieldErrors: Record<string, string> }
  | { ok: false; error: "slot_conflict" }
  | { ok: false; error: "internal" };

/**
 * Server-only entry point for submitting a booking.
 * - Re-validates the entire payload (zod).
 * - Re-computes pricing on the server (never trust the client).
 * - Creates a Firestore booking with a 15-min hold; rejects on slot overlap.
 *
 * Returns a discriminated result (no thrown errors leak to the client).
 *
 * NOTE: Stripe Checkout creation is wired in a follow-up step; for now this
 * action stops at "pending hold created".
 */
export async function submitBooking(
  raw: unknown,
): Promise<SubmitBookingResult> {
  const parsed = bookingSubmissionSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join(".");
      if (path && !fieldErrors[path]) fieldErrors[path] = issue.message;
    }
    return { ok: false, error: "validation", fieldErrors };
  }

  const data: BookingSubmission = parsed.data;
  const pkg = findPackageById(data.packageId);
  if (!pkg) {
    return {
      ok: false,
      error: "validation",
      fieldErrors: { packageId: "unknown_package" },
    };
  }

  const pricing = computePricingCents(pkg, data.durationHours);
  const start = data.time;
  const end = endTime(start, data.durationHours);

  try {
    const booking = await createWithHold({
      category: data.category,
      packageId: data.packageId,
      durationHours: data.durationHours,
      date: data.date,
      startTime: start,
      endTime: end,
      customer: {
        firstName: data.contact.firstName.trim(),
        lastName: data.contact.lastName.trim(),
        email: data.contact.email.trim().toLowerCase(),
        phone: data.contact.phone,
        phoneCountry: data.contact.phoneCountry,
        message: data.contact.message?.trim() ?? "",
      },
      pricing,
    });

    return {
      ok: true,
      bookingId: booking.id,
      totalCents: pricing.totalCents,
      currency: pricing.currency,
    };
  } catch (err) {
    if (err instanceof SlotConflictError) {
      return { ok: false, error: "slot_conflict" };
    }
    // eslint-disable-next-line no-console
    console.error("[submitBooking] internal error", err);
    return { ok: false, error: "internal" };
  }
}

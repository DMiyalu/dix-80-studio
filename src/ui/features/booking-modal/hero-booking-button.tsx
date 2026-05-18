"use client";

import { useAppDispatch } from "@/src/infrastructure/store/hooks";
import { bookingActions } from "@/src/infrastructure/store/booking-slice";
import type { BookingCategoryId } from "@/src/core/booking/booking";

/**
 * Glassmorphic "Réserver maintenant" button used on the landing hero AND
 * on every service category hero. Single source of truth for the visual
 * style — only the action varies:
 *   - no `category` prop → opens the category selector
 *   - `category` prop    → opens the modal preset on that category
 */
export function HeroBookingButton({
  category,
  children,
}: {
  category?: BookingCategoryId;
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  return (
    <button
      type="button"
      onClick={() =>
        dispatch(
          category
            ? bookingActions.open({ category })
            : bookingActions.openSelector(),
        )
      }
      className="inline-flex h-14 cursor-pointer items-center justify-center rounded-full border border-white/60 bg-white/10 px-9 text-sm font-medium uppercase tracking-wide text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/20 hover:shadow-lg hover:shadow-white/20"
    >
      {children}
    </button>
  );
}

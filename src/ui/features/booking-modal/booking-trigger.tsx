"use client";

import { useAppDispatch } from "@/src/infrastructure/store/hooks";
import { bookingActions } from "@/src/infrastructure/store/booking-slice";
import { Button } from "@/src/ui/components/button";
import type { ComponentProps } from "react";
import type { BookingCategoryId } from "@/src/core/booking/booking";

/**
 * A button that opens the booking modal for a given category.
 * Drop-in replacement for static CTA links.
 */
export function BookingTrigger({
  category,
  children,
  ...buttonProps
}: {
  category: BookingCategoryId;
  children: React.ReactNode;
} & Omit<ComponentProps<typeof Button>, "onClick" | "children">) {
  const dispatch = useAppDispatch();
  return (
    <Button
      type="button"
      onClick={() => dispatch(bookingActions.open({ category }))}
      {...buttonProps}
    >
      {children}
    </Button>
  );
}

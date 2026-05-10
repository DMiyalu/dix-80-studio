import type { Package } from "@/src/core/booking/package";
import type { BookingCategoryId } from "@/src/core/booking/booking";
import { STUDIO_PACKAGES } from "./studio-packages";

/**
 * Registry of bookable categories.
 *
 * `i18nKey` resolves to:
 *   - `dict.booking.categories.<key>` (modal header)
 *   - `dict.services.items.<key>` (card name + description on selector)
 * `available: false` shows the card but informs the user the category is
 * not yet bookable online (will offer a contact CTA in step-package).
 */
export interface CategoryEntry {
  id: BookingCategoryId;
  i18nKey: string;
  available: boolean;
}

export const BOOKING_CATEGORIES: readonly CategoryEntry[] = [
  { id: "studio", i18nKey: "studio", available: true },
  { id: "wedding", i18nKey: "wedding", available: false },
  { id: "portrait", i18nKey: "portrait", available: false },
  { id: "corporate", i18nKey: "corporate", available: false },
  { id: "sport", i18nKey: "sport", available: false },
  { id: "event", i18nKey: "event", available: false },
  { id: "family", i18nKey: "family", available: false },
] as const;

/** Returns the package catalog for a category, or [] if none defined yet. */
export function getPackagesForCategory(
  id: BookingCategoryId,
): readonly Package[] {
  if (id === "studio") return STUDIO_PACKAGES;
  return [];
}

export function findCategory(id: BookingCategoryId): CategoryEntry | undefined {
  return BOOKING_CATEGORIES.find((c) => c.id === id);
}

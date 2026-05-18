import type { BookingCategoryId } from "@/src/core/booking/booking";

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
  { id: "wedding", i18nKey: "wedding", available: true },
  { id: "portrait", i18nKey: "portrait", available: true },
  { id: "anniversaire", i18nKey: "anniversaire", available: true },
  { id: "grad-series", i18nKey: "grad_series", available: true },
  { id: "corporate", i18nKey: "corporate", available: false },
  { id: "sport", i18nKey: "sport", available: false },
  { id: "event", i18nKey: "event", available: false },
  { id: "family", i18nKey: "family", available: false },
] as const;

export { getPackagesForCategory } from "./packages-registry";

export function findCategory(id: BookingCategoryId): CategoryEntry | undefined {
  return BOOKING_CATEGORIES.find((c) => c.id === id);
}

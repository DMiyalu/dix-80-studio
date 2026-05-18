import type { BookingCategoryId } from "@/src/core/booking/booking";

/**
 * Visual / structural definition of a service category landing page.
 *
 * All textual content (titles, paragraphs, features, FAQ…) lives in the
 * dictionaries under `dict.servicePages.<id>` so non-developers can edit
 * copy without touching code. This object only carries identifiers and
 * asset URLs.
 */
export interface ServiceCategoryDetails {
  /** Stable identifier — also used as URL slug and i18n key. */
  id: BookingCategoryId;
  /** Hero / cover image (wide). */
  heroImage: string;
  /** Portrait image used in the intro section (4/5 aspect). */
  introImage: string;
  /** Gallery images (5 to 8 recommended). */
  gallery: readonly string[];
}

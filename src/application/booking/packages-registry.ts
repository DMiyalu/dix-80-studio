import type { Package } from "@/src/core/booking/package";
import type { BookingCategoryId } from "@/src/core/booking/booking";
import { STUDIO_PACKAGES } from "./studio-packages";
import { WEDDING_PACKAGES } from "./wedding-packages";
import { PORTRAIT_PACKAGES } from "./portrait-packages";
import { ANNIVERSAIRE_PACKAGES } from "./anniversaire-packages";
import { GRAD_SERIES_PACKAGES } from "./grad-series-packages";

/**
 * Single source of truth mapping a category id to its package catalog.
 * All consumers (server validation, UI, summary…) should resolve packages
 * via this registry rather than importing per-category lists directly.
 */
const CATALOG: Record<string, readonly Package[]> = {
  studio: STUDIO_PACKAGES,
  wedding: WEDDING_PACKAGES,
  portrait: PORTRAIT_PACKAGES,
  anniversaire: ANNIVERSAIRE_PACKAGES,
  "grad-series": GRAD_SERIES_PACKAGES,
};

/** Returns the package catalog for a category, or [] if none defined yet. */
export function getPackagesForCategory(
  id: BookingCategoryId,
): readonly Package[] {
  return CATALOG[id] ?? [];
}

/** Flat list of every known package (across all categories). */
export const ALL_PACKAGES: readonly Package[] = Object.values(CATALOG).flat();

/** Looks up a package globally by id. */
export function findPackageById(id: string): Package | undefined {
  return ALL_PACKAGES.find((p) => p.id === id);
}

/** Default duration to use when a package becomes selected. */
export function defaultDuration(pkg: Package): number {
  return pkg.duration.kind === "fixed"
    ? pkg.duration.hours
    : pkg.duration.minHours;
}

/**
 * All allowed durations for a package (used by the duration picker).
 * For range durations we expose integer steps between min and max.
 */
export function allowedDurations(pkg: Package): number[] {
  if (pkg.duration.kind === "fixed") return [pkg.duration.hours];
  const out: number[] = [];
  for (let h = pkg.duration.minHours; h <= pkg.duration.maxHours; h++) out.push(h);
  return out;
}

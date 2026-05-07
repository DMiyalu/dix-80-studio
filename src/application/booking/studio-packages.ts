import type { Package } from "@/src/core/booking/package";

/**
 * Studio rental packages catalog.
 * Single source of truth for prices/durations.
 * Labels are localised via dict.booking.packages.<id>.
 */
export const STUDIO_PACKAGES: readonly Package[] = [
  {
    id: "studio-2-4h",
    i18nKey: "studio-2-4h",
    pricing: { kind: "hourly", hourlyRate: 60 },
    duration: { kind: "range", minHours: 2, maxHours: 4 },
  },
  {
    id: "studio-5h",
    i18nKey: "studio-5h",
    pricing: { kind: "hourly", hourlyRate: 55 },
    duration: { kind: "fixed", hours: 5 },
    popular: true,
  },
  {
    id: "studio-6-8h",
    i18nKey: "studio-6-8h",
    pricing: { kind: "hourly", hourlyRate: 45 },
    duration: { kind: "range", minHours: 6, maxHours: 8 },
  },
  {
    id: "studio-day",
    i18nKey: "studio-day",
    pricing: { kind: "flat", flatPrice: 750 },
    duration: { kind: "fixed", hours: 14 },
  },
] as const;

export function findPackageById(id: string): Package | undefined {
  return STUDIO_PACKAGES.find((p) => p.id === id);
}

/** Default duration to use when a package becomes selected. */
export function defaultDuration(pkg: Package): number {
  return pkg.duration.kind === "fixed"
    ? pkg.duration.hours
    : pkg.duration.minHours;
}

/** All allowed durations for a given package (used by the duration picker). */
export function allowedDurations(pkg: Package): number[] {
  if (pkg.duration.kind === "fixed") return [pkg.duration.hours];
  const out: number[] = [];
  for (let h = pkg.duration.minHours; h <= pkg.duration.maxHours; h++) out.push(h);
  return out;
}

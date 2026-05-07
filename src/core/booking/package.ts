/**
 * Domain types — booking package definition.
 * A package is one of the offerings a category exposes (e.g. "Studio 5h").
 */
export type PackagePricing =
  | { kind: "hourly"; hourlyRate: number }
  | { kind: "flat"; flatPrice: number };

export type PackageDuration =
  | { kind: "fixed"; hours: number }
  | { kind: "range"; minHours: number; maxHours: number };

export interface Package {
  id: string;
  /** Used to look up i18n labels under `dict.booking.packages.<id>` */
  i18nKey: string;
  pricing: PackagePricing;
  duration: PackageDuration;
  /** Show "Popular" tag on the card. */
  popular?: boolean;
}

"use client";

import { useAppDispatch, useAppSelector } from "@/src/infrastructure/store/hooks";
import { bookingActions } from "@/src/infrastructure/store/booking-slice";
import {
  defaultDuration,
  findPackageById,
} from "@/src/application/booking/packages-registry";
import {
  findCategory,
  getPackagesForCategory,
} from "@/src/application/booking/categories";
import { PackageCard } from "../package-card";
import { DurationPicker } from "../duration-picker";
import type { Locale } from "@/src/i18n/config";
import type { Dictionary } from "@/src/i18n/get-dictionary";

export function StepPackage({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: Locale;
}) {
  const t = dict.booking.step_package;
  const tCat = dict.booking.step_category;
  const tSummary = dict.booking.summary;
  const dispatch = useAppDispatch();
  const { category, packageId, durationHours } = useAppSelector(
    (s) => s.booking,
  );

  const packages = category ? getPackagesForCategory(category) : [];
  const cat = category ? findCategory(category) : undefined;

  // Category not yet bookable online → friendly fallback CTA.
  if (cat && !cat.available) {
    return (
      <div className="flex flex-col items-start">
        <header className="mb-6">
          <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
            {t.title}
          </h3>
          <p className="mt-1 text-sm text-muted">{t.subtitle}</p>
        </header>
        <div className="w-full rounded-2xl border border-border bg-surface p-8 text-center">
          <p className="font-display text-lg text-foreground">
            {tCat.coming_soon}
          </p>
          <p className="mt-2 text-sm text-muted">
            {dict.booking.categories[
              cat.i18nKey as keyof typeof dict.booking.categories
            ]?.subtitle ?? ""}
          </p>
          <a
            href="mailto:contact@80dix.com"
            onClick={() => dispatch(bookingActions.close())}
            className="mt-6 inline-flex h-12 cursor-pointer items-center justify-center rounded-full bg-accent px-7 text-sm font-medium uppercase tracking-wide text-white shadow-sm transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/30"
          >
            {tCat.contact_cta}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="mb-6">
        <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
          {t.title}
        </h3>
        <p className="mt-1 text-sm text-muted">{t.subtitle}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {packages.map((pkg) => {
          const meta =
            dict.booking.packages[
              pkg.i18nKey as keyof typeof dict.booking.packages
            ];
          return (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              lang={lang}
              selected={packageId === pkg.id}
              onSelect={() =>
                dispatch(
                  bookingActions.selectPackage({
                    id: pkg.id,
                    defaultHours: defaultDuration(pkg),
                  }),
                )
              }
              name={meta?.name ?? pkg.id}
              desc={meta?.desc ?? ""}
              popularLabel={t.popular}
              perHourLabel={t.per_hour}
            />
          );
        })}
      </div>

      {packageId && (
        <PackageDuration
          packageId={packageId}
          durationHours={durationHours ?? 0}
          unit={tSummary.hours_short}
          label={t.duration_label}
        />
      )}
    </div>
  );
}

function PackageDuration({
  packageId,
  durationHours,
  unit,
  label,
}: {
  packageId: string;
  durationHours: number;
  unit: string;
  label: string;
}) {
  const dispatch = useAppDispatch();
  const pkg = findPackageById(packageId);
  if (!pkg) return null;
  return (
    <DurationPicker
      pkg={pkg}
      value={durationHours}
      onChange={(h) => dispatch(bookingActions.setDuration(h))}
      label={label}
      unit={unit}
    />
  );
}

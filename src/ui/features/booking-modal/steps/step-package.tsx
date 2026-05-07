"use client";

import { useAppDispatch, useAppSelector } from "@/src/infrastructure/store/hooks";
import { bookingActions } from "@/src/infrastructure/store/booking-slice";
import {
  STUDIO_PACKAGES,
  defaultDuration,
  findPackageById,
} from "@/src/application/booking/studio-packages";
import { PackageCard } from "../package-card";
import { DurationPicker } from "../duration-picker";
import type { Dictionary } from "@/src/i18n/get-dictionary";

export function StepPackage({ dict }: { dict: Dictionary }) {
  const t = dict.booking.step_package;
  const tSummary = dict.booking.summary;
  const dispatch = useAppDispatch();
  const { packageId, durationHours } = useAppSelector((s) => s.booking);
  const lang = "fr"; // pricing formatter; the dict choice already reflects the locale.

  return (
    <div>
      <header className="mb-6">
        <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
          {t.title}
        </h3>
        <p className="mt-1 text-sm text-muted">{t.subtitle}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {STUDIO_PACKAGES.map((pkg) => {
          const meta =
            dict.booking.packages[pkg.i18nKey as keyof typeof dict.booking.packages];
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
          dict={dict}
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
  dict: _dict,
  packageId,
  durationHours,
  unit,
  label,
}: {
  dict: Dictionary;
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

"use client";

import { useAppSelector } from "@/src/infrastructure/store/hooks";
import {
  computePricing,
  formatCAD,
} from "@/src/application/booking/pricing";
import { findPackageById } from "@/src/application/booking/packages-registry";
import { endTime } from "@/src/application/booking/slot-generator";
import type { Locale } from "@/src/i18n/config";
import type { Dictionary } from "@/src/i18n/get-dictionary";

export function BookingSummary({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const state = useAppSelector((s) => s.booking);
  const t = dict.booking.summary;

  const pkg = state.packageId ? findPackageById(state.packageId) : null;
  const hours = state.durationHours ?? 0;
  const pricing = pkg && hours ? computePricing(pkg, hours) : null;
  const pkgLabel = pkg ? dict.booking.packages[pkg.i18nKey as keyof typeof dict.booking.packages]?.name : null;

  return (
    <div className="flex h-full flex-col p-6">
      <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
        {t.title}
      </h3>

      {!pkg && (
        <p className="mt-6 text-sm text-muted">{t.empty}</p>
      )}

      {pkg && (
        <dl className="mt-6 space-y-5 text-sm">
          <div>
            <dt className="text-[11px] uppercase tracking-widest text-muted">{t.package}</dt>
            <dd className="mt-1 font-medium text-foreground">{pkgLabel}</dd>
            <dd className="text-xs text-muted">
              {hours} {t.hours_short}
              {pkg.pricing.kind === "hourly" &&
                ` × ${formatCAD(pkg.pricing.hourlyRate, lang)}`}
            </dd>
          </div>

          {state.date && state.time && (
            <div>
              <dt className="text-[11px] uppercase tracking-widest text-muted">
                {t.datetime}
              </dt>
              <dd className="mt-1 font-medium text-foreground">
                {formatDateLong(state.date, lang)}
              </dd>
              <dd className="text-xs text-muted">
                {state.time} → {endTime(state.time, hours)}
              </dd>
            </div>
          )}

          {pricing && (
            <div className="space-y-1.5 border-t border-border pt-4">
              <Row label={t.subtotal} value={formatCAD(pricing.subtotal, lang)} />
              <Row label={t.gst} value={formatCAD(pricing.gst, lang)} />
              <Row label={t.qst} value={formatCAD(pricing.qst, lang)} />
              <Row
                label={t.total}
                value={formatCAD(pricing.total, lang)}
                bold
              />
            </div>
          )}
        </dl>
      )}
    </div>
  );
}

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div
      className={
        bold
          ? "flex items-center justify-between pt-2 text-base font-semibold text-foreground"
          : "flex items-center justify-between text-sm text-muted"
      }
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function formatDateLong(iso: string, lang: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat(lang === "fr" ? "fr-CA" : "en-CA", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(y, m - 1, d));
}

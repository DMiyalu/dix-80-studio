"use client";

import { cn } from "@/src/ui/lib/cn";
import type { Package } from "@/src/core/booking/package";
import { formatCAD } from "@/src/application/booking/pricing";

export function PackageCard({
  pkg,
  selected,
  onSelect,
  lang,
  name,
  desc,
  popularLabel,
  perHourLabel,
}: {
  pkg: Package;
  selected: boolean;
  onSelect: () => void;
  lang: string;
  name: string;
  desc: string;
  popularLabel: string;
  perHourLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border bg-background p-6 text-left transition-all",
        selected
          ? "border-accent shadow-lg shadow-accent/15"
          : "border-border hover:border-foreground/40 hover:shadow-md",
      )}
    >
      {pkg.popular && (
        <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
          {popularLabel}
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-foreground">
          {name}
        </h3>
        <span
          aria-hidden
          className={cn(
            "mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full border-2 transition-all",
            selected ? "border-accent bg-accent" : "border-border",
          )}
        >
          {selected && (
            <span className="block h-2 w-2 rounded-full bg-white" />
          )}
        </span>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>

      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-display text-3xl font-semibold text-foreground">
          {pkg.pricing.kind === "hourly"
            ? formatCAD(pkg.pricing.hourlyRate, lang)
            : formatCAD(pkg.pricing.flatPrice, lang)}
        </span>
        {pkg.pricing.kind === "hourly" && (
          <span className="text-sm text-muted">{perHourLabel}</span>
        )}
      </div>
    </button>
  );
}

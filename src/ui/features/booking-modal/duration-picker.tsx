"use client";

import { cn } from "@/src/ui/lib/cn";
import { allowedDurations } from "@/src/application/booking/packages-registry";
import type { Package } from "@/src/core/booking/package";

export function DurationPicker({
  pkg,
  value,
  onChange,
  label,
  unit,
}: {
  pkg: Package;
  value: number;
  onChange: (h: number) => void;
  label: string;
  unit: string;
}) {
  const opts = allowedDurations(pkg);
  if (pkg.duration.kind === "fixed") return null;

  return (
    <div className="mt-5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {opts.map((h) => (
          <button
            key={h}
            type="button"
            onClick={() => onChange(h)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-all",
              h === value
                ? "border-accent bg-accent text-white shadow-sm shadow-accent/30"
                : "border-border bg-background text-foreground hover:border-foreground/40",
            )}
          >
            {h} {unit}
          </button>
        ))}
      </div>
    </div>
  );
}

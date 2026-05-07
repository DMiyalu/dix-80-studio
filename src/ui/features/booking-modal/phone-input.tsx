"use client";

import { AsYouType, getCountries, getCountryCallingCode } from "libphonenumber-js";
import { cn } from "@/src/ui/lib/cn";

/** Shortlist shown first; rest hidden in scroll. */
const PRIORITY: readonly string[] = ["CA", "US", "FR", "BE", "CH", "GB"];

export function PhoneInput({
  country,
  phone,
  onChange,
  label,
  countryLabel,
  invalid,
  errorText,
}: {
  country: string;
  phone: string;
  onChange: (next: { country?: string; phone?: string }) => void;
  label: string;
  countryLabel: string;
  invalid?: boolean;
  errorText?: string;
}) {
  const countries = orderedCountries();

  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted">
        {label}
      </span>
      <div
        className={cn(
          "flex overflow-hidden rounded-lg border bg-background transition-colors",
          invalid ? "border-accent" : "border-border focus-within:border-foreground",
        )}
      >
        <select
          aria-label={countryLabel}
          value={country}
          onChange={(e) =>
            onChange({ country: e.target.value, phone: "" })
          }
          className="border-r border-border bg-surface px-3 text-sm focus:outline-none"
        >
          {countries.map((c) => (
            <option key={c} value={c}>
              {c} +{getCountryCallingCode(c as never)}
            </option>
          ))}
        </select>
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) =>
            onChange({ phone: format(e.target.value, country) })
          }
          placeholder={placeholder(country)}
          className="flex-1 bg-transparent px-3 py-2.5 text-sm text-foreground focus:outline-none"
        />
      </div>
      {invalid && errorText && (
        <span className="mt-1 block text-xs text-accent">{errorText}</span>
      )}
    </label>
  );
}

function orderedCountries(): string[] {
  const all = getCountries() as readonly string[];
  const set = new Set(all);
  const head = PRIORITY.filter((c) => set.has(c));
  const rest = all.filter((c) => !PRIORITY.includes(c)).sort();
  return [...head, ...rest];
}

function format(input: string, country: string): string {
  try {
    const formatter = new AsYouType(country as never);
    return formatter.input(input);
  } catch {
    return input;
  }
}

function placeholder(country: string): string {
  if (country === "CA" || country === "US") return "(514) 555-1234";
  if (country === "FR") return "06 12 34 56 78";
  return "";
}

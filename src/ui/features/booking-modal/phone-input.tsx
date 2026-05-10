"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  AsYouType,
  getCountries,
  getCountryCallingCode,
} from "libphonenumber-js";
import * as Flags from "country-flag-icons/react/3x2";
import { cn } from "@/src/ui/lib/cn";

/** Countries pinned at the top of the list. */
const PRIORITY: readonly string[] = ["CA", "US", "FR", "BE", "CH", "GB"];

interface CountryEntry {
  code: string; // ISO-2
  name: string;
  dial: string; // e.g. "1"
}

export function PhoneInput({
  country,
  phone,
  onChange,
  label,
  countryLabel,
  searchPlaceholder,
  invalid,
  errorText,
  lang,
}: {
  country: string;
  phone: string;
  onChange: (next: { country?: string; phone?: string }) => void;
  label: string;
  countryLabel: string;
  searchPlaceholder: string;
  invalid?: boolean;
  errorText?: string;
  lang: string;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null);
  const listboxId = useId();

  const countries = useMemo(() => buildCountries(lang), [lang]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.dial.includes(q),
    );
  }, [countries, query]);

  // Close on outside click / Esc.
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(t) &&
        popoverRef.current &&
        !popoverRef.current.contains(t)
      ) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Position popover under trigger (fixed → escapes modal overflow).
  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;
    const update = () => {
      const r = triggerRef.current!.getBoundingClientRect();
      setPos({
        top: r.bottom + 4,
        left: r.left,
        width: Math.max(r.width, 288),
      });
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open]);

  const current = countries.find((c) => c.code === country) ?? countries[0];

  const selectCountry = (code: string) => {
    onChange({ country: code, phone: "" });
    setOpen(false);
    setQuery("");
  };

  return (
    <div className="block">
      <label
        htmlFor={`phone-${listboxId}`}
        className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted"
      >
        {label}
      </label>

      <div
        ref={wrapperRef}
        className={cn(
          "relative flex overflow-visible rounded-lg border bg-background transition-colors",
          invalid
            ? "border-accent"
            : "border-border focus-within:border-foreground",
        )}
      >
        {/* Country trigger */}
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={countryLabel}
          onClick={() => setOpen((v) => !v)}
          className="flex flex-none cursor-pointer items-center gap-2 border-r border-border bg-surface px-3 text-sm transition-colors hover:bg-border/60"
        >
          <FlagIcon code={current.code} />
          <span className="font-medium text-foreground">+{current.dial}</span>
          <Chevron open={open} />
        </button>

        {/* Phone input */}
        <input
          id={`phone-${listboxId}`}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) =>
            onChange({ phone: format(e.target.value, current.code) })
          }
          placeholder={placeholder(current.code)}
          className="flex-1 bg-transparent px-3 py-2.5 text-sm text-foreground focus:outline-none"
        />
      </div>

      {/* Dropdown panel — portal-rendered so it escapes modal overflow */}
      {open && pos && typeof document !== "undefined" &&
        createPortal(
          <div
            ref={popoverRef}
            role="listbox"
            id={listboxId}
            aria-label={countryLabel}
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
              width: pos.width,
            }}
            className="z-[200] flex max-h-72 flex-col overflow-hidden rounded-lg border border-border bg-background shadow-xl"
          >
            <div className="border-b border-border p-2">
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full rounded-md bg-surface px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-foreground/30"
              />
            </div>
            <ul className="flex-1 overflow-y-auto py-1">
              {filtered.map((c) => {
                const selected = c.code === current.code;
                return (
                  <li key={c.code}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => selectCountry(c.code)}
                      className={cn(
                        "flex w-full cursor-pointer items-center gap-3 px-3 py-2 text-left text-sm transition-colors",
                        selected
                          ? "bg-accent/10 text-foreground"
                          : "text-foreground hover:bg-surface",
                      )}
                    >
                      <FlagIcon code={c.code} />
                      <span className="flex-1 truncate">{c.name}</span>
                      <span className="text-xs text-muted">+{c.dial}</span>
                    </button>
                  </li>
                );
              })}
              {filtered.length === 0 && (
                <li className="px-3 py-4 text-center text-sm text-muted">—</li>
              )}
            </ul>
          </div>,
          document.body,
        )}

      {invalid && errorText && (
        <span className="mt-1 block text-xs text-accent">{errorText}</span>
      )}
    </div>
  );
}

function FlagIcon({ code }: { code: string }) {
  const Comp = (Flags as Record<string, React.ComponentType<{ title?: string; className?: string }>>)[code];
  if (!Comp) {
    return (
      <span className="inline-block w-5 text-center text-[10px] font-semibold text-muted">
        {code}
      </span>
    );
  }
  return (
    <Comp
      title={code}
      className="h-3.5 w-5 flex-none rounded-[2px] object-cover ring-1 ring-border"
    />
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn(
        "h-3 w-3 text-muted transition-transform",
        open && "rotate-180",
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  );
}

function buildCountries(lang: string): CountryEntry[] {
  const display = safeDisplayNames(lang);
  const all = getCountries() as readonly string[];
  const entries: CountryEntry[] = [];
  for (const code of all) {
    let dial = "";
    try {
      dial = getCountryCallingCode(code as never);
    } catch {
      continue;
    }
    const name = display?.of(code) ?? code;
    entries.push({ code, name, dial });
  }
  // Sort: pinned first (in PRIORITY order), then alphabetical by localized name.
  const pinIdx = (code: string) => {
    const i = PRIORITY.indexOf(code);
    return i === -1 ? Number.POSITIVE_INFINITY : i;
  };
  entries.sort((a, b) => {
    const pa = pinIdx(a.code);
    const pb = pinIdx(b.code);
    if (pa !== pb) return pa - pb;
    return a.name.localeCompare(b.name, lang);
  });
  return entries;
}

function safeDisplayNames(lang: string): Intl.DisplayNames | null {
  try {
    return new Intl.DisplayNames([lang === "fr" ? "fr-CA" : "en-CA"], {
      type: "region",
    });
  } catch {
    return null;
  }
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
  if (country === "BE") return "0470 12 34 56";
  return "";
}

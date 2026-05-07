"use client";

import { useMemo, useState } from "react";
import { cn } from "@/src/ui/lib/cn";

export interface CalendarLabels {
  weekdays: readonly string[];
  months: readonly string[];
}

/**
 * Lightweight month calendar (Monday-first).
 * Disables past days; allows the current and next 6 months.
 */
export function Calendar({
  value,
  onSelect,
  labels,
}: {
  value: string | null; // YYYY-MM-DD
  onSelect: (iso: string) => void;
  labels: CalendarLabels;
}) {
  const today = useMemo(startOfDay, []);
  const initial = value ? parseISO(value) : today;

  const [view, setView] = useState({
    year: initial.getFullYear(),
    month: initial.getMonth(),
  });

  const minMonth = today.getFullYear() * 12 + today.getMonth();
  const maxMonth = minMonth + 6;
  const viewIdx = view.year * 12 + view.month;
  const canPrev = viewIdx > minMonth;
  const canNext = viewIdx < maxMonth;

  const grid = useMemo(() => buildGrid(view.year, view.month), [view]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() =>
            setView((v) => shiftMonth(v.year, v.month, -1))
          }
          disabled={!canPrev}
          aria-label="Previous month"
          className="rounded-full p-2 text-foreground transition-colors hover:bg-surface disabled:opacity-30"
        >
          <Chevron dir="left" />
        </button>
        <h4 className="font-display text-base font-semibold text-foreground">
          {labels.months[view.month]} {view.year}
        </h4>
        <button
          type="button"
          onClick={() =>
            setView((v) => shiftMonth(v.year, v.month, 1))
          }
          disabled={!canNext}
          aria-label="Next month"
          className="rounded-full p-2 text-foreground transition-colors hover:bg-surface disabled:opacity-30"
        >
          <Chevron dir="right" />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wider text-muted">
        {labels.weekdays.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {grid.map((cell, i) => {
          if (!cell) return <span key={i} className="h-10" />;
          const iso = toISO(cell);
          const isPast = cell.getTime() < today.getTime();
          const isSelected = value === iso;
          return (
            <button
              key={i}
              type="button"
              disabled={isPast}
              onClick={() => onSelect(iso)}
              className={cn(
                "h-10 rounded-lg text-sm font-medium transition-all",
                isPast && "text-muted/40",
                !isPast && !isSelected &&
                  "text-foreground hover:bg-surface hover:ring-1 hover:ring-border",
                isSelected &&
                  "bg-accent text-white shadow-md shadow-accent/30",
              )}
            >
              {cell.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={dir === "left" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"}
      />
    </svg>
  );
}

function startOfDay(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function shiftMonth(y: number, m: number, delta: number) {
  const total = y * 12 + m + delta;
  return { year: Math.floor(total / 12), month: ((total % 12) + 12) % 12 };
}

/** Returns 6 rows × 7 cols grid; null for blank cells. Monday-first. */
function buildGrid(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1);
  // Monday=0, Sunday=6
  const dow = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = Array(dow).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length < 42) cells.push(null);
  return cells;
}

function toISO(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function parseISO(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

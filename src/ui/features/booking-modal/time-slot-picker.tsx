"use client";

import { cn } from "@/src/ui/lib/cn";
import type { SlotOption } from "@/src/application/booking/slot-generator";
import { endTime } from "@/src/application/booking/slot-generator";

export function TimeSlotPicker({
  slots,
  selected,
  durationHours,
  onSelect,
  emptyLabel,
}: {
  slots: SlotOption[];
  selected: string | null;
  durationHours: number;
  onSelect: (time: string) => void;
  emptyLabel: string;
}) {
  if (!slots.length) {
    return <p className="text-sm text-muted">{emptyLabel}</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {slots.map((s) => {
        const isSelected = s.time === selected;
        return (
          <button
            key={s.time}
            type="button"
            disabled={!s.available}
            onClick={() => onSelect(s.time)}
            className={cn(
              "rounded-lg border px-3 py-2.5 text-sm font-medium transition-all",
              isSelected &&
                "border-accent bg-accent text-white shadow-md shadow-accent/30",
              !isSelected &&
                s.available &&
                "border-border bg-background text-foreground hover:border-foreground/50 hover:shadow-sm",
              !s.available &&
                "cursor-not-allowed border-border bg-surface text-muted/50 line-through",
            )}
          >
            <span>{s.time}</span>
            <span className="ml-1 text-xs opacity-70">
              → {endTime(s.time, durationHours)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

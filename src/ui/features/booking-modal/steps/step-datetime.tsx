"use client";

import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/src/infrastructure/store/hooks";
import { bookingActions } from "@/src/infrastructure/store/booking-slice";
import { generateSlotsForDate } from "@/src/application/booking/slot-generator";
import { Calendar } from "../calendar";
import { TimeSlotPicker } from "../time-slot-picker";
import type { Dictionary } from "@/src/i18n/get-dictionary";

export function StepDateTime({ dict }: { dict: Dictionary }) {
  const t = dict.booking.step_datetime;
  const dispatch = useAppDispatch();
  const { date, time, durationHours } = useAppSelector((s) => s.booking);
  const hours = durationHours ?? 1;

  const slots = useMemo(
    () => (date ? generateSlotsForDate(date, hours) : []),
    [date, hours],
  );

  return (
    <div>
      <header className="mb-6">
        <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
          {t.title}
        </h3>
        <p className="mt-1 text-sm text-muted">{t.subtitle}</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
        <Calendar
          value={date}
          onSelect={(iso) => dispatch(bookingActions.setDate(iso))}
          labels={{ weekdays: t.weekday_short, months: t.month_names }}
        />

        <div>
          {!date ? (
            <p className="text-sm text-muted">{t.select_date}</p>
          ) : (
            <TimeSlotPicker
              slots={slots}
              selected={time}
              durationHours={hours}
              onSelect={(v) => dispatch(bookingActions.setTime(v))}
              emptyLabel={t.no_slots}
            />
          )}
        </div>
      </div>
    </div>
  );
}

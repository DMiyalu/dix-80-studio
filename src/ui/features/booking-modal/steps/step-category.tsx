"use client";

import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/src/infrastructure/store/hooks";
import { bookingActions } from "@/src/infrastructure/store/booking-slice";
import {
  BOOKING_CATEGORIES,
  type CategoryEntry,
} from "@/src/application/booking/categories";
import { cn } from "@/src/ui/lib/cn";
import type { Dictionary } from "@/src/i18n/get-dictionary";

/** Image per category (mirrors the home services section). */
const CATEGORY_IMAGES: Record<string, string> = {
  studio:
    "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?auto=format&fit=crop&w=900&q=70",
  wedding:
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=70",
  corporate:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=70",
  sport:
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=70",
  portrait:
    "https://images.unsplash.com/photo-1502323777036-f29e3972d82f?auto=format&fit=crop&w=900&q=70",
  event:
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=70",
  family:
    "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=70",
};

export function StepCategory({ dict }: { dict: Dictionary }) {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((s) => s.booking.category);
  const t = dict.booking.step_category;

  return (
    <div>
      <header className="mb-6">
        <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
          {t.title}
        </h3>
        <p className="mt-1 text-sm text-muted">{t.subtitle}</p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BOOKING_CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.id}
            cat={cat}
            dict={dict}
            selected={selected === cat.id}
            comingSoonLabel={t.coming_soon}
            onSelect={() => dispatch(bookingActions.selectCategory(cat.id))}
          />
        ))}
      </div>
    </div>
  );
}

function CategoryCard({
  cat,
  dict,
  selected,
  comingSoonLabel,
  onSelect,
}: {
  cat: CategoryEntry;
  dict: Dictionary;
  selected: boolean;
  comingSoonLabel: string;
  onSelect: () => void;
}) {
  const services = dict.services.items as Record<
    string,
    { name: string; desc: string }
  >;
  const meta = services[cat.i18nKey];
  const name = meta?.name ?? cat.id;
  const desc = meta?.desc ?? "";
  const img = CATEGORY_IMAGES[cat.id];

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border bg-background text-left transition-all",
        selected
          ? "border-accent shadow-lg shadow-accent/15"
          : "border-border hover:border-foreground/40 hover:shadow-md",
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {img && (
          <Image
            src={img}
            alt={name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        {!cat.available && (
          <span className="absolute right-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground shadow-sm">
            {comingSoonLabel}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-display text-lg font-semibold text-foreground">
            {name}
          </h4>
          <span
            aria-hidden
            className={cn(
              "mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full border-2 transition-all",
              selected ? "border-accent bg-accent" : "border-border",
            )}
          >
            {selected && <span className="block h-2 w-2 rounded-full bg-white" />}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-muted">{desc}</p>
      </div>
    </button>
  );
}

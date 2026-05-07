import { cn } from "@/src/ui/lib/cn";

export interface StepperItem {
  id: string;
  label: string;
}

export function Stepper({
  steps,
  current,
  onSelect,
}: {
  steps: StepperItem[];
  current: string;
  onSelect?: (id: string) => void;
}) {
  const currentIdx = steps.findIndex((s) => s.id === current);

  return (
    <ol className="flex w-full items-center gap-2 sm:gap-4">
      {steps.map((s, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        const clickable = onSelect && (done || active);
        return (
          <li key={s.id} className="flex flex-1 items-center gap-2 sm:gap-3">
            <button
              type="button"
              disabled={!clickable}
              onClick={() => clickable && onSelect?.(s.id)}
              className={cn(
                "flex items-center gap-2 sm:gap-3 text-left transition-colors",
                clickable ? "cursor-pointer" : "cursor-default",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-semibold transition-all",
                  active && "bg-accent text-white shadow-md shadow-accent/30",
                  done && "bg-foreground text-background",
                  !active && !done && "bg-surface text-muted ring-1 ring-border",
                )}
              >
                {done ? "✓" : i + 1}
              </span>
              <span
                className={cn(
                  "hidden whitespace-nowrap text-xs font-semibold uppercase tracking-[0.18em] sm:inline",
                  active && "text-foreground",
                  done && "text-foreground/70",
                  !active && !done && "text-muted",
                )}
              >
                {s.label}
              </span>
            </button>
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  "h-px flex-1 transition-colors",
                  i < currentIdx ? "bg-foreground/40" : "bg-border",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

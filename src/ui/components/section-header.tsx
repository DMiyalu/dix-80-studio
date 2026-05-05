import { cn } from "@/src/ui/lib/cn";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-accent",
            align === "center" && "justify-center",
          )}
        >
          <span className="h-px w-8 bg-accent" />
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

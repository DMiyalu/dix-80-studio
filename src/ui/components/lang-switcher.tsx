import Link from "next/link";
import type { Locale } from "@/src/i18n/config";
import { i18n, localeLabels } from "@/src/i18n/config";
import { cn } from "@/src/ui/lib/cn";

export function LangSwitcher({
  current,
  pathname = "/",
  className,
}: {
  current: Locale;
  pathname?: string;
  className?: string;
}) {
  // Strip current locale prefix from pathname.
  const stripped = pathname.replace(
    new RegExp(`^/(${i18n.locales.join("|")})(?=/|$)`),
    "",
  );
  const rest = stripped || "/";

  return (
    <div
      className={cn(
        "flex items-center gap-1 text-xs uppercase tracking-widest",
        className,
      )}
    >
      {i18n.locales.map((locale, idx) => (
        <span key={locale} className="flex items-center">
          {idx > 0 && <span className="mx-1 text-muted/50">/</span>}
          <Link
            href={`/${locale}${rest === "/" ? "" : rest}`}
            aria-current={current === locale ? "page" : undefined}
            className={cn(
              "transition-colors",
              current === locale
                ? "text-foreground"
                : "text-muted hover:text-foreground",
            )}
          >
            {locale.toUpperCase()}
            <span className="sr-only"> — {localeLabels[locale]}</span>
          </Link>
        </span>
      ))}
    </div>
  );
}

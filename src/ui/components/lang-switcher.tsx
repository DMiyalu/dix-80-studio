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
  const stripped = pathname.replace(
    new RegExp(`^/(${i18n.locales.join("|")})(?=/|$)`),
    "",
  );
  const rest = stripped || "/";

  return (
    <div
      className={cn(
        "flex items-center gap-1 text-xs font-medium uppercase tracking-widest",
        className,
      )}
    >
      {i18n.locales.map((locale, idx) => (
        <span key={locale} className="flex items-center">
          {idx > 0 && <span className="mx-1.5 opacity-50">·</span>}
          <Link
            href={`/${locale}${rest === "/" ? "" : rest}`}
            aria-current={current === locale ? "page" : undefined}
            className={cn(
              "transition-all",
              current === locale ? "opacity-100" : "opacity-60 hover:opacity-100",
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

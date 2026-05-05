import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/src/i18n/config";
import type { Dictionary } from "@/src/i18n/get-dictionary";
import { Container } from "@/src/ui/components/container";
import { ButtonLink } from "@/src/ui/components/button";
import { LangSwitcher } from "@/src/ui/components/lang-switcher";
import { SocialIcons } from "@/src/ui/components/social-icons";

export function Header({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const base = `/${lang}`;
  const links = [
    { href: base, label: dict.nav.home },
    { href: `${base}/services`, label: dict.nav.services },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];

  // Hover effect: white glow / subtle drop shadow (no red flash).
  const navHover =
    "transition-all duration-200 [text-shadow:0_0_0_rgba(255,255,255,0)] hover:text-white hover:[text-shadow:0_0_18px_rgba(255,255,255,0.85)]";

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <Container className="relative flex h-28 items-center justify-between gap-6">
        {/* Left: logo */}
        <Link
          href={base}
          aria-label="80Dix Studio"
          className="flex flex-none items-center"
        >
          <Image
            src="/images/logo-blanc.svg"
            alt="80Dix Studio"
            width={200}
            height={68}
            priority
            className="h-16 w-auto md:h-[72px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
          />
        </Link>

        {/* Center: nav (absolutely positioned for true centering) */}
        <nav className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-12 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`pointer-events-auto text-sm font-semibold uppercase tracking-[0.22em] text-white/90 ${navHover}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right: socials + lang + book */}
        <div className="flex flex-none items-center gap-5 lg:gap-6">
          <SocialIcons
            size="md"
            className="hidden sm:flex"
            iconClassName={`text-white ${navHover}`}
          />
          <span className="hidden h-5 w-px bg-white/30 sm:block" />
          <LangSwitcher
            current={lang}
            className={`text-white ${navHover}`}
          />
          <ButtonLink
            href={`${base}/reservation`}
            variant="primary"
            size="md"
            className="hidden sm:inline-flex"
          >
            {dict.nav.book}
          </ButtonLink>
        </div>
      </Container>
    </header>
  );
}

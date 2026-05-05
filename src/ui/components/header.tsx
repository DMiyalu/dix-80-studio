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

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <Container className="flex h-24 items-center justify-between gap-6">
        {/* Left: logo */}
        <Link
          href={base}
          aria-label="80Dix Studio"
          className="flex flex-none items-center"
        >
          <Image
            src="/images/logo-blanc.svg"
            alt="80Dix Studio"
            width={140}
            height={48}
            priority
            className="h-11 w-auto"
          />
        </Link>

        {/* Center: nav */}
        <nav className="hidden flex-1 items-center justify-center gap-12 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs font-medium uppercase tracking-[0.25em] text-white/90 transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right: socials + lang + book */}
        <div className="flex flex-none items-center gap-5 lg:gap-6">
          <SocialIcons
            className="hidden sm:flex"
            iconClassName="text-white/80 hover:text-accent"
          />
          <span className="hidden h-5 w-px bg-white/25 sm:block" />
          <LangSwitcher
            current={lang}
            className="text-white/85 [&_a]:text-white/70 [&_a:hover]:text-white [&_[aria-current='page']]:text-white"
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

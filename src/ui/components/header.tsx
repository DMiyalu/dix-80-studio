import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/src/i18n/config";
import type { Dictionary } from "@/src/i18n/get-dictionary";
import { Container } from "@/src/ui/components/container";
import { ButtonLink } from "@/src/ui/components/button";
import { LangSwitcher } from "@/src/ui/components/lang-switcher";

export function Header({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const base = `/${lang}`;
  const links = [
    { href: `${base}/services`, label: dict.nav.services },
    { href: `${base}/studio`, label: dict.nav.studio },
    { href: `${base}/about`, label: dict.nav.about },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <Container className="flex h-20 items-center justify-between">
        <Link href={base} className="flex items-center" aria-label="80Dix Studio">
          <Image
            src="/images/logo-rouge.svg"
            alt="80Dix Studio"
            width={120}
            height={40}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <LangSwitcher current={lang} />
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

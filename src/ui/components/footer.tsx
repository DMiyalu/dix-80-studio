import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/src/i18n/config";
import type { Dictionary } from "@/src/i18n/get-dictionary";
import { Container } from "@/src/ui/components/container";
import { LangSwitcher } from "@/src/ui/components/lang-switcher";
import { SocialIcons } from "@/src/ui/components/social-icons";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const base = `/${lang}`;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href={base} aria-label="80Dix Studio">
              <Image
                src="/images/logo-rouge.svg"
                alt="80Dix Studio"
                width={280}
                height={94}
                className="h-28 w-auto md:h-32"
              />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
              {dict.footer.tagline}
            </p>
            <p className="mt-4 text-sm text-muted">{dict.footer.address}</p>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              {dict.footer.nav}
            </h4>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link href={base} className="hover:text-accent">{dict.nav.home}</Link></li>
              <li><Link href={`${base}/services`} className="hover:text-accent">{dict.nav.services}</Link></li>
              <li><Link href={`${base}/about`} className="hover:text-accent">{dict.nav.about}</Link></li>
              <li><Link href={`${base}/contact`} className="hover:text-accent">{dict.nav.contact}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              {dict.footer.studio_section}
            </h4>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link href={`${base}/studio`} className="hover:text-accent">{dict.nav.studio}</Link></li>
              <li><Link href={`${base}/reservation`} className="hover:text-accent">{dict.nav.book}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              {dict.footer.contact}
            </h4>
            <ul className="space-y-3 text-sm text-muted">
              <li><a href="mailto:contact@dix80studio.com" className="hover:text-accent">contact@dix80studio.com</a></li>
              <li><a href="tel:+18190000000" className="hover:text-accent">+1 (873) 993-1612</a></li>
            </ul>
            <SocialIcons
              size="md"
              className="mt-5"
              iconClassName="text-foreground/70 hover:text-accent"
            />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} 80Dix Studio. {dict.footer.rights}</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-foreground">{dict.footer.privacy}</Link>
            <Link href="#" className="hover:text-foreground">{dict.footer.terms}</Link>
            <LangSwitcher current={lang} />
          </div>
        </div>

        {/* Agency signature */}
        <div className="mt-6 flex justify-center border-t border-border/60 pt-6 text-[11px] uppercase tracking-[0.25em] text-muted/70">
          <span>
            Crafted by{" "}
            <a
              href="https://x-ra.solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground/80 transition-colors hover:text-accent"
            >
              X-Ra Solutions
            </a>
          </span>
        </div>
      </Container>
    </footer>
  );
}

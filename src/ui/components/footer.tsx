import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/src/i18n/config";
import type { Dictionary } from "@/src/i18n/get-dictionary";
import { Container } from "@/src/ui/components/container";
import { LangSwitcher } from "@/src/ui/components/lang-switcher";

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
                width={140}
                height={48}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {dict.footer.tagline}
            </p>
            <p className="mt-4 text-sm text-muted">{dict.footer.address}</p>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              {dict.footer.nav}
            </h4>
            <ul className="space-y-3 text-sm text-muted">
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
              <li><a href="mailto:contact@80dixstudio.com" className="hover:text-accent">contact@80dixstudio.com</a></li>
              <li><a href="tel:+18190000000" className="hover:text-accent">+1 (819) 000-0000</a></li>
              <li className="flex gap-4 pt-2">
                <a href="#" aria-label="Instagram" className="hover:text-accent">Instagram</a>
                <a href="#" aria-label="Facebook" className="hover:text-accent">Facebook</a>
              </li>
            </ul>
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
      </Container>
    </footer>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/src/i18n/config";
import type { Dictionary } from "@/src/i18n/get-dictionary";
import { Container } from "@/src/ui/components/container";
import { ButtonLink } from "@/src/ui/components/button";
import { LangSwitcher } from "@/src/ui/components/lang-switcher";
import { SocialIcons } from "@/src/ui/components/social-icons";
import { cn } from "@/src/ui/lib/cn";

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

  // --- Sticky with scroll-up reveal ---------------------------------------
  const [scrolled, setScrolled] = useState(false); // past hero threshold
  const [hidden, setHidden] = useState(false); // hide on scroll-down
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const goingDown = y > lastY;
        setScrolled(y > 80);
        // Only hide once we're past the initial hero zone, and only if going down
        if (y > 200 && goingDown && y - lastY > 4) setHidden(true);
        else if (!goingDown || y < 80) setHidden(false);
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onLight = scrolled; // when bg becomes white, switch text to dark
  const navHover = onLight
    ? "transition-all duration-200 hover:text-accent"
    : "transition-all duration-200 [text-shadow:0_0_0_rgba(255,255,255,0)] hover:text-white hover:[text-shadow:0_0_18px_rgba(255,255,255,0.85)]";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
          : "bg-transparent",
        hidden ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <Container
        className={cn(
          "relative flex items-center justify-between gap-6 transition-all duration-300",
          scrolled ? "h-24" : "h-32",
        )}
      >
        {/* Left: logo */}
        <Link
          href={base}
          aria-label="80Dix Studio"
          className="flex flex-none items-center"
        >
          <Image
            src={onLight ? "/images/logo-rouge.svg" : "/images/logo-blanc.svg"}
            alt="80Dix Studio"
            width={240}
            height={84}
            priority
            className={cn(
              "w-auto transition-all duration-300",
              scrolled
                ? "h-16 md:h-20"
                : "h-20 md:h-24 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]",
            )}
          />
        </Link>

        {/* Center: nav (absolutely positioned for true centering) */}
        <nav className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-12 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "pointer-events-auto text-xs font-semibold uppercase tracking-[0.22em]",
                onLight ? "text-foreground" : "text-white/90",
                navHover,
              )}
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
            iconClassName={cn(
              onLight ? "text-foreground" : "text-white",
              navHover,
            )}
          />
          <span
            className={cn(
              "hidden h-5 w-px sm:block",
              onLight ? "bg-foreground/20" : "bg-white/30",
            )}
          />
          <LangSwitcher
            current={lang}
            className={cn(onLight ? "text-foreground" : "text-white", navHover)}
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

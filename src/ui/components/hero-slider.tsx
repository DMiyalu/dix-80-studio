"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Container } from "@/src/ui/components/container";
import { ButtonLink } from "@/src/ui/components/button";
import { cn } from "@/src/ui/lib/cn";

export type HeroSlide = {
  category: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  href: string;
};

export function HeroSlider({
  slides,
  ctaPrimary,
  ctaSecondary,
  ctaSecondaryHref,
  scrollLabel,
  intervalMs = 6000,
}: {
  slides: HeroSlide[];
  ctaPrimary: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
  scrollLabel: string;
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const total = slides.length;

  const goTo = useCallback(
    (i: number) => setIndex(((i % total) + total) % total),
    [total],
  );
  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, intervalMs);
    return () => clearInterval(t);
  }, [total, intervalMs]);

  const current = slides[index];

  return (
    <section className="relative isolate h-screen min-h-[640px] w-full overflow-hidden bg-black">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.category}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            i === index ? "opacity-100" : "opacity-0",
          )}
        >
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url("${slide.imageUrl}")` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/70" />
        </div>
      ))}

      {/* Content */}
      <Container className="relative flex h-full items-center">
        <div className="w-full text-center">
          <div className="mx-auto mb-6 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.35em] text-white/85">
            <span className="h-px w-10 bg-accent" />
            {current.category}
            <span className="h-px w-10 bg-accent" />
          </div>
          <h1
            key={`t-${index}`}
            className="font-display text-5xl font-semibold leading-[1.05] text-white drop-shadow-[0_2px_30px_rgba(0,0,0,0.45)] sm:text-6xl lg:text-7xl xl:text-8xl animate-[fadeUp_700ms_ease-out]"
          >
            {current.title}
          </h1>
          <p
            key={`s-${index}`}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg animate-[fadeUp_900ms_ease-out]"
          >
            {current.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href={current.href} variant="primary" size="lg">
              {ctaPrimary}
            </ButtonLink>
            <Link
              href={ctaSecondaryHref}
              className="inline-flex h-14 items-center justify-center border border-white/40 px-8 text-xs font-medium uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-black"
            >
              {ctaSecondary}
            </Link>
          </div>
        </div>
      </Container>

      {/* Arrows */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white hover:text-black md:flex lg:left-8 lg:h-14 lg:w-14"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white hover:text-black md:flex lg:right-8 lg:h-14 lg:w-14"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
        {slides.map((s, i) => (
          <button
            key={s.category}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}: ${s.category}`}
            className={cn(
              "h-1 transition-all duration-300",
              i === index ? "w-10 bg-accent" : "w-6 bg-white/40 hover:bg-white/70",
            )}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-8 z-10 hidden items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/60 lg:flex">
        {scrollLabel}
        <span className="block h-10 w-px animate-pulse bg-white/50" />
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

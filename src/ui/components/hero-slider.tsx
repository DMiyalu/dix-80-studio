"use client";

import { useEffect, useState, useCallback } from "react";
import { Container } from "@/src/ui/components/container";
import { cn } from "@/src/ui/lib/cn";
import { useAppDispatch } from "@/src/infrastructure/store/hooks";
import { bookingActions } from "@/src/infrastructure/store/booking-slice";

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
  intervalMs = 6000,
}: {
  slides: HeroSlide[];
  ctaPrimary: string;
  intervalMs?: number;
}) {
  const dispatch = useAppDispatch();
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

  // Strong text shadow so titles stay readable on full-color photos.
  const titleShadow = "[text-shadow:0_2px_24px_rgba(0,0,0,0.55),0_0_2px_rgba(0,0,0,0.35)]";
  const textShadow = "[text-shadow:0_1px_8px_rgba(0,0,0,0.55)]";

  return (
    <section className="relative isolate h-screen min-h-[640px] w-full overflow-hidden bg-black">
      {/* Slides — no full overlay, real colors visible */}
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
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${slide.imageUrl}")` }}
          />
        </div>
      ))}

      {/* Header-only top gradient (for header readability) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-44 bg-gradient-to-b from-black/55 via-black/20 to-transparent"
      />

      {/* Content */}
      <Container className="relative z-[2] flex h-full items-center">
        <div className="w-full text-center">
          <div
            className={cn(
              "mx-auto mb-6 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-white",
              textShadow,
            )}
          >
            <span className="h-px w-10 bg-accent" />
            {current.category}
            <span className="h-px w-10 bg-accent" />
          </div>
          <h1
            key={`t-${index}`}
            className={cn(
              "font-display text-5xl font-semibold leading-[1.05] text-white sm:text-6xl lg:text-7xl xl:text-8xl animate-[fadeUp_700ms_ease-out]",
              titleShadow,
            )}
          >
            {current.title}
          </h1>
          <p
            key={`s-${index}`}
            className={cn(
              "mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/95 sm:text-lg animate-[fadeUp_900ms_ease-out]",
              textShadow,
            )}
          >
            {current.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => dispatch(bookingActions.openSelector())}
              className="inline-flex h-14 cursor-pointer items-center justify-center rounded-full border border-white/60 bg-white/10 px-9 text-sm font-medium uppercase tracking-wide text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/20 hover:shadow-lg hover:shadow-white/20"
            >
              {ctaPrimary}
            </button>
          </div>
        </div>
      </Container>

      {/* Arrows */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white hover:text-black hover:shadow-lg hover:shadow-white/30 md:flex lg:left-8 lg:h-14 lg:w-14"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white hover:text-black hover:shadow-lg hover:shadow-white/30 md:flex lg:right-8 lg:h-14 lg:w-14"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
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
              "h-1 rounded-full transition-all duration-300",
              i === index ? "w-10 bg-accent" : "w-6 bg-white/60 hover:bg-white",
            )}
          />
        ))}
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

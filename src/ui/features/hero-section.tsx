import type { Locale } from "@/src/i18n/config";
import type { Dictionary } from "@/src/i18n/get-dictionary";
import { Container } from "@/src/ui/components/container";
import { ButtonLink } from "@/src/ui/components/button";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2400&q=80";

export function HeroSection({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const base = `/${lang}`;
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden">
      {/* Placeholder background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url("${PLACEHOLDER}")` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/50 to-black"
      />

      <Container className="relative pt-32 pb-24 lg:pb-32">
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-accent">
            <span className="h-px w-10 bg-accent" />
            {dict.hero.eyebrow}
          </div>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
            {dict.hero.title_line1}
            <br />
            <span className="text-accent">{dict.hero.title_line2}</span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            {dict.hero.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href={`${base}/services`} variant="primary" size="lg">
              {dict.hero.cta_primary}
            </ButtonLink>
            <ButtonLink
              href={`${base}/reservation`}
              variant="secondary"
              size="lg"
              className="text-white border-white/30 hover:bg-white hover:text-black"
            >
              {dict.hero.cta_secondary}
            </ButtonLink>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/50 lg:flex">
          {dict.hero.scroll}
          <span className="block h-10 w-px animate-pulse bg-white/40" />
        </div>
      </Container>
    </section>
  );
}

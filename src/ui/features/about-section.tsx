import Image from "next/image";
import type { Locale } from "@/src/i18n/config";
import type { Dictionary } from "@/src/i18n/get-dictionary";
import { Container } from "@/src/ui/components/container";
import { ButtonLink } from "@/src/ui/components/button";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=1600&q=80";

export function AboutSection({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="bg-background py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={PLACEHOLDER}
                alt="Photographer"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-accent">
              <span className="h-px w-8 bg-accent" />
              {dict.about.eyebrow}
            </div>
            <h2 className="font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              {dict.about.title}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {dict.about.desc}
            </p>
            <div className="mt-8">
              <ButtonLink href={`/${lang}/about`} variant="ghost" size="md">
                {dict.about.cta} →
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

import type { Locale } from "@/src/i18n/config";
import type { Dictionary } from "@/src/i18n/get-dictionary";
import { Container } from "@/src/ui/components/container";
import { ButtonLink } from "@/src/ui/components/button";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=2400&q=80";

export function CtaFinalSection({
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <section id="contact" className="relative isolate scroll-mt-28 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url("${PLACEHOLDER}")` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-black/75"
      />
      <Container className="py-28 text-center lg:py-40">
        <h2 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
          {dict.cta_final.title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-white/75 sm:text-lg">
          {dict.cta_final.subtitle}
        </p>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="mailto:contact@80dix.com" variant="primary" size="lg">
            {dict.cta_final.button}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

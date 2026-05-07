import Image from "next/image";
import type { Locale } from "@/src/i18n/config";
import type { Dictionary } from "@/src/i18n/get-dictionary";
import { Container } from "@/src/ui/components/container";
import { BookingTrigger } from "@/src/ui/features/booking-modal/booking-trigger";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?auto=format&fit=crop&w=1600&q=80";

export function StudioSection({
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="bg-surface py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src={PLACEHOLDER}
              alt="Studio"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-accent">
              <span className="h-px w-8 bg-accent" />
              {dict.studio.eyebrow}
            </div>
            <h2 className="font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              {dict.studio.title}
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              {dict.studio.desc}
            </p>

            <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {dict.studio.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-sm text-foreground/90"
                >
                  <span className="mt-2 inline-block h-px w-5 flex-none bg-accent" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <BookingTrigger category="studio" variant="primary" size="lg">
                {dict.studio.cta}
              </BookingTrigger>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

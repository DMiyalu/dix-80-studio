import { Container } from "@/src/ui/components/container";
import { SectionHeader } from "@/src/ui/components/section-header";
import type { ServicePageContent } from "../service-page-content";

export function ServiceFeatures({ content }: { content: ServicePageContent }) {
  return (
    <section className="bg-surface py-24 lg:py-32">
      <Container>
        <SectionHeader title={content.features.title} align="center" />

        <ul className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {content.features.items.map((item, i) => (
            <li
              key={i}
              className="rounded-2xl bg-background p-8 transition-shadow hover:shadow-lg hover:shadow-black/5"
            >
              <div
                aria-hidden
                className="font-display text-3xl font-semibold text-accent"
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.desc}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

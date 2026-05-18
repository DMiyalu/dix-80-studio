import { Container } from "@/src/ui/components/container";
import { SectionHeader } from "@/src/ui/components/section-header";
import type { ServicePageContent } from "../service-page-content";

export function ServiceFaq({ content }: { content: ServicePageContent }) {
  return (
    <section className="bg-background py-24 lg:py-32">
      <Container>
        <SectionHeader title={content.faq.title} align="center" />

        <div className="mx-auto mt-16 max-w-3xl divide-y divide-border rounded-2xl border border-border bg-surface">
          {content.faq.items.map((item, i) => (
            <details key={i} className="group">
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left text-base font-medium text-foreground transition-colors hover:text-accent">
                <span>{item.q}</span>
                <span
                  aria-hidden
                  className="flex h-6 w-6 flex-none items-center justify-center text-accent transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="px-6 pb-5 pt-0 text-sm leading-relaxed text-muted">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

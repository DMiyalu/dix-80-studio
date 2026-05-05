import type { Dictionary } from "@/src/i18n/get-dictionary";
import { Container } from "@/src/ui/components/container";
import { SectionHeader } from "@/src/ui/components/section-header";

export function ProcessSection({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-y border-border bg-surface py-24 lg:py-32">
      <Container>
        <SectionHeader
          eyebrow={dict.process.eyebrow}
          title={dict.process.title}
        />

        <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {dict.process.steps.map((step) => (
            <li key={step.n} className="border-t border-border pt-6">
              <div className="font-display text-5xl font-semibold text-accent">
                {step.n}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {step.t}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {step.d}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

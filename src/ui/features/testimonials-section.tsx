import type { Dictionary } from "@/src/i18n/get-dictionary";
import { Container } from "@/src/ui/components/container";
import { SectionHeader } from "@/src/ui/components/section-header";
import { TestimonialCard } from "@/src/ui/components/testimonial-card";

export function TestimonialsSection({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-background py-24 lg:py-32">
      <Container>
        <SectionHeader
          eyebrow={dict.testimonials.eyebrow}
          title={dict.testimonials.title}
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {dict.testimonials.items.map((t, i) => (
            <TestimonialCard key={i} quote={t.quote} name={t.name} role={t.role} />
          ))}
        </div>
      </Container>
    </section>
  );
}

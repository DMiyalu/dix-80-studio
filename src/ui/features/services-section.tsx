import type { Locale } from "@/src/i18n/config";
import type { Dictionary } from "@/src/i18n/get-dictionary";
import { Container } from "@/src/ui/components/container";
import { SectionHeader } from "@/src/ui/components/section-header";
import { ServiceCard } from "@/src/ui/components/service-card";

const ITEMS: Array<{ key: keyof Dictionary["services"]["items"]; slug: string; img: string }> = [
  { key: "wedding",      slug: "wedding",      img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80" },
  { key: "portrait",     slug: "portrait",     img: "https://images.unsplash.com/photo-1502323777036-f29e3972d82f?auto=format&fit=crop&w=1200&q=80" },
  { key: "anniversaire", slug: "anniversaire", img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80" },
  { key: "grad_series",  slug: "grad-series",  img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80" },
  { key: "corporate",    slug: "corporate",    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80" },
  { key: "sport",        slug: "sport",        img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80" },
  { key: "event",        slug: "event",        img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80" },
  { key: "family",       slug: "family",       img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80" },
];

export function ServicesSection({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const base = `/${lang}`;
  return (
    <section id="services" className="scroll-mt-28 bg-background py-24 lg:py-32">
      <Container>
        <SectionHeader
          eyebrow={dict.services.eyebrow}
          title={dict.services.title}
          subtitle={dict.services.subtitle}
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map(({ key, slug, img }) => {
            const item = dict.services.items[key];
            return (
              <ServiceCard
                key={key}
                href={`${base}/services/${slug}`}
                name={item.name}
                desc={item.desc}
                imageUrl={img}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}

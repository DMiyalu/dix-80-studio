import { Container } from "@/src/ui/components/container";
import { SectionHeader } from "@/src/ui/components/section-header";
import { ServiceCard } from "@/src/ui/components/service-card";
import { getRelatedServices } from "@/src/application/services/service-catalog";
import type { Locale } from "@/src/i18n/config";
import type { Dictionary } from "@/src/i18n/get-dictionary";
import type { BookingCategoryId } from "@/src/core/booking/booking";
import type { ServicePageContent } from "../service-page-content";

export function ServiceRelated({
  lang,
  dict,
  currentId,
  content,
}: {
  lang: Locale;
  dict: Dictionary;
  currentId: BookingCategoryId;
  content: ServicePageContent;
}) {
  const related = getRelatedServices(currentId, 3);
  if (related.length === 0) return null;

  return (
    <section className="bg-surface py-24 lg:py-32">
      <Container>
        <SectionHeader title={content.related.title} align="center" />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((s) => {
            const item =
              dict.services.items[
                s.id as keyof Dictionary["services"]["items"]
              ];
            return (
              <ServiceCard
                key={s.id}
                href={`/${lang}/services/${s.id}`}
                name={item.name}
                desc={item.desc}
                imageUrl={s.heroImage}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}

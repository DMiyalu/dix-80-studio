import { Container } from "@/src/ui/components/container";
import { SectionHeader } from "@/src/ui/components/section-header";
import { BookingTrigger } from "@/src/ui/features/booking-modal/booking-trigger";
import { ButtonLink } from "@/src/ui/components/button";
import { getPackagesForCategory } from "@/src/application/booking/categories";
import { formatCAD } from "@/src/application/booking/pricing";
import type { Locale } from "@/src/i18n/config";
import type { Dictionary } from "@/src/i18n/get-dictionary";
import type { BookingCategoryId } from "@/src/core/booking/booking";
import type { ServicePageCommon, ServicePageContent } from "../service-page-content";

export function ServicePricing({
  lang,
  dict,
  categoryId,
  content,
  common,
}: {
  lang: Locale;
  dict: Dictionary;
  categoryId: BookingCategoryId;
  content: ServicePageContent;
  common: ServicePageCommon;
}) {
  const packages = getPackagesForCategory(categoryId);

  return (
    <section className="bg-surface py-24 lg:py-32">
      <Container>
        <SectionHeader
          eyebrow={content.pricing.eyebrow}
          title={content.pricing.title}
          subtitle={content.pricing.subtitle}
          align="center"
        />

        {packages.length === 0 ? (
          <ContactFallback content={content} common={common} />
        ) : (
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {packages.map((pkg) => {
              const labels = dict.booking.packages[
                pkg.i18nKey as keyof Dictionary["booking"]["packages"]
              ];
              const price =
                pkg.pricing.kind === "hourly"
                  ? pkg.pricing.hourlyRate
                  : pkg.pricing.flatPrice;
              return (
                <article
                  key={pkg.id}
                  className="relative flex h-full flex-col rounded-2xl border border-border bg-background p-6"
                >
                  {pkg.popular && (
                    <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                      {dict.booking.step_package.popular}
                    </span>
                  )}
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {labels.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {labels.desc}
                  </p>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="font-display text-3xl font-semibold text-foreground">
                      {formatCAD(price, lang)}
                    </span>
                    {pkg.pricing.kind === "hourly" && (
                      <span className="text-sm text-muted">
                        {dict.booking.step_package.per_hour}
                      </span>
                    )}
                  </div>
                  <div className="mt-auto pt-8">
                    <BookingTrigger
                      category={categoryId}
                      variant="primary"
                      size="md"
                      className="w-full"
                    >
                      {common.book_now}
                    </BookingTrigger>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}

function ContactFallback({
  content,
  common,
}: {
  content: ServicePageContent;
  common: ServicePageCommon;
}) {
  return (
    <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-border bg-background p-10 text-center">
      <h3 className="font-display text-2xl font-semibold text-foreground">
        {content.pricing.unavailable_title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {content.pricing.unavailable_desc}
      </p>
      <div className="mt-8 flex justify-center">
        <ButtonLink
          href="mailto:petermiyalu22@gmail.com"
          variant="primary"
          size="lg"
        >
          {common.contact_us}
        </ButtonLink>
      </div>
    </div>
  );
}

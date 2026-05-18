import type { Locale } from "@/src/i18n/config";
import type { Dictionary } from "@/src/i18n/get-dictionary";
import type { ServiceCategoryDetails } from "@/src/core/services/service-category-details";
import { Reveal } from "@/src/ui/components/reveal";
import { ServiceHero } from "./sections/service-hero";
import { ServiceFeatures } from "./sections/service-features";
import { ServiceGallery } from "./sections/service-gallery";
import { ServicePricing } from "./sections/service-pricing";
import { ServiceFaq } from "./sections/service-faq";
import { ServiceRelated } from "./sections/service-related";
import { ServiceCta } from "./sections/service-cta";
import { isServicePageKey } from "./service-page-content";

/**
 * Reusable layout for every category landing page.
 * Editing a sub-section here updates all category pages at once.
 *
 * Section order (after hero):
 *   1. Pricing
 *   2. Features ("Ce qui est inclus")
 *   3. Gallery  ("Quelques moments capturés")
 *   4. FAQ
 *   5. Related  ("Autres services")
 *   6. CTA
 */
export function ServicePage({
  lang,
  dict,
  details,
}: {
  lang: Locale;
  dict: Dictionary;
  details: ServiceCategoryDetails;
}) {
  // Defensive: if a category has no content slice yet, render nothing.
  if (!isServicePageKey(dict, details.id)) return null;
  const content = dict.servicePages[details.id];
  const common = dict.servicePages.common;

  return (
    <>
      <ServiceHero
        content={content}
        common={common}
        imageUrl={details.heroImage}
        backHref={`/${lang}#services`}
        categoryId={details.id}
        ctaLabel={dict.hero.cta_primary}
      />
      <Reveal>
        <ServicePricing
          lang={lang}
          dict={dict}
          categoryId={details.id}
          content={content}
          common={common}
        />
      </Reveal>
      <Reveal>
        <ServiceFeatures content={content} />
      </Reveal>
      <Reveal>
        <ServiceGallery content={content} images={details.gallery} />
      </Reveal>
      <Reveal>
        <ServiceFaq content={content} />
      </Reveal>
      <Reveal>
        <ServiceRelated
          lang={lang}
          dict={dict}
          currentId={details.id}
          common={common}
        />
      </Reveal>
      <ServiceCta
        categoryId={details.id}
        content={content}
        backgroundImage={details.heroImage}
      />
    </>
  );
}

import { notFound } from "next/navigation";
import type { Locale } from "@/src/i18n/config";
import { getDictionary, hasLocale } from "@/src/i18n/get-dictionary";
import { HeroSection } from "@/src/ui/features/hero-section";
import { ServicesSection } from "@/src/ui/features/services-section";
import { StudioSection } from "@/src/ui/features/studio-section";
import { GallerySection } from "@/src/ui/features/gallery-section";
import { ProcessSection } from "@/src/ui/features/process-section";
import { TestimonialsSection } from "@/src/ui/features/testimonials-section";
import { AboutSection } from "@/src/ui/features/about-section";
import { CtaFinalSection } from "@/src/ui/features/cta-final-section";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <HeroSection lang={locale} dict={dict} />
      <ServicesSection lang={locale} dict={dict} />
      <StudioSection lang={locale} dict={dict} />
      <GallerySection lang={locale} dict={dict} />
      <ProcessSection dict={dict} />
      <TestimonialsSection dict={dict} />
      <AboutSection lang={locale} dict={dict} />
      <CtaFinalSection lang={locale} dict={dict} />
    </>
  );
}

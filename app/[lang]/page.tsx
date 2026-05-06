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
import { Reveal } from "@/src/ui/components/reveal";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <HeroSection lang={locale} dict={dict} />
      <Reveal><ServicesSection lang={locale} dict={dict} /></Reveal>
      <Reveal><StudioSection lang={locale} dict={dict} /></Reveal>
      <Reveal><GallerySection lang={locale} dict={dict} /></Reveal>
      <Reveal><ProcessSection dict={dict} /></Reveal>
      <Reveal><TestimonialsSection dict={dict} /></Reveal>
      <Reveal><AboutSection lang={locale} dict={dict} /></Reveal>
      <Reveal><CtaFinalSection lang={locale} dict={dict} /></Reveal>
    </>
  );
}

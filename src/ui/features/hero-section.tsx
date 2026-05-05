import type { Locale } from "@/src/i18n/config";
import type { Dictionary } from "@/src/i18n/get-dictionary";
import { HeroSlider, type HeroSlide } from "@/src/ui/components/hero-slider";

export function HeroSection({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const base = `/${lang}`;
  const items = dict.services.items;

  // Each slide reflects a service category (placeholder images for now).
  const slides: HeroSlide[] = [
    {
      category: items.wedding.name,
      title: items.wedding.name,
      subtitle: items.wedding.desc,
      imageUrl:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2400&q=80",
      href: `${base}/services/wedding`,
    },
    {
      category: items.corporate.name,
      title: items.corporate.name,
      subtitle: items.corporate.desc,
      imageUrl:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=80",
      href: `${base}/services/corporate`,
    },
    {
      category: items.sport.name,
      title: items.sport.name,
      subtitle: items.sport.desc,
      imageUrl:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=2400&q=80",
      href: `${base}/services/sport`,
    },
    {
      category: items.portrait.name,
      title: items.portrait.name,
      subtitle: items.portrait.desc,
      imageUrl:
        "https://images.unsplash.com/photo-1502323777036-f29e3972d82f?auto=format&fit=crop&w=2400&q=80",
      href: `${base}/services/portrait`,
    },
    {
      category: items.event.name,
      title: items.event.name,
      subtitle: items.event.desc,
      imageUrl:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2400&q=80",
      href: `${base}/services/event`,
    },
    {
      category: items.family.name,
      title: items.family.name,
      subtitle: items.family.desc,
      imageUrl:
        "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=2400&q=80",
      href: `${base}/services/family`,
    },
  ];

  return (
    <HeroSlider
      slides={slides}
      ctaPrimary={dict.hero.cta_primary}
      ctaSecondary={dict.hero.cta_secondary}
      ctaSecondaryHref={`${base}/reservation`}
      scrollLabel={dict.hero.scroll}
    />
  );
}

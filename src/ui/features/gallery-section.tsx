import Image from "next/image";
import type { Locale } from "@/src/i18n/config";
import type { Dictionary } from "@/src/i18n/get-dictionary";
import { Container } from "@/src/ui/components/container";
import { SectionHeader } from "@/src/ui/components/section-header";
import { ButtonLink } from "@/src/ui/components/button";

const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80", h: "row-span-2" },
  { src: "https://images.unsplash.com/photo-1502323777036-f29e3972d82f?auto=format&fit=crop&w=900&q=80",  h: "row-span-1" },
  { src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",  h: "row-span-1" },
  { src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",  h: "row-span-2" },
  { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",  h: "row-span-1" },
  { src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=80",  h: "row-span-1" },
];

export function GallerySection({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="bg-background py-24 lg:py-32">
      <Container>
        <SectionHeader
          eyebrow={dict.gallery.eyebrow}
          title={dict.gallery.title}
        />

        <div className="mt-16 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] lg:grid-cols-4 lg:auto-rows-[240px]">
          {PHOTOS.map((p, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-xl ${p.h}`}
            >
              <Image
                src={p.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <ButtonLink href={`/${lang}/services`} variant="ghost" size="md">
            {dict.gallery.cta} →
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

import Image from "next/image";
import { Container } from "@/src/ui/components/container";
import { SectionHeader } from "@/src/ui/components/section-header";
import type { ServicePageContent } from "../service-page-content";

export function ServiceGallery({
  content,
  images,
}: {
  content: ServicePageContent;
  images: readonly string[];
}) {
  return (
    <section className="bg-background py-24 lg:py-32">
      <Container>
        <SectionHeader
          title={content.gallery.title}
          subtitle={content.gallery.subtitle}
          align="center"
        />

        <div className="mt-16 grid auto-rows-[200px] grid-cols-2 gap-3 sm:auto-rows-[240px] lg:grid-cols-4 lg:auto-rows-[260px]">
          {images.map((src, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-xl ${
                i % 5 === 0 ? "row-span-2" : "row-span-1"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

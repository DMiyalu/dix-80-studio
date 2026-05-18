import Image from "next/image";
import { Container } from "@/src/ui/components/container";
import type { ServicePageContent } from "../service-page-content";

export function ServiceIntro({
  content,
  imageUrl,
}: {
  content: ServicePageContent;
  imageUrl: string;
}) {
  return (
    <section className="bg-background py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <h2 className="font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              {content.intro.title}
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              {content.intro.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-2xl lg:order-2">
            <Image
              src={imageUrl}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

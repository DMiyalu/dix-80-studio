import Image from "next/image";
import Link from "next/link";
import { Container } from "@/src/ui/components/container";
import { BookingTrigger } from "@/src/ui/features/booking-modal/booking-trigger";
import type { BookingCategoryId } from "@/src/core/booking/booking";
import type { ServicePageCommon, ServicePageContent } from "../service-page-content";

export function ServiceHero({
  content,
  common,
  imageUrl,
  backHref,
  categoryId,
}: {
  content: ServicePageContent;
  common: ServicePageCommon;
  imageUrl: string;
  backHref: string;
  categoryId: BookingCategoryId;
}) {
  return (
    <section className="relative isolate min-h-[70vh] overflow-hidden">
      <Image
        src={imageUrl}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/55" />

      <Container className="flex min-h-[70vh] flex-col justify-end pb-20 pt-32 lg:pb-28 lg:pt-40">
        <Link
          href={backHref}
          className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/80 transition-colors hover:text-white"
        >
          <span className="h-px w-6 bg-white/80" />
          {common.back_to_services}
        </Link>

        <div className="max-w-3xl">
          <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-accent">
            <span className="h-px w-8 bg-accent" />
            {content.hero.eyebrow}
          </div>
          <h1 className="font-display text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
            {content.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {content.hero.subtitle}
          </p>
          <div className="mt-10">
            <BookingTrigger category={categoryId} variant="primary" size="lg">
              {common.book_now}
            </BookingTrigger>
          </div>
        </div>
      </Container>
    </section>
  );
}

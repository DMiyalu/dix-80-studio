import { Container } from "@/src/ui/components/container";
import { BookingTrigger } from "@/src/ui/features/booking-modal/booking-trigger";
import type { BookingCategoryId } from "@/src/core/booking/booking";
import type { ServicePageContent } from "../service-page-content";

export function ServiceCta({
  categoryId,
  content,
  backgroundImage,
}: {
  categoryId: BookingCategoryId;
  content: ServicePageContent;
  backgroundImage: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url("${backgroundImage}")` }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/75" />
      <Container className="py-28 text-center lg:py-40">
        <h2 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
          {content.cta.title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-white/75 sm:text-lg">
          {content.cta.subtitle}
        </p>
        <div className="mt-10 flex justify-center">
          <BookingTrigger category={categoryId} variant="primary" size="lg">
            {content.cta.button}
          </BookingTrigger>
        </div>
      </Container>
    </section>
  );
}

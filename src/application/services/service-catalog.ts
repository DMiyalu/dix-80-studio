import type { ServiceCategoryDetails } from "@/src/core/services/service-category-details";
import type { BookingCategoryId } from "@/src/core/booking/booking";

/**
 * Catalog of category landing pages.
 *
 * Order in this array drives URL generation and the order of "related"
 * categories on each page (excluding the current one).
 */
export const SERVICE_CATALOG: readonly ServiceCategoryDetails[] = [
  {
    id: "wedding",
    heroImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2400&q=80",
    introImage:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1525772764200-be829a350797?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "portrait",
    heroImage:
      "https://images.unsplash.com/photo-1502323777036-f29e3972d82f?auto=format&fit=crop&w=2400&q=80",
    introImage:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502323777036-f29e3972d82f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "corporate",
    heroImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=80",
    introImage:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "sport",
    heroImage:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=2400&q=80",
    introImage:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "event",
    heroImage:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2400&q=80",
    introImage:
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1530023367847-a683933f4172?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "family",
    heroImage:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=2400&q=80",
    introImage:
      "https://images.unsplash.com/photo-1602030638412-bb8dcc0bc8b0?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1602030638412-bb8dcc0bc8b0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484665754804-74b091211472?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?auto=format&fit=crop&w=1200&q=80",
    ],
  },
] as const;

export const SERVICE_SLUGS: readonly BookingCategoryId[] = SERVICE_CATALOG.map(
  (s) => s.id,
);

export function findServiceBySlug(
  slug: string,
): ServiceCategoryDetails | undefined {
  return SERVICE_CATALOG.find((s) => s.id === slug);
}

export function getRelatedServices(
  currentId: BookingCategoryId,
  limit = 3,
): readonly ServiceCategoryDetails[] {
  return SERVICE_CATALOG.filter((s) => s.id !== currentId).slice(0, limit);
}

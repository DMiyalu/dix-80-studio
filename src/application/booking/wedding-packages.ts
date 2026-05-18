import type { Package } from "@/src/core/booking/package";

/** Wedding packages. Times in hours (decimals allowed). */
export const WEDDING_PACKAGES: readonly Package[] = [
  {
    id: "wedding-ceremonie",
    i18nKey: "wedding-ceremonie",
    pricing: { kind: "flat", flatPrice: 450 },
    duration: { kind: "fixed", hours: 2 },
  },
  {
    id: "wedding-reception",
    i18nKey: "wedding-reception",
    pricing: { kind: "flat", flatPrice: 750 },
    duration: { kind: "fixed", hours: 4 },
  },
  {
    id: "wedding-complet",
    i18nKey: "wedding-complet",
    pricing: { kind: "flat", flatPrice: 1100 },
    duration: { kind: "fixed", hours: 8 },
    popular: true,
  },
  {
    id: "wedding-absolu",
    i18nKey: "wedding-absolu",
    pricing: { kind: "flat", flatPrice: 1500 },
    duration: { kind: "fixed", hours: 10 },
  },
] as const;

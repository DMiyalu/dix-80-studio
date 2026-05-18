import type { Package } from "@/src/core/booking/package";

/** Portrait studio packages. */
export const PORTRAIT_PACKAGES: readonly Package[] = [
  {
    id: "portrait-essentiel",
    i18nKey: "portrait-essentiel",
    pricing: { kind: "flat", flatPrice: 150 },
    duration: { kind: "fixed", hours: 0.75 },
  },
  {
    id: "portrait-integrale",
    i18nKey: "portrait-integrale",
    pricing: { kind: "flat", flatPrice: 200 },
    duration: { kind: "fixed", hours: 1 },
    popular: true,
  },
  {
    id: "portrait-absolu",
    i18nKey: "portrait-absolu",
    pricing: { kind: "flat", flatPrice: 250 },
    duration: { kind: "fixed", hours: 1.5 },
  },
] as const;

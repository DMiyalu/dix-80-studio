import type { Package } from "@/src/core/booking/package";

/** Grad Series (graduation portrait) packages. */
export const GRAD_SERIES_PACKAGES: readonly Package[] = [
  {
    id: "grad-one",
    i18nKey: "grad-one",
    pricing: { kind: "flat", flatPrice: 135 },
    duration: { kind: "fixed", hours: 0.75 },
  },
  {
    id: "grad-two",
    i18nKey: "grad-two",
    pricing: { kind: "flat", flatPrice: 180 },
    duration: { kind: "fixed", hours: 1 },
    popular: true,
  },
  {
    id: "grad-three",
    i18nKey: "grad-three",
    pricing: { kind: "flat", flatPrice: 225 },
    duration: { kind: "fixed", hours: 1.5 },
  },
] as const;

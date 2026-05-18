import type { Package } from "@/src/core/booking/package";

/** Birthday / Anniversaire studio packages. */
export const ANNIVERSAIRE_PACKAGES: readonly Package[] = [
  {
    id: "anniversaire-essentiel",
    i18nKey: "anniversaire-essentiel",
    pricing: { kind: "flat", flatPrice: 150 },
    duration: { kind: "fixed", hours: 0.75 },
  },
  {
    id: "anniversaire-absolu",
    i18nKey: "anniversaire-absolu",
    pricing: { kind: "flat", flatPrice: 250 },
    duration: { kind: "fixed", hours: 1.5 },
  },
] as const;

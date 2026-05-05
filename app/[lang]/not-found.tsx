import Link from "next/link";
import type { Locale } from "@/src/i18n/config";
import { hasLocale } from "@/src/i18n/get-dictionary";
import { Container } from "@/src/ui/components/container";
import { ButtonLink } from "@/src/ui/components/button";
import { headers } from "next/headers";

const t = {
  fr: {
    eyebrow: "Erreur 404",
    title: "Page introuvable",
    desc: "La page que vous cherchez n'existe pas ou n'est pas encore disponible.",
    home: "Retour à l'accueil",
    contact: "Nous contacter",
  },
  en: {
    eyebrow: "Error 404",
    title: "Page not found",
    desc: "The page you are looking for doesn't exist or is not available yet.",
    home: "Back to home",
    contact: "Contact us",
  },
} as const;

async function detectLocale(): Promise<Locale> {
  // Try to read locale from URL via referer / x-invoke-path; fallback to fr.
  const h = await headers();
  const url = h.get("x-invoke-path") || h.get("referer") || "";
  const m = url.match(/\/(fr|en)(?:\/|$)/);
  if (m && hasLocale(m[1])) return m[1];
  return "fr";
}

export default async function LangNotFound() {
  const lang = await detectLocale();
  const c = t[lang];

  return (
    <section className="relative flex min-h-[calc(100vh-7rem)] items-center justify-center overflow-hidden bg-background py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(186,30,42,0.08),transparent_60%)]"
      />

      <Container className="relative text-center">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-accent">
          {c.eyebrow}
        </p>
        <h1 className="font-display text-[8rem] font-semibold leading-none tracking-tight text-foreground sm:text-[12rem]">
          <span className="text-accent">4</span>0
          <span className="text-accent">4</span>
        </h1>
        <h2 className="mt-6 font-display text-3xl font-semibold text-foreground sm:text-4xl">
          {c.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
          {c.desc}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href={`/${lang}`} variant="primary" size="lg">
            {c.home}
          </ButtonLink>
          <Link
            href={`/${lang}/contact`}
            className="inline-flex h-14 items-center justify-center rounded-full border border-border bg-surface px-9 text-sm font-medium uppercase tracking-wide text-foreground transition-all hover:border-accent hover:text-accent"
          >
            {c.contact}
          </Link>
        </div>
      </Container>
    </section>
  );
}

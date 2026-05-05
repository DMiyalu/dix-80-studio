import Link from "next/link";
import { Container } from "@/src/ui/components/container";
import { ButtonLink } from "@/src/ui/components/button";

// Generic bilingual 404 (no lang context available here in Next 16 root not-found).
export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* subtle decorative gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(186,30,42,0.08),transparent_60%)]"
      />

      <Container className="relative text-center">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-accent">
          Erreur · Error
        </p>
        <h1 className="font-display text-[8rem] font-semibold leading-none tracking-tight text-foreground sm:text-[12rem]">
          <span className="text-accent">4</span>0
          <span className="text-accent">4</span>
        </h1>
        <h2 className="mt-6 font-display text-3xl font-semibold text-foreground sm:text-4xl">
          Page introuvable
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
          Cette page n&apos;existe pas ou n&apos;est pas encore disponible.
          <br className="hidden sm:block" />
          <span className="text-muted/80">
            This page does not exist or is not available yet.
          </span>
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href="/fr" variant="primary" size="lg">
            Retour à l&apos;accueil
          </ButtonLink>
          <Link
            href="/en"
            className="inline-flex h-14 items-center justify-center rounded-full border border-border bg-surface px-9 text-sm font-medium uppercase tracking-wide text-foreground transition-all hover:border-accent hover:text-accent"
          >
            Back to home
          </Link>
        </div>
      </Container>
    </section>
  );
}

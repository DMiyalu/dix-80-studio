"use client";

import { useAppDispatch, useAppSelector } from "@/src/infrastructure/store/hooks";
import { bookingActions } from "@/src/infrastructure/store/booking-slice";
import { findPackageById } from "@/src/application/booking/studio-packages";
import { Modal } from "@/src/ui/components/modal";
import { Stepper } from "@/src/ui/components/stepper";
import { Button } from "@/src/ui/components/button";
import type { Locale } from "@/src/i18n/config";
import type { Dictionary } from "@/src/i18n/get-dictionary";
import { BookingSummary } from "./booking-summary";
import { StepPackage } from "./steps/step-package";
import { StepDateTime } from "./steps/step-datetime";
import { StepContact } from "./steps/step-contact";
import { contactSchema } from "@/src/application/booking/contact-validation";

/**
 * Orchestrator for the booking flow. Renders the modal shell and the
 * appropriate step. State lives in Redux (booking slice).
 */
export function BookingModal({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const dispatch = useAppDispatch();
  const state = useAppSelector((s) => s.booking);

  if (!state.isOpen || !state.category) return null;

  const t = dict.booking;
  const categoryDict =
    t.categories[state.category as keyof typeof t.categories] ?? t.categories.studio;

  const close = () => dispatch(bookingActions.close());
  const back = () => dispatch(bookingActions.back());

  const pkg = state.packageId ? findPackageById(state.packageId) : null;
  const canNextFromPackage = !!pkg && !!state.durationHours;
  const canNextFromDate = !!state.date && !!state.time;

  const onPrimary = () => {
    if (state.step === "package" && canNextFromPackage) {
      dispatch(bookingActions.next());
    } else if (state.step === "datetime" && canNextFromDate) {
      dispatch(bookingActions.next());
    } else if (state.step === "contact") {
      const parsed = contactSchema.safeParse(state.contact);
      if (!parsed.success) return; // step component shows errors
      dispatch(bookingActions.setStatus({ status: "submitting" }));
      // TODO: backend integration (Firestore booking + Stripe Checkout).
      // For now, simulate a redirect with a small delay.
      setTimeout(() => {
        dispatch(bookingActions.setStatus({ status: "success" }));
        // eslint-disable-next-line no-alert
        alert(
          "Démo : la réservation serait créée et l'utilisateur redirigé vers Stripe Checkout.",
        );
        dispatch(bookingActions.close());
      }, 600);
    }
  };

  const primaryDisabled =
    state.status === "submitting" ||
    (state.step === "package" && !canNextFromPackage) ||
    (state.step === "datetime" && !canNextFromDate);

  const primaryLabel =
    state.status === "submitting"
      ? t.actions.submitting
      : state.step === "contact"
        ? t.actions.pay
        : t.actions.next;

  return (
    <Modal open={state.isOpen} onClose={close} labelledBy="booking-title">
      {/* Header */}
      <header className="flex items-start justify-between gap-4 border-b border-border px-6 py-5 sm:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {categoryDict.subtitle}
          </p>
          <h2
            id="booking-title"
            className="mt-1 font-display text-2xl font-semibold text-foreground sm:text-3xl"
          >
            {categoryDict.title}
          </h2>
        </div>
        <button
          type="button"
          onClick={close}
          aria-label={t.actions.close}
          className="flex-none rounded-full p-2 text-muted transition-colors hover:bg-surface hover:text-foreground"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>
      </header>

      {/* Stepper */}
      <div className="border-b border-border px-6 py-4 sm:px-8">
        <Stepper
          current={state.step}
          steps={[
            { id: "package", label: t.steps.package },
            { id: "datetime", label: t.steps.datetime },
            { id: "contact", label: t.steps.contact },
          ]}
        />
      </div>

      {/* Body: content + sticky summary */}
      <div className="grid flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[1fr_320px]">
        <div className="overflow-y-auto px-6 py-8 sm:px-8">
          {state.step === "package" && <StepPackage dict={dict} />}
          {state.step === "datetime" && <StepDateTime dict={dict} />}
          {state.step === "contact" && <StepContact dict={dict} lang={lang} />}
        </div>
        <aside className="hidden border-l border-border bg-surface lg:block">
          <BookingSummary lang={lang} dict={dict} />
        </aside>
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-between gap-4 border-t border-border bg-surface/60 px-6 py-4 sm:px-8">
        <Button
          type="button"
          variant="ghost"
          size="md"
          onClick={back}
          disabled={state.step === "package" || state.status === "submitting"}
          className={state.step === "package" ? "invisible" : ""}
        >
          ← {t.actions.back}
        </Button>
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={onPrimary}
          disabled={primaryDisabled}
        >
          {primaryLabel} {state.step !== "contact" && "→"}
        </Button>
      </footer>
    </Modal>
  );
}

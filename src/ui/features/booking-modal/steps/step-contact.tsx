"use client";

import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/infrastructure/store/hooks";
import { bookingActions } from "@/src/infrastructure/store/booking-slice";
import {
  contactSchema,
  fieldErrors,
  type ContactErrors,
} from "@/src/application/booking/contact-validation";
import { PhoneInput } from "../phone-input";
import { cn } from "@/src/ui/lib/cn";
import type { Dictionary } from "@/src/i18n/get-dictionary";
import type { Locale } from "@/src/i18n/config";

export function StepContact({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const t = dict.booking.step_contact;
  const errs = dict.booking.errors;
  const dispatch = useAppDispatch();
  const contact = useAppSelector((s) => s.booking.contact);
  const [touched, setTouched] = useState(false);

  const errors: ContactErrors = useMemo(() => {
    if (!touched) return {};
    const r = contactSchema.safeParse(contact);
    return r.success ? {} : fieldErrors(r.error);
  }, [contact, touched]);

  const errLabel = (k: keyof ContactErrors): string | undefined => {
    const code = errors[k];
    if (!code) return undefined;
    return errs[code as keyof typeof errs] ?? code;
  };

  return (
    <form
      onChange={() => setTouched(true)}
      onSubmit={(e) => e.preventDefault()}
      className="space-y-5"
    >
      <header>
        <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
          {t.title}
        </h3>
        <p className="mt-1 text-sm text-muted">{t.subtitle}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label={t.first_name}
          value={contact.firstName}
          error={errLabel("firstName")}
          onChange={(v) =>
            dispatch(bookingActions.updateContact({ firstName: v }))
          }
          autoComplete="given-name"
        />
        <Field
          label={t.last_name}
          value={contact.lastName}
          error={errLabel("lastName")}
          onChange={(v) =>
            dispatch(bookingActions.updateContact({ lastName: v }))
          }
          autoComplete="family-name"
        />
      </div>

      <Field
        label={t.email}
        type="email"
        value={contact.email}
        error={errLabel("email")}
        onChange={(v) => dispatch(bookingActions.updateContact({ email: v }))}
        autoComplete="email"
      />

      <PhoneInput
        country={contact.phoneCountry}
        phone={contact.phone}
        invalid={!!errors.phone}
        errorText={errLabel("phone")}
        label={t.phone}
        countryLabel={t.phone_country}
        searchPlaceholder={t.phone_search}
        lang={lang}
        onChange={(next) =>
          dispatch(bookingActions.updateContact(next))
        }
      />

      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted">
          {t.message}
        </span>
        <textarea
          value={contact.message}
          onChange={(e) =>
            dispatch(
              bookingActions.updateContact({ message: e.target.value }),
            )
          }
          placeholder={t.message_placeholder}
          rows={3}
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground transition-colors focus:border-foreground focus:outline-none"
        />
      </label>

      <label className="flex items-start gap-3 rounded-lg bg-surface p-4">
        <input
          type="checkbox"
          checked={contact.terms}
          onChange={(e) =>
            dispatch(
              bookingActions.updateContact({ terms: e.target.checked }),
            )
          }
          className="mt-0.5 h-4 w-4 flex-none accent-accent"
        />
        <span className="text-sm text-foreground">{t.terms}</span>
      </label>
      {errLabel("terms") && (
        <p className="text-xs text-accent">{errLabel("terms")}</p>
      )}

      <p className="text-xs leading-relaxed text-muted">{t.refund_note}</p>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  error,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className={cn(
          "w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground transition-colors focus:outline-none",
          error
            ? "border-accent focus:border-accent"
            : "border-border focus:border-foreground",
        )}
      />
      {error && <span className="mt-1 block text-xs text-accent">{error}</span>}
    </label>
  );
}

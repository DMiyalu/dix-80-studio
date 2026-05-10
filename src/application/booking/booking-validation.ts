import { z } from "zod";
import { contactSchema } from "./contact-validation";
import { findPackageById, allowedDurations } from "./studio-packages";
import { findCategory } from "./categories";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

/**
 * Server-side validation of a booking submission.
 * Trust nothing from the client: package id, category, duration are all
 * re-validated against the local registries.
 */
export const bookingSubmissionSchema = z
  .object({
    category: z.string().min(1),
    packageId: z.string().min(1),
    durationHours: z.number().int().positive(),
    date: z.string().regex(DATE_RE, "invalid_date"),
    time: z.string().regex(TIME_RE, "invalid_time"),
    contact: contactSchema,
  })
  .superRefine((val, ctx) => {
    const cat = findCategory(val.category);
    if (!cat) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["category"],
        message: "unknown_category",
      });
      return;
    }
    if (!cat.available) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["category"],
        message: "category_unavailable",
      });
    }
    const pkg = findPackageById(val.packageId);
    if (!pkg) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["packageId"],
        message: "unknown_package",
      });
      return;
    }
    if (!allowedDurations(pkg).includes(val.durationHours)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["durationHours"],
        message: "invalid_duration",
      });
    }
    // Date must not be in the past (compare as local Montreal day).
    if (isPastDate(val.date)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["date"],
        message: "date_in_past",
      });
    }
  });

export type BookingSubmission = z.infer<typeof bookingSubmissionSchema>;

function isPastDate(dateISO: string): boolean {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return dateISO < `${yyyy}-${mm}-${dd}`;
}

import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

const ISO2 = /^[A-Z]{2}$/;

const baseSchema = z.object({
  firstName: z.string().trim().min(1, "required"),
  lastName: z.string().trim().min(1, "required"),
  email: z.string().email("invalid_email"),
  phoneCountry: z.string().regex(ISO2, "required"),
  phone: z.string().min(1, "required"),
  message: z.string().max(2000).optional().default(""),
  terms: z.literal(true, { message: "must_accept" }),
});

export const contactSchema = baseSchema.superRefine((val, ctx) => {
  if (!validatePhone(val.phone, val.phoneCountry)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["phone"],
      message: "invalid_phone",
    });
  }
});

export type ContactSchema = z.infer<typeof contactSchema>;

export function validatePhone(phone: string, country: string): boolean {
  if (!phone) return false;
  try {
    return isValidPhoneNumber(phone, country as never);
  } catch {
    return false;
  }
}

export type ContactErrors = Partial<Record<keyof ContactSchema, string>>;

export function fieldErrors(zodErr: z.ZodError): ContactErrors {
  const out: ContactErrors = {};
  for (const issue of zodErr.issues) {
    const key = issue.path[0] as keyof ContactSchema | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

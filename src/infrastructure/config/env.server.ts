import "server-only";
import { z } from "zod";

/**
 * Server-side environment validation.
 * Loaded only on the server (do not import in client components).
 */
const serverSchema = z.object({
  // Firebase Admin (service account)
  FIREBASE_PROJECT_ID: z.string().min(1),
  FIREBASE_CLIENT_EMAIL: z.string().email(),
  FIREBASE_PRIVATE_KEY: z.string().min(1),

  // Stripe (optional until enabled)
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),

  // Mail
  RESEND_API_KEY: z.string().optional(),
  MAIL_FROM: z.string().optional(),
});

const parsed = serverSchema.safeParse({
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  MAIL_FROM: process.env.MAIL_FROM,
});

if (!parsed.success) {
  // Don't crash at import time during build/dev; surface a clear error when consumed.
  // eslint-disable-next-line no-console
  console.warn(
    "[env] Server environment is incomplete. Some features (Firebase Admin, Stripe, Mail) may not work.\n" +
      JSON.stringify(parsed.error.flatten().fieldErrors, null, 2),
  );
}

export const serverEnv = parsed.success
  ? parsed.data
  : (parsed.data ?? ({} as z.infer<typeof serverSchema>));

export function requireServerEnv(): z.infer<typeof serverSchema> {
  if (!parsed.success) {
    throw new Error(
      "Missing required server environment variables. Check .env.local.",
    );
  }
  return parsed.data;
}

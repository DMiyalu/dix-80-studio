import "server-only";
import {
  cert,
  getApp,
  getApps,
  initializeApp,
  type App,
} from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { requireServerEnv } from "@/src/infrastructure/config/env.server";

/**
 * Firebase Admin SDK (server-only).
 * Initialised lazily so module import doesn't fail when env vars are missing
 * (e.g. during initial scaffolding or static analysis).
 */
const APP_NAME = "dix80-admin";

function initAdminApp(): App {
  if (getApps().some((a) => a.name === APP_NAME)) {
    return getApp(APP_NAME);
  }
  const env = requireServerEnv();
  return initializeApp(
    {
      credential: cert({
        projectId: env.FIREBASE_PROJECT_ID,
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
        // CI/hosting providers often escape newlines as `\n`; restore them.
        privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
      projectId: env.FIREBASE_PROJECT_ID,
    },
    APP_NAME,
  );
}

export function adminApp(): App {
  return initAdminApp();
}

export function adminDb(): Firestore {
  return getFirestore(initAdminApp());
}

import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { clientEnv } from "@/src/infrastructure/config/env.client";

/**
 * Firebase Client SDK. Safe to import from client components.
 * Auth is intentionally not initialised yet (Firestore-only for now).
 */
function clientApp(): FirebaseApp {
  if (getApps().length) return getApp();
  return initializeApp({
    apiKey: clientEnv.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: clientEnv.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: clientEnv.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: clientEnv.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: clientEnv.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: clientEnv.NEXT_PUBLIC_FIREBASE_APP_ID,
  });
}

export function clientDb(): Firestore {
  return getFirestore(clientApp());
}

import { NextResponse } from "next/server";
import { adminDb } from "@/src/infrastructure/persistence/firebase/firebase-admin";

/**
 * Health check for Firebase Admin connectivity.
 * Performs a write + read on `_health/ping` to validate credentials,
 * project access, and Firestore availability end-to-end.
 *
 * GET /api/health/firebase
 */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const startedAt = Date.now();
  try {
    const db = adminDb();
    const ref = db.collection("_health").doc("ping");
    const payload = { at: new Date().toISOString(), source: "next-route" };

    await ref.set(payload, { merge: true });
    const snap = await ref.get();

    return NextResponse.json({
      ok: true,
      projectId: process.env.FIREBASE_PROJECT_ID ?? null,
      latencyMs: Date.now() - startedAt,
      doc: snap.data() ?? null,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      {
        ok: false,
        latencyMs: Date.now() - startedAt,
        error: message,
        hint:
          "Vérifie FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL et FIREBASE_PRIVATE_KEY dans .env.local. " +
          "Vérifie aussi que la base Firestore est créée dans la console Firebase.",
      },
      { status: 500 },
    );
  }
}

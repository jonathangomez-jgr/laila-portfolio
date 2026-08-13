// Session store server-side, indexado por un session ID corto.
// El flowInterviewState de Salesforce mide ~3.8 KB — no cabe en una cookie
// (límite ~4 KB); incluso comprimido se pasa (~4.8 KB). Por eso el estado
// completo vive en un Map en memoria del servidor y la cookie solo lleva un
// ID aleatorio de 32 bytes (64 chars hex).
//
// El store se ancla a `globalThis` para sobrevivir al Hot Module Reload de
// Next.js en desarrollo. En producción con múltiples réplicas habría que
// intercambiarlo por Redis / KV / DB — la interfaz es la misma.

import { randomBytes } from "node:crypto";
import type { SurveySession } from "@/lib/salesforce/feedbackManagement";

const COOKIE_NAME = "sf_survey_session";
const TTL_MS = 60 * 60 * 2 * 1000;

type StoredSession = SurveySession & { expiresAt: number };

type Store = Map<string, StoredSession>;

function getStore(): Store {
  const g = globalThis as unknown as { __sfSurveyStore?: Store };
  if (!g.__sfSurveyStore) {
    g.__sfSurveyStore = new Map();
  }
  return g.__sfSurveyStore;
}

function newSessionId(): string {
  return randomBytes(32).toString("hex");
}

function sweepExpired(store: Store): void {
  const now = Date.now();
  for (const [id, entry] of store) {
    if (entry.expiresAt <= now) store.delete(id);
  }
}

export function saveSession(session: SurveySession): string {
  const store = getStore();
  sweepExpired(store);
  const id = newSessionId();
  store.set(id, { ...session, expiresAt: Date.now() + TTL_MS });
  return id;
}

export function loadSession(id: string): SurveySession | null {
  const store = getStore();
  const entry = store.get(id);
  if (!entry) return null;
  if (entry.expiresAt <= Date.now()) {
    store.delete(id);
    return null;
  }
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    expiresAt: _expiresAt,
    ...session
  } = entry;
  return session;
}

export function updateSession(id: string, session: SurveySession): void {
  const store = getStore();
  store.set(id, { ...session, expiresAt: Date.now() + TTL_MS });
}

export const SESSION_COOKIE = {
  name: COOKIE_NAME,
  options: {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.floor(TTL_MS / 1000),
  },
};

// Sesión firmada en cookie httpOnly.
// La sesión guarda { invitationId, invitationUuid, flowInterviewState, responseId, languageCode }.
// No es secreto (Salesforce ya conoce esos IDs) — la firma HMAC evita tampering.

import { createHmac, timingSafeEqual } from "node:crypto";
import type { SurveySession } from "@/lib/salesforce/feedbackManagement";

const COOKIE_NAME = "sf_survey_session";
const MAX_AGE_SECONDS = 60 * 60 * 2;

function getSecret(): Buffer {
  const raw = process.env.SURVEY_SESSION_SECRET;
  if (!raw || raw.length < 32) {
    throw new Error(
      "SURVEY_SESSION_SECRET missing or too short (>= 32 chars required)",
    );
  }
  return Buffer.from(raw, "utf8");
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function encodeSession(session: SurveySession): string {
  const payload = Buffer.from(JSON.stringify(session), "utf8").toString(
    "base64url",
  );
  const sig = sign(payload);
  return `${payload}.${sig}`;
}

export function decodeSession(raw: string): SurveySession | null {
  const parts = raw.split(".");
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return null;
  if (!timingSafeEqual(a, b)) return null;
  try {
    const json = Buffer.from(payload, "base64url").toString("utf8");
    return JSON.parse(json) as SurveySession;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE = {
  name: COOKIE_NAME,
  options: {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  },
};

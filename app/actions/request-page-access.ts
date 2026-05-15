"use server";

import { createPageAccessRecord } from "../../lib/salesforce";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type RequestPageAccessResult =
  | { success: true }
  | { success: false; message: string };

export async function requestPageAccess(
  email: string,
  path: string,
): Promise<RequestPageAccessResult> {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPath = path.trim();

  if (!EMAIL_PATTERN.test(normalizedEmail)) {
    return {
      success: false,
      message:
        "Ups.. algo no salió como lo esperábamos. Vuelve a intentarlo más tarde o puedes mandar un correo a jonathan.gomez@salesforce.com",
    };
  }

  if (!normalizedPath.startsWith("/")) {
    return {
      success: false,
      message:
        "Ups.. algo no salió como lo esperábamos. Vuelve a intentarlo más tarde o puedes mandar un correo a jonathan.gomez@salesforce.com",
    };
  }

  try {
    await createPageAccessRecord(normalizedEmail, normalizedPath);
    return { success: true };
  } catch {
    return {
      success: false,
      message:
        "Ups.. algo no salió como lo esperábamos. Vuelve a intentarlo más tarde o puedes mandar un correo a jonathan.gomez@salesforce.com",
    };
  }
}

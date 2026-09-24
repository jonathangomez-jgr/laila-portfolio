"use server";

import { cookies } from "next/headers";
import {
  DELIVERABLE_COOKIE,
  DELIVERABLE_COOKIE_MAX_AGE,
  DELIVERABLE_PASSCODE,
} from "./passcode";

export async function verifyDeliverablePasscode(_slug: string, passcode: string) {
  if (passcode !== DELIVERABLE_PASSCODE) {
    return { success: false };
  }

  const cookieStore = await cookies();
  cookieStore.set(DELIVERABLE_COOKIE, "granted", {
    httpOnly: true,
    path: `/`,
    maxAge: DELIVERABLE_COOKIE_MAX_AGE,
  });

  return { success: true };
}

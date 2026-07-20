"use server";

import { cookies } from "next/headers";
import {
  SECTION_COOKIE,
  SECTION_COOKIE_MAX_AGE,
  SECTION_PASSCODE,
} from "./passcode";

export async function verifyProjectsSectionPasscode(
  _slug: string,
  passcode: string,
) {
  if (passcode !== SECTION_PASSCODE) {
    return { success: false };
  }

  const cookieStore = await cookies();
  cookieStore.set(SECTION_COOKIE, "granted", {
    httpOnly: true,
    path: `/`,
    maxAge: SECTION_COOKIE_MAX_AGE,
  });

  return { success: true };
}

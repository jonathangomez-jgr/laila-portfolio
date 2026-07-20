"use server";

import { cookies } from "next/headers";
import { customerProjects } from "@/data/customerProjects";
import {
  SECTION_COOKIE,
  SECTION_COOKIE_MAX_AGE,
  SECTION_PASSCODE,
} from "../passcode";

export async function verifyProjectPasscode(slug: string, passcode: string) {
  const project = customerProjects.find((p) => p.slug === slug);
  if (!project) return { success: false };

  const isMaster = passcode === SECTION_PASSCODE;
  const isOwn = project.passcode === passcode;

  if (!isMaster && !isOwn) {
    return { success: false };
  }

  const cookieStore = await cookies();
  cookieStore.set(`project-access-${slug}`, "granted", {
    httpOnly: true,
    path: `/`,
    maxAge: SECTION_COOKIE_MAX_AGE,
  });

  if (isMaster) {
    cookieStore.set(SECTION_COOKIE, "granted", {
      httpOnly: true,
      path: `/`,
      maxAge: SECTION_COOKIE_MAX_AGE,
    });
  }

  return { success: true };
}

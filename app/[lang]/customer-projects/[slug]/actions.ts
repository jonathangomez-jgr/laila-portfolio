"use server";

import { cookies } from "next/headers";
import { customerProjects } from "@/data/customerProjects";

export async function verifyProjectPasscode(slug: string, passcode: string) {
  const project = customerProjects.find((p) => p.slug === slug);

  if (!project || project.passcode !== passcode) {
    return { success: false };
  }

  const cookieStore = await cookies();
  cookieStore.set(`project-access-${slug}`, "granted", {
    httpOnly: true,
    path: `/`,
    maxAge: 60 * 60 * 8, // 8 horas
  });

  return { success: true };
}

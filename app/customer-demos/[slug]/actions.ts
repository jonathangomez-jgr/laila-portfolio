"use server";

import { cookies } from "next/headers";
import { customerDemos } from "../../../data/customerDemos";

export async function verifyPasscode(slug: string, passcode: string) {
  const demo = customerDemos.find((d) => d.slug === slug);

  if (!demo || demo.passcode !== passcode) {
    return { success: false };
  }

  const cookieStore = await cookies();
  cookieStore.set(`demo-access-${slug}`, "granted", {
    httpOnly: true,
    path: `/customer-demos/${slug}`,
    maxAge: 60 * 60 * 8, // 8 horas
  });

  return { success: true };
}

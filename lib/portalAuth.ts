import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";
import { sfInvoke, sfQuery, sfUpdate } from "./salesforce";

export type PortalRole = "Salesforce" | "Partner" | "Client";

export type PortalUser = {
  id: string;
  email: string;
  name: string;
  role: PortalRole;
  company: string | null;
  projects: string[];
};

type PortalAccessRow = {
  Id: string;
  JGR_FDE_Email__c: string;
  JGR_FDE_Full_Name__c: string;
  JGR_FDE_Role__c: PortalRole;
  JGR_FDE_Company__c: string | null;
  JGR_FDE_Projects__c: string | null;
  JGR_FDE_Is_Active__c: boolean;
};

const SESSION_COOKIE = "portal_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24; // 24h
const MAGIC_TTL_SECONDS = 60 * 15; // 15 min

function getSecret(): Uint8Array {
  const raw = process.env.PORTAL_JWT_SECRET;
  if (!raw) throw new Error("PORTAL_JWT_SECRET is not configured");
  return new TextEncoder().encode(raw);
}

function getBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_PORTAL_BASE_URL ?? "http://localhost:3000"
  ).replace(/\/$/, "");
}

function toPortalUser(row: PortalAccessRow): PortalUser {
  return {
    id: row.Id,
    email: row.JGR_FDE_Email__c,
    name: row.JGR_FDE_Full_Name__c,
    role: row.JGR_FDE_Role__c,
    company: row.JGR_FDE_Company__c,
    projects: (row.JGR_FDE_Projects__c ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  };
}

function escapeSoql(value: string): string {
  return value.replace(/'/g, "\\'");
}

export async function findUserByEmail(
  email: string,
): Promise<PortalUser | null> {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return null;

  const rows = await sfQuery<PortalAccessRow>(
    `SELECT Id, JGR_FDE_Email__c, JGR_FDE_Full_Name__c, JGR_FDE_Role__c,
            JGR_FDE_Company__c, JGR_FDE_Projects__c, JGR_FDE_Is_Active__c
     FROM JGR_FDE_Portal_Access__c
     WHERE JGR_FDE_Email__c = '${escapeSoql(normalized)}'
     AND JGR_FDE_Is_Active__c = true
     LIMIT 1`,
  );

  if (rows.length === 0) return null;
  return toPortalUser(rows[0]);
}

export async function sendMagicLink(
  user: PortalUser,
  returnTo: string,
  projectName: string,
): Promise<void> {
  const token = await new SignJWT({
    email: user.email,
    name: user.name,
    role: user.role,
    projects: user.projects,
    typ: "magic",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAGIC_TTL_SECONDS}s`)
    .sign(getSecret());

  // Sanitize returnTo: solo paths internos.
  const safeReturnTo = returnTo.startsWith("/") ? returnTo : "/portal";
  const magicLink = `${getBaseUrl()}/api/portal/auth/verify?token=${encodeURIComponent(
    token,
  )}&returnTo=${encodeURIComponent(safeReturnTo)}`;

  await sfInvoke("FDE_PortalAccess_SendMagicLink", [
    {
      email: user.email,
      fullName: user.name,
      projectName,
      magicLink,
    },
  ]);
}

export async function verifyMagicToken(
  token: string,
): Promise<PortalUser | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (payload.typ !== "magic") return null;
    const email = payload.email as string;
    if (!email) return null;
    return await findUserByEmail(email);
  } catch {
    return null;
  }
}

type SessionPayload = JWTPayload & {
  id: string;
  email: string;
  name: string;
  role: PortalRole;
  company: string | null;
  projects: string[];
};

export async function setSessionCookie(user: PortalUser): Promise<void> {
  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    company: user.company,
    projects: user.projects,
    typ: "session",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecret());

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function getCurrentUser(): Promise<PortalUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (payload.typ !== "session") return null;
    const p = payload as SessionPayload;
    return {
      id: p.id,
      email: p.email,
      name: p.name,
      role: p.role,
      company: p.company,
      projects: p.projects ?? [],
    };
  } catch {
    return null;
  }
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function updateLastLogin(userId: string): Promise<void> {
  try {
    await sfUpdate("JGR_FDE_Portal_Access__c", userId, {
      JGR_FDE_Last_Login__c: new Date().toISOString(),
    });
  } catch (err) {
    // non-blocking · solo loguear
    console.error("updateLastLogin failed:", err);
  }
}

export function userHasAccessToSlug(user: PortalUser, slug: string): boolean {
  if (!slug) return false;
  return user.projects.includes(slug);
}

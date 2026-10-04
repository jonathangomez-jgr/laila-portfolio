import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, type PortalRole } from "@/lib/portalAuth";
import { sfCreate, sfQuery, sfUpdate } from "@/lib/salesforce";

export const dynamic = "force-dynamic";

type AccessRow = {
  Id: string;
  JGR_FDE_Email__c: string;
  JGR_FDE_Full_Name__c: string;
  JGR_FDE_Role__c: PortalRole;
  JGR_FDE_Company__c: string | null;
  JGR_FDE_Projects__c: string | null;
  JGR_FDE_Is_Active__c: boolean;
  JGR_FDE_Last_Login__c: string | null;
};

function escapeSoql(value: string): string {
  return value.replace(/'/g, "\\'");
}

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (user.role !== "Salesforce") {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const slug = request.nextUrl.searchParams.get("slug")?.trim() ?? "";
  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }

  const rows = await sfQuery<AccessRow>(
    `SELECT Id, JGR_FDE_Email__c, JGR_FDE_Full_Name__c, JGR_FDE_Role__c,
            JGR_FDE_Company__c, JGR_FDE_Projects__c, JGR_FDE_Is_Active__c,
            JGR_FDE_Last_Login__c
     FROM JGR_FDE_Portal_Access__c
     WHERE JGR_FDE_Projects__c LIKE '%${escapeSoql(slug)}%'
     ORDER BY JGR_FDE_Role__c, JGR_FDE_Full_Name__c`,
  );

  const insiders = rows.map((r) => ({
    id: r.Id,
    email: r.JGR_FDE_Email__c,
    fullName: r.JGR_FDE_Full_Name__c,
    role: r.JGR_FDE_Role__c,
    company: r.JGR_FDE_Company__c,
    projects: (r.JGR_FDE_Projects__c ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    isActive: r.JGR_FDE_Is_Active__c,
    lastLogin: r.JGR_FDE_Last_Login__c,
  }));

  return NextResponse.json({ insiders });
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (user.role !== "Salesforce") {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    email?: string;
    fullName?: string;
    role?: PortalRole;
    company?: string;
    slug?: string;
  };

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  const role = body.role;
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const slug = typeof body.slug === "string" ? body.slug.trim() : "";

  if (!email || !fullName || !slug) {
    return NextResponse.json(
      { error: "email, fullName and slug are required" },
      { status: 400 },
    );
  }
  if (role !== "Salesforce" && role !== "Partner" && role !== "Client") {
    return NextResponse.json({ error: "invalid role" }, { status: 400 });
  }

  const existing = await sfQuery<{ Id: string; JGR_FDE_Projects__c: string | null }>(
    `SELECT Id, JGR_FDE_Projects__c
     FROM JGR_FDE_Portal_Access__c
     WHERE JGR_FDE_Email__c = '${escapeSoql(email)}' LIMIT 1`,
  );

  if (existing.length > 0) {
    const row = existing[0];
    const currentProjects = (row.JGR_FDE_Projects__c ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!currentProjects.includes(slug)) currentProjects.push(slug);
    await sfUpdate("JGR_FDE_Portal_Access__c", row.Id, {
      JGR_FDE_Full_Name__c: fullName,
      JGR_FDE_Role__c: role,
      JGR_FDE_Company__c: company || null,
      JGR_FDE_Projects__c: currentProjects.join(","),
      JGR_FDE_Is_Active__c: true,
    });
    return NextResponse.json({ ok: true, id: row.Id, created: false });
  }

  const result = await sfCreate("JGR_FDE_Portal_Access__c", {
    JGR_FDE_Email__c: email,
    JGR_FDE_Full_Name__c: fullName,
    JGR_FDE_Role__c: role,
    JGR_FDE_Company__c: company || null,
    JGR_FDE_Projects__c: slug,
    JGR_FDE_Is_Active__c: true,
  });

  return NextResponse.json({ ok: true, id: result.id, created: true });
}

export async function PATCH(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (user.role !== "Salesforce") {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    id?: string;
    isActive?: boolean;
  };
  const id = typeof body.id === "string" ? body.id : "";
  const isActive = typeof body.isActive === "boolean" ? body.isActive : null;

  if (!id || isActive === null) {
    return NextResponse.json(
      { error: "id and isActive are required" },
      { status: 400 },
    );
  }

  await sfUpdate("JGR_FDE_Portal_Access__c", id, {
    JGR_FDE_Is_Active__c: isActive,
  });

  return NextResponse.json({ ok: true });
}

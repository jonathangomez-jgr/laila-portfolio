import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, userHasAccessToSlug } from "@/lib/portalAuth";
import { sfQuery, sfUpsert } from "@/lib/salesforce";

export const dynamic = "force-dynamic";

type OverrideRow = {
  JGR_FDE_Activity_Id__c: string;
  JGR_FDE_Status__c: string;
  JGR_FDE_Progress_Percent__c: number;
  JGR_FDE_Updated_By_Name__c: string | null;
  JGR_FDE_Updated_By_Email__c: string | null;
  LastModifiedDate: string;
};

const VALID_STATUS = new Set([
  "not-started",
  "in-progress",
  "blocked",
  "done",
]);

function escapeSoql(value: string): string {
  return value.replace(/'/g, "\\'");
}

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const slug = request.nextUrl.searchParams.get("slug")?.trim() ?? "";
  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }
  if (!userHasAccessToSlug(user, slug)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const rows = await sfQuery<OverrideRow>(
    `SELECT JGR_FDE_Activity_Id__c, JGR_FDE_Status__c, JGR_FDE_Progress_Percent__c,
            JGR_FDE_Updated_By_Name__c, JGR_FDE_Updated_By_Email__c, LastModifiedDate
     FROM JGR_FDE_Plan_Override__c
     WHERE JGR_FDE_Project_Slug__c = '${escapeSoql(slug)}'`,
  );

  const overrides = rows.map((r) => ({
    activityId: r.JGR_FDE_Activity_Id__c,
    status: r.JGR_FDE_Status__c,
    progressPercent: r.JGR_FDE_Progress_Percent__c,
    updatedBy: r.JGR_FDE_Updated_By_Name__c,
    updatedByEmail: r.JGR_FDE_Updated_By_Email__c,
    updatedAt: r.LastModifiedDate,
  }));

  return NextResponse.json({ overrides });
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (user.role === "Client") {
    return NextResponse.json(
      { error: "role not allowed to edit" },
      { status: 403 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as {
    slug?: string;
    activityId?: string;
    status?: string;
    progressPercent?: number;
  };

  const slug = typeof body.slug === "string" ? body.slug.trim() : "";
  const activityId =
    typeof body.activityId === "string" ? body.activityId.trim() : "";
  const status = typeof body.status === "string" ? body.status : "";
  const progressPercent =
    typeof body.progressPercent === "number" ? body.progressPercent : -1;

  if (!slug || !activityId) {
    return NextResponse.json(
      { error: "slug and activityId are required" },
      { status: 400 },
    );
  }
  if (!VALID_STATUS.has(status)) {
    return NextResponse.json({ error: "invalid status" }, { status: 400 });
  }
  if (progressPercent < 0 || progressPercent > 100) {
    return NextResponse.json(
      { error: "progressPercent must be between 0 and 100" },
      { status: 400 },
    );
  }
  if (!userHasAccessToSlug(user, slug)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const key = `${slug}:${activityId}`;
  await sfUpsert(
    "JGR_FDE_Plan_Override__c",
    "JGR_FDE_Key__c",
    key,
    {
      JGR_FDE_Project_Slug__c: slug,
      JGR_FDE_Activity_Id__c: activityId,
      JGR_FDE_Status__c: status,
      JGR_FDE_Progress_Percent__c: progressPercent,
      JGR_FDE_Updated_By_Name__c: user.name,
      JGR_FDE_Updated_By_Email__c: user.email,
    },
  );

  return NextResponse.json({
    ok: true,
    override: {
      activityId,
      status,
      progressPercent,
      updatedBy: user.name,
      updatedByEmail: user.email,
      updatedAt: new Date().toISOString(),
    },
  });
}

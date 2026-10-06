import { NextRequest, NextResponse } from "next/server";
import { createTestExecution } from "@/lib/salesforce/fdeTracker";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // slug viene por query solo para auditoría futura — createTestExecution no
    // lo necesita porque TestExecution se ancla al TestCase (que ya está scopeado
    // por su Project).
    const _slug = request.nextUrl.searchParams.get("slug")?.trim() ?? "";
    void _slug;

    const body = await request.json();
    const id = await createTestExecution({
      testCaseId: body.testCaseId,
      environment: body.environment,
      agentVersion: body.agentVersion ?? null,
      agentBuild:
        body.agentBuild === "" || body.agentBuild == null
          ? null
          : Number(body.agentBuild),
      status: body.status,
      actualResult: body.actualResult ?? "",
      defectNotes: body.defectNotes,
      executedByName: body.executedByName || "Anónimo",
      transcript: body.transcript,
    });
    return NextResponse.json({ id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

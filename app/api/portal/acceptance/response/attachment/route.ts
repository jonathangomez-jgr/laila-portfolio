import { NextRequest, NextResponse } from "next/server";
import { sfUploadFileToRecord } from "@/lib/salesforce";
import { getCurrentUser } from "@/lib/portalAuth";
import { getEvaluationRoleByResponseId } from "@/lib/salesforce/acceptanceWizard";

export const dynamic = "force-dynamic";

/**
 * POST /api/portal/acceptance/response/attachment?responseId=...
 * multipart/form-data: file (binary) · filename · contentType
 *
 * Sube un archivo como ContentDocumentLink al Response record. Reutiliza
 * sfUploadFileToRecord del patrón de test-matrix.
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    const responseId = request.nextUrl.searchParams.get("responseId")?.trim();
    if (!responseId) {
      return NextResponse.json(
        { error: "responseId required" },
        { status: 400 },
      );
    }

    // Role guard: solo usuarios del mismo rol pueden adjuntar a la eval.
    const evalRole = await getEvaluationRoleByResponseId(responseId);
    if (evalRole === undefined) {
      return NextResponse.json(
        { error: "response not found" },
        { status: 404 },
      );
    }
    if (evalRole !== user.role) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "file field required (binary)" },
        { status: 400 },
      );
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    const uploaded = await sfUploadFileToRecord(
      responseId,
      file.name,
      file.type || "application/octet-stream",
      bytes,
    );
    return NextResponse.json({ uploaded });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

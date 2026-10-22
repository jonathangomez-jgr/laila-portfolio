import { NextRequest, NextResponse } from "next/server";
import { sfUploadFileToRecord, sfQuery } from "@/lib/salesforce";
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

/**
 * GET /api/portal/acceptance/response/attachment?responseId=...
 * Returns the ContentDocumentLink + ContentDocument records attached to the response.
 */
export async function GET(request: NextRequest) {
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

    const rows = await sfQuery<{
      Id: string;
      ContentDocumentId: string;
      ContentDocument: {
        Title: string;
        FileType: string | null;
        ContentSize: number | null;
        CreatedDate: string;
      };
    }>(
      `SELECT Id, ContentDocumentId, ContentDocument.Title, ContentDocument.FileType, ContentDocument.ContentSize, ContentDocument.CreatedDate
       FROM ContentDocumentLink
       WHERE LinkedEntityId = '${responseId}'
       ORDER BY ContentDocument.CreatedDate DESC`,
    );
    return NextResponse.json({
      attachments: rows.map((r) => ({
        linkId: r.Id,
        contentDocumentId: r.ContentDocumentId,
        title: r.ContentDocument.Title,
        fileType: r.ContentDocument.FileType,
        size: r.ContentDocument.ContentSize,
        createdDate: r.ContentDocument.CreatedDate,
      })),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { sfUploadFileToRecord, sfFetchFileBytes } from "@/lib/salesforce";
import { getCurrentUser } from "@/lib/portalAuth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_FILES_PER_UPLOAD = 5;
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_MIME_PREFIXES = ["image/", "application/pdf", "text/"];

function mimeOk(type: string): boolean {
  if (!type) return false;
  return ALLOWED_MIME_PREFIXES.some((p) => type.startsWith(p));
}

/**
 * POST — multipart form-data: executionId + files[]
 * Uploads each file to Salesforce ContentVersion and links to the execution.
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Sesión no autenticada." }, { status: 401 });
    }
    const form = await request.formData();
    const executionId = form.get("executionId");
    if (typeof executionId !== "string" || !executionId.trim()) {
      return NextResponse.json(
        { error: "executionId is required" },
        { status: 400 },
      );
    }

    const files = form.getAll("files").filter((f): f is File => f instanceof File);
    if (files.length === 0) {
      return NextResponse.json({ uploaded: [] });
    }
    if (files.length > MAX_FILES_PER_UPLOAD) {
      return NextResponse.json(
        { error: `Max ${MAX_FILES_PER_UPLOAD} archivos por ejecución.` },
        { status: 400 },
      );
    }

    const uploaded = [];
    for (const file of files) {
      if (file.size > MAX_FILE_BYTES) {
        return NextResponse.json(
          {
            error: `Archivo ${file.name} supera el máximo de ${MAX_FILE_BYTES / 1024 / 1024} MB.`,
          },
          { status: 400 },
        );
      }
      if (!mimeOk(file.type)) {
        return NextResponse.json(
          {
            error: `Tipo de archivo no permitido para ${file.name} (${file.type}). Permitidos: image/*, application/pdf, text/*.`,
          },
          { status: 400 },
        );
      }
      const bytes = new Uint8Array(await file.arrayBuffer());
      const result = await sfUploadFileToRecord(
        executionId,
        file.name,
        file.type,
        bytes,
      );
      uploaded.push({ ...result, size: file.size, mime: file.type });
    }

    return NextResponse.json({ uploaded });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * GET — stream binary of one ContentVersion. Called by <img src="..."> and
 * download links in the UI.
 *
 * Query: ?contentVersionId=068...
 */
export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Sesión no autenticada." }, { status: 401 });
  }
  const contentVersionId = request.nextUrl.searchParams.get("contentVersionId");
  if (!contentVersionId) {
    return NextResponse.json(
      { error: "contentVersionId is required" },
      { status: 400 },
    );
  }
  try {
    const { bytes, contentType } = await sfFetchFileBytes(contentVersionId);
    return new NextResponse(bytes as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, max-age=300",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

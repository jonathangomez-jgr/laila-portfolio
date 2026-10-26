import { NextRequest, NextResponse } from "next/server";
import { sfQuery, sfFetchFileBytes } from "@/lib/salesforce";
import { getCurrentUser, userHasAccessToSlug } from "@/lib/portalAuth";
import { PROTECTED_FILES } from "@/data/docs/protectedFiles";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const CONTENT_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

/**
 * GET /api/portal/files/[key]
 *
 * Sirve la última versión de un archivo protegido (ver data/docs/protectedFiles.ts)
 * solo a usuarios con sesión del portal, rol permitido y acceso al proyecto.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> },
) {
  try {
    const { key } = await params;
    const file = PROTECTED_FILES[key];
    if (!file) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.redirect(new URL("/portal/login", request.url));
    }
    if (!file.roles.includes(user.role) || !userHasAccessToSlug(user, file.slug)) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }

    // Title viene de la allowlist, nunca del request
    const versions = await sfQuery<{ Id: string; PathOnClient: string; FileExtension: string | null }>(
      `SELECT Id, PathOnClient, FileExtension FROM ContentVersion
       WHERE Title = '${file.title}' AND IsLatest = true
       ORDER BY CreatedDate DESC LIMIT 1`,
    );
    if (versions.length === 0) {
      return NextResponse.json({ error: "file not published yet" }, { status: 404 });
    }

    const v = versions[0];
    const ext = (v.FileExtension ?? "").toLowerCase();
    const { bytes, contentType } = await sfFetchFileBytes(v.Id);
    // PathOnClient puede traer la ruta local completa de quien subió el archivo
    const basename = v.PathOnClient.split(/[\\/]/).pop() ?? `${key}.${ext}`;
    const filename = basename.replace(/[^\w.\-]/g, "_");
    // Copy into a fresh Buffer so NextResponse accepts it as BodyInit
    const body = Buffer.from(bytes);
    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": CONTENT_TYPES[ext] ?? contentType,
        "Content-Disposition": `${ext === "pdf" ? "inline" : "attachment"}; filename="${filename}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

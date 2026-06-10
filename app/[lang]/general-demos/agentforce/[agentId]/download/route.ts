import fs from "node:fs/promises";
import { findContentFile } from "@/lib/agentforce/catalog";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ agentId: string }> },
) {
  const { agentId } = await params;
  const filePath = await findContentFile(agentId, "agent");
  if (!filePath) return new Response("Not found", { status: 404 });

  const md = await fs.readFile(filePath, "utf8");
  return new Response(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${agentId}.md"`,
      "Cache-Control": "public, max-age=300",
    },
  });
}

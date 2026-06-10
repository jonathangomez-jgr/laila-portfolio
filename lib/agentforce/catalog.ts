import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import type { Agent, Action, ActionRef, Subagent, SubagentRef } from "./types";

const CONTENT_ROOT = path.join(process.cwd(), "content", "agentforce");

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/\.md$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const stripExt = (filename: string) => filename.replace(/\.md$/, "");

const readMd = async (filePath: string): Promise<string> =>
  fs.readFile(filePath, "utf8");

const firstHeadingTitle = (md: string): string | null => {
  const m = md.match(/^#\s+(.+?)\s*$/m);
  if (!m) return null;
  return m[1].replace(/^Subagent\s+—\s+/i, "").replace(/^Action\s+—\s+/i, "");
};

const sectionBody = (md: string, heading: string): string | null => {
  // Match `## Heading` and `## Heading (...) ` etc., capture until next `## ` or EOF.
  const re = new RegExp(
    `^##\\s+${heading}\\b[^\\n]*\\n([\\s\\S]*?)(?=^##\\s+|$(?![\\r\\n]))`,
    "im",
  );
  const m = md.match(re);
  return m ? m[1].trim() : null;
};

const firstParagraph = (block: string): string => {
  const lines = block.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  for (const line of lines) {
    if (line.startsWith(">") || line.startsWith("|") || line.startsWith("```")) continue;
    return line.replace(/\n/g, " ");
  }
  return "";
};

const purposeOf = (md: string): string => {
  const sec = sectionBody(md, "Purpose");
  if (!sec) return "";
  return firstParagraph(sec);
};

// Match relative md links: [Label](../subagents/Foo.md) or [Label](../actions/Bar.md)
const collectRefs = (
  block: string | null,
  kind: "subagents" | "actions",
): { id: string; name: string }[] => {
  if (!block) return [];
  const re = /\[([^\]]+)\]\(\.\.\/__KIND__\/([^)]+)\.md\)/g
    .source.replace("__KIND__", kind);
  const pattern = new RegExp(re, "g");
  const seen = new Map<string, string>();
  let match;
  while ((match = pattern.exec(block)) !== null) {
    const label = match[1].trim();
    const id = slugify(match[2]);
    if (!seen.has(id)) seen.set(id, label);
  }
  return Array.from(seen, ([id, name]) => ({ id, name }));
};

const overviewBlurb = (md: string): string => {
  const sec = sectionBody(md, "Overview");
  if (sec) {
    const p = firstParagraph(sec);
    if (p) return p;
  }
  // Fallback: first non-table, non-quote paragraph after the H1.
  const afterH1 = md.replace(/^#\s+.+?\n/, "");
  return firstParagraph(afterH1);
};

async function loadAgentFromDisk(agentId: string): Promise<Agent> {
  const agentDir = path.join(CONTENT_ROOT, agentId);
  const agentMd = await readMd(path.join(agentDir, "README.md"));
  const agentName = firstHeadingTitle(agentMd) ?? agentId;
  const blurb = overviewBlurb(agentMd);

  const subagentDir = path.join(agentDir, "subagents");
  const actionDir = path.join(agentDir, "actions");

  const [subagentFiles, actionFiles] = await Promise.all([
    fs.readdir(subagentDir).catch(() => [] as string[]),
    fs.readdir(actionDir).catch(() => [] as string[]),
  ]);

  const subagents: Subagent[] = await Promise.all(
    subagentFiles
      .filter((f) => f.endsWith(".md"))
      .map(async (file) => {
        const md = await readMd(path.join(subagentDir, file));
        const id = slugify(stripExt(file));
        const name = firstHeadingTitle(md) ?? stripExt(file);
        const actionsBlock = sectionBody(md, "Actions");
        const actions: ActionRef[] = collectRefs(actionsBlock, "actions");
        return {
          id,
          agentId,
          name,
          purpose: purposeOf(md),
          markdown: md,
          actions,
        };
      }),
  );

  const actions: Action[] = await Promise.all(
    actionFiles
      .filter((f) => f.endsWith(".md"))
      .map(async (file) => {
        const md = await readMd(path.join(actionDir, file));
        const id = slugify(stripExt(file));
        const name = firstHeadingTitle(md) ?? stripExt(file);
        const usedByBlock = sectionBody(md, "Used by");
        const usedBy: SubagentRef[] = collectRefs(usedByBlock, "subagents");
        return {
          id,
          agentId,
          name,
          purpose: purposeOf(md),
          markdown: md,
          usedBy,
        };
      }),
  );

  return {
    id: agentId,
    name: agentName,
    blurb,
    markdown: agentMd,
    subagents: subagents.sort((a, b) => a.name.localeCompare(b.name)),
    actions: actions.sort((a, b) => a.name.localeCompare(b.name)),
  };
}

export const loadAgents = cache(async (): Promise<Agent[]> => {
  const entries = await fs.readdir(CONTENT_ROOT, { withFileTypes: true });
  const ids = entries.filter((e) => e.isDirectory()).map((e) => e.name);
  const agents = await Promise.all(ids.map((id) => loadAgentFromDisk(id)));
  return agents.sort((a, b) => a.name.localeCompare(b.name));
});

export const loadAgent = cache(async (id: string): Promise<Agent | null> => {
  const all = await loadAgents();
  return all.find((a) => a.id === id) ?? null;
});

export async function loadSubagent(
  agentId: string,
  subagentId: string,
): Promise<{ agent: Agent; subagent: Subagent } | null> {
  const agent = await loadAgent(agentId);
  if (!agent) return null;
  const sub = agent.subagents.find((s) => s.id === subagentId);
  if (!sub) return null;
  return { agent, subagent: sub };
}

export async function loadAction(
  agentId: string,
  actionId: string,
): Promise<{ agent: Agent; action: Action } | null> {
  const agent = await loadAgent(agentId);
  if (!agent) return null;
  const act = agent.actions.find((a) => a.id === actionId);
  if (!act) return null;
  return { agent, action: act };
}

// Cross-agent lookup: which agents in the catalog reference this subagent (by id)?
export async function findAgentsUsingSubagent(subagentId: string): Promise<Agent[]> {
  const all = await loadAgents();
  return all.filter((a) => a.subagents.some((s) => s.id === subagentId));
}

// Cross-agent lookup: which agents reference this action (by id)?
export async function findAgentsUsingAction(actionId: string): Promise<Agent[]> {
  const all = await loadAgents();
  return all.filter((a) => a.actions.some((act) => act.id === actionId));
}

// Locate the actual file matching a slug (filenames are CamelCase / mixed).
export async function findContentFile(
  agentId: string,
  kind: "agent" | "subagent" | "action",
  childId?: string,
): Promise<string | null> {
  const agentDir = path.join(CONTENT_ROOT, agentId);
  if (kind === "agent") return path.join(agentDir, "README.md");
  if (!childId) return null;
  const dir = path.join(agentDir, kind === "subagent" ? "subagents" : "actions");
  const files = await fs.readdir(dir).catch(() => [] as string[]);
  const match = files.find(
    (f) => f.endsWith(".md") && slugify(stripExt(f)) === childId,
  );
  return match ? path.join(dir, match) : null;
}

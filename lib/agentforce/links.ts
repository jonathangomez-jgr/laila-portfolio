// Rewrite the relative .md links inside a doc to the live Next.js routes.
// Returns null if the link points outside our agentforce content tree.
const slugify = (s: string) =>
  s.toLowerCase().replace(/\.md$/, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export function rewriteAgentforceLink(
  href: string,
  ctx: { lang: string; agentId: string },
): string | null {
  const { lang, agentId } = ctx;
  const base = `/${lang}/general-demos/agentforce/${agentId}`;

  // Subagent reference, e.g. ../subagents/Premium_Experience.md OR Premium_Experience.md (siblings)
  const subAbs = href.match(/\.\.\/subagents\/([^/]+)\.md$/);
  if (subAbs) return `${base}/subagents/${slugify(subAbs[1])}`;
  const subSibling = href.match(/^([^/.][^/]*)\.md$/);
  // If we're rendering a subagent's doc, sibling links resolve to other subagents.
  // Caller should pass a more specific rewriter when in that context.
  if (subSibling && href.startsWith(subSibling[0])) {
    // unresolved here — caller should override via custom rewriter
  }

  // Action reference
  const actAbs = href.match(/\.\.\/actions\/([^/]+)\.md$/);
  if (actAbs) return `${base}/actions/${slugify(actAbs[1])}`;

  // Agent README
  if (href === "../README.md") return base;
  if (href === "../../README.md") return base;

  return null;
}

// When inside a subagent doc, sibling .md links also point to subagents.
export function rewriteFromSubagent(
  href: string,
  ctx: { lang: string; agentId: string },
): string | null {
  const fromMain = rewriteAgentforceLink(href, ctx);
  if (fromMain) return fromMain;
  const sibling = href.match(/^([^/.][^/]*)\.md$/);
  if (sibling) {
    return `/${ctx.lang}/general-demos/agentforce/${ctx.agentId}/subagents/${slugify(sibling[1])}`;
  }
  return null;
}

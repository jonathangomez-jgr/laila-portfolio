export type MdSection = {
  // Heading text without the leading "## " (e.g. "Overview", "Architecture").
  heading: string;
  // Slug of the heading for matching (e.g. "overview", "architecture").
  slug: string;
  // The body of the section (everything after the heading line, excluding the next ## heading).
  body: string;
};

export type SplitMarkdown = {
  // Everything before the first ## heading (typically the H1, intro paragraph, etc.).
  preamble: string;
  sections: MdSection[];
};

const headingSlug = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/\([^)]*\)/g, "")
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Splits a markdown doc on level-2 headings (## ...). Anything before the first
// `## ` is `preamble`. Each section retains its body without the heading.
export function splitMarkdownSections(md: string): SplitMarkdown {
  const lines = md.split("\n");
  const headingIdxs: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (/^##\s+/.test(lines[i])) headingIdxs.push(i);
  }

  if (headingIdxs.length === 0) {
    return { preamble: md, sections: [] };
  }

  const preamble = lines.slice(0, headingIdxs[0]).join("\n").trim();
  const sections: MdSection[] = [];

  for (let i = 0; i < headingIdxs.length; i++) {
    const start = headingIdxs[i];
    const end = headingIdxs[i + 1] ?? lines.length;
    const headingLine = lines[start].replace(/^##\s+/, "").trim();
    const body = lines.slice(start + 1, end).join("\n").trim();
    sections.push({
      heading: headingLine,
      slug: headingSlug(headingLine),
      body,
    });
  }

  return { preamble, sections };
}

// Convenience filter: drop sections by slug match.
export function omitSections(
  split: SplitMarkdown,
  slugsToOmit: string[],
): SplitMarkdown {
  const skip = new Set(slugsToOmit);
  return {
    preamble: split.preamble,
    sections: split.sections.filter((s) => !skip.has(s.slug)),
  };
}

export function findSection(
  split: SplitMarkdown,
  slug: string,
): MdSection | null {
  return split.sections.find((s) => s.slug === slug) ?? null;
}

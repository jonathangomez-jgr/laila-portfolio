import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { loadAgent, loadAgents } from "@/lib/agentforce/catalog";
import { rewriteAgentforceLink } from "@/lib/agentforce/links";
import {
  splitMarkdownSections,
  omitSections,
  findSection,
} from "@/lib/agentforce/markdown";
import Markdown from "@/components/Markdown";
import AgentforceDocHeader from "@/components/AgentforceDocHeader";
import CollapsibleSection from "@/components/CollapsibleSection";
import AgentforceArchitecture from "@/components/AgentforceArchitecture";

export async function generateStaticParams() {
  const agents = await loadAgents();
  return ["es", "en", "pt"].flatMap((lang) =>
    agents.map((a) => ({ lang, agentId: a.id })),
  );
}

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ lang: string; agentId: string }>;
}) {
  const { lang, agentId } = await params;
  if (!hasLocale(lang)) notFound();

  const agent = await loadAgent(agentId);
  if (!agent) notFound();

  const base = `/${lang}/general-demos/agentforce/${agent.id}`;
  const rewriter = (href: string) => rewriteAgentforceLink(href, { lang, agentId });

  const split = splitMarkdownSections(agent.markdown);
  const overview = findSection(split, "overview");
  // Sections to remove from the trailing markdown render — they're shown as
  // dedicated UI above (Overview collapsible, Architecture visual, Subagents/Actions grids).
  const trailing = omitSections(split, [
    "overview",
    "architecture",
    "topics-subagents",
    "actions",
  ]);

  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <AgentforceDocHeader
        eyebrow="Agentforce Agent"
        title={agent.name}
        blurb={agent.blurb}
        crumbs={[
          { label: "General Demos", href: `/${lang}/general-demos` },
          { label: "Agentforce", href: `/${lang}/general-demos/agentforce` },
          { label: agent.name },
        ]}
        downloadHref={`${base}/download`}
        downloadName={`${agent.id}.md`}
      />

      {/* Overview — collapsible */}
      {overview && (
        <CollapsibleSection title="Overview" meta="Bot identity & defaults" defaultOpen={false}>
          <Markdown source={overview.body} rewriteLink={rewriter} />
        </CollapsibleSection>
      )}

      {/* Architecture — visual */}
      <section>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
          Architecture
        </p>
        <AgentforceArchitecture agent={agent} lang={lang} />
      </section>

      {/* Subagents grid */}
      <section className="mt-12">
        <h2 className="mb-5 text-2xl font-semibold tracking-tight text-gray-950">
          Subagents ({agent.subagents.length})
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {agent.subagents.map((s) => (
            <Link
              key={s.id}
              href={`${base}/subagents/${s.id}`}
              className="block rounded-2xl border border-gray-200 bg-white/60 p-5 transition hover:-translate-y-0.5 hover:border-[#5f6fff] hover:shadow-md"
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-base font-semibold text-gray-950">{s.name}</h3>
                <span className="text-xs text-gray-500">
                  {s.actions.length} {s.actions.length === 1 ? "action" : "actions"}
                </span>
              </div>
              {s.purpose && (
                <p className="text-sm leading-6 text-gray-600">{s.purpose}</p>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Actions grid */}
      <section className="mt-12">
        <h2 className="mb-5 text-2xl font-semibold tracking-tight text-gray-950">
          Actions ({agent.actions.length})
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {agent.actions.map((a) => (
            <Link
              key={a.id}
              href={`${base}/actions/${a.id}`}
              className="block rounded-2xl border border-gray-200 bg-white/60 p-5 transition hover:-translate-y-0.5 hover:border-[#5f6fff] hover:shadow-md"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-gray-950">{a.name}</h3>
                <span className="text-xs text-gray-500">
                  used by {a.usedBy.length}
                </span>
              </div>
              {a.purpose && (
                <p className="text-sm leading-6 text-gray-600">{a.purpose}</p>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Remaining markdown sections (Context vars, Routing, Reuse checklist, Related metadata) */}
      {trailing.sections.length > 0 && (
        <section className="mt-16">
          {trailing.sections.map((s) => (
            <div key={s.slug} className="mb-10 last:mb-0">
              <h2 className="mb-4 text-2xl font-semibold tracking-tight text-gray-950">
                {s.heading}
              </h2>
              <Markdown source={s.body} rewriteLink={rewriter} />
            </div>
          ))}
        </section>
      )}
    </main>
  );
}

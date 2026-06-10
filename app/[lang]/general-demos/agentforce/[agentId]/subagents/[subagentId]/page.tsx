import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { loadAgents, loadSubagent } from "@/lib/agentforce/catalog";
import { rewriteFromSubagent } from "@/lib/agentforce/links";
import Markdown from "@/components/Markdown";
import AgentforceDocHeader from "@/components/AgentforceDocHeader";

export async function generateStaticParams() {
  const agents = await loadAgents();
  const triples: { lang: string; agentId: string; subagentId: string }[] = [];
  for (const lang of ["es", "en", "pt"]) {
    for (const agent of agents) {
      for (const sub of agent.subagents) {
        triples.push({ lang, agentId: agent.id, subagentId: sub.id });
      }
    }
  }
  return triples;
}

export default async function SubagentDetailPage({
  params,
}: {
  params: Promise<{ lang: string; agentId: string; subagentId: string }>;
}) {
  const { lang, agentId, subagentId } = await params;
  if (!hasLocale(lang)) notFound();

  const data = await loadSubagent(agentId, subagentId);
  if (!data) notFound();

  const { agent, subagent } = data;
  const base = `/${lang}/general-demos/agentforce/${agent.id}`;
  const rewriter = (href: string) => rewriteFromSubagent(href, { lang, agentId });

  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <AgentforceDocHeader
        eyebrow="Subagent (Topic)"
        title={subagent.name}
        blurb={subagent.purpose}
        crumbs={[
          { label: "General Demos", href: `/${lang}/general-demos` },
          { label: "Agentforce", href: `/${lang}/general-demos/agentforce` },
          { label: agent.name, href: base },
          { label: subagent.name },
        ]}
        downloadHref={`${base}/subagents/${subagent.id}/download`}
        downloadName={`${subagent.id}.md`}
      />

      <section>
        <Markdown source={subagent.markdown} rewriteLink={rewriter} />
      </section>

      {subagent.actions.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-5 text-2xl font-semibold tracking-tight text-gray-950">
            Actions in this subagent
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {subagent.actions.map((ref) => {
              const action = agent.actions.find((a) => a.id === ref.id);
              return (
                <Link
                  key={ref.id}
                  href={`${base}/actions/${ref.id}`}
                  className="block rounded-2xl border border-gray-200 bg-white/60 p-5 transition hover:-translate-y-0.5 hover:border-[#5f6fff] hover:shadow-md"
                >
                  <h3 className="mb-2 text-base font-semibold text-gray-950">
                    {action?.name ?? ref.name}
                  </h3>
                  {action?.purpose && (
                    <p className="text-sm leading-6 text-gray-600">{action.purpose}</p>
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { loadAction, loadAgents } from "@/lib/agentforce/catalog";
import { rewriteAgentforceLink } from "@/lib/agentforce/links";
import Markdown from "@/components/Markdown";
import AgentforceDocHeader from "@/components/AgentforceDocHeader";

export async function generateStaticParams() {
  const agents = await loadAgents();
  const triples: { lang: string; agentId: string; actionId: string }[] = [];
  for (const lang of ["es", "en", "pt"]) {
    for (const agent of agents) {
      for (const action of agent.actions) {
        triples.push({ lang, agentId: agent.id, actionId: action.id });
      }
    }
  }
  return triples;
}

export default async function ActionDetailPage({
  params,
}: {
  params: Promise<{ lang: string; agentId: string; actionId: string }>;
}) {
  const { lang, agentId, actionId } = await params;
  if (!hasLocale(lang)) notFound();

  const data = await loadAction(agentId, actionId);
  if (!data) notFound();

  const { agent, action } = data;
  const base = `/${lang}/general-demos/agentforce/${agent.id}`;
  const rewriter = (href: string) => rewriteAgentforceLink(href, { lang, agentId });

  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <AgentforceDocHeader
        eyebrow="Action"
        title={action.name}
        blurb={action.purpose}
        crumbs={[
          { label: "General Demos", href: `/${lang}/general-demos` },
          { label: "Agentforce", href: `/${lang}/general-demos/agentforce` },
          { label: agent.name, href: base },
          { label: action.name },
        ]}
        downloadHref={`${base}/actions/${action.id}/download`}
        downloadName={`${action.id}.md`}
      />

      <section>
        <Markdown source={action.markdown} rewriteLink={rewriter} />
      </section>

      {action.usedBy.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-5 text-2xl font-semibold tracking-tight text-gray-950">
            Used by ({action.usedBy.length} {action.usedBy.length === 1 ? "subagent" : "subagents"})
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {action.usedBy.map((ref) => {
              const sub = agent.subagents.find((s) => s.id === ref.id);
              return (
                <Link
                  key={ref.id}
                  href={`${base}/subagents/${ref.id}`}
                  className="block rounded-2xl border border-gray-200 bg-white/60 p-5 transition hover:-translate-y-0.5 hover:border-[#5f6fff] hover:shadow-md"
                >
                  <h3 className="mb-2 text-base font-semibold text-gray-950">
                    {sub?.name ?? ref.name}
                  </h3>
                  {sub?.purpose && (
                    <p className="text-sm leading-6 text-gray-600">{sub.purpose}</p>
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

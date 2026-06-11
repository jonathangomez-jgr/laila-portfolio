import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import PageHero from "@/components/PageHero";
import DemoCard from "@/components/DemoCard";
import { loadAgents } from "@/lib/agentforce/catalog";

export async function generateStaticParams() {
  return ["es", "en", "pt"].map((lang) => ({ lang }));
}

export default async function AgentforceCatalogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const agents = await loadAgents();

  return (
    <main>
      <PageHero
        eyebrow="General Demos · Agentforce"
        title="Agentforce Catalog"
        description="Documentación reutilizable de los agentes desplegados en la org de Laila — el agente, sus subagentes (topics) y las acciones que cada topic expone."
      />

      <section className="mx-auto max-w-[1540px] px-5 py-8 sm:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <DemoCard
              key={agent.id}
              title={agent.name}
              description={agent.blurb}
              industries={[`${agent.subagents.length} subagents`]}
              solutions={[`${agent.actions.length} actions`]}
              href={`/${lang}/general-demos/agentforce/${agent.id}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import PageHero from "@/components/PageHero";
import DemoCard from "@/components/DemoCard";
import { generalDemos } from "@/data/generalDemos";

export default async function GeneralDemosPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const d = dict.generalDemos;

  return (
    <main className="px-4 sm:px-6 md:px-8">
      <PageHero eyebrow={d.eyebrow} title={d.title} description={d.description} />

      <section className="mx-auto w-full py-6 sm:w-[min(90%,1600px)] sm:py-8">
        <a
          href={`/${lang}/general-demos/agentforce`}
          className="mb-8 block rounded-2xl border border-[#5f6fff]/30 bg-gradient-to-r from-[#eef2ff] via-white to-[#eaf5fe] p-6 transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#5f6fff]">
            New · Agentforce Catalog
          </p>
          <h2 className="mb-2 text-xl font-semibold text-gray-950">
            Agentforce Agents, Subagents & Actions
          </h2>
          <p className="text-gray-600">
            Documentación reutilizable de los agentes Agentforce desplegados — explora cada agente, sus topics y las acciones compartidas entre ellos.
          </p>
        </a>

        <div className="mb-8 rounded-2xl border border-gray-200 p-6">
          <h2 className="mb-3 text-xl font-semibold">{d.filtersTitle}</h2>
          <p className="text-gray-600">{d.filtersDesc}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {generalDemos.filter((demo) => !demo.hidden).map((demo) => {
            const title =
              lang === "en"
                ? demo.translations.en.title
                : lang === "pt"
                  ? demo.translations.pt.title
                  : demo.title;
            const description =
              lang === "en"
                ? demo.translations.en.description
                : lang === "pt"
                  ? demo.translations.pt.description
                  : demo.description;
            return (
              <DemoCard
                key={demo.slug}
                title={title}
                description={description}
                industries={demo.industries}
                solutions={demo.solutions}
                href={`/${lang}/general-demos/${demo.slug}`}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}

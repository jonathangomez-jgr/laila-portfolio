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
    <main>
      <PageHero eyebrow={d.eyebrow} title={d.title} description={d.description} />

      <section className="mx-auto max-w-[1360px] px-5 py-8 sm:px-8">
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

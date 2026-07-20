import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { insights } from "@/data/insights";
import InsightsList from "@/components/InsightsList";

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const d = dict.insights;
  const items = insights.filter((i) => !i.hidden);

  return (
    <main className="px-6 pb-20 pt-12 md:px-8 md:pt-16">
      <section className="mx-auto w-[min(90%,1600px)]">
        <div className="mb-12 max-w-5xl">
          <p className="eyebrow mb-4">{d.eyebrow}</p>
          <h1 className="section-title text-3xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
            {d.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            {d.description}
          </p>
        </div>

        <InsightsList
          insights={items}
          lang={lang as "es" | "en" | "pt"}
          dict={{
            readingTime: d.readingTime,
            executive: d.executive,
            architect: d.architect,
            deep: d.deep,
            filters: d.filters,
          }}
        />
      </section>
    </main>
  );
}

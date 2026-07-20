import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { insights } from "@/data/insights";
import { getInsightDeck } from "@/data/insightDecks";
import InsightArticle from "@/components/InsightArticle";

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const insight = insights.find((i) => i.slug === slug);

  if (!insight) {
    return (
      <main className="px-4 pb-16 pt-10 sm:px-6 sm:pt-12 md:px-8 md:pt-16">
        <section className="mx-auto max-w-4xl">
          <p className="eyebrow mb-4">{dict.insights.eyebrow}</p>
          <h1 className="section-title text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
            {dict.insights.notFound}
          </h1>
          <p className="mt-5 text-lg leading-8 text-gray-600">
            {dict.insights.notFoundDesc}
          </p>
          <a
            href={`/${lang}/insights`}
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:underline"
          >
            ← {dict.insights.backToInsights}
          </a>
        </section>
      </main>
    );
  }

  const hasDeck = Boolean(getInsightDeck(slug));

  return (
    <InsightArticle
      insight={insight}
      lang={lang}
      dict={dict.insights}
      hasDeck={hasDeck}
    />
  );
}

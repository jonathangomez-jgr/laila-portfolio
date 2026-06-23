import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import ExecutiveDeckPlayer from "@/components/executive-deck/ExecutiveDeckPlayer";
import { insights } from "@/data/insights";
import { getInsightDeck } from "@/data/insightDecks";

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

export default async function InsightDeckPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const insight = insights.find((i) => i.slug === slug);
  const deck = getInsightDeck(slug);

  if (!insight || !deck) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold">{dict.insights.notFound}</h1>
          <p className="mt-3 text-slate-400">{dict.insights.notFoundDesc}</p>
          <Link
            href={`/${lang}/insights`}
            className="mt-6 inline-block text-indigo-400"
          >
            ← {dict.insights.backToInsights}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <ExecutiveDeckPlayer
      deck={deck}
      customerName="Arquitectura multiagente"
      backHref={`/${lang}/insights/${slug}`}
    />
  );
}

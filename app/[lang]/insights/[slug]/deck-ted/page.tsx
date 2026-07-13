import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { insights } from "@/data/insights";
import PresenterDeck from "@/components/presenter-deck/PresenterDeck";
import { getPresenterNotes } from "@/data/presenterNotes";

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

export default async function DeckTedPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const insight = insights.find((i) => i.slug === slug);
  const notes = getPresenterNotes(slug);
  if (!insight || !notes || !insight.externalDeckUrl) notFound();

  return (
    <PresenterDeck
      deckUrl={insight.externalDeckUrl}
      backHref={`/${lang}/insights/${slug}`}
      slides={notes}
      insightTitle={insight.title}
    />
  );
}

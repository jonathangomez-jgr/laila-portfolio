import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import PageHero from "@/components/PageHero";

export default async function LailaRoadmapPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const d = dict.roadmap;

  return (
    <main>
      <PageHero eyebrow={d.eyebrow} title={d.title} description={d.description} />
    </main>
  );
}

import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import PageHero from "@/components/PageHero";

export default async function TimelinePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const d = dict.timeline;

  return (
    <main>
      <PageHero
        eyebrow={d.eyebrow}
        title={d.title}
        description={d.description}
      />

      <section className="mx-auto max-w-4xl px-8 py-8">
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">{d.currentStageLabel}</p>
            <h2 className="text-xl font-semibold">{d.currentStageTitle}</h2>
            <p className="mt-2 text-gray-600">{d.currentStageDesc}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

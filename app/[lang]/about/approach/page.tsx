import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import PageHero from "@/components/PageHero";

export default async function ApproachPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const d = dict.approach;

  return (
    <main>
      <PageHero
        eyebrow={d.eyebrow}
        title={d.title}
        description={d.description}
      />

      <section className="mx-auto max-w-4xl px-8 py-8 text-lg leading-8 text-gray-700">
        <p>{d.body}</p>
      </section>
    </main>
  );
}

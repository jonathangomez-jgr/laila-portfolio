import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import PageHero from "@/components/PageHero";

export default async function SkillsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const d = dict.skills;

  return (
    <main>
      <PageHero
        eyebrow={d.eyebrow}
        title={d.title}
        description={d.description}
      />

      <section className="mx-auto w-[min(90%,1600px)] py-8">
        <div className="grid gap-4 md:grid-cols-2">
          {d.items.map((skill) => (
            <div key={skill} className="rounded-2xl border border-gray-200 p-5">
              {skill}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

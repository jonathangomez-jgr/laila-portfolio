import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { buildRecipes } from "@/data/buildRecipes";
import BuildRecipesList from "@/components/BuildRecipesList";

export default async function BuildRecipesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const d = dict.buildRecipes;
  const items = buildRecipes.filter((r) => !r.hidden);

  return (
    <main className="px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 md:px-8 md:pt-16">
      <section className="mx-auto w-full sm:w-[min(90%,1600px)]">
        <div className="mb-12 max-w-5xl">
          <p className="eyebrow mb-4">{d.eyebrow}</p>
          <h1 className="section-title text-3xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
            {d.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            {d.description}
          </p>
        </div>

        <BuildRecipesList
          recipes={items}
          lang={lang as "es" | "en" | "pt"}
          dict={{
            readingTime: d.readingTime,
            problemLabel: d.problemLabel,
            approach: d.approach,
            audience: d.audience,
            filters: d.filters,
          }}
        />
      </section>
    </main>
  );
}

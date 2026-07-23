import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { getRecipe } from "@/data/buildRecipes";
import { getRecipeDeck } from "@/data/recipeDecks";
import RecipeArticle from "@/components/RecipeArticle";

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const d = dict.buildRecipes;
  const recipe = getRecipe(slug);

  if (!recipe) {
    return (
      <main className="px-4 pb-16 pt-10 sm:px-6 sm:pt-12 md:px-8 md:pt-16">
        <section className="mx-auto max-w-4xl">
          <p className="eyebrow mb-4">{d.eyebrow}</p>
          <h1 className="section-title text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
            {d.notFound}
          </h1>
          <p className="mt-5 text-lg leading-8 text-gray-600">
            {d.notFoundDesc}
          </p>
          <a
            href={`/${lang}/build-recipes`}
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:underline"
          >
            ← {d.backToRecipes}
          </a>
        </section>
      </main>
    );
  }

  const hasDeck = Boolean(getRecipeDeck(slug));

  return (
    <RecipeArticle
      recipe={recipe}
      lang={lang}
      hasDeck={hasDeck}
      dict={{
        eyebrow: d.eyebrow,
        readingTime: d.readingTime,
        tableOfContents: d.tableOfContents,
        expandAll: d.expandAll,
        collapseAll: d.collapseAll,
        expandSection: d.expandSection,
        collapseSection: d.collapseSection,
        backToRecipes: d.backToRecipes,
        updated: d.updated,
        author: d.author,
        problemLabel: d.problemLabel,
        tldrLabel: d.tldrLabel,
        execDeckBtn: d.execDeckBtn,
        execDeckHint: d.execDeckHint,
        approach: d.approach,
        audience: d.audience,
        block: d.block,
      }}
    />
  );
}

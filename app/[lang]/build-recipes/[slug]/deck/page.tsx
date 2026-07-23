import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import ExecutiveDeckPlayer from "@/components/executive-deck/ExecutiveDeckPlayer";
import { getRecipe } from "@/data/buildRecipes";
import { getRecipeDeck } from "@/data/recipeDecks";

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

export default async function RecipeDeckPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const recipe = getRecipe(slug);
  const deck = getRecipeDeck(slug);

  if (!recipe || !deck) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold">
            {dict.buildRecipes.notFound}
          </h1>
          <p className="mt-3 text-slate-400">
            {dict.buildRecipes.notFoundDesc}
          </p>
          <Link
            href={`/${lang}/build-recipes`}
            className="mt-6 inline-block text-indigo-400"
          >
            ← {dict.buildRecipes.backToRecipes}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <ExecutiveDeckPlayer
      deck={deck}
      customerName="Build Recipe"
      backHref={`/${lang}/build-recipes/${slug}`}
    />
  );
}

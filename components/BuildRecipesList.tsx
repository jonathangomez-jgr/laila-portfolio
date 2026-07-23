"use client";

import { useMemo, useState } from "react";
import type { Recipe, RecipeApproach, RecipeAudience } from "@/data/buildRecipes";
import { getRecipeDeck } from "@/data/recipeDecks";

type Lang = "es" | "en" | "pt";

type FiltersDict = {
  title: string;
  clearAll: string;
  empty: string;
  resultsSingular: string;
  resultsPlural: string;
  sections: {
    approach: string;
    tags: string;
    audience: string;
  };
};

type Dict = {
  readingTime: string;
  problemLabel: string;
  approach: Record<RecipeApproach, string>;
  audience: Record<RecipeAudience, string>;
  filters: FiltersDict;
};

const APPROACH_STYLE: Record<
  RecipeApproach,
  { border: string; bg: string; text: string; dot: string }
> = {
  standard: {
    border: "border-emerald-200",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  hybrid: {
    border: "border-amber-200",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  custom: {
    border: "border-violet-200",
    bg: "bg-violet-50",
    text: "text-violet-700",
    dot: "bg-violet-500",
  },
};

const APPROACH_ORDER: RecipeApproach[] = ["standard", "hybrid", "custom"];
const AUDIENCE_ORDER: RecipeAudience[] = ["admin", "developer", "architect"];

function unique<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

export default function BuildRecipesList({
  recipes,
  lang,
  dict,
}: {
  recipes: Recipe[];
  lang: Lang;
  dict: Dict;
}) {
  const [approach, setApproach] = useState<Set<RecipeApproach>>(new Set());
  const [tags, setTags] = useState<Set<string>>(new Set());
  const [audience, setAudience] = useState<Set<RecipeAudience>>(new Set());
  const [filtersOpen, setFiltersOpen] = useState(false);

  const availableApproach = useMemo(() => {
    const present = new Set(recipes.map((r) => r.approach));
    return APPROACH_ORDER.filter((a) => present.has(a));
  }, [recipes]);

  const availableTags = useMemo(
    () => unique(recipes.flatMap((r) => r.tags)).sort(),
    [recipes],
  );

  const availableAudience = useMemo(() => {
    const present = new Set(recipes.flatMap((r) => r.audiences));
    return AUDIENCE_ORDER.filter((a) => present.has(a));
  }, [recipes]);

  const toggle = <T,>(
    setter: React.Dispatch<React.SetStateAction<Set<T>>>,
    value: T,
  ) => {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const clearAll = () => {
    setApproach(new Set());
    setTags(new Set());
    setAudience(new Set());
  };

  const totalSelected = approach.size + tags.size + audience.size;

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      if (approach.size > 0 && !approach.has(r.approach)) return false;
      if (tags.size > 0 && !r.tags.some((t) => tags.has(t))) return false;
      if (audience.size > 0 && !r.audiences.some((a) => audience.has(a))) {
        return false;
      }
      return true;
    });
  }, [recipes, approach, tags, audience]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-4 shadow-[0_10px_30px_rgba(99,102,241,0.06)] backdrop-blur-sm sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-2 sm:mb-5">
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              className="flex flex-1 items-center gap-2 text-left lg:pointer-events-none"
              aria-expanded={filtersOpen}
              aria-controls="build-recipes-filter-body"
            >
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-gray-500">
                {dict.filters.title}
              </h2>
              {totalSelected > 0 && (
                <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-semibold text-indigo-600">
                  {totalSelected}
                </span>
              )}
              <svg
                className={`ml-auto h-4 w-4 shrink-0 text-gray-400 transition lg:hidden ${filtersOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 9l6 6 6-6"
                />
              </svg>
            </button>
            {totalSelected > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="shrink-0 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              >
                {dict.filters.clearAll}
              </button>
            )}
          </div>

          <div
            id="build-recipes-filter-body"
            className={`${filtersOpen ? "block" : "hidden"} lg:block`}
          >
            <FilterSection title={dict.filters.sections.approach}>
              {availableApproach.map((a) => (
                <ApproachCheckbox
                  key={a}
                  approach={a}
                  label={dict.approach[a]}
                  checked={approach.has(a)}
                  onChange={() => toggle(setApproach, a)}
                />
              ))}
            </FilterSection>

            <FilterSection title={dict.filters.sections.tags}>
              <div className="flex flex-wrap gap-1.5">
                {availableTags.map((t) => {
                  const active = tags.has(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggle(setTags, t)}
                      className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${
                        active
                          ? "border-indigo-500 bg-indigo-500 text-white"
                          : "border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </FilterSection>

            <FilterSection title={dict.filters.sections.audience} last>
              {availableAudience.map((a) => (
                <Checkbox
                  key={a}
                  label={dict.audience[a]}
                  checked={audience.has(a)}
                  onChange={() => toggle(setAudience, a)}
                />
              ))}
            </FilterSection>
          </div>
        </div>
      </aside>

      <div>
        <p className="mb-4 text-sm text-gray-500">
          {filtered.length}{" "}
          {filtered.length === 1
            ? dict.filters.resultsSingular
            : dict.filters.resultsPlural}
        </p>

        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white/50 p-10 text-center text-sm text-gray-500">
            {dict.filters.empty}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {filtered.map((recipe) => (
              <RecipeCard
                key={recipe.slug}
                recipe={recipe}
                lang={lang}
                dict={dict}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterSection({
  title,
  children,
  last,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={last ? "" : "mb-5 border-b border-slate-100 pb-5"}>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-gray-400">
        {title}
      </p>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-2.5 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
      />
      <span className="text-gray-700">{label}</span>
    </label>
  );
}

function ApproachCheckbox({
  approach,
  label,
  checked,
  onChange,
}: {
  approach: RecipeApproach;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  const style = APPROACH_STYLE[approach];
  return (
    <label className="flex cursor-pointer items-start gap-2.5 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
      />
      <span className="flex items-center gap-2 text-gray-700">
        <span className={`h-2 w-2 rounded-full ${style.dot}`} aria-hidden />
        {label}
      </span>
    </label>
  );
}

function RecipeCard({
  recipe,
  lang,
  dict,
}: {
  recipe: Recipe;
  lang: Lang;
  dict: Dict;
}) {
  const style = APPROACH_STYLE[recipe.approach];
  return (
    <a
      href={`/${lang}/build-recipes/${recipe.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-[0_14px_40px_rgba(99,102,241,0.10)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(99,102,241,0.18)]"
    >
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border ${style.border} ${style.bg} px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${style.text}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
            {dict.approach[recipe.approach]}
          </span>
          <span className="ml-auto text-xs font-semibold text-gray-400">
            {recipe.readingMinutes} {dict.readingTime}
          </span>
        </div>

        <h2 className="mt-5 text-xl font-semibold tracking-tight text-gray-950 sm:text-2xl">
          {recipe.title}
        </h2>

        <div className="mt-4 rounded-xl border border-rose-100 bg-rose-50/60 px-4 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-rose-500">
            {dict.problemLabel}
          </p>
          <p className="mt-1 text-sm leading-6 text-gray-800">
            {recipe.problemOneLiner}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {recipe.tags.slice(0, 6).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600"
            >
              {tag}
            </span>
          ))}
          {recipe.tags.length > 6 && (
            <span className="rounded-full bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-400">
              +{recipe.tags.length - 6}
            </span>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="font-semibold text-gray-700">{recipe.author}</span>
            {getRecipeDeck(recipe.slug) && (
              <span className="inline-flex items-center gap-1 rounded-full border border-indigo-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-indigo-600">
                <svg
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.4}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 5h16M4 5v14h16V5M4 5l8 7 8-7"
                  />
                </svg>
                Deck
              </span>
            )}
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition group-hover:gap-3">
            Leer
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M13 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}

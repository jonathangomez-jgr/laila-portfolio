"use client";

import { useMemo, useState } from "react";
import type { Insight, InsightAudience, InsightRegion } from "@/data/insights";
import { getInsightDeck } from "@/data/insightDecks";

type Lang = "es" | "en" | "pt";

type FiltersDict = {
  title: string;
  clearAll: string;
  empty: string;
  resultsSingular: string;
  resultsPlural: string;
  consultant: string;
  sections: {
    audience: string;
    industry: string;
    products: string;
    region: string;
  };
};

type Dict = {
  readingTime: string;
  executive: string;
  architect: string;
  deep: string;
  filters: FiltersDict;
};

const REGION_HIERARCHY: Record<string, InsightRegion[]> = {
  LATAM: ["Mexico", "Colombia", "Centroamérica"],
};

const REGION_LABEL: Record<InsightRegion, Record<Lang, string>> = {
  LATAM: { es: "LATAM", en: "LATAM", pt: "LATAM" },
  Mexico: { es: "México", en: "Mexico", pt: "México" },
  Colombia: { es: "Colombia", en: "Colombia", pt: "Colômbia" },
  "Centroamérica": { es: "Centroamérica", en: "Central America", pt: "América Central" },
  Global: { es: "Global", en: "Global", pt: "Global" },
};

const INDUSTRY_LABEL: Record<string, Record<Lang, string>> = {
  "Cross-industry": {
    es: "Multi-industria",
    en: "Cross-industry",
    pt: "Multi-indústria",
  },
  Retail: { es: "Retail", en: "Retail", pt: "Varejo" },
};

function audienceLabel(a: InsightAudience, dict: Dict): string {
  if (a === "executive") return dict.executive;
  if (a === "architect") return dict.architect;
  return dict.filters.consultant;
}

function unique<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

export default function InsightsList({
  insights,
  lang,
  dict,
}: {
  insights: Insight[];
  lang: Lang;
  dict: Dict;
}) {
  const [audience, setAudience] = useState<Set<InsightAudience>>(new Set());
  const [industry, setIndustry] = useState<Set<string>>(new Set());
  const [products, setProducts] = useState<Set<string>>(new Set());
  const [region, setRegion] = useState<Set<InsightRegion>>(new Set());

  const availableAudience = useMemo<InsightAudience[]>(() => {
    const order: InsightAudience[] = ["executive", "architect", "deep"];
    const present = new Set(insights.flatMap((i) => i.audience));
    return order.filter((a) => present.has(a));
  }, [insights]);

  const availableIndustry = useMemo(
    () => unique(insights.flatMap((i) => i.industry)).sort(),
    [insights],
  );

  const availableProducts = useMemo(
    () => unique(insights.flatMap((i) => i.products)).sort(),
    [insights],
  );

  const availableRegion = useMemo<InsightRegion[]>(() => {
    const present = new Set(insights.flatMap((i) => i.region));
    const order: InsightRegion[] = ["Global", "LATAM", "Mexico", "Colombia"];
    return order.filter((r) => present.has(r));
  }, [insights]);

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

  const toggleRegion = (value: InsightRegion) => {
    setRegion((prev) => {
      const next = new Set(prev);
      const isSelected = next.has(value);
      const children = REGION_HIERARCHY[value];
      if (children) {
        if (isSelected) {
          next.delete(value);
          children.forEach((c) => next.delete(c));
        } else {
          next.add(value);
          children.forEach((c) => next.add(c));
        }
      } else {
        if (isSelected) next.delete(value);
        else next.add(value);
        for (const [parent, kids] of Object.entries(REGION_HIERARCHY)) {
          const parentRegion = parent as InsightRegion;
          const allChildrenSelected = kids.every((k) => next.has(k));
          if (allChildrenSelected) next.add(parentRegion);
          else next.delete(parentRegion);
        }
      }
      return next;
    });
  };

  const clearAll = () => {
    setAudience(new Set());
    setIndustry(new Set());
    setProducts(new Set());
    setRegion(new Set());
  };

  const totalSelected =
    audience.size + industry.size + products.size + region.size;

  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return insights.filter((i) => {
      if (audience.size > 0 && !i.audience.some((a) => audience.has(a))) {
        return false;
      }
      if (industry.size > 0 && !i.industry.some((v) => industry.has(v))) {
        return false;
      }
      if (products.size > 0 && !i.products.some((v) => products.has(v))) {
        return false;
      }
      if (region.size > 0 && !i.region.some((v) => region.has(v))) {
        return false;
      }
      return true;
    });
  }, [insights, audience, industry, products, region]);

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
              aria-controls="insights-filter-body"
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
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
            id="insights-filter-body"
            className={`${filtersOpen ? "block" : "hidden"} lg:block`}
          >

          <FilterSection title={dict.filters.sections.audience}>
            {availableAudience.map((a) => (
              <Checkbox
                key={a}
                label={audienceLabel(a, dict)}
                checked={audience.has(a)}
                onChange={() => toggle(setAudience, a)}
              />
            ))}
          </FilterSection>

          <FilterSection title={dict.filters.sections.industry}>
            {availableIndustry.map((v) => (
              <Checkbox
                key={v}
                label={INDUSTRY_LABEL[v]?.[lang] ?? v}
                checked={industry.has(v)}
                onChange={() => toggle(setIndustry, v)}
              />
            ))}
          </FilterSection>

          <FilterSection title={dict.filters.sections.products}>
            {availableProducts.map((v) => (
              <Checkbox
                key={v}
                label={v}
                checked={products.has(v)}
                onChange={() => toggle(setProducts, v)}
              />
            ))}
          </FilterSection>

          <FilterSection title={dict.filters.sections.region} last>
            {availableRegion.map((r) => {
              const children = REGION_HIERARCHY[r];
              return (
                <Checkbox
                  key={r}
                  label={REGION_LABEL[r][lang]}
                  checked={region.has(r)}
                  onChange={() => toggleRegion(r)}
                  hint={
                    children
                      ? children
                          .map((c) => REGION_LABEL[c][lang])
                          .join(" + ")
                      : undefined
                  }
                />
              );
            })}
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
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {filtered.map((insight) => (
              <InsightCard
                key={insight.slug}
                insight={insight}
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
    <div
      className={
        last
          ? ""
          : "mb-5 border-b border-slate-100 pb-5"
      }
    >
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
  hint,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  hint?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-2.5 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
      />
      <span className="flex flex-col leading-tight">
        <span className="text-gray-700">{label}</span>
        {hint && (
          <span className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-gray-400">
            {hint}
          </span>
        )}
      </span>
    </label>
  );
}

function InsightCard({
  insight,
  lang,
  dict,
}: {
  insight: Insight;
  lang: Lang;
  dict: Dict;
}) {
  return (
    <a
      href={`/${lang}/insights/${insight.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-[0_14px_40px_rgba(99,102,241,0.10)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(99,102,241,0.18)]"
    >
      <div className="relative flex flex-1 flex-col p-7">
        <div className="relative flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-600">
            {insight.topic}
          </span>
          {insight.audience.map((a) => (
            <span
              key={a}
              className="rounded-full border border-gray-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500"
            >
              {audienceLabel(a, dict)}
            </span>
          ))}
          <span className="ml-auto text-xs font-semibold text-gray-400">
            {insight.readingMinutes} {dict.readingTime}
          </span>
        </div>

        <h2 className="relative mt-5 text-2xl font-semibold tracking-tight text-gray-950 sm:text-3xl">
          {insight.title}
        </h2>
        <p className="relative mt-3 text-base leading-7 text-gray-600">
          {insight.subtitle}
        </p>

        <div className="relative mt-6 flex flex-wrap gap-1.5">
          {insight.tags.slice(0, 6).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="relative mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
          <div className="text-xs text-gray-500">
            <span className="font-semibold text-gray-700">{insight.author}</span>
            <span className="mx-1.5">·</span>
            {insight.authorRole}
          </div>
          <div className="flex items-center gap-3">
            {getInsightDeck(insight.slug) && (
              <span className="hidden items-center gap-1.5 rounded-full border border-indigo-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-indigo-600 sm:inline-flex">
                <svg
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.4}
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
            {insight.externalDeckUrl && (
              <span className="hidden items-center gap-1.5 rounded-full border border-gray-900/15 bg-gray-950 px-2.5 py-1 text-[11px] font-semibold text-white sm:inline-flex">
                <svg
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.4}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7.5A2.5 2.5 0 015.5 5h13A2.5 2.5 0 0121 7.5v9a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 013 16.5v-9zM8 21h8M12 19v2"
                  />
                </svg>
                Presentación
              </span>
            )}
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
      </div>
    </a>
  );
}

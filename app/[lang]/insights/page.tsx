import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { insights } from "@/data/insights";
import { getInsightDeck } from "@/data/insightDecks";

const AUDIENCE_LABEL = {
  executive: { es: "Para ejecutivos", en: "For executives", pt: "Para executivos" },
  architect: { es: "Para arquitectos", en: "For architects", pt: "Para arquitetos" },
  deep: { es: "Postura profunda", en: "Deep position", pt: "Posicionamento profundo" },
} as const;

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const d = dict.insights;
  const lkey = lang as "es" | "en" | "pt";
  const items = insights.filter((i) => !i.hidden);

  return (
    <main className="px-6 pb-20 pt-12 md:px-8 md:pt-16">
      <section className="mx-auto w-[min(90%,1600px)]">
        {/* Hero */}
        <div className="mb-12 max-w-5xl">
          <p className="eyebrow mb-4">{d.eyebrow}</p>
          <h1 className="section-title text-3xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
            {d.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            {d.description}
          </p>
        </div>

        {/* Listing */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {items.map((insight) => (
            <a
              key={insight.slug}
              href={`/${lang}/insights/${insight.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-[0_14px_40px_rgba(99,102,241,0.10)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(99,102,241,0.18)] lg:col-span-2"
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
                    {AUDIENCE_LABEL[a][lkey]}
                  </span>
                ))}
                <span className="ml-auto text-xs font-semibold text-gray-400">
                  {insight.readingMinutes} {d.readingTime}
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
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
              </div>
            </a>
          ))}

          {/* Coming soon card */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-dashed border-indigo-200 bg-gradient-to-br from-indigo-50/60 via-white to-white p-7">
            <div>
              <p className="eyebrow mb-3 text-indigo-500">{d.filtersTitle}</p>
              <h3 className="text-xl font-semibold tracking-tight text-gray-950">
                {d.nextRead}
              </h3>
              <p className="mt-3 text-sm leading-7 text-gray-600">{d.filtersDesc}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {[
                "Data Cloud",
                "MuleSoft",
                "ROI Agentforce",
                "Governance",
                "Industry",
              ].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-indigo-100 bg-white px-2.5 py-1 text-[11px] font-medium text-indigo-500"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

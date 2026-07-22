import type { CustomRetrieverData } from "../data/customerDemos";

const toneStyles: Record<
  CustomRetrieverData["retrievers"][number]["tone"],
  { accent: string; badge: string; chip: string; bullet: string; iconBg: string; iconColor: string }
> = {
  indigo: {
    accent: "border-l-indigo-500",
    badge: "bg-indigo-100 text-indigo-700",
    chip: "bg-indigo-50 text-indigo-700",
    bullet: "text-indigo-500",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  violet: {
    accent: "border-l-violet-500",
    badge: "bg-violet-100 text-violet-700",
    chip: "bg-violet-50 text-violet-700",
    bullet: "text-violet-500",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  sky: {
    accent: "border-l-sky-500",
    badge: "bg-sky-100 text-sky-700",
    chip: "bg-sky-50 text-sky-700",
    bullet: "text-sky-500",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  emerald: {
    accent: "border-l-emerald-500",
    badge: "bg-emerald-100 text-emerald-700",
    chip: "bg-emerald-50 text-emerald-700",
    bullet: "text-emerald-500",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  amber: {
    accent: "border-l-amber-500",
    badge: "bg-amber-100 text-amber-700",
    chip: "bg-amber-50 text-amber-700",
    bullet: "text-amber-500",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
};

const backendStyles: Record<
  CustomRetrieverData["retrievers"][number]["backend"],
  string
> = {
  "Salesforce Knowledge": "bg-emerald-100 text-emerald-800",
  "UDMO Files (Data Cloud)": "bg-sky-100 text-sky-800",
  Hybrid: "bg-violet-100 text-violet-800",
  "System Prompt": "bg-gray-200 text-gray-800",
};

const recordTypeStyles: Record<string, string> = {
  "Property Fact Sheet": "bg-indigo-50 text-indigo-700 ring-indigo-200",
  "Room Description": "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200",
  Policy: "bg-red-50 text-red-700 ring-red-200",
  FAQ: "bg-amber-50 text-amber-700 ring-amber-200",
  "Benefit & Program": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "How-To / Self-Service": "bg-sky-50 text-sky-700 ring-sky-200",
  Security: "bg-rose-50 text-rose-700 ring-rose-200",
};

export default function CustomRetrieverCards({
  data,
}: {
  data: CustomRetrieverData;
}) {
  return (
    <div className="mt-10 space-y-6">
      {data.intro && (
        <p className="max-w-4xl text-base leading-7 text-gray-600">{data.intro}</p>
      )}
      <div className="flex flex-col gap-6">
        {data.retrievers.map((r) => {
          const tone = toneStyles[r.tone];
          return (
            <article
              key={r.id}
              className={`overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm ${tone.accent} border-l-4`}
            >
              <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:gap-8">
                <div className="lg:w-[38%] lg:shrink-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${tone.iconBg} text-sm font-bold ${tone.iconColor}`}
                    >
                      {String(r.order).padStart(2, "0")}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${tone.badge}`}
                    >
                      Retriever
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ${backendStyles[r.backend]}`}
                    >
                      {r.backend}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-gray-950 sm:text-2xl">
                    {r.name}
                  </h3>
                  <p className={`mt-1 text-sm font-semibold ${tone.iconColor}`}>
                    {r.intent}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    {r.description}
                  </p>
                  <div className="mt-5 space-y-3 text-xs">
                    {r.threshold && (
                      <div>
                        <p className="font-semibold uppercase tracking-wider text-gray-500">
                          Threshold
                        </p>
                        <p className="mt-1 font-mono text-gray-700">{r.threshold}</p>
                      </div>
                    )}
                    {r.fallback && (
                      <div>
                        <p className="font-semibold uppercase tracking-wider text-gray-500">
                          Fallback
                        </p>
                        <p className="mt-1 text-gray-700">{r.fallback}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1 space-y-6 border-t border-gray-100 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                  <div>
                    <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                      <svg
                        className={`h-3.5 w-3.5 ${tone.iconColor}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      Artículos de Knowledge que consume ({r.articles.length})
                    </p>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {r.articles.map((a) => (
                        <li
                          key={a.articleId}
                          className="flex items-start gap-2 rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-2"
                        >
                          <span
                            className={`mt-0.5 inline-flex shrink-0 items-center rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ${recordTypeStyles[a.recordType] ?? "bg-gray-50 text-gray-700 ring-gray-200"}`}
                          >
                            {a.recordType === "How-To / Self-Service"
                              ? "How-To"
                              : a.recordType === "Property Fact Sheet"
                              ? "Fact Sheet"
                              : a.recordType === "Room Description"
                              ? "Room"
                              : a.recordType === "Benefit & Program"
                              ? "Benefit"
                              : a.recordType}
                          </span>
                          <div className="flex-1 leading-5">
                            <p className="text-[13px] font-medium text-gray-800">
                              {a.title}
                            </p>
                            <p className="mt-0.5 font-mono text-[10px] text-gray-500">
                              {a.articleId}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {(() => {
                    const dataCategoryFilters = r.filters.filter((f) =>
                      f.trim().startsWith("DataCategoryGroup.")
                    );
                    if (dataCategoryFilters.length === 0) return null;
                    return (
                      <div>
                        <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                          <svg
                            className={`h-3.5 w-3.5 ${tone.iconColor}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                            />
                          </svg>
                          Filtros aplicados en la query
                        </p>
                        <ul className="space-y-1.5">
                          {dataCategoryFilters.map((f) => (
                            <li
                              key={f}
                              className="flex items-start gap-2 text-sm leading-6 text-gray-700"
                            >
                              <span
                                className={`mt-2 h-1 w-1 shrink-0 rounded-full ${tone.bullet.replace("text-", "bg-")}`}
                              />
                              <code className="font-mono text-[12px] text-gray-700">
                                {f}
                              </code>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

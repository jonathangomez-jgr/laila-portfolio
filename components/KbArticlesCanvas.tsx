import type {
  KbArticlesData,
  KbArticleDataCategory,
  KbArticlePendingItem,
} from "../data/customerDemos";

const severityStyles: Record<KbArticlePendingItem["severity"], { badge: string; label: string; accent: string }> = {
  info: {
    badge: "bg-sky-100 text-sky-800",
    label: "Info",
    accent: "border-l-sky-500",
  },
  warning: {
    badge: "bg-amber-100 text-amber-800",
    label: "Atención",
    accent: "border-l-amber-500",
  },
  blocker: {
    badge: "bg-red-100 text-red-800",
    label: "Bloqueante",
    accent: "border-l-red-500",
  },
};

const recordTypeStyles: Record<string, { badge: string; accent: string }> = {
  "Property Fact Sheet": {
    badge: "bg-indigo-100 text-indigo-800",
    accent: "border-t-indigo-500",
  },
  "Room Description": {
    badge: "bg-fuchsia-100 text-fuchsia-800",
    accent: "border-t-fuchsia-500",
  },
  Policy: {
    badge: "bg-red-100 text-red-800",
    accent: "border-t-red-500",
  },
  FAQ: {
    badge: "bg-amber-100 text-amber-800",
    accent: "border-t-amber-500",
  },
  "Benefit & Program": {
    badge: "bg-emerald-100 text-emerald-800",
    accent: "border-t-emerald-500",
  },
  "How-To / Self-Service": {
    badge: "bg-sky-100 text-sky-800",
    accent: "border-t-sky-500",
  },
  Security: {
    badge: "bg-rose-100 text-rose-800",
    accent: "border-t-rose-500",
  },
};

const categoryColorByGroup: Record<KbArticleDataCategory["group"], string> = {
  Audience: "bg-violet-50 text-violet-700 ring-violet-200",
  Topic: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  Property: "bg-teal-50 text-teal-700 ring-teal-200",
  Lifecycle: "bg-gray-100 text-gray-700 ring-gray-300",
  "Room Category": "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200",
};

const statusStyles: Record<string, string> = {
  planned: "bg-gray-100 text-gray-700",
  draft: "bg-amber-100 text-amber-800",
  "in-review": "bg-sky-100 text-sky-800",
  validated: "bg-emerald-100 text-emerald-800",
};

export default function KbArticlesCanvas({ data }: { data: KbArticlesData }) {
  return (
    <div className="mt-10 space-y-10">
      {data.intro && (
        <p className="max-w-4xl text-base leading-7 text-gray-600">{data.intro}</p>
      )}

      {data.totals && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Artículos master (ES)"
            value={data.totals.masterArticles}
          />
          <StatCard
            label="Versiones × 3 idiomas"
            value={data.totals.languageVersions}
          />
          <StatCard
            label="Job Stories cubiertas"
            value={`${data.totals.coveredJobStories} / ${data.totals.totalMvpJobStories}`}
          />
          <StatCard label="Record Types" value={data.buckets.length} />
        </div>
      )}

      {data.buckets.map((bucket) => {
        const style =
          recordTypeStyles[bucket.recordType] ?? {
            badge: "bg-gray-100 text-gray-800",
            accent: "border-t-gray-400",
          };
        return (
          <section key={bucket.recordType} className="space-y-4">
            <header className="flex flex-wrap items-baseline gap-3 border-b border-gray-200 pb-3">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${style.badge}`}
              >
                {bucket.recordType}
              </span>
              <span className="text-sm font-semibold text-gray-500">
                {bucket.articles.length} artículos
              </span>
              <p className="w-full text-sm leading-6 text-gray-600 sm:w-auto sm:flex-1">
                {bucket.description}
              </p>
            </header>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {bucket.articles.map((article) => (
                <article
                  key={article.id}
                  className={`flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm ${style.accent} border-t-4`}
                >
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div className="flex items-center gap-2">
                      <code className="rounded bg-gray-100 px-2 py-0.5 font-mono text-[10px] font-semibold text-gray-600">
                        {article.id}
                      </code>
                      {article.status && (
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusStyles[article.status]}`}
                        >
                          {article.status}
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-semibold leading-6 text-gray-950">
                      {article.title}
                    </h4>
                    <p className="text-sm leading-6 text-gray-600">
                      {article.summary}
                    </p>

                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {article.dataCategories.map((c) => (
                        <span
                          key={`${c.group}-${c.value}`}
                          className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium ring-1 ${categoryColorByGroup[c.group]}`}
                          title={c.group}
                        >
                          <span className="opacity-60">{c.group[0]}</span>
                          <span>·</span>
                          <span>{c.value}</span>
                        </span>
                      ))}
                    </div>

                    {(article.jobStories?.length ||
                      article.membershipLevel ||
                      article.languages ||
                      article.channels) && (
                      <div className="mt-2 space-y-1.5 border-t border-gray-100 pt-3 text-xs text-gray-600">
                        {article.membershipLevel && (
                          <p>
                            <span className="font-semibold uppercase tracking-wider text-gray-500">
                              Nivel:
                            </span>{" "}
                            {article.membershipLevel}
                          </p>
                        )}
                        {article.channels && (
                          <p>
                            <span className="font-semibold uppercase tracking-wider text-gray-500">
                              Canales:
                            </span>{" "}
                            {article.channels.join(" · ")}
                          </p>
                        )}
                        {article.languages && (
                          <p>
                            <span className="font-semibold uppercase tracking-wider text-gray-500">
                              Idiomas:
                            </span>{" "}
                            {article.languages.map((l) => l.toUpperCase()).join(" · ")}
                          </p>
                        )}
                        {article.jobStories?.length ? (
                          <p>
                            <span className="font-semibold uppercase tracking-wider text-gray-500">
                              Job Stories:
                            </span>{" "}
                            {article.jobStories.join(" · ")}
                          </p>
                        ) : null}
                        {article.sourceFile && (
                          <p className="truncate" title={article.sourceFile}>
                            <span className="font-semibold uppercase tracking-wider text-gray-500">
                              Fuente:
                            </span>{" "}
                            <code className="font-mono text-[10px] text-gray-600">
                              {article.sourceFile}
                            </code>
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 border-t border-gray-100 bg-gray-50/60 px-5 py-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                      Retriever
                    </span>
                    {article.retrievers.map((r) => (
                      <span
                        key={r}
                        className="inline-flex items-center rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold text-gray-700 ring-1 ring-gray-200"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      {data.pending && data.pending.items.length > 0 && (
        <section className="space-y-4 pt-4">
          <header className="border-b border-gray-200 pb-3">
            <div className="flex flex-wrap items-baseline gap-3">
              <h3 className="text-2xl font-semibold text-gray-950">
                Pendientes para revisar con el cliente
              </h3>
              <span className="text-sm font-semibold text-gray-500">
                {data.pending.items.length} temas abiertos
              </span>
            </div>
            {data.pending.intro && (
              <p className="mt-2 max-w-4xl text-sm leading-6 text-gray-600">
                {data.pending.intro}
              </p>
            )}
          </header>
          <div className="space-y-4">
            {data.pending.items.map((item) => {
              const s = severityStyles[item.severity];
              return (
                <article
                  key={item.id}
                  className={`overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm ${s.accent} border-l-4`}
                >
                  <div className="flex flex-col gap-4 p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <code className="rounded bg-gray-100 px-2 py-0.5 font-mono text-[10px] font-semibold text-gray-600">
                        {item.id}
                      </code>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${s.badge}`}
                      >
                        {s.label}
                      </span>
                      {item.articles?.map((a) => (
                        <span
                          key={a}
                          className="inline-flex items-center rounded-md bg-gray-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-gray-700 ring-1 ring-gray-200"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-lg font-semibold leading-6 text-gray-950">
                      {item.title}
                    </h4>
                    <p className="whitespace-pre-line text-sm leading-6 text-gray-700">
                      {item.description}
                    </p>
                    {item.askOfClient && (
                      <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                          Petición al cliente
                        </p>
                        <p className="mt-1.5 text-sm leading-6 text-gray-800">
                          {item.askOfClient}
                        </p>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-3xl font-bold text-gray-950">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </p>
    </div>
  );
}

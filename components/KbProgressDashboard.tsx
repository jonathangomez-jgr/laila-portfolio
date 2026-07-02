import type { KbArticlesData, KbArticleCard } from "../data/customerDemos";

type Status = NonNullable<KbArticleCard["status"]>;

const STATUS_ORDER: Status[] = ["planned", "draft", "in-review", "validated"];

const statusMeta: Record<
  Status,
  { label: string; bar: string; chip: string; dot: string }
> = {
  planned: {
    label: "Planeado",
    bar: "bg-gray-400",
    chip: "bg-gray-100 text-gray-700",
    dot: "bg-gray-400",
  },
  draft: {
    label: "Draft",
    bar: "bg-amber-400",
    chip: "bg-amber-100 text-amber-800",
    dot: "bg-amber-400",
  },
  "in-review": {
    label: "En revisión",
    bar: "bg-sky-500",
    chip: "bg-sky-100 text-sky-800",
    dot: "bg-sky-500",
  },
  validated: {
    label: "Validado",
    bar: "bg-emerald-500",
    chip: "bg-emerald-100 text-emerald-800",
    dot: "bg-emerald-500",
  },
};

const rtColor: Record<string, string> = {
  "Property Fact Sheet": "bg-indigo-500",
  "Room Description": "bg-fuchsia-500",
  Policy: "bg-red-500",
  FAQ: "bg-amber-500",
  "Benefit & Program": "bg-emerald-500",
  "How-To / Self-Service": "bg-sky-500",
  Security: "bg-rose-500",
};

function collectArticles(data: KbArticlesData): KbArticleCard[] {
  return data.buckets.flatMap((b) => b.articles);
}

function statusPct(articles: KbArticleCard[]): Record<Status, number> {
  const out: Record<Status, number> = {
    planned: 0,
    draft: 0,
    "in-review": 0,
    validated: 0,
  };
  articles.forEach((a) => {
    if (a.status) out[a.status]++;
  });
  return out;
}

export default function KbProgressDashboard({ data }: { data: KbArticlesData }) {
  const articles = collectArticles(data);
  const total = articles.length;
  const counts = statusPct(articles);
  const advanced = counts.draft + counts["in-review"] + counts.validated;
  const advancedPct = total === 0 ? 0 : Math.round((advanced / total) * 100);
  const validatedPct = total === 0 ? 0 : Math.round((counts.validated / total) * 100);

  // Per Record Type: total + counts per status
  const rtStats = data.buckets.map((b) => {
    const s = statusPct(b.articles);
    const t = b.articles.length;
    const adv = s.draft + s["in-review"] + s.validated;
    return {
      recordType: b.recordType,
      total: t,
      counts: s,
      advancedPct: t === 0 ? 0 : Math.round((adv / t) * 100),
    };
  });

  // Audience buckets: extract from dataCategories where group=Audience
  const audienceCounts: Record<string, number> = {};
  articles.forEach((a) => {
    const audCats = a.dataCategories
      .filter((c) => c.group === "Audience")
      .map((c) => c.value);
    if (audCats.length === 0) audienceCounts["Unspecified"] = (audienceCounts["Unspecified"] || 0) + 1;
    audCats.forEach((v) => {
      audienceCounts[v] = (audienceCounts[v] || 0) + 1;
    });
  });

  // Job Stories coverage: count articles per JS ID
  const jsMap: Record<string, number> = {};
  articles.forEach((a) => {
    a.jobStories?.forEach((js) => {
      jsMap[js] = (jsMap[js] || 0) + 1;
    });
  });
  const jsEntries = Object.entries(jsMap).sort(
    (a, b) => a[0].localeCompare(b[0])
  );

  // Source coverage: how many have a sourceFile populated
  const withSource = articles.filter(
    (a) => a.sourceFile && a.sourceFile.length > 0
  ).length;
  const sourcePct = total === 0 ? 0 : Math.round((withSource / total) * 100);

  // Language coverage total (each article × N languages)
  const langVersions = articles.reduce(
    (acc, a) => acc + (a.languages?.length ?? 0),
    0
  );

  return (
    <section className="mt-8 space-y-6 rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-indigo-50/40 p-6 shadow-sm sm:p-8">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="text-2xl font-semibold text-gray-950">
          Progreso del Knowledge Base
        </h3>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Snapshot en tiempo real · {total} artículos planificados
        </p>
      </header>

      {/* Overall progress bar */}
      <div>
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-3">
          <div className="flex items-baseline gap-3">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Avance total
            </p>
            <p className="text-sm text-gray-600">
              <span className="text-lg font-bold text-gray-950">
                {advanced}
              </span>
              <span className="text-gray-400"> / {total}</span>
              <span className="ml-2 text-gray-500">artículos iniciados</span>
            </p>
          </div>
          <p className="text-4xl font-bold text-indigo-600">{advancedPct}%</p>
        </div>
        {/* Stacked progress bar */}
        <div className="flex h-4 overflow-hidden rounded-full bg-gray-200 shadow-inner">
          {STATUS_ORDER.filter((s) => s !== "planned").map((s) => {
            const pct = total === 0 ? 0 : (counts[s] / total) * 100;
            if (pct === 0) return null;
            return (
              <div
                key={s}
                className={`${statusMeta[s].bar} transition-all`}
                style={{ width: `${pct}%` }}
                title={`${statusMeta[s].label}: ${counts[s]}`}
              />
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap gap-4">
          {STATUS_ORDER.map((s) => (
            <div key={s} className="flex items-center gap-2">
              <span
                className={`inline-block h-2.5 w-2.5 rounded-full ${statusMeta[s].dot}`}
              />
              <span className="text-xs font-semibold text-gray-700">
                {statusMeta[s].label}
              </span>
              <span className="text-xs font-bold text-gray-950">
                {counts[s]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid: status cards + audience donut */}
      <div className="grid gap-5 lg:grid-cols-4">
        <StatCard
          label="Planeados"
          value={counts.planned}
          hint="Sin fuente entregada o pendientes de crear"
          tone="gray"
        />
        <StatCard
          label="Draft en sandbox"
          value={counts.draft}
          hint="Creados con Q/A verbatim de fuente"
          tone="amber"
        />
        <StatCard
          label="En revisión"
          value={counts["in-review"]}
          hint="Bloqueados por decisión del cliente"
          tone="sky"
        />
        <StatCard
          label="Validados"
          value={counts.validated}
          hint="Publicables / online"
          tone="emerald"
        />
      </div>

      {/* Per Record Type progress */}
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
          Avance por Record Type
        </p>
        <div className="space-y-2.5">
          {rtStats.map((rt) => (
            <div
              key={rt.recordType}
              className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white/70 px-4 py-2.5 shadow-sm"
            >
              <span
                className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${
                  rtColor[rt.recordType] ?? "bg-gray-500"
                }`}
              />
              <span className="min-w-[9rem] shrink-0 text-sm font-semibold text-gray-800 sm:min-w-[12rem]">
                {rt.recordType}
              </span>
              <div className="flex flex-1 items-center gap-3">
                <div className="flex h-2.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                  {STATUS_ORDER.filter((s) => s !== "planned").map((s) => {
                    const pct =
                      rt.total === 0 ? 0 : (rt.counts[s] / rt.total) * 100;
                    if (pct === 0) return null;
                    return (
                      <div
                        key={s}
                        className={`${statusMeta[s].bar} h-2.5`}
                        style={{ width: `${pct}%` }}
                        title={`${statusMeta[s].label}: ${rt.counts[s]}`}
                      />
                    );
                  })}
                </div>
                <span className="w-16 shrink-0 text-right text-xs font-bold text-gray-950">
                  {rt.advancedPct}%
                </span>
                <span className="w-24 shrink-0 text-right text-[11px] text-gray-500">
                  <span className="font-semibold text-gray-700">
                    {rt.total - rt.counts.planned}
                  </span>{" "}
                  / {rt.total}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audience + Coverage row */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Audience donut */}
        <div className="rounded-2xl border border-gray-200 bg-white/70 p-5 shadow-sm">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
            Cobertura por audiencia
          </p>
          <AudienceDonut counts={audienceCounts} total={total} />
        </div>

        {/* Job Stories coverage */}
        <div className="rounded-2xl border border-gray-200 bg-white/70 p-5 shadow-sm">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
            Artículos que cubren cada Job Story
          </p>
          {jsEntries.length === 0 ? (
            <p className="text-sm text-gray-500">Sin cobertura mapeada.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {jsEntries.map(([js, n]) => (
                <div
                  key={js}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 py-1"
                  title={`${n} artículos cubren ${js}`}
                >
                  <code className="font-mono text-[11px] font-bold text-indigo-700">
                    {js}
                  </code>
                  <span className="text-[11px] text-gray-500">·</span>
                  <span className="text-[12px] font-bold text-gray-950">
                    {n}
                  </span>
                </div>
              ))}
            </div>
          )}
          <p className="mt-3 text-[11px] text-gray-500">
            Job Stories del backlog MVP: cada tag muestra cuántos artículos KB
            citables tiene disponible el bot para resolverlo.
          </p>
        </div>
      </div>

      {/* Bottom metric row: sources + languages + validated */}
      <div className="grid gap-4 sm:grid-cols-3">
        <MiniMetric
          value={`${sourcePct}%`}
          label={`${withSource} de ${total} con fuente entregada`}
          hint="Trazabilidad al archivo original en el KB del cliente"
        />
        <MiniMetric
          value={langVersions.toString()}
          label="Versiones × idioma"
          hint="Suma de traducciones planeadas (ES · EN · PT)"
        />
        <MiniMetric
          value={`${validatedPct}%`}
          label="Validados listos para Online"
          hint="Necesitan firma de approver y publicación"
        />
      </div>
    </section>
  );
}

function StatCard({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: number;
  hint: string;
  tone: "gray" | "amber" | "sky" | "emerald";
}) {
  const toneStyles = {
    gray: "from-gray-50 to-white text-gray-900 ring-gray-200",
    amber: "from-amber-50 to-white text-amber-900 ring-amber-200",
    sky: "from-sky-50 to-white text-sky-900 ring-sky-200",
    emerald: "from-emerald-50 to-white text-emerald-900 ring-emerald-200",
  };
  return (
    <div
      className={`rounded-2xl bg-gradient-to-br p-5 shadow-sm ring-1 ${toneStyles[tone]}`}
    >
      <p className="text-4xl font-bold">{value}</p>
      <p className="mt-1 text-sm font-semibold">{label}</p>
      <p className="mt-1 text-[11px] leading-4 opacity-70">{hint}</p>
    </div>
  );
}

function MiniMetric({
  value,
  label,
  hint,
}: {
  value: string;
  label: string;
  hint: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white/70 px-4 py-3 shadow-sm">
      <p className="text-2xl font-bold text-gray-950">{value}</p>
      <p className="mt-0.5 text-xs font-semibold text-gray-700">{label}</p>
      <p className="mt-0.5 text-[10px] leading-4 text-gray-500">{hint}</p>
    </div>
  );
}

function AudienceDonut({
  counts,
  total,
}: {
  counts: Record<string, number>;
  total: number;
}) {
  const audienceColor: Record<string, string> = {
    ALL: "#6366f1",
    "Paradise Pass": "#22c55e",
    LVC: "#a855f7",
    Unspecified: "#9ca3af",
  };
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  if (total === 0) {
    return <p className="text-sm text-gray-500">Sin artículos.</p>;
  }
  // Build a CSS conic-gradient
  let cumulative = 0;
  const stops: string[] = [];
  entries.forEach(([name, n]) => {
    const from = (cumulative / total) * 360;
    cumulative += n;
    const to = (cumulative / total) * 360;
    const color = audienceColor[name] ?? "#9ca3af";
    stops.push(`${color} ${from}deg ${to}deg`);
  });
  const gradient = `conic-gradient(${stops.join(", ")})`;
  return (
    <div className="flex items-center gap-5">
      <div
        className="relative h-32 w-32 shrink-0 rounded-full"
        style={{ background: gradient }}
      >
        <div className="absolute inset-3 flex flex-col items-center justify-center rounded-full bg-white">
          <p className="text-2xl font-bold text-gray-950">{total}</p>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
            Artículos
          </p>
        </div>
      </div>
      <ul className="flex-1 space-y-1.5">
        {entries.map(([name, n]) => (
          <li key={name} className="flex items-center gap-2 text-sm">
            <span
              className="inline-block h-3 w-3 rounded-sm"
              style={{ background: audienceColor[name] ?? "#9ca3af" }}
            />
            <span className="flex-1 text-gray-800">{name}</span>
            <span className="font-bold text-gray-950">{n}</span>
            <span className="text-xs text-gray-500">
              ({total === 0 ? 0 : Math.round((n / total) * 100)}%)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

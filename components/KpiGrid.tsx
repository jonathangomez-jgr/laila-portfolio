import type { KpiGroup } from "../data/customerDemos";

type KpiGridProps = {
  groups: KpiGroup[];
};

const COLUMNS = [
  { key: "baseline", label: "Línea base", color: "text-gray-500" },
  { key: "goal6m", label: "Meta 6 meses", color: "text-indigo-600" },
  { key: "goal12m", label: "Meta 12 meses", color: "text-blue-600" },
] as const;

export default function KpiGrid({ groups }: KpiGridProps) {
  return (
    <div className="mt-8 space-y-8">
      {groups.map((group) => (
        <div key={group.group}>
          <p className="eyebrow mb-4">{group.group}</p>

          <div className="overflow-hidden rounded-2xl border border-gray-100">
            <div className="hidden grid-cols-[1fr_repeat(3,140px)] gap-px bg-gray-100 text-xs font-semibold uppercase tracking-[0.12em] text-gray-400 md:grid">
              <div className="bg-white px-5 py-3">KPI</div>
              {COLUMNS.map((col) => (
                <div key={col.key} className="bg-white px-4 py-3 text-center">
                  {col.label}
                </div>
              ))}
            </div>

            <div className="divide-y divide-gray-100">
              {group.items.map((item, i) => (
                <div
                  key={item.name}
                  className={`grid gap-px bg-gray-100 md:grid-cols-[1fr_repeat(3,140px)] ${
                    i % 2 === 0 ? "" : "bg-gray-50"
                  }`}
                >
                  <div
                    className={`px-5 py-4 text-sm font-medium text-gray-800 ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                    }`}
                  >
                    {item.name}
                  </div>

                  {COLUMNS.map((col) => (
                    <div
                      key={col.key}
                      className={`flex flex-col px-4 py-4 text-center ${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                      }`}
                    >
                      <span className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400 md:hidden">
                        {col.label}
                      </span>
                      <span className={`text-sm font-semibold ${col.color}`}>
                        {item[col.key]}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

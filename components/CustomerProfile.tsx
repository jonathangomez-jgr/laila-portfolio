import type { CustomerProfileData } from "../data/customerDemos";

export default function CustomerProfile({ data }: { data: CustomerProfileData }) {
  return (
    <div className="mt-8 space-y-6">
      {/* stats grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {data.stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              {s.label}
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-950">{s.value}</p>
          </div>
        ))}
      </div>

      {/* segmentos */}
      <div className="grid gap-4 sm:grid-cols-2">
        {data.segments.map((seg, i) => {
          const colors = [
            "border-indigo-100 bg-indigo-50/40",
            "border-violet-100 bg-violet-50/40",
          ];
          const labels = ["text-indigo-600", "text-violet-600"];
          return (
            <div
              key={seg.name}
              className={`rounded-2xl border p-5 ${colors[i % 2]}`}
            >
              <p className={`mb-2 text-xs font-bold uppercase tracking-widest ${labels[i % 2]}`}>
                {seg.name}
              </p>
              <p className="text-sm leading-6 text-gray-700">{seg.description}</p>
            </div>
          );
        })}
      </div>

      {/* tech stack */}
      <div>
        <p className="eyebrow mb-3">Ecosistema tecnológico</p>
        <div className="flex flex-wrap gap-2">
          {data.techStack.map((t) => (
            <span
              key={t.tool}
              className="flex items-center gap-1.5 rounded-full border border-gray-100 bg-white px-3 py-1.5 text-xs shadow-sm"
            >
              <span className="font-semibold uppercase tracking-wider text-gray-400">
                {t.category}
              </span>
              <span className="h-3 w-px bg-gray-200" />
              <span className="font-semibold text-gray-800">{t.tool}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

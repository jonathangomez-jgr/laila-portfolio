import type { OverviewData } from "../data/customerDemos";

export default function OverviewStats({ data }: { data: OverviewData }) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
      {data.stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-gray-50/60 p-5 text-center shadow-sm"
        >
          <p className="text-3xl font-bold tracking-tight text-gray-950">
            {stat.value}
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

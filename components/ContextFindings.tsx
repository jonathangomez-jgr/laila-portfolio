import type { ContextData } from "../data/customerDemos";

const groupColors = [
  {
    border: "border-amber-200",
    bg: "bg-amber-50/60",
    label: "text-amber-700",
    dot: "bg-amber-400",
    icon: "bg-amber-100 text-amber-600",
  },
  {
    border: "border-orange-200",
    bg: "bg-orange-50/60",
    label: "text-orange-700",
    dot: "bg-orange-400",
    icon: "bg-orange-100 text-orange-600",
  },
];

export default function ContextFindings({ data }: { data: ContextData }) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
      {data.groups.map((group, i) => {
        const c = groupColors[i % groupColors.length];
        return (
          <div
            key={group.name}
            className={`rounded-3xl border p-6 ${c.border} ${c.bg}`}
          >
            <div className="mb-5 flex items-center gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${c.icon}`}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className={`text-sm font-bold ${c.label}`}>{group.name}</p>
            </div>

            <ul className="space-y-3">
              {group.findings.map((finding) => (
                <li key={finding} className="flex items-start gap-2.5">
                  <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${c.dot}`} />
                  <span className="text-sm leading-6 text-gray-700">{finding}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

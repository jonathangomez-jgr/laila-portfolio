import type { SolutionLayer } from "../data/customerDemos";

type SolutionLayersProps = {
  layers: SolutionLayer[];
};

const palette = {
  indigo: {
    card: "border-indigo-100 bg-gradient-to-b from-white to-indigo-50/40",
    badge: "bg-indigo-500",
    focusBg: "bg-indigo-50",
    focusText: "text-indigo-700",
    dot: "bg-indigo-400",
    number: "bg-indigo-500 text-white",
    divider: "from-indigo-200/60",
  },
  violet: {
    card: "border-violet-100 bg-gradient-to-b from-white to-violet-50/40",
    badge: "bg-violet-500",
    focusBg: "bg-violet-50",
    focusText: "text-violet-700",
    dot: "bg-violet-400",
    number: "bg-violet-500 text-white",
    divider: "from-violet-200/60",
  },
  sky: {
    card: "border-sky-100 bg-gradient-to-b from-white to-sky-50/40",
    badge: "bg-sky-500",
    focusBg: "bg-sky-50",
    focusText: "text-sky-700",
    dot: "bg-sky-400",
    number: "bg-sky-500 text-white",
    divider: "from-sky-200/60",
  },
} satisfies Record<SolutionLayer["color"], object>;

export default function SolutionLayers({ layers }: SolutionLayersProps) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {layers.map((layer, i) => {
        const p = palette[layer.color];
        return (
          <div
            key={layer.product}
            className={`relative overflow-hidden rounded-3xl border p-6 shadow-sm ${p.card}`}
          >
            {/* número de capa */}
            <span
              className={`absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${p.number}`}
            >
              {i + 1}
            </span>

            {/* producto */}
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-bold text-white ${p.badge}`}
            >
              {layer.product}
            </span>

            {/* foco */}
            <div className={`mt-4 inline-block rounded-xl px-3 py-1.5 ${p.focusBg}`}>
              <p className={`text-sm font-semibold ${p.focusText}`}>
                {layer.focus}
              </p>
            </div>

            {/* divider */}
            <div className={`my-5 h-px bg-gradient-to-r ${p.divider} to-transparent`} />

            {/* items */}
            <ul className="space-y-2.5">
              {layer.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span
                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${p.dot}`}
                  />
                  <span className="text-sm leading-6 text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

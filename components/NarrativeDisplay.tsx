import Image from "next/image";
import type { NarrativeData } from "../data/customerDemos";

const pillarColors = [
  { ring: "ring-indigo-100", num: "bg-indigo-500", label: "text-indigo-600" },
  { ring: "ring-violet-100", num: "bg-violet-500", label: "text-violet-600" },
  { ring: "ring-sky-100", num: "bg-sky-500", label: "text-sky-600" },
];

export default function NarrativeDisplay({ data }: { data: NarrativeData }) {
  return (
    <div className="mt-8 space-y-6">
      {/* quote */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-600 p-5 text-white shadow-lg sm:p-8">
        <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-0 left-0 h-24 w-48 rounded-full bg-indigo-400/20 blur-3xl" />
        <svg
          className="relative mb-4 h-8 w-8 text-white/40"
          fill="currentColor"
          viewBox="0 0 32 32"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
        <p className="relative text-lg font-semibold leading-8">{data.quote}</p>
      </div>

      {/* pilares */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {data.pillars.map((pillar, i) => {
          const c = pillarColors[i % pillarColors.length];
          return (
            <div
              key={pillar.title}
              className={`rounded-2xl border bg-white ring-1 ${c.ring} shadow-sm overflow-hidden`}
            >
              {pillar.image && (
                <div className="flex items-center justify-center px-4 pt-5">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    width={400}
                    height={300}
                    className="w-4/5 h-auto object-contain"
                  />
                </div>
              )}
              <div className="p-5">
                <div className="mb-3 flex items-center gap-3">
                  <span className={`flex h-7 w-7 shrink-0 aspect-square items-center justify-center rounded-full text-xs font-bold text-white ${c.num}`}>
                    {i + 1}
                  </span>
                  <p className={`text-sm font-bold ${c.label}`}>{pillar.title}</p>
                </div>
                <p className="text-sm leading-6 text-gray-600">{pillar.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* closing */}
      <div className="rounded-2xl border border-gray-100 bg-gray-50/60 px-6 py-5">
        <p className="text-sm leading-7 text-gray-600">{data.closing}</p>
      </div>
    </div>
  );
}

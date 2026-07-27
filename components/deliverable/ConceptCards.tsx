import type { ConceptCard } from "@/data/agentDeliverables";

export default function ConceptCards({ cards }: { cards: ConceptCard[] }) {
  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2">
      {cards.map((c) => (
        <article
          key={c.name}
          className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 text-sm font-bold text-white shadow-sm">
              {c.order}
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-indigo-500">
                Concepto
              </p>
              <h3 className="mt-0.5 text-lg font-semibold leading-snug text-gray-950">
                {c.name}
              </h3>
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-gray-700">{c.definition}</p>

          <div className="mt-4 rounded-xl bg-indigo-50/60 px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-500">
              En este agente
            </p>
            <p className="mt-1 text-sm leading-6 text-gray-800">{c.usage}</p>
          </div>

          <a
            href={c.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 transition hover:text-indigo-800"
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.828 10.172a4 4 0 015.656 0l1 1a4 4 0 01-5.656 5.656L14.5 16.5m-4.5-4.5a4 4 0 01-5.656 0l-1-1a4 4 0 015.656-5.656l.328.328"
              />
            </svg>
            {c.sourceLabel}
          </a>
        </article>
      ))}
    </div>
  );
}

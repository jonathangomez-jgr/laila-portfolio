import type { QuestionCategory } from "@/data/agentDeliverables";

const colorMap: Record<
  QuestionCategory["color"],
  { chip: string; bar: string; ring: string }
> = {
  indigo: {
    chip: "bg-indigo-50 text-indigo-700",
    bar: "from-indigo-500 to-blue-500",
    ring: "ring-indigo-100",
  },
  violet: {
    chip: "bg-violet-50 text-violet-700",
    bar: "from-violet-500 to-fuchsia-500",
    ring: "ring-violet-100",
  },
  sky: {
    chip: "bg-sky-50 text-sky-700",
    bar: "from-sky-500 to-blue-500",
    ring: "ring-sky-100",
  },
  emerald: {
    chip: "bg-emerald-50 text-emerald-700",
    bar: "from-emerald-500 to-teal-500",
    ring: "ring-emerald-100",
  },
  amber: {
    chip: "bg-amber-50 text-amber-700",
    bar: "from-amber-500 to-orange-500",
    ring: "ring-amber-100",
  },
  rose: {
    chip: "bg-rose-50 text-rose-700",
    bar: "from-rose-500 to-pink-500",
    ring: "ring-rose-100",
  },
};

export default function QuestionBankPanel({
  categories,
}: {
  categories: QuestionCategory[];
}) {
  const totalQuestions = categories.reduce(
    (acc, c) => acc + c.questions.length,
    0
  );

  return (
    <div className="mt-8 space-y-6">
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-gray-200 bg-white/70 p-4 shadow-sm">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-sm">
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-500">
            Banco de pruebas
          </p>
          <p className="text-sm leading-6 text-gray-700">
            {totalQuestions} preguntas · {categories.length} categorías
          </p>
        </div>
        <p className="ml-auto max-w-md text-xs leading-5 text-gray-500">
          Cada categoría valida una regla operativa distinta. Los umbrales de
          aceptación viven en la sección de paso a producción.
        </p>
      </div>

      {categories.map((cat, idx) => {
        const c = colorMap[cat.color];
        return (
          <section
            key={cat.name}
            className={`overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ${c.ring}`}
          >
            <header
              className={`flex flex-wrap items-center gap-3 bg-gradient-to-r ${c.bar} px-6 py-4 text-white`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-xs font-bold text-white shadow-sm">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg font-semibold leading-tight">
                  {cat.name}
                </h3>
                <p className="mt-0.5 text-xs leading-5 text-white/85">
                  {cat.description}
                </p>
              </div>
              <span className="ml-auto rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                {cat.questions.length} · {cat.intent}
              </span>
            </header>
            <ol className="divide-y divide-gray-100">
              {cat.questions.map((q, i) => (
                <li key={q.prompt} className="grid gap-4 px-6 py-4 lg:grid-cols-[1fr_1fr]">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gray-100 text-xs font-bold text-gray-600">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500">
                        Prompt del llamante
                      </p>
                      <p className="mt-1 text-sm leading-6 text-gray-900">
                        “{q.prompt}”
                      </p>
                    </div>
                  </div>
                  <div className="lg:border-l lg:border-gray-100 lg:pl-6">
                    <p
                      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${c.chip}`}
                    >
                      Respuesta esperada
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-700">
                      {q.expected}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        );
      })}
    </div>
  );
}

"use client";

import { useState } from "react";
import type { QuestionBankData } from "@/data/customerDemos";

type QuestionBankCanvasProps = {
  data: QuestionBankData;
};

export default function QuestionBankCanvas({ data }: QuestionBankCanvasProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (question: string, index: number) => {
    try {
      await navigator.clipboard.writeText(question);
      setCopiedIndex(index);
      window.setTimeout(() => {
        setCopiedIndex((current) => (current === index ? null : current));
      }, 1800);
    } catch {
      /* clipboard denied — swallow */
    }
  };

  const grouped = data.items.reduce<Record<string, { item: QuestionBankData["items"][number]; index: number }[]>>(
    (acc, item, index) => {
      const key = item.category ?? "General";
      if (!acc[key]) acc[key] = [];
      acc[key].push({ item, index });
      return acc;
    },
    {},
  );

  const groupOrder = Object.keys(grouped);

  return (
    <section className="mt-10">
      {data.intro && (
        <p className="max-w-3xl text-base leading-7 text-gray-600">{data.intro}</p>
      )}
      {data.note && (
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50/80 px-5 py-3 text-sm leading-6 text-amber-900">
          {data.note}
        </div>
      )}

      <div className="mt-8 space-y-10">
        {groupOrder.map((category) => (
          <div key={category}>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
              {category}
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {grouped[category].map(({ item, index }) => {
                const isCopied = copiedIndex === index;
                return (
                  <div
                    key={`${category}-${index}`}
                    className="group relative flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <p className="pr-10 text-sm leading-6 text-gray-800">{item.question}</p>

                    <button
                      type="button"
                      onClick={() => handleCopy(item.question, index)}
                      aria-label={isCopied ? "Pregunta copiada" : "Copiar pregunta al portapapeles"}
                      className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border transition ${
                        isCopied
                          ? "border-emerald-300 bg-emerald-50 text-emerald-600"
                          : "border-gray-200 bg-white text-gray-500 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                      }`}
                    >
                      {isCopied ? (
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.2}
                          aria-hidden
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 10.5l4 4 8-9" />
                        </svg>
                      ) : (
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.8}
                          aria-hidden
                        >
                          <rect x="6" y="6" width="10" height="10" rx="2" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 6V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1" />
                        </svg>
                      )}
                    </button>

                    <span
                      className={`pointer-events-none absolute right-3 top-12 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white transition ${
                        isCopied ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      Copiado
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

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

      {data.whatsappQr && (
        <div className="mt-12 flex flex-col items-center gap-5 rounded-3xl border border-emerald-200 bg-emerald-50/60 p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-8">
          <a
            href={data.whatsappQr.href}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-2xl border border-emerald-200 bg-white p-3 shadow-sm transition hover:shadow-md"
            aria-label={`Abrir WhatsApp — ${data.whatsappQr.label}`}
          >
            <img
              src={data.whatsappQr.src}
              alt={data.whatsappQr.label}
              width={180}
              height={180}
              className="block h-40 w-40 sm:h-44 sm:w-44"
            />
          </a>
          <div className="text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Prueba el agente
            </p>
            <p className="mt-2 text-lg font-semibold text-gray-950">
              {data.whatsappQr.label}
            </p>
            {data.whatsappQr.caption && (
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {data.whatsappQr.caption}
              </p>
            )}
            <a
              href={data.whatsappQr.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.4.1 12c0 2.1.5 4.2 1.6 6L0 24l6.2-1.6c1.7.9 3.7 1.4 5.7 1.4h.1c6.6 0 11.9-5.4 11.9-12 0-3.2-1.2-6.2-3.4-8.3zM12 22c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.9 9.9 0 1 1 22 12c0 5.5-4.5 10-10 10zm5.5-7.5c-.3-.2-1.8-.9-2-1s-.5-.2-.7.2c-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.2.3-.4.5-.6.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6 0-.2-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6 0 1.6 1.1 3 1.3 3.3.2.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.7-.4z" />
              </svg>
              Abrir en WhatsApp
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

"use client";

import { useState } from "react";

const tabs = [
  {
    id: "overview",
    label: "Overview",
    title: "Resumen ejecutivo",
    content:
      "Esta sección resume el objetivo general de la demo, el contexto comercial y el valor que se busca demostrar al cliente.",
  },
  {
    id: "customer",
    label: "Cliente / industria",
    title: "Cliente o industria",
    content:
      "Nombre público, nombre anonimizado o industria del cliente. Aquí se puede documentar a quién va dirigida la demo y bajo qué contexto se presenta.",
  },
  {
    id: "context",
    label: "Contexto",
    title: "Contexto",
    content:
      "Describe el momento, reto o necesidad que dio origen a la demo. Esta sección ayuda a explicar por qué esta solución es relevante.",
  },
  {
    id: "objective",
    label: "Objetivo",
    title: "Objetivo de la presentación",
    content:
      "Explica qué se buscaba demostrar o provocar en la conversación con el cliente: interés, alineación, validación técnica o avance comercial.",
  },
  {
    id: "solution",
    label: "Solución",
    title: "Solución propuesta",
    content:
      "Describe la solución conceptual, funcional o técnica presentada. Aquí se conectan las capacidades de negocio con la tecnología.",
  },
  {
    id: "storytelling",
    label: "Narrativa",
    title: "Narrativa de valor",
    content:
      "Explica la historia comercial detrás de la demo: qué problema se cuenta, cómo evoluciona la conversación y cuál es el mensaje principal.",
  },
  {
    id: "outcomes",
    label: "Resultados",
    title: "Resultados esperados",
    content:
      "Describe el impacto esperado, ROI, mejora operativa, eficiencia comercial, experiencia de cliente o valor estratégico.",
  },
  {
    id: "assets",
    label: "Assets",
    title: "Assets",
    content:
      "Incluye presentaciones, screenshots, videos, scripts, diagramas, links o cualquier material relacionado con la demo.",
  },
];

export default function CustomerDemoDetailPage() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <main className="px-6 pb-16 md:px-8">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="eyebrow mb-4">Customer Demo</p>

          <h1 className="section-title max-w-4xl text-5xl font-semibold tracking-tight text-gray-950">
            Caso específico de cliente
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            Una vista estructurada para documentar el contexto, la narrativa,
            la solución y los activos asociados a una demo preparada para un
            cliente o industria específica.
          </p>
        </div>

        <div className="glass-card overflow-hidden p-3 md:p-4">
          <div className="flex gap-2 overflow-x-auto rounded-full bg-white/60 p-2">
            {tabs.map((tab) => {
              const isActive = activeTab.id === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-[0_10px_25px_rgba(95,111,255,0.28)]"
                      : "text-gray-600 hover:bg-white hover:text-gray-950"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="mt-4 grid gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="soft-card p-5">
              <p className="eyebrow mb-4">Demo structure</p>

              <div className="space-y-3">
                {tabs.map((tab, index) => {
                  const isActive = activeTab.id === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                        isActive
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-600 hover:bg-white"
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                          isActive
                            ? "bg-indigo-500 text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {index + 1}
                      </span>

                      <span className="text-sm font-semibold">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </aside>

            <section className="soft-card min-h-[420px] p-8 md:p-10">
              <p className="eyebrow mb-4">{activeTab.label}</p>

              <h2 className="section-title text-4xl font-semibold text-gray-950">
                {activeTab.title}
              </h2>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                {activeTab.content}
              </p>

              <div className="mt-10 rounded-3xl border border-dashed border-indigo-200 bg-indigo-50/50 p-6">
                <p className="text-sm font-semibold text-indigo-700">
                  Espacio editable
                </p>

                <p className="mt-2 leading-7 text-gray-600">
                  Aquí después podemos reemplazar este placeholder por contenido
                  real de cada demo: imágenes, bullets, métricas, diagramas,
                  scripts, links o videos.
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
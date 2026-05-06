"use client";

import Image from "next/image";
import { useState } from "react";
import type { CustomerDemo } from "../data/customerDemos";

type CustomerDemoDetailProps = {
  demo: CustomerDemo;
};

export default function CustomerDemoDetail({ demo }: CustomerDemoDetailProps) {
  const [activeTab, setActiveTab] = useState(demo.tabs[0]);

  return (
    <main className="px-6 pb-16 pt-12 md:px-8 md:pt-16">
      <section className="mx-auto max-w-6xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start">
          <div>
            <p className="eyebrow mb-4">Customer Demo</p>

            <h1 className="section-title max-w-4xl text-5xl font-semibold tracking-tight text-gray-950">
              {demo.customerName}
            </h1>

            <p className="mt-3 text-lg font-semibold text-indigo-600">
              {demo.title}
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
              {demo.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {demo.tags.map((tag) => (
                <span
                  key={tag}
                  className="soft-pill px-4 py-2 text-sm font-medium text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-indigo-100 bg-gradient-to-br from-white via-indigo-50/70 to-blue-50 p-6 shadow-[0_18px_50px_rgba(99,102,241,0.10)]">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-200/30 blur-2xl" />

            <div className="relative flex min-h-[130px] items-center justify-center rounded-2xl">
  {demo.logo ? (
    <Image
      src={demo.logo}
      alt={`${demo.customerName} logo`}
      width={280}
      height={120}
      className="h-auto max-h-24 w-auto object-contain"
      priority
    />
  ) : (
    <div className="text-center rounded-2xl bg-white/60 p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
        Client Logo
      </p>

      <p className="mt-3 text-sm font-semibold text-gray-700">
        VivaLux logo placeholder
      </p>

      <p className="mt-1 text-xs text-gray-500">
        PNG / SVG preferred
      </p>
    </div>
  )}
</div>

          </div>
        </div>

        <div className="glass-card overflow-hidden p-3 md:p-4">
          <div className="flex gap-2 overflow-x-auto rounded-full bg-white/60 p-2">
            {demo.tabs.map((tab) => {
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
            <aside className="soft-card hidden p-5 lg:block">
              <p className="eyebrow mb-4">Demo Structure</p>

              <div className="space-y-3">
                {demo.tabs.map((tab, index) => {
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

                      <span className="text-sm font-semibold">
                        {tab.label}
                      </span>
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
                  real de VivaLux: imágenes, bullets, métricas, diagramas,
                  scripts, links, videos o assets de presentación.
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
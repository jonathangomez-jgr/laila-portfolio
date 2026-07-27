"use client";

import Image from "next/image";
import { useState } from "react";
import type { AgentDeliverable, DeliverableTab } from "@/data/agentDeliverables";
import Markdown from "../Markdown";
import ContextPanel from "./ContextPanel";
import ConceptCards from "./ConceptCards";
import AgentSpecPanel from "./AgentSpecPanel";
import QuestionBankPanel from "./QuestionBankPanel";
import ProductionPanel from "./ProductionPanel";
import NextUseCasesPanel from "./NextUseCasesPanel";
import AppendixPanel from "./AppendixPanel";

function renderTab(tab: DeliverableTab) {
  return (
    <>
      {tab.intro && (
        <p className="mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
          {tab.intro}
        </p>
      )}

      {tab.content && (
        <div className="mt-5 max-w-4xl sm:mt-6">
          <Markdown source={tab.content} />
        </div>
      )}

      {tab.contextData && <ContextPanel data={tab.contextData} />}
      {tab.conceptCards && <ConceptCards cards={tab.conceptCards} />}
      {tab.agentSpec && <AgentSpecPanel spec={tab.agentSpec} />}
      {tab.questionCategories && (
        <QuestionBankPanel categories={tab.questionCategories} />
      )}
      {tab.productionData && <ProductionPanel data={tab.productionData} />}
      {tab.nextUseCases && <NextUseCasesPanel cases={tab.nextUseCases} />}
      {tab.appendix && <AppendixPanel data={tab.appendix} />}
    </>
  );
}

export default function AgentDeliverableDetail({
  deliverable,
}: {
  deliverable: AgentDeliverable;
}) {
  const [activeTab, setActiveTab] = useState<DeliverableTab>(
    deliverable.tabs[0]
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <main className="px-4 pb-16 pt-10 sm:px-6 sm:pt-12 md:px-8 md:pt-16">
      <section className="mx-auto w-full sm:w-[min(94%,1600px)]">
        {/* Hero */}
        <header className="mb-8 grid gap-6 sm:mb-10 lg:grid-cols-[1fr_320px] lg:items-start">
          <div className="order-2 lg:order-1">
            <p className="eyebrow mb-3 sm:mb-4">
              Entregable formal · Agentforce
            </p>

            <h1 className="section-title max-w-4xl text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
              {deliverable.title}
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 sm:mt-5 sm:text-lg sm:leading-8">
              {deliverable.subtitle}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:max-w-3xl">
              <MetaChip
                label="Cliente"
                value={deliverable.customerName}
              />
              <MetaChip
                label="Ambiente actual"
                value={deliverable.environment}
                monospace
              />
              <MetaChip
                label="Versión del agente"
                value={deliverable.version}
              />
              <MetaChip
                label="Fecha del entregable"
                value={deliverable.publishedAt}
              />
              <MetaChip
                label="Bot Id"
                value={deliverable.agentId}
                monospace
              />
              <MetaChip
                label="Preparado por"
                value={`${deliverable.preparedBy.name} · ${deliverable.preparedBy.role}`}
              />
            </div>
          </div>

          <div className="order-1 flex flex-col items-center gap-4 py-2 sm:py-4 lg:order-2">
            {deliverable.customerLogo && (
              <Image
                src={deliverable.customerLogo}
                alt={`${deliverable.customerName} logo`}
                width={280}
                height={140}
                className="h-auto max-h-20 w-auto object-contain sm:max-h-24 lg:max-h-28"
                priority
              />
            )}
            <div className="rounded-2xl border border-indigo-200 bg-white/70 px-4 py-3 text-center shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-indigo-500">
                Agente
              </p>
              <p className="mt-1 max-w-[240px] text-sm font-semibold leading-tight text-gray-950">
                {deliverable.agentName}
              </p>
            </div>
          </div>
        </header>

        {/* Chrome with tabs */}
        <div className="glass-card overflow-hidden p-2 sm:p-3 md:p-4">
          <div
            className={`flex items-center gap-2 rounded-2xl bg-white/60 p-1.5 sm:rounded-full sm:p-2 ${
              sidebarCollapsed ? "lg:flex" : "lg:hidden"
            }`}
          >
            {sidebarCollapsed && (
              <button
                type="button"
                onClick={() => setSidebarCollapsed(false)}
                aria-label="Expandir índice"
                title="Expandir índice"
                className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition hover:bg-indigo-50 hover:text-indigo-600 lg:flex"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}

            <div className="scrollbar-hide flex flex-1 gap-1.5 overflow-x-auto sm:gap-2">
              {deliverable.tabs.map((tab) => {
                const isActive = activeTab.id === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${
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
          </div>

          <div
            className={`mt-4 grid gap-6 ${
              sidebarCollapsed ? "" : "lg:grid-cols-[300px_1fr]"
            }`}
          >
            {!sidebarCollapsed && (
              <aside className="soft-card hidden p-5 lg:block">
                <div className="mb-4 flex items-center justify-between gap-2">
                  <p className="eyebrow">Índice del entregable</p>
                  <button
                    type="button"
                    onClick={() => setSidebarCollapsed(true)}
                    aria-label="Colapsar índice"
                    title="Colapsar índice"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-white hover:text-indigo-600"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-2">
                  {deliverable.tabs.map((tab, index) => {
                    const isActive = activeTab.id === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`flex w-full items-start gap-3 rounded-2xl px-4 py-3 text-left transition ${
                          isActive
                            ? "bg-indigo-50 text-indigo-700"
                            : "text-gray-600 hover:bg-white"
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                            isActive
                              ? "bg-indigo-500 text-white"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {index + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
                            {tab.section}
                          </p>
                          <p className="mt-0.5 text-sm font-semibold leading-snug">
                            {tab.label.replace(/^\d+\s·\s/, "")}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </aside>
            )}

            <section className="soft-card min-h-[280px] p-4 sm:min-h-[420px] sm:p-8 md:p-10">
              <p className="eyebrow mb-3 sm:mb-4">{activeTab.section}</p>

              <h2 className="section-title text-xl font-semibold text-gray-950 sm:text-3xl md:text-4xl">
                {activeTab.title}
              </h2>

              {renderTab(activeTab)}
            </section>
          </div>
        </div>

        {/* Footer signature */}
        <footer className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white/70 px-6 py-4 shadow-sm">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gray-500">
              Preparado por
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-900">
              {deliverable.preparedBy.name} · {deliverable.preparedBy.role}
            </p>
          </div>
          <a
            href={`mailto:${deliverable.preparedBy.email}`}
            className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
          >
            {deliverable.preparedBy.email}
          </a>
        </footer>
      </section>
    </main>
  );
}

function MetaChip({
  label,
  value,
  monospace,
}: {
  label: string;
  value: string;
  monospace?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white/70 px-4 py-3 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">
        {label}
      </p>
      <p
        className={`mt-1 text-sm font-semibold leading-tight text-gray-900 ${
          monospace ? "font-mono text-[13px]" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}

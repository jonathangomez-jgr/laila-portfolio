"use client";

import Image from "next/image";
import { useState } from "react";
import AssetsGrid from "./AssetsGrid";
import ContextFindings from "./ContextFindings";
import CustomerProfile from "./CustomerProfile";
import ArchDiagram from "./ArchDiagram";
import ArgosArchDiagram from "./ArgosArchDiagram";
import BefraArchitecture from "./BefraArchitecture";
import ArgosKpiSummaryCard from "./ArgosKpiSummaryCard";
import AgentforceLandscape from "./AgentforceLandscape";
import BlueprintArchitecture from "./BlueprintArchitecture";
import KpiGrid from "./KpiGrid";
import KpiSummaryTable from "./KpiSummaryTable";
import NarrativeDisplay from "./NarrativeDisplay";
import RoadmapTimeline from "./RoadmapTimeline";
import StoryTimeline from "./StoryTimeline";
import JourneyTimeline from "./JourneyTimeline";
import ObjectiveInfographic from "./ObjectiveInfographic";
import OverviewStats from "./OverviewStats";
import SolutionLayers from "./SolutionLayers";
import WorkshopResult from "./WorkshopResult";
import Link from "next/link";
import type { CustomerDemo } from "../data/customerDemos";
import { hasExecutiveDeck } from "../data/executiveDecks";
import type { Dictionary } from "@/lib/i18n";

type CustomerDemoDetailProps = {
  demo: CustomerDemo;
  lang: string;
  dict: Dictionary;
};

function getLocalizedTab(
  tab: CustomerDemo["tabs"][0],
  demo: CustomerDemo,
  lang: string
) {
  const i18n = lang === "en" ? demo.translations?.en : lang === "pt" ? demo.translations?.pt : undefined;
  if (!i18n) return tab;
  const t = i18n.tabs.find((t) => t.id === tab.id);
  if (!t) return tab;
  return { ...tab, label: t.label, title: t.title, content: t.content };
}

export default function CustomerDemoDetail({ demo, lang, dict }: CustomerDemoDetailProps) {
  const t = dict.customerDetail;

  const i18n = lang === "en" ? demo.translations?.en : lang === "pt" ? demo.translations?.pt : undefined;
  const demoTitle = i18n?.title ?? demo.title;
  const demoDescription = i18n?.description ?? demo.description;

  const localizedTabs = demo.tabs.map((tab) => getLocalizedTab(tab, demo, lang));
  const [activeTab, setActiveTab] = useState(localizedTabs[0]);
  const [qrOpen, setQrOpen] = useState(false);

  return (
    <main className="px-6 pb-16 pt-12 md:px-8 md:pt-16">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start">
          <div>
            <p className="eyebrow mb-4">{t.eyebrow}</p>

            <h1 className="section-title max-w-4xl text-3xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
              {demo.customerName}
            </h1>

            <p className="mt-3 text-lg font-semibold text-indigo-600">
              {demoTitle}
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
              {demoDescription}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {hasExecutiveDeck(demo.slug) && (
                <Link
                  href={`/${lang}/customer-demos/${demo.slug}/deck/executive`}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(95,111,255,0.28)] transition hover:opacity-90"
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
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                  {t.execDeckBtn}
                </Link>
              )}
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

          <div className="flex flex-col items-center gap-3 py-4">
            {demo.logo ? (
              <Image
                src={demo.logo}
                alt={`${demo.customerName} logo`}
                width={280}
                height={140}
                className="h-auto max-h-36 w-auto object-contain"
                priority
              />
            ) : (
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
                Client Logo
              </p>
            )}
            {demo.qrCode && (
              <button
                type="button"
                onClick={() => setQrOpen(true)}
                className="rounded-full border border-indigo-200 bg-white/70 px-4 py-1.5 text-xs font-semibold text-indigo-600 shadow-sm backdrop-blur transition hover:bg-indigo-50 hover:shadow-md"
              >
                QR Code
              </button>
            )}
          </div>
        </div>

        <div className="glass-card overflow-hidden p-3 md:p-4">
          <div className="flex gap-2 overflow-x-auto rounded-full bg-white/60 p-2">
            {localizedTabs.map((tab) => {
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
              <p className="eyebrow mb-4">{t.demoStructure}</p>

              <div className="space-y-3">
                {localizedTabs.map((tab, index) => {
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

            <section className="soft-card min-h-[280px] p-5 sm:min-h-[420px] sm:p-8 md:p-10">
              <p className="eyebrow mb-4">{activeTab.label}</p>

              <h2 className="section-title text-2xl font-semibold text-gray-950 sm:text-4xl">
                {activeTab.id === "customer" ? demo.customerName : activeTab.title}
              </h2>

              {activeTab.banner && (
                <div className="mt-6 h-36 w-full overflow-hidden rounded-2xl sm:h-56">
                  <img
                    src={activeTab.banner}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <p className="mt-6 max-w-3xl text-base leading-8 text-gray-600 sm:text-lg">
                {activeTab.content}
              </p>

              {activeTab.overviewData && (
                <OverviewStats data={activeTab.overviewData} />
              )}

              {activeTab.customerProfile && (
                <CustomerProfile data={activeTab.customerProfile} />
              )}

              {activeTab.contextData && (
                <ContextFindings data={activeTab.contextData} />
              )}

              {activeTab.objective && (
                <ObjectiveInfographic data={activeTab.objective} />
              )}

              {activeTab.solution && (
                <SolutionLayers layers={activeTab.solution} />
              )}

              {activeTab.narrativeData && (
                <NarrativeDisplay data={activeTab.narrativeData} />
              )}

              {activeTab.storyData && (
                <StoryTimeline
                  data={activeTab.storyData}
                  customerLogo={demo.logo}
                  customerName={demo.customerName}
                />
              )}

              {activeTab.journeyData && (
                <JourneyTimeline data={activeTab.journeyData} />
              )}

              {activeTab.archData && (
                <ArchDiagram data={activeTab.archData} />
              )}

              {activeTab.befraArchData && (
                <BefraArchitecture data={activeTab.befraArchData} />
              )}

              {activeTab.argosArch && (
                <ArgosArchDiagram />
              )}

              {activeTab.agentforceLandscapeData && (
                <AgentforceLandscape data={activeTab.agentforceLandscapeData} />
              )}

              {activeTab.kpiSummary && (
                <KpiSummaryTable rows={activeTab.kpiSummary} />
              )}

              {activeTab.argosKpiSummary && <ArgosKpiSummaryCard />}

              {activeTab.kpis && <KpiGrid groups={activeTab.kpis} />}

              {activeTab.workshopData && (
                <WorkshopResult data={activeTab.workshopData} />
              )}

              {activeTab.blueprintData && (
                <BlueprintArchitecture data={activeTab.blueprintData} />
              )}

              {activeTab.roadmapData && (
                <RoadmapTimeline data={activeTab.roadmapData} />
              )}

              {activeTab.assetsData && (
                <AssetsGrid data={activeTab.assetsData} />
              )}

              {!activeTab.overviewData &&
                !activeTab.customerProfile &&
                !activeTab.contextData &&
                !activeTab.objective &&
                !activeTab.solution &&
                !activeTab.archData &&
                !activeTab.befraArchData &&
                !activeTab.argosArch &&
                !activeTab.argosKpiSummary &&
                !activeTab.agentforceLandscapeData &&
                !activeTab.narrativeData &&
                !activeTab.storyData &&
                !activeTab.journeyData &&
                !activeTab.kpiSummary &&
                !activeTab.kpis &&
                !activeTab.workshopData &&
                !activeTab.blueprintData &&
                !activeTab.roadmapData &&
                !activeTab.assetsData && (
                  <div className="mt-10 rounded-3xl border border-dashed border-indigo-200 bg-indigo-50/50 p-6">
                    <p className="text-sm font-semibold text-indigo-700">
                      {t.emptyTabTitle}
                    </p>
                    <p className="mt-2 leading-7 text-gray-600">
                      {t.emptyTabDesc}
                    </p>
                  </div>
                )}
            </section>
          </div>
        </div>
      </section>

      {qrOpen && demo.qrCode && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setQrOpen(false)}
        >
          <div
            className="relative rounded-3xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setQrOpen(false)}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-gray-800"
              aria-label="Close"
            >
              ✕
            </button>
            <Image
              src={demo.qrCode}
              alt="QR Code"
              width={300}
              height={300}
              className="rounded-xl"
            />
          </div>
        </div>
      )}
    </main>
  );
}

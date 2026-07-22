"use client";

import Image from "next/image";
import { useState } from "react";
import AssetsGrid from "./AssetsGrid";
import Markdown from "./Markdown";
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
import JtbdCanvas from "./JtbdCanvas";
import KnowledgeLibraryInventory from "./KnowledgeLibraryInventory";
import CustomRetrieverCards from "./CustomRetrieverCards";
import KbArticlesCanvas from "./KbArticlesCanvas";
import JobStoriesCanvas from "./JobStoriesCanvas";
import TestScriptsCanvas from "./TestScriptsCanvas";
import DemoGuionCanvas from "./DemoGuionCanvas";
import QuestionBankCanvas from "./QuestionBankCanvas";
import Sprint3Canvas from "./Sprint3Canvas";
import WorkPlanCanvas from "./WorkPlanCanvas";
import ObjectiveInfographic from "./ObjectiveInfographic";
import OverviewStats from "./OverviewStats";
import SolutionLayers from "./SolutionLayers";
import WorkshopResult from "./WorkshopResult";
import JafraValorPlanCanvas from "./JafraValorPlanCanvas";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import type { CustomerDemo } from "../data/customerDemos";
import { hasExecutiveDeck } from "../data/executiveDecks";
import type { Dictionary } from "@/lib/i18n";

type CustomerDemoDetailProps = {
  demo: CustomerDemo;
  lang: string;
  dict: Dictionary;
  basePath?: "customer-demos" | "customer-projects";
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

export default function CustomerDemoDetail({ demo, lang, dict, basePath = "customer-demos" }: CustomerDemoDetailProps) {
  const t = dict.customerDetail;

  const i18n = lang === "en" ? demo.translations?.en : lang === "pt" ? demo.translations?.pt : undefined;
  const demoTitle = i18n?.title ?? demo.title;
  const demoDescription = i18n?.description ?? demo.description;

  const filteredTabs = demo.visibleTabs
    ? demo.visibleTabs
        .map((id) => demo.tabs.find((tab) => tab.id === id))
        .filter((tab): tab is CustomerDemo["tabs"][0] => tab !== undefined)
    : demo.tabs;
  const localizedTabs = filteredTabs.map((tab) => getLocalizedTab(tab, demo, lang));
  const [activeTab, setActiveTab] = useState(localizedTabs[0]);
  const [qrOpen, setQrOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <main className="px-4 pb-16 pt-10 sm:px-6 sm:pt-12 md:px-8 md:pt-16">
      <section className="mx-auto w-full sm:w-[min(90%,1600px)]">
        <div className="mb-8 grid gap-6 sm:mb-10 lg:grid-cols-[1fr_280px] lg:items-start">
          <div className="order-2 lg:order-1">
            <p className="eyebrow mb-3 sm:mb-4">{t.eyebrow}</p>

            <h1 className="section-title max-w-4xl text-2xl font-semibold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
              {demo.customerName}
            </h1>

            <p className="mt-3 text-base font-semibold text-indigo-600 sm:text-lg">
              {demoTitle}
            </p>

            <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 sm:mt-5 sm:text-lg sm:leading-8">
              {demoDescription}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {hasExecutiveDeck(demo.slug) && (
                <Link
                  href={`/${lang}/${basePath}/${demo.slug}/deck/executive`}
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

          <div className="order-1 flex flex-col items-center gap-3 py-2 sm:py-4 lg:order-2">
            {demo.logo ? (
              <Image
                src={demo.logo}
                alt={`${demo.customerName} logo`}
                width={280}
                height={140}
                className="h-auto max-h-20 w-auto object-contain sm:max-h-28 lg:max-h-36"
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

        {demo.slug === "pam" && (
          <a
            href="https://wa.me/17863822026"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-6 flex w-full items-center justify-between gap-6 rounded-3xl bg-gradient-to-r from-emerald-500 via-emerald-500 to-green-600 px-6 py-5 text-white shadow-[0_18px_45px_rgba(34,197,94,0.35)] transition hover:shadow-[0_22px_55px_rgba(34,197,94,0.45)] sm:px-8 sm:py-6"
          >
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/20 sm:h-12 sm:w-12">
                <svg
                  className="h-6 w-6 sm:h-7 sm:w-7"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/80">
                  Prueba el Concierge en vivo
                </p>
                <p className="mt-1 text-lg font-semibold leading-tight sm:text-xl">
                  Chatea con Paradise Pass por WhatsApp
                </p>
                <p className="mt-1 text-sm text-white/85">
                  wa.me/17863822026 · escanea el QR con tu teléfono o toca el banner
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 rounded-2xl bg-white p-2 shadow-inner sm:block">
              <QRCodeSVG
                value="https://wa.me/17863822026"
                size={96}
                bgColor="#ffffff"
                fgColor="#065f46"
                level="M"
              />
            </div>
          </a>
        )}

        <div className="glass-card overflow-hidden p-2 sm:p-3 md:p-4">
          {/* Top tab bar — visible on mobile/tablet always; on desktop only when sidebar is collapsed */}
          <div
            className={`flex items-center gap-2 rounded-2xl bg-white/60 p-1.5 sm:rounded-full sm:p-2 ${
              sidebarCollapsed ? "lg:flex" : "lg:hidden"
            }`}
          >
            {/* Expand sidebar button — desktop only, sits next to the horizontal nav */}
            {sidebarCollapsed && (
              <button
                type="button"
                onClick={() => setSidebarCollapsed(false)}
                aria-label={t.expandSidebar}
                title={t.expandSidebar}
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
              {localizedTabs.map((tab) => {
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
              sidebarCollapsed ? "" : "lg:grid-cols-[280px_1fr]"
            }`}
          >
            {!sidebarCollapsed && (
              <aside className="soft-card hidden p-5 lg:block">
                <div className="mb-4 flex items-center justify-between gap-2">
                  <p className="eyebrow">{t.demoStructure}</p>
                  <button
                    type="button"
                    onClick={() => setSidebarCollapsed(true)}
                    aria-label={t.collapseSidebar}
                    title={t.collapseSidebar}
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
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
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
            )}

            <section className="soft-card min-h-[280px] p-4 sm:min-h-[420px] sm:p-8 md:p-10">
              <p className="eyebrow mb-3 sm:mb-4">{activeTab.label}</p>

              <h2 className="section-title text-xl font-semibold text-gray-950 sm:text-3xl md:text-4xl">
                {activeTab.id === "customer" ? demo.customerName : activeTab.title}
              </h2>

              {activeTab.banner && (
                <div className="mt-5 h-32 w-full overflow-hidden rounded-2xl sm:mt-6 sm:h-56">
                  <img
                    src={activeTab.banner}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {(() => {
                const c = activeTab.content ?? "";
                if (!c.trim()) return null;
                // Detect markdown-ish syntax: paragraph breaks, headings, tables, lists, code, blockquotes
                const hasRichSyntax =
                  /\n\n|\n[#•*\-\d]|\|\s*[-]+\s*\|/.test(c) ||
                  /```/.test(c) ||
                  /\*\*[^*]+\*\*/.test(c);
                if (hasRichSyntax) {
                  return (
                    <div className="mt-5 max-w-4xl sm:mt-6">
                      <Markdown source={c} />
                    </div>
                  );
                }
                return (
                  <p className="mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
                    {c}
                  </p>
                );
              })()}

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

              {activeTab.valorWorkshopPlanData && (
                <JafraValorPlanCanvas data={activeTab.valorWorkshopPlanData} />
              )}

              {activeTab.blueprintData && (
                <BlueprintArchitecture data={activeTab.blueprintData} />
              )}

              {activeTab.roadmapData && (
                <RoadmapTimeline data={activeTab.roadmapData} />
              )}

              {activeTab.jtbdData && (
                <JtbdCanvas
                  data={activeTab.jtbdData}
                  deckHref={
                    hasExecutiveDeck(demo.slug, "jtbd")
                      ? `/${lang}/${basePath}/${demo.slug}/deck/jtbd`
                      : undefined
                  }
                />
              )}

              {activeTab.sprint3Data && (
                <Sprint3Canvas
                  data={activeTab.sprint3Data}
                  deckHref={
                    hasExecutiveDeck(demo.slug, "sprint-3")
                      ? `/${lang}/${basePath}/${demo.slug}/deck/sprint-3`
                      : undefined
                  }
                />
              )}

              {activeTab.workPlanData && (
                <WorkPlanCanvas data={activeTab.workPlanData} />
              )}

              {activeTab.assetsData && (
                <AssetsGrid data={activeTab.assetsData} />
              )}

              {activeTab.knowledgeInventoryData && (
                <KnowledgeLibraryInventory data={activeTab.knowledgeInventoryData} />
              )}

              {activeTab.customRetrieverData && (
                <CustomRetrieverCards data={activeTab.customRetrieverData} />
              )}

              {activeTab.kbArticlesData && (
                <KbArticlesCanvas data={activeTab.kbArticlesData} />
              )}

              {activeTab.jobStoriesData && (
                <JobStoriesCanvas data={activeTab.jobStoriesData} />
              )}

              {activeTab.testScriptsData && (
                <TestScriptsCanvas data={activeTab.testScriptsData} />
              )}

              {activeTab.demoGuionData && (
                <DemoGuionCanvas data={activeTab.demoGuionData} />
              )}

              {activeTab.questionBankData && (
                <QuestionBankCanvas data={activeTab.questionBankData} />
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

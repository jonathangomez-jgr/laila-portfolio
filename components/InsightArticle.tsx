"use client";

import { useEffect, useState } from "react";
import type {
  Insight,
  InsightBlock,
  InsightSection,
} from "@/data/insights";

type Dict = {
  tableOfContents: string;
  summary: string;
  readingTime: string;
  topic: string;
  level: string;
  updated: string;
  author: string;
  backToInsights: string;
  shareTitle: string;
  shareDesc: string;
  shareCta: string;
  executive: string;
  architect: string;
  deep: string;
  execDeckBtn: string;
  execDeckHint: string;
};

const AUDIENCE_KEY: Record<"executive" | "architect" | "deep", keyof Dict> = {
  executive: "executive",
  architect: "architect",
  deep: "deep",
};

const TONE_CALLOUT: Record<string, { border: string; bg: string; chip: string; icon: string }> = {
  info: {
    border: "border-indigo-200",
    bg: "bg-indigo-50/70",
    chip: "bg-indigo-100 text-indigo-700",
    icon: "ℹ",
  },
  warning: {
    border: "border-amber-200",
    bg: "bg-amber-50/70",
    chip: "bg-amber-100 text-amber-800",
    icon: "⚠",
  },
  success: {
    border: "border-emerald-200",
    bg: "bg-emerald-50/70",
    chip: "bg-emerald-100 text-emerald-700",
    icon: "✓",
  },
  critical: {
    border: "border-rose-200",
    bg: "bg-rose-50/70",
    chip: "bg-rose-100 text-rose-700",
    icon: "✕",
  },
  note: {
    border: "border-slate-200",
    bg: "bg-slate-50/70",
    chip: "bg-slate-200 text-slate-700",
    icon: "•",
  },
};

const TONE_CARD: Record<string, { border: string; ring: string; chip: string }> = {
  primary: {
    border: "border-indigo-200",
    ring: "ring-1 ring-indigo-100",
    chip: "bg-indigo-100 text-indigo-700",
  },
  success: {
    border: "border-emerald-200",
    ring: "ring-1 ring-emerald-100",
    chip: "bg-emerald-100 text-emerald-700",
  },
  warn: {
    border: "border-amber-200",
    ring: "ring-1 ring-amber-100",
    chip: "bg-amber-100 text-amber-800",
  },
  violet: {
    border: "border-violet-200",
    ring: "ring-1 ring-violet-100",
    chip: "bg-violet-100 text-violet-700",
  },
  neutral: {
    border: "border-slate-200",
    ring: "ring-1 ring-slate-100",
    chip: "bg-slate-200 text-slate-700",
  },
};

function renderBlock(block: InsightBlock, idx: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={idx} className="my-4 text-[1.02rem] leading-8 text-gray-700">
          {block.text}
        </p>
      );
    case "heading": {
      const Tag = block.level === 2 ? "h2" : "h3";
      const cls =
        block.level === 2
          ? "mt-10 mb-3 text-2xl font-semibold tracking-tight text-gray-950"
          : "mt-8 mb-2 text-lg font-semibold text-gray-900";
      return (
        <Tag key={idx} id={block.id} className={cls}>
          {block.text}
        </Tag>
      );
    }
    case "list":
      return block.ordered ? (
        <ol
          key={idx}
          className="my-4 list-decimal space-y-2 pl-6 text-[1rem] leading-7 text-gray-700 marker:font-semibold marker:text-indigo-500"
        >
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ol>
      ) : (
        <ul
          key={idx}
          className="my-4 list-disc space-y-2 pl-6 text-[1rem] leading-7 text-gray-700 marker:text-indigo-500"
        >
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case "callout": {
      const tone = TONE_CALLOUT[block.tone];
      return (
        <aside
          key={idx}
          className={`my-6 rounded-2xl border ${tone.border} ${tone.bg} p-5`}
        >
          <div className="flex items-start gap-4">
            <span
              className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${tone.chip} text-sm font-bold`}
            >
              {tone.icon}
            </span>
            <div>
              {block.title && (
                <p className="mb-1 text-sm font-semibold uppercase tracking-[0.14em] text-gray-700">
                  {block.title}
                </p>
              )}
              <p className="text-[0.98rem] leading-7 text-gray-700">
                {block.text}
              </p>
            </div>
          </div>
        </aside>
      );
    }
    case "ascii":
      return (
        <figure key={idx} className="my-7 overflow-hidden rounded-2xl border border-gray-200 bg-gray-950">
          {block.title && (
            <figcaption className="border-b border-white/10 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-300">
              {block.title}
            </figcaption>
          )}
          <pre className="overflow-x-auto px-5 py-5 text-[12px] leading-[1.45] text-emerald-200">
            <code>{block.content}</code>
          </pre>
        </figure>
      );
    case "table":
      return (
        <div
          key={idx}
          className="my-6 overflow-x-auto rounded-2xl border border-gray-200 bg-white"
        >
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gradient-to-r from-indigo-50 to-white text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-700">
              <tr>
                {block.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {block.rows.map((row, ri) => (
                <tr key={ri} className="align-top">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`px-4 py-3 leading-7 ${
                        ci === 0
                          ? "font-semibold text-gray-900"
                          : "text-gray-700"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "quote":
      return (
        <blockquote
          key={idx}
          className="my-6 rounded-2xl border-l-4 border-indigo-500 bg-indigo-50/50 px-6 py-5 text-lg italic leading-8 text-gray-800"
        >
          “{block.text}”
          {block.author && (
            <footer className="mt-2 text-sm not-italic text-gray-500">
              — {block.author}
            </footer>
          )}
        </blockquote>
      );
    case "image": {
      const maxCls =
        block.maxWidth === "wide"
          ? "max-w-none"
          : block.maxWidth === "narrow"
            ? "max-w-xl"
            : "max-w-3xl";
      const bg =
        block.tone === "dark" ? "bg-gray-950" : "bg-gradient-to-br from-indigo-50/60 via-white to-white";
      return (
        <figure key={idx} className={`my-8 ${maxCls}`}>
          <div
            className={`overflow-hidden rounded-2xl border border-gray-200 ${bg} p-3 sm:p-5`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={block.src}
              alt={block.alt}
              loading="lazy"
              className="mx-auto block h-auto w-full max-w-full rounded-xl object-contain"
            />
          </div>
          {(block.caption || block.source) && (
            <figcaption className="mt-3 text-sm leading-6 text-gray-500">
              {block.caption}
              {block.source && (
                <>
                  {block.caption ? " " : ""}
                  <a
                    href={block.source.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-indigo-600 underline-offset-2 hover:underline"
                  >
                    Fuente: {block.source.label}
                  </a>
                  .
                </>
              )}
            </figcaption>
          )}
        </figure>
      );
    }
    case "cards": {
      const cols = block.columns ?? 2;
      const gridCls =
        cols === 3
          ? "grid-cols-1 md:grid-cols-3"
          : "grid-cols-1 md:grid-cols-2";
      return (
        <div key={idx} className={`my-7 grid gap-4 ${gridCls}`}>
          {block.items.map((it, i) => {
            const tone = TONE_CARD[it.tone ?? "neutral"];
            return (
              <div
                key={i}
                className={`rounded-2xl border ${tone.border} ${tone.ring} bg-white p-5 shadow-[0_8px_24px_rgba(99,102,241,0.06)]`}
              >
                {it.eyebrow && (
                  <span
                    className={`mb-3 inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${tone.chip}`}
                  >
                    {it.eyebrow}
                  </span>
                )}
                <h4 className="mb-2 text-base font-semibold tracking-tight text-gray-950">
                  {it.title}
                </h4>
                <p className="text-sm leading-6 text-gray-600">
                  {it.description}
                </p>
              </div>
            );
          })}
        </div>
      );
    }
    case "kpis":
      return (
        <div
          key={idx}
          className="my-6 grid grid-cols-2 gap-3 md:grid-cols-4"
        >
          {block.items.map((kpi, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200 bg-white p-4 text-center"
            >
              <p className="text-2xl font-bold tracking-tight text-indigo-600">
                {kpi.value}
              </p>
              <p className="mt-1 text-xs text-gray-500">{kpi.label}</p>
            </div>
          ))}
        </div>
      );
    case "divider":
      return <hr key={idx} className="my-10 border-gray-200" />;
    case "statement":
      return (
        <div
          key={idx}
          className="my-7 overflow-hidden rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 p-6 shadow-[0_18px_40px_rgba(99,102,241,0.14)]"
        >
          <p className="text-[1.05rem] font-medium leading-8 text-gray-900">
            {block.text}
          </p>
        </div>
      );
    case "sources":
      return (
        <ul key={idx} className="my-4 space-y-2">
          {block.items.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-sm leading-7 text-gray-700">
              <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400" />
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-indigo-600 underline-offset-4 hover:underline"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

function Section({ section }: { section: InsightSection }) {
  return (
    <section id={section.id} className="scroll-mt-28">
      {section.eyebrow && (
        <p className="eyebrow mb-3 text-indigo-500">{section.eyebrow}</p>
      )}
      <h2 className="text-2xl font-semibold tracking-tight text-gray-950 sm:text-3xl">
        {section.title}
      </h2>
      <div className="mt-2">
        {section.blocks.map((b, i) => renderBlock(b, i))}
      </div>
    </section>
  );
}

export default function InsightArticle({
  insight,
  lang,
  dict,
  hasDeck = false,
}: {
  insight: Insight;
  lang: string;
  dict: Dict;
  hasDeck?: boolean;
}) {
  const [active, setActive] = useState<string>(insight.sections[0]?.id ?? "");

  useEffect(() => {
    const ids = insight.sections.map((s) => s.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [insight]);

  const formattedDate = new Date(insight.updatedAt).toLocaleDateString(
    lang === "es" ? "es-MX" : lang === "pt" ? "pt-BR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <main className="px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 md:px-8 md:pt-14">
      <article className="mx-auto w-[min(96%,1600px)]">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-xs text-gray-500">
          <a href={`/${lang}/insights`} className="hover:text-indigo-600">
            ← {dict.backToInsights}
          </a>
        </nav>

        {/* Header */}
        <header className="mb-10 max-w-5xl">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-600">
              {insight.topic}
            </span>
            {insight.audience.map((a) => (
              <span
                key={a}
                className="rounded-full border border-gray-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-600"
              >
                {dict[AUDIENCE_KEY[a]]}
              </span>
            ))}
            <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
              {insight.readingMinutes} {dict.readingTime}
            </span>
          </div>
          <h1 className="section-title text-3xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
            {insight.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
            {insight.subtitle}
          </p>

          {(hasDeck || insight.externalDeckUrl) && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {hasDeck && (
                <a
                  href={`/${lang}/insights/${insight.slug}/deck`}
                  className="primary-button inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 5h16M4 5v14h16V5M4 5l8 7 8-7"
                    />
                  </svg>
                  {dict.execDeckBtn}
                </a>
              )}
              {insight.externalDeckUrl && (
                <a
                  href={insight.externalDeckUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-950/10 bg-gray-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 7.5A2.5 2.5 0 015.5 5h13A2.5 2.5 0 0121 7.5v9a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 013 16.5v-9zM8 21h8M12 19v2"
                    />
                  </svg>
                  {insight.externalDeckLabel ?? "Ver presentación"}
                  <svg
                    className="h-3.5 w-3.5 opacity-70"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5h5v5M19 5l-9 9M10 5H5v14h14v-5"
                    />
                  </svg>
                </a>
              )}
              {insight.presenterDeckRoute && (
                <a
                  href={`/${lang}/insights/${insight.slug}/${insight.presenterDeckRoute}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[#00b3ff]/40 bg-[#00b3ff]/10 px-5 py-2.5 text-sm font-semibold text-[#022ac0] shadow-sm transition hover:border-[#00b3ff]/70 hover:bg-[#00b3ff]/20"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h10M4 18h16M18 10l3 2-3 2v-4z"
                    />
                  </svg>
                  {insight.presenterDeckLabel ?? "Modo presentador"}
                </a>
              )}
              {hasDeck && <span className="text-xs text-gray-500">{dict.execDeckHint}</span>}
            </div>
          )}

          {/* Meta row */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
            <span>
              <span className="font-semibold text-gray-700">{insight.author}</span>
              <span className="mx-1.5">·</span>
              {insight.authorRole}
            </span>
            <span>
              <span className="font-semibold text-gray-700">{dict.updated}:</span>{" "}
              {formattedDate}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {insight.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-medium text-indigo-600"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Cover image */}
        {insight.coverImage && (
          <figure className="mb-10 max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-indigo-50/60 via-white to-white p-3 sm:p-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={insight.coverImage.src}
              alt={insight.coverImage.alt}
              loading="eager"
              className="mx-auto block h-auto w-full max-w-full rounded-2xl object-contain"
            />
            {insight.coverImage.source && (
              <figcaption className="mt-3 px-2 text-xs text-gray-500">
                <a
                  href={insight.coverImage.source.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-indigo-600 underline-offset-2 hover:underline"
                >
                  Fuente: {insight.coverImage.source.label}
                </a>
                .
              </figcaption>
            )}
          </figure>
        )}

        {/* Executive summary card */}
        <div className="mb-12 max-w-5xl rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50/70 via-white to-white p-6 md:p-8">
          <p className="eyebrow mb-2 text-indigo-500">{dict.summary}</p>
          <p className="text-[1.05rem] leading-8 text-gray-800">
            {insight.summary}
          </p>
        </div>

        {/* Body + TOC */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* Sticky TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">
                {dict.tableOfContents}
              </p>
              <ul className="space-y-1.5 border-l border-gray-200">
                {insight.sections.map((s, i) => {
                  const isActive = active === s.id;
                  return (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className={`block -ml-px border-l-2 py-1 pl-4 text-sm leading-5 transition ${
                          isActive
                            ? "border-indigo-500 font-semibold text-indigo-600"
                            : "border-transparent text-gray-500 hover:text-gray-900"
                        }`}
                      >
                        <span className="mr-1.5 text-[10px] font-mono text-gray-400">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {s.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Article body */}
          <div className="min-w-0 max-w-3xl">
            <div className="space-y-14">
              {insight.sections.map((s) => (
                <Section key={s.id} section={s} />
              ))}
            </div>

            {/* Footer share */}
            <div className="mt-16 rounded-3xl border border-gray-200 bg-white p-6 md:p-8">
              <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="eyebrow mb-2 text-indigo-500">{dict.shareTitle}</p>
                  <p className="text-sm leading-6 text-gray-600">
                    {dict.shareDesc}
                  </p>
                </div>
                <a
                  href={`/${lang}/contact`}
                  className="primary-button inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold"
                >
                  {dict.shareCta}
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="mt-10">
              <a
                href={`/${lang}/insights`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:underline"
              >
                ← {dict.backToInsights}
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  Recipe,
  RecipeApproach,
  RecipeAudience,
  RecipeBlock,
  RecipeSection,
} from "@/data/buildRecipes";

type BlockDict = {
  symptomLabel: string;
  rootCauseLabel: string;
  impactLabel: string;
  prosLabel: string;
  consLabel: string;
  whenToUseLabel: string;
  whenNotToUseLabel: string;
  commandLabel: string;
  issueHeader: string;
  solutionHeader: string;
  purposeLabel: string;
  fieldsLabel: string;
  methodsLabel: string;
  sharingLabel: string;
  endpointLabel: string;
  requestBodyLabel: string;
  responseLabel: string;
  headersLabel: string;
  legendLabel: string;
  screenshotPending: string;
  conceptExpertNote: string;
};

type Dict = {
  eyebrow: string;
  readingTime: string;
  tableOfContents: string;
  expandAll: string;
  collapseAll: string;
  expandSection: string;
  collapseSection: string;
  backToRecipes: string;
  updated: string;
  author: string;
  problemLabel: string;
  tldrLabel: string;
  execDeckBtn: string;
  execDeckHint: string;
  approach: Record<RecipeApproach, string>;
  audience: Record<RecipeAudience, string>;
  block: BlockDict;
};

const APPROACH_STYLE: Record<
  RecipeApproach,
  { border: string; bg: string; text: string; dot: string }
> = {
  standard: {
    border: "border-emerald-200",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  hybrid: {
    border: "border-amber-200",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  custom: {
    border: "border-violet-200",
    bg: "bg-violet-50",
    text: "text-violet-700",
    dot: "bg-violet-500",
  },
};

const TONE_CALLOUT: Record<
  string,
  { border: string; bg: string; chip: string; icon: string }
> = {
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

const METHOD_COLOR: Record<string, string> = {
  GET: "bg-emerald-100 text-emerald-700 border-emerald-200",
  POST: "bg-indigo-100 text-indigo-700 border-indigo-200",
  PUT: "bg-amber-100 text-amber-700 border-amber-200",
  PATCH: "bg-amber-100 text-amber-700 border-amber-200",
  DELETE: "bg-rose-100 text-rose-700 border-rose-200",
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.4}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  );
}

function Concept({
  block,
  dict,
}: {
  block: Extract<RecipeBlock, { type: "concept" }>;
  dict: Dict;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-3 px-5 py-4 text-left transition hover:bg-slate-100/60"
        aria-expanded={open}
      >
        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[11px] font-bold text-indigo-700">
          ?
        </span>
        <div className="flex-1">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            {dict.block.conceptExpertNote}
          </p>
          <p className="text-base font-semibold text-gray-900">{block.title}</p>
          <p className="mt-1 text-sm leading-6 text-gray-600">{block.peek}</p>
        </div>
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div className="border-t border-slate-200 bg-white px-5 py-5">
          {block.blocks.map((b, i) => renderBlock(b, i, dict))}
        </div>
      )}
    </div>
  );
}

function DataModel({
  block,
  dict,
}: {
  block: Extract<RecipeBlock, { type: "dataModel" }>;
  dict: Dict;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-4 overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-gray-50"
        aria-expanded={open}
      >
        <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo-600">
          Object
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-mono text-sm font-semibold text-gray-900">
            {block.name}
          </p>
          <p className="mt-0.5 text-sm leading-6 text-gray-600">{block.purpose}</p>
        </div>
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div className="border-t border-gray-200">
          <p className="border-b border-gray-100 bg-gray-50 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">
            {dict.block.fieldsLabel}
          </p>
          <ul className="divide-y divide-gray-100">
            {block.fields.map((f) => (
              <li key={f.name} className="grid gap-1 px-5 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-4">
                <p className="font-mono text-xs font-semibold text-gray-900 sm:text-sm">
                  {f.name}
                </p>
                <p className="font-mono text-xs text-indigo-600">{f.type}</p>
                <p className="text-sm leading-6 text-gray-600">{f.purpose}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function CodeRef({
  block,
  dict,
}: {
  block: Extract<RecipeBlock, { type: "codeRef" }>;
  dict: Dict;
}) {
  const [open, setOpen] = useState(false);
  const KIND_LABEL: Record<string, string> = {
    apex: "Apex",
    lwc: "LWC",
    flow: "Flow",
    prompt: "Prompt",
    trigger: "Trigger",
    event: "Event",
  };
  return (
    <div className="my-4 overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-gray-50"
        aria-expanded={open}
      >
        <span className="rounded-md bg-violet-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-700">
          {KIND_LABEL[block.kind] ?? block.kind}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-mono text-sm font-semibold text-gray-900">
            {block.name}
          </p>
          <p className="mt-0.5 text-sm leading-6 text-gray-600">
            {block.purpose}
          </p>
        </div>
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div className="border-t border-gray-200 px-5 py-4">
          {block.sharing && (
            <p className="mb-3 text-xs text-gray-500">
              <span className="font-semibold text-gray-700">
                {dict.block.sharingLabel}:
              </span>{" "}
              <span className="font-mono text-indigo-600">{block.sharing}</span>
            </p>
          )}
          {block.methods && block.methods.length > 0 && (
            <>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">
                {dict.block.methodsLabel}
              </p>
              <ul className="space-y-2">
                {block.methods.map((m) => (
                  <li key={m.name} className="text-sm">
                    <p className="font-mono text-[13px] font-semibold text-gray-900">
                      {m.name}
                    </p>
                    <p className="text-sm leading-6 text-gray-600">
                      {m.description}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function ApiCall({
  block,
  dict,
}: {
  block: Extract<RecipeBlock, { type: "apiCall" }>;
  dict: Dict;
}) {
  const methodCls =
    METHOD_COLOR[block.method] ?? "bg-gray-100 text-gray-700 border-gray-200";
  return (
    <div className="my-5 overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="border-b border-gray-100 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
          {dict.block.endpointLabel} · {block.title}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-md border px-2 py-0.5 font-mono text-xs font-bold ${methodCls}`}
          >
            {block.method}
          </span>
          <code className="break-all rounded-md bg-gray-950 px-2 py-1 font-mono text-[12px] text-emerald-200">
            {block.url}
          </code>
        </div>
      </div>
      {block.headers && block.headers.length > 0 && (
        <div className="border-b border-gray-100 px-5 py-4">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">
            {dict.block.headersLabel}
          </p>
          <ul className="space-y-1 text-xs">
            {block.headers.map((h) => (
              <li key={h.name} className="font-mono text-gray-700">
                <span className="text-indigo-600">{h.name}:</span> {h.value}
              </li>
            ))}
          </ul>
        </div>
      )}
      {block.body && (
        <div className="border-b border-gray-100">
          <p className="border-b border-gray-100 bg-gray-50 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">
            {dict.block.requestBodyLabel}
          </p>
          <pre className="overflow-x-auto px-5 py-4 text-[12px] leading-[1.55] text-gray-800">
            <code>{block.body}</code>
          </pre>
        </div>
      )}
      {block.response && (
        <div>
          <p className="border-b border-gray-100 bg-gray-50 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">
            {dict.block.responseLabel}
          </p>
          <pre className="overflow-x-auto px-5 py-4 text-[12px] leading-[1.55] text-gray-800">
            <code>{block.response}</code>
          </pre>
        </div>
      )}
      {block.note && (
        <p className="border-t border-gray-100 bg-amber-50/50 px-5 py-3 text-xs leading-6 text-amber-800">
          {block.note}
        </p>
      )}
    </div>
  );
}

function ScreenshotLightbox({
  src,
  alt,
  caption,
  onClose,
}: {
  src: string;
  alt: string;
  caption: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-gray-950/92 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.4}
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 6l12 12M6 18L18 6"
          />
        </svg>
      </button>
      <div
        className="flex flex-1 items-center justify-center p-4 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
        />
      </div>
      {caption && (
        <div
          className="px-4 pb-6 pt-2 text-center text-sm leading-6 text-white/80 sm:px-8"
          onClick={(e) => e.stopPropagation()}
        >
          {caption}
        </div>
      )}
    </div>
  );
}

function Screenshot({
  caption,
  aspect,
  src,
  alt,
  pendingLabel,
}: {
  caption: string;
  aspect?: "wide" | "square" | "tall";
  src?: string;
  alt?: string;
  pendingLabel: string;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const aspectCls =
    aspect === "square"
      ? "aspect-square"
      : aspect === "tall"
        ? "aspect-[3/4]"
        : "aspect-[16/9]";
  const resolvedAlt = alt ?? caption;
  return (
    <figure className="my-6">
      <div
        className={`group relative flex ${aspectCls} w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed border-indigo-200 bg-gradient-to-br from-indigo-50/50 via-white to-white`}
      >
        {src ? (
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label={`${resolvedAlt} — expand`}
            className="relative block h-full w-full cursor-zoom-in bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={resolvedAlt}
              className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.01]"
              loading="lazy"
            />
            <span
              className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-gray-950/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100"
              aria-hidden
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.4}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7"
                />
              </svg>
              Expandir
            </span>
          </button>
        ) : (
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
              <svg
                className="h-5 w-5 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 5h16v14H4V5zm0 0l8 8 4-4 4 4"
                />
              </svg>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-500">
              {pendingLabel}
            </p>
          </div>
        )}
      </div>
      <figcaption className="mt-2 text-sm leading-6 text-gray-500">
        {caption}
      </figcaption>
      {lightboxOpen && src && (
        <ScreenshotLightbox
          src={src}
          alt={resolvedAlt}
          caption={caption}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </figure>
  );
}

function renderBlock(block: RecipeBlock, idx: number, dict: Dict): React.ReactNode {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={idx} className="my-4 text-[1.02rem] leading-8 text-gray-700">
          {block.text}
        </p>
      );
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
          className={`my-5 rounded-2xl border ${tone.border} ${tone.bg} p-5`}
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
    case "divider":
      return <hr key={idx} className="my-10 border-gray-200" />;
    case "problem":
      return (
        <div
          key={idx}
          className="my-6 overflow-hidden rounded-3xl border border-rose-200 bg-gradient-to-br from-rose-50 via-white to-white"
        >
          <div className="grid gap-0 md:grid-cols-3">
            <div className="border-b border-rose-100 p-5 md:border-b-0 md:border-r">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-rose-500">
                {dict.block.symptomLabel}
              </p>
              <p className="text-sm leading-7 text-gray-800">{block.symptom}</p>
            </div>
            <div className="border-b border-rose-100 p-5 md:border-b-0 md:border-r">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-rose-500">
                {dict.block.rootCauseLabel}
              </p>
              <p className="text-sm leading-7 text-gray-800">
                {block.rootCause}
              </p>
            </div>
            <div className="p-5">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-rose-500">
                {dict.block.impactLabel}
              </p>
              <p className="text-sm leading-7 text-gray-800">
                {block.impact ?? "—"}
              </p>
            </div>
          </div>
        </div>
      );
    case "comparison":
      return (
        <div
          key={idx}
          className="my-6 overflow-hidden rounded-2xl border border-gray-200 bg-white"
        >
          <div className="grid grid-cols-1 border-b border-gray-100 md:grid-cols-3">
            <div className="hidden bg-gray-50 px-5 py-3 md:block" />
            <div className="border-b border-gray-100 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-800 md:border-b-0 md:border-r">
              {block.standardLabel}
            </div>
            <div className="bg-violet-50 px-5 py-3 text-sm font-semibold text-violet-800">
              {block.customLabel}
            </div>
          </div>
          <ul className="divide-y divide-gray-100">
            {block.rows.map((r, i) => (
              <li
                key={i}
                className="grid grid-cols-1 gap-3 px-0 md:grid-cols-3 md:gap-0"
              >
                <div className="bg-gray-50/60 px-5 py-4 text-[13px] font-semibold uppercase tracking-[0.04em] text-gray-700 md:text-xs md:tracking-[0.14em]">
                  {r.dimension}
                </div>
                <div className="border-t border-gray-100 px-5 py-4 text-sm leading-7 text-gray-700 md:border-l md:border-t-0">
                  {r.standard}
                </div>
                <div className="border-t border-gray-100 px-5 py-4 text-sm leading-7 text-gray-700 md:border-l md:border-t-0">
                  {r.custom}
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    case "concept":
      return <Concept key={idx} block={block} dict={dict} />;
    case "architecture":
      return (
        <div key={idx} className="my-7">
          <figure className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-950">
            {block.title && (
              <figcaption className="border-b border-white/10 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-300">
                {block.title}
              </figcaption>
            )}
            <pre className="overflow-x-auto px-5 py-5 text-[12px] leading-[1.55] text-emerald-200">
              <code>{block.diagram}</code>
            </pre>
          </figure>
          {block.legend && block.legend.length > 0 && (
            <div className="mt-3 rounded-2xl border border-gray-200 bg-white px-5 py-4">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">
                {dict.block.legendLabel}
              </p>
              <ul className="space-y-2">
                {block.legend.map((l) => (
                  <li key={l.label} className="text-sm leading-6 text-gray-700">
                    <span className="font-semibold text-gray-900">{l.label}</span>
                    {" — "}
                    {l.description}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    case "pipeline":
      return (
        <div
          key={idx}
          className="my-6 overflow-hidden rounded-2xl border border-gray-200 bg-white"
        >
          <p className="border-b border-gray-100 bg-indigo-50/60 px-5 py-3 text-sm font-semibold text-indigo-800">
            {block.title}
          </p>
          <ol className="space-y-0">
            {block.steps.map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-4 border-b border-gray-100 px-5 py-4 last:border-b-0"
              >
                <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[13px] font-semibold text-gray-900">
                    {s.component}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-700">
                    {s.action}
                  </p>
                  {s.note && (
                    <p className="mt-1 text-xs italic text-gray-500">
                      {s.note}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      );
    case "dataModel":
      return <DataModel key={idx} block={block} dict={dict} />;
    case "codeRef":
      return <CodeRef key={idx} block={block} dict={dict} />;
    case "apiCall":
      return <ApiCall key={idx} block={block} dict={dict} />;
    case "tradeoffs":
      return (
        <div key={idx} className="my-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700">
              {dict.block.prosLabel}
            </p>
            <ul className="space-y-2 text-sm leading-6 text-gray-800">
              {block.pros.map((p, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-rose-700">
              {dict.block.consLabel}
            </p>
            <ul className="space-y-2 text-sm leading-6 text-gray-800">
              {block.cons.map((c, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-rose-500">✕</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-5">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-700">
              {dict.block.whenToUseLabel}
            </p>
            <ul className="space-y-2 text-sm leading-6 text-gray-800">
              {block.whenToUse.map((w, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-indigo-500">→</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-700">
              {dict.block.whenNotToUseLabel}
            </p>
            <ul className="space-y-2 text-sm leading-6 text-gray-800">
              {block.whenNotToUse.map((w, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-slate-500">·</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    case "setupStep":
      return (
        <div
          key={idx}
          className="my-5 overflow-hidden rounded-2xl border border-gray-200 bg-white"
        >
          <div className="flex items-start gap-4 px-5 py-4">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 text-sm font-bold text-white shadow-[0_6px_14px_rgba(99,102,241,0.28)]">
              {block.number}
            </span>
            <div className="flex-1">
              <p className="text-base font-semibold text-gray-950">
                {block.title}
              </p>
              <p className="mt-1 text-sm leading-6 text-gray-700">
                {block.instructions}
              </p>
            </div>
          </div>
          {block.command && (
            <div>
              <p className="border-y border-gray-100 bg-gray-50 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">
                {dict.block.commandLabel}
              </p>
              <pre className="overflow-x-auto bg-gray-950 px-5 py-4 font-mono text-[12px] leading-[1.55] text-emerald-200">
                <code>{block.command}</code>
              </pre>
            </div>
          )}
          {block.screenshotPlaceholder && (
            <div className="px-5 pb-5 pt-3">
              <Screenshot
                caption={block.screenshotPlaceholder.caption}
                aspect={block.screenshotPlaceholder.aspect}
                pendingLabel={dict.block.screenshotPending}
              />
            </div>
          )}
        </div>
      );
    case "troubleshoot":
      return (
        <div
          key={idx}
          className="my-6 overflow-hidden rounded-2xl border border-gray-200 bg-white"
        >
          <div className="grid grid-cols-1 gap-0 border-b border-gray-100 bg-gray-50 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <div className="px-5 py-3">{dict.block.issueHeader}</div>
            <div className="hidden border-l border-gray-200 px-5 py-3 md:block">
              {dict.block.solutionHeader}
            </div>
          </div>
          <ul className="divide-y divide-gray-100">
            {block.rows.map((r, i) => (
              <li
                key={i}
                className="grid grid-cols-1 gap-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]"
              >
                <p className="px-5 py-4 text-sm font-semibold leading-6 text-gray-900">
                  {r.issue}
                </p>
                <p className="border-t border-gray-100 px-5 py-4 text-sm leading-6 text-gray-700 md:border-l md:border-t-0">
                  {r.solution}
                </p>
              </li>
            ))}
          </ul>
        </div>
      );
    case "screenshot":
      return (
        <Screenshot
          key={idx}
          caption={block.caption}
          aspect={block.aspect}
          src={block.src}
          alt={block.alt}
          pendingLabel={dict.block.screenshotPending}
        />
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
    case "sources":
      return (
        <ul key={idx} className="my-4 space-y-2">
          {block.items.map((s, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm leading-7 text-gray-700"
            >
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

function CollapsibleSection({
  section,
  isOpen,
  onToggle,
  dict,
}: {
  section: RecipeSection;
  isOpen: boolean;
  onToggle: () => void;
  dict: Dict;
}) {
  return (
    <section id={section.id} className="scroll-mt-28">
      <button
        type="button"
        onClick={onToggle}
        className="group flex w-full items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-5 text-left shadow-[0_8px_24px_rgba(99,102,241,0.06)] transition hover:border-indigo-200 hover:bg-indigo-50/30 sm:px-7 sm:py-6"
        aria-expanded={isOpen}
      >
        <div className="flex-1">
          {section.eyebrow && (
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-500">
              {section.eyebrow}
            </p>
          )}
          <h2 className="text-xl font-semibold tracking-tight text-gray-950 sm:text-2xl">
            {section.title}
          </h2>
          {section.peek && (
            <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-500">
              {section.peek}
            </p>
          )}
        </div>
        <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600">
          <ChevronIcon open={isOpen} />
        </span>
      </button>
      {isOpen && (
        <div className="px-2 pt-4 sm:px-4">
          {section.blocks.map((b, i) => renderBlock(b, i, dict))}
        </div>
      )}
    </section>
  );
}

export default function RecipeArticle({
  recipe,
  lang,
  dict,
  hasDeck = false,
}: {
  recipe: Recipe;
  lang: string;
  dict: Dict;
  hasDeck?: boolean;
}) {
  const defaultOpen = useMemo(
    () => new Set(recipe.sections.filter((s) => s.defaultOpen).map((s) => s.id)),
    [recipe],
  );
  const [openSet, setOpenSet] = useState<Set<string>>(defaultOpen);
  const [active, setActive] = useState<string>(recipe.sections[0]?.id ?? "");
  const [progress, setProgress] = useState(0);

  const toggle = useCallback((id: string) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const allOpen = openSet.size === recipe.sections.length;

  const expandAll = () => {
    setOpenSet(new Set(recipe.sections.map((s) => s.id)));
  };
  const collapseAll = () => {
    setOpenSet(new Set());
  };

  useEffect(() => {
    const ids = recipe.sections.map((s) => s.id);
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
  }, [recipe]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const p = max <= 0 ? 0 : Math.min(1, Math.max(0, scrollTop / max));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const formattedDate = new Date(recipe.updatedAt).toLocaleDateString(
    lang === "es" ? "es-MX" : lang === "pt" ? "pt-BR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  const approach = APPROACH_STYLE[recipe.approach];

  return (
    <>
      {/* Reading progress bar (fixed at top of viewport) */}
      <div className="fixed left-0 right-0 top-0 z-[60] h-[3px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-400 transition-[width] duration-150"
          style={{ width: `${(progress * 100).toFixed(2)}%` }}
        />
      </div>

      <main className="px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 md:px-8 md:pt-14">
        <article className="mx-auto w-[min(96%,1600px)]">
          {/* Breadcrumbs */}
          <nav className="mb-6 text-xs text-gray-500">
            <a
              href={`/${lang}/build-recipes`}
              className="hover:text-indigo-600"
            >
              ← {dict.backToRecipes}
            </a>
          </nav>

          {/* Header */}
          <header className="mb-8 max-w-5xl">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border ${approach.border} ${approach.bg} px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${approach.text}`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${approach.dot}`}
                />
                {dict.approach[recipe.approach]}
              </span>
              {recipe.audiences.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-gray-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-600"
                >
                  {dict.audience[a]}
                </span>
              ))}
              <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                {recipe.readingMinutes} {dict.readingTime}
              </span>
            </div>
            <h1 className="section-title text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl md:text-5xl">
              {recipe.title}
            </h1>
            <div className="mt-5 rounded-2xl border border-rose-100 bg-rose-50/50 px-5 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-500">
                {dict.problemLabel}
              </p>
              <p className="mt-1 text-base leading-7 text-gray-800">
                {recipe.problemOneLiner}
              </p>
            </div>

            {hasDeck && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={`/${lang}/build-recipes/${recipe.slug}/deck`}
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
                <span className="text-xs text-gray-500">
                  {dict.execDeckHint}
                </span>
              </div>
            )}

            {/* Meta row */}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
              <span>
                <span className="font-semibold text-gray-700">
                  {recipe.author}
                </span>
                <span className="mx-1.5">·</span>
                {recipe.authorRole}
              </span>
              <span>
                <span className="font-semibold text-gray-700">
                  {dict.updated}:
                </span>{" "}
                {formattedDate}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {recipe.tags.map((t) => (
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

          {/* TL;DR */}
          <div className="mb-10 max-w-5xl rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50/70 via-white to-white p-6 md:p-8">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-indigo-500">
              {dict.tldrLabel}
            </p>
            <ul className="space-y-2 text-[1rem] leading-7 text-gray-800">
              {recipe.tldr.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Body + TOC */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
            {/* Sticky TOC */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">
                    {dict.tableOfContents}
                  </p>
                  <button
                    type="button"
                    onClick={allOpen ? collapseAll : expandAll}
                    className="rounded-full border border-indigo-200 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-indigo-600 transition hover:bg-indigo-50"
                  >
                    {allOpen ? dict.collapseAll : dict.expandAll}
                  </button>
                </div>
                <ul className="space-y-1.5 border-l border-gray-200">
                  {recipe.sections.map((s, i) => {
                    const isActive = active === s.id;
                    const isOpen = openSet.has(s.id);
                    return (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          onClick={() => {
                            if (!isOpen) toggle(s.id);
                          }}
                          className={`flex items-center gap-2 -ml-px border-l-2 py-1 pl-3 pr-2 text-sm leading-5 transition ${
                            isActive
                              ? "border-indigo-500 font-semibold text-indigo-600"
                              : "border-transparent text-gray-500 hover:text-gray-900"
                          }`}
                        >
                          <span className="text-[10px] font-mono text-gray-400">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="flex-1 truncate">{s.title}</span>
                          <span
                            className={`h-1.5 w-1.5 rounded-full transition ${
                              isOpen ? "bg-indigo-500" : "bg-gray-300"
                            }`}
                            aria-hidden
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>

            {/* Article body */}
            <div className="min-w-0 max-w-3xl">
              {/* Mobile expand/collapse all */}
              <div className="mb-4 flex items-center justify-end lg:hidden">
                <button
                  type="button"
                  onClick={allOpen ? collapseAll : expandAll}
                  className="rounded-full border border-indigo-200 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50"
                >
                  {allOpen ? dict.collapseAll : dict.expandAll}
                </button>
              </div>

              <div className="space-y-4">
                {recipe.sections.map((s) => (
                  <CollapsibleSection
                    key={s.id}
                    section={s}
                    isOpen={openSet.has(s.id)}
                    onToggle={() => toggle(s.id)}
                    dict={dict}
                  />
                ))}
              </div>

              <div className="mt-12">
                <a
                  href={`/${lang}/build-recipes`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:underline"
                >
                  ← {dict.backToRecipes}
                </a>
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}

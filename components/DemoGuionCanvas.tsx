"use client";

import { useMemo, useState } from "react";
import type {
  DemoGuionData,
  DemoGuionScene,
  DemoGuionTurn,
} from "../data/customerDemos";

const categoryStyles: Record<string, string> = {
  Information: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  "Self-Service": "bg-violet-50 text-violet-700 ring-violet-200",
  "Problem Resolution": "bg-amber-50 text-amber-700 ring-amber-200",
  "Status & Tracking": "bg-sky-50 text-sky-700 ring-sky-200",
  Handoff: "bg-orange-50 text-orange-700 ring-orange-200",
};

export default function DemoGuionCanvas({ data }: { data: DemoGuionData }) {
  const [activeSceneId, setActiveSceneId] = useState<string>(
    data.scenes[0]?.id ?? ""
  );

  const activeScene = useMemo(
    () => data.scenes.find((s) => s.id === activeSceneId) ?? data.scenes[0],
    [data.scenes, activeSceneId]
  );

  const totalJs = data.coverageMatrix.length;

  return (
    <div className="mt-10 space-y-10">
      {/* Intro */}
      <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/40 p-6 sm:p-8">
        <p className="max-w-4xl text-base leading-7 text-gray-700">
          {data.intro}
        </p>
      </div>

      {/* Persona card */}
      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-lg font-bold text-white">
            {data.persona.name
              .split(" ")
              .slice(0, 2)
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
              Persona de la demo
            </p>
            <h3 className="text-xl font-bold text-gray-950">
              {data.persona.name}
            </h3>
            <p className="text-sm text-gray-500">
              {data.persona.role} · {data.persona.home}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <PersonaField label="Membresía" value={data.persona.membershipSince} />
          <PersonaField label="Contrato" value={data.persona.contract} />
          <PersonaField label="WhatsApp" value={data.persona.phone} />
        </div>

        <div className="mt-4 rounded-xl bg-gray-50 px-4 py-3">
          <p className="text-sm leading-6 text-gray-700">
            {data.persona.profile}
          </p>
        </div>

        <div className="mt-4">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Objetivos de la socia
          </p>
          <ul className="space-y-1.5">
            {data.persona.goals.map((g) => (
              <li
                key={g}
                className="flex items-start gap-2 text-sm leading-6 text-gray-700"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Coverage matrix */}
      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
              Cobertura del MVP en esta demo
            </p>
            <h3 className="text-xl font-bold text-gray-950">
              {totalJs} Job Stories · 5 escenas
            </h3>
          </div>
          <p className="text-xs text-gray-500">
            Toca un JS para saltar a su escena
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {data.coverageMatrix.map((js) => {
            const active = js.sceneId === activeScene?.id;
            const styleKey = js.category;
            const style =
              categoryStyles[styleKey] ??
              "bg-gray-50 text-gray-700 ring-gray-200";
            return (
              <button
                key={js.id}
                type="button"
                onClick={() => setActiveSceneId(js.sceneId)}
                className={`group flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
                  active
                    ? "border-emerald-400 bg-emerald-50/60 shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <span className="rounded-md bg-gray-900 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">
                  {js.id}
                </span>
                <span className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {js.name}
                  </p>
                  <span
                    className={`mt-0.5 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${style}`}
                  >
                    {js.category}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Scene navigator */}
      <SceneNavigator
        scenes={data.scenes}
        activeSceneId={activeScene?.id ?? ""}
        onSelect={setActiveSceneId}
      />

      {/* Active scene */}
      {activeScene && (
        <SceneView
          scene={activeScene}
          scenes={data.scenes}
          onSelect={setActiveSceneId}
        />
      )}
    </div>
  );
}

function SceneNavigator({
  scenes,
  activeSceneId,
  onSelect,
}: {
  scenes: DemoGuionScene[];
  activeSceneId: string;
  onSelect: (id: string) => void;
}) {
  const activeIndex = scenes.findIndex((s) => s.id === activeSceneId);
  const prev = activeIndex > 0 ? scenes[activeIndex - 1] : null;
  const next =
    activeIndex >= 0 && activeIndex < scenes.length - 1
      ? scenes[activeIndex + 1]
      : null;

  return (
    <section className="space-y-4">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
          Línea de tiempo — 4 semanas de interacción
        </p>
        <p className="text-[11px] font-mono text-gray-400">
          {activeIndex + 1} / {scenes.length}
        </p>
      </div>

      <div className="flex items-stretch gap-2">
        <NavArrow
          direction="prev"
          disabled={!prev}
          label={prev?.title ?? ""}
          onClick={() => prev && onSelect(prev.id)}
        />

        <div className="flex flex-1 gap-2 overflow-x-auto scroll-smooth snap-x">
          {scenes.map((s) => {
            const active = s.id === activeSceneId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelect(s.id)}
                className={`shrink-0 snap-start rounded-full px-4 py-1.5 text-xs font-semibold ring-1 transition ${
                  active
                    ? "bg-emerald-600 text-white ring-emerald-600 shadow-sm"
                    : "bg-white text-gray-700 ring-gray-200 hover:bg-gray-50"
                }`}
              >
                <span className="mr-1.5 font-mono text-[10px] opacity-70">
                  {s.order.toString().padStart(2, "0")}
                </span>
                {s.title.replace(/^Escena \d+ · /, "")}
              </button>
            );
          })}
        </div>

        <NavArrow
          direction="next"
          disabled={!next}
          label={next?.title ?? ""}
          onClick={() => next && onSelect(next.id)}
        />
      </div>
    </section>
  );
}

function NavArrow({
  direction,
  disabled,
  label,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  label: string;
  onClick: () => void;
}) {
  const isNext = direction === "next";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isNext ? "Siguiente escena" : "Escena anterior"}
      title={label ? label.replace(/^Escena \d+ · /, "") : ""}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-1 transition ${
        disabled
          ? "cursor-not-allowed bg-gray-50 text-gray-300 ring-gray-200"
          : "bg-white text-gray-700 ring-gray-300 hover:bg-emerald-50 hover:text-emerald-700 hover:ring-emerald-300"
      }`}
    >
      <svg
        className={`h-4 w-4 ${isNext ? "" : "rotate-180"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
}

function PersonaField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3">
      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
        {label}
      </p>
      <p className="mt-1 text-sm leading-6 text-gray-800">{value}</p>
    </div>
  );
}

function SceneView({
  scene,
  scenes,
  onSelect,
}: {
  scene: DemoGuionScene;
  scenes: DemoGuionScene[];
  onSelect: (id: string) => void;
}) {
  const idx = scenes.findIndex((s) => s.id === scene.id);
  const prev = idx > 0 ? scenes[idx - 1] : null;
  const next = idx < scenes.length - 1 ? scenes[idx + 1] : null;

  return (
    <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      {/* Scene header */}
      <header className="border-b border-gray-100 bg-gradient-to-b from-emerald-50/40 to-white px-6 py-6 sm:px-8">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-emerald-600 px-2 py-0.5 font-mono text-xs font-bold text-white">
            Escena {scene.order}
          </span>
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold text-gray-700">
            📅 {scene.contextDay}
          </span>
        </div>
        <h3 className="text-2xl font-bold leading-snug text-gray-950">
          {scene.title}
        </h3>
        <p className="mt-2 text-base leading-7 text-gray-600">
          {scene.subtitle}
        </p>
        <div className="mt-4 rounded-2xl bg-gray-50 px-4 py-3">
          <p className="text-sm leading-6 text-gray-700">{scene.narrative}</p>
        </div>

        {/* JS badges */}
        <div className="mt-5">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">
            Job Stories que se validan en esta escena
          </p>
          <div className="flex flex-wrap gap-2">
            {scene.jobStoriesCovered.map((js) => (
              <span
                key={js.jobStoryId}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-xs font-semibold ring-1 ring-gray-200"
                title={js.description}
              >
                <span className="rounded bg-gray-900 px-1.5 py-0.5 font-mono text-[10px] text-white">
                  {js.jobStoryId}
                </span>
                <span className="text-gray-700">{js.label}</span>
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Chat + validations */}
      <div className="grid gap-6 px-4 py-6 sm:px-8 sm:py-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* WhatsApp-styled chat */}
        <div className="overflow-hidden rounded-3xl bg-[#e5ddd5] shadow-inner">
          {/* Chat header (WhatsApp-like) */}
          <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-white">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
              🤖
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Paradise Pass Concierge</p>
              <p className="text-[11px] opacity-80">en línea</p>
            </div>
            <div className="flex gap-3 text-white/70">
              <span>📞</span>
              <span>⋮</span>
            </div>
          </div>

          {/* Messages */}
          <div className="space-y-3 bg-[#e5ddd5] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35)_1px,transparent_1px)] bg-[length:16px_16px] px-3 py-4 sm:px-5">
            {scene.turns.map((turn) => (
              <ChatBubble key={turn.turn} turn={turn} />
            ))}
          </div>
        </div>

        {/* Validation sidebar */}
        <aside className="space-y-4">
          <div className="sticky top-6 space-y-4">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
              <p className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Resultado esperado
              </p>
              <p className="text-sm leading-6 text-emerald-900">
                {scene.outcome}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Checklist de validación por Job Story
              </p>
              <ul className="space-y-4">
                {scene.jsChecklist.map((js) => (
                  <li
                    key={js.jobStoryId}
                    className="border-l-2 border-emerald-500 pl-3"
                  >
                    <div className="mb-1.5 flex items-center gap-1.5">
                      <span className="rounded bg-gray-900 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">
                        {js.jobStoryId}
                      </span>
                      <span className="text-xs font-semibold text-gray-800">
                        {js.name}
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {js.validated.map((v) => (
                        <li
                          key={v}
                          className="flex items-start gap-1.5 text-[12px] leading-5 text-gray-600"
                        >
                          <svg
                            className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>{v}</span>
                        </li>
                      ))}
                    </ul>
                    {js.residualRisk && (
                      <p className="mt-2 rounded bg-amber-50 px-2 py-1.5 text-[11px] leading-4 text-amber-800 ring-1 ring-amber-200">
                        <span className="font-semibold">⚠ Riesgo residual:</span>{" "}
                        {js.residualRisk}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {/* Scene footer navigation */}
      <footer className="flex items-center justify-between gap-3 border-t border-gray-100 bg-gray-50/50 px-4 py-4 sm:px-8">
        <button
          type="button"
          onClick={() => prev && onSelect(prev.id)}
          disabled={!prev}
          className={`flex min-w-0 items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold transition ${
            prev
              ? "bg-white text-gray-800 ring-1 ring-gray-200 hover:bg-emerald-50 hover:ring-emerald-300"
              : "cursor-not-allowed bg-white/50 text-gray-300 ring-1 ring-gray-100"
          }`}
        >
          <svg
            className="h-4 w-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-wider opacity-60">
              Anterior
            </span>
            <span className="block truncate">
              {prev
                ? prev.title.replace(/^Escena \d+ · /, "")
                : "—"}
            </span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => next && onSelect(next.id)}
          disabled={!next}
          className={`flex min-w-0 items-center gap-2 rounded-xl px-3 py-2 text-right text-sm font-semibold transition ${
            next
              ? "bg-emerald-600 text-white ring-1 ring-emerald-600 hover:bg-emerald-700"
              : "cursor-not-allowed bg-white/50 text-gray-300 ring-1 ring-gray-100"
          }`}
        >
          <span className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-wider opacity-80">
              Siguiente
            </span>
            <span className="block truncate">
              {next
                ? next.title.replace(/^Escena \d+ · /, "")
                : "—"}
            </span>
          </span>
          <svg
            className="h-4 w-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </footer>
    </article>
  );
}

function ChatBubble({ turn }: { turn: DemoGuionTurn }) {
  if (turn.role === "note") {
    return (
      <div className="mx-auto max-w-md rounded-lg bg-amber-100/80 px-3 py-2 text-center text-[11px] italic leading-5 text-amber-900 ring-1 ring-amber-200">
        {turn.text}
      </div>
    );
  }

  if (turn.role === "system") {
    return (
      <div className="my-2 rounded-xl border border-orange-200 bg-orange-50 px-3 py-2.5 text-[12px] leading-5 text-orange-900">
        <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-orange-700">
          <svg
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 5l7 7-7 7M5 12h15"
            />
          </svg>
          Sistema · handoff
        </p>
        <pre className="whitespace-pre-wrap break-words font-sans text-[12px] leading-5">
          {turn.text}
        </pre>
        <TurnMetadata turn={turn} />
      </div>
    );
  }

  const isUser = turn.role === "user";
  const showText = isUser;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`relative max-w-[85%] rounded-2xl px-3.5 py-2 shadow-sm sm:max-w-[75%] ${
          isUser
            ? "rounded-br-sm bg-[#dcf8c6] text-gray-900"
            : "rounded-bl-sm bg-white text-gray-900"
        }`}
      >
        {showText ? (
          <pre className="whitespace-pre-wrap break-words font-sans text-[13.5px] leading-[1.45]">
            {turn.text}
          </pre>
        ) : (
          <p className="flex items-center gap-1.5 text-[12px] italic leading-5 text-gray-400">
            <svg
              className="h-3 w-3 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Respuesta del agente (en vivo)
          </p>
        )}

        {turn.attachment && showText && (
          <div
            className={`mt-2 flex items-center gap-2 rounded-lg px-2.5 py-2 ring-1 ${
              isUser
                ? "bg-white/60 ring-emerald-200"
                : "bg-gray-50 ring-gray-200"
            }`}
          >
            <span className="text-lg">
              {turn.attachment.type === "form"
                ? "📄"
                : turn.attachment.type === "pdf"
                  ? "📕"
                  : turn.attachment.type === "image"
                    ? "🖼"
                    : "🔗"}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-gray-800">
                {turn.attachment.filename ?? turn.attachment.label}
              </p>
              <p className="text-[10px] text-gray-500">
                {turn.attachment.label}
              </p>
            </div>
          </div>
        )}

        <div className="mt-1 flex items-center justify-end gap-1">
          {turn.timestamp && (
            <span className="text-[10px] text-gray-500">{turn.timestamp}</span>
          )}
          {isUser && <span className="text-[10px] text-blue-500">✓✓</span>}
        </div>

        <TurnMetadata turn={turn} />
      </div>
    </div>
  );
}

function TurnMetadata({ turn }: { turn: DemoGuionTurn }) {
  const hasPills =
    turn.dataLookup || turn.knowledgeRef || turn.handoff || turn.jobStoryIds;
  const hasValidations = turn.validations && turn.validations.length > 0;

  if (!hasPills && !hasValidations) return null;

  return (
    <div className="mt-2 space-y-2 border-t border-black/10 pt-2">
      {turn.jobStoryIds && turn.jobStoryIds.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {turn.jobStoryIds.map((js) => (
            <span
              key={js}
              className="rounded bg-gray-900 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white"
            >
              {js}
            </span>
          ))}
        </div>
      )}

      {hasPills && (
        <div className="flex flex-wrap gap-1">
          {turn.dataLookup && (
            <span className="inline-flex items-center gap-1 rounded bg-white/80 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-gray-700 ring-1 ring-gray-300">
              🗂 {turn.dataLookup}
            </span>
          )}
          {turn.knowledgeRef && (
            <span className="inline-flex items-center gap-1 rounded bg-white/80 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-indigo-700 ring-1 ring-indigo-200">
              📚 {turn.knowledgeRef}
            </span>
          )}
          {turn.handoff && (
            <span className="inline-flex items-center gap-1 rounded bg-white/80 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-orange-700 ring-1 ring-orange-200">
              👤 {turn.handoff}
            </span>
          )}
        </div>
      )}

      {hasValidations && (
        <ul className="space-y-1">
          {turn.validations!.map((v) => (
            <li
              key={v}
              className="flex items-start gap-1.5 text-[11px] leading-4 text-gray-600"
            >
              <svg
                className="mt-0.5 h-2.5 w-2.5 shrink-0 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{v}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

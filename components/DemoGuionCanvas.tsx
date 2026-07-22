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

type JsInfo = DemoGuionData["coverageMatrix"][number];

export default function DemoGuionCanvas({ data }: { data: DemoGuionData }) {
  const [activeSceneId, setActiveSceneId] = useState<string>(
    data.scenes[0]?.id ?? ""
  );

  const activeScene = useMemo(
    () => data.scenes.find((s) => s.id === activeSceneId) ?? data.scenes[0],
    [data.scenes, activeSceneId]
  );

  const jsLookup = useMemo(() => {
    const map = new Map<string, JsInfo>();
    for (const js of data.coverageMatrix) map.set(js.id, js);
    return map;
  }, [data.coverageMatrix]);

  const totalJs = data.coverageMatrix.length;

  return (
    <div className="mt-10 space-y-10">
      {/* Intro */}
      <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/40 p-6 sm:p-8">
        <p className="max-w-4xl text-base leading-7 text-gray-700">
          {data.intro}
        </p>
      </div>

      {/* Nota aclaratoria */}
      <aside className="rounded-3xl border border-amber-200 bg-amber-50/50 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
              Nota aclaratoria
            </p>
            <p className="text-sm leading-6 text-amber-950">
              María Elena Torres es una <strong>socia de ejemplo</strong> creada para ilustrar el hilo completo del MVP. Al probar el Concierge en el Sandbox, se puede reemplazar por cualquier <strong>registro real</strong> ya cargado en la org — el flujo, las integraciones y las reglas son las mismas.
            </p>
            <p className="text-sm leading-6 text-amber-950">
              Los turnos que siguen muestran <strong>de manera ilustrativa</strong> el comportamiento esperado del Agentforce Agent: qué contesta, qué consulta en Salesforce, qué cita del Knowledge y cuándo escala a un humano. No son transcripciones textuales — son el contrato conversacional que valida el UAT.
            </p>
          </div>
        </div>
      </aside>

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
                <JsBadge id={js.id} info={js} />
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
          jsLookup={jsLookup}
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
  jsLookup,
}: {
  scene: DemoGuionScene;
  scenes: DemoGuionScene[];
  onSelect: (id: string) => void;
  jsLookup: Map<string, JsInfo>;
}) {
  const idx = scenes.findIndex((s) => s.id === scene.id);
  const prev = idx > 0 ? scenes[idx - 1] : null;
  const next = idx < scenes.length - 1 ? scenes[idx + 1] : null;

  return (
    <article className="rounded-3xl border border-gray-200 bg-white shadow-sm">
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
              >
                <JsBadge
                  id={js.jobStoryId}
                  info={jsLookup.get(js.jobStoryId)}
                />
                <span className="text-gray-700">{js.label}</span>
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Turn-by-turn thread */}
      <div className="space-y-6 px-4 py-6 sm:px-8 sm:py-8">
        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
          Guion turno por turno
        </p>
        <ol className="space-y-5 w-full max-w-[75%]">
          {scene.turns.map((turn) => (
            <li key={turn.turn}>
              <TurnCard turn={turn} jsLookup={jsLookup} />
            </li>
          ))}
        </ol>

        {/* Scene closing — outcome + consolidated checklist */}
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
            <p className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
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
              Resultado esperado de la escena
            </p>
            <p className="text-sm leading-6 text-emerald-900">
              {scene.outcome}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Checklist consolidado por Job Story
            </p>
            <ul className="space-y-4">
              {scene.jsChecklist.map((js) => (
                <li
                  key={js.jobStoryId}
                  className="border-l-2 border-emerald-500 pl-3"
                >
                  <div className="mb-1.5 flex items-center gap-2">
                    <JsBadge
                      id={js.jobStoryId}
                      info={jsLookup.get(js.jobStoryId)}
                    />
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
                  {/* Riesgo residual hidden for client view — preserved in data for reactivation */}
                </li>
              ))}
            </ul>
          </div>
        </div>
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

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(e: React.MouseEvent) {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — silent fail
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copiado" : "Copiar mensaje al portapapeles"}
      title={copied ? "Copiado" : "Copiar"}
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-gray-400 transition hover:bg-white hover:text-gray-700 ${
        copied ? "text-emerald-600 hover:text-emerald-600" : ""
      }`}
    >
      {copied ? (
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
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m-7 7l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
      )}
    </button>
  );
}

function TurnCard({
  turn,
  jsLookup,
}: {
  turn: DemoGuionTurn;
  jsLookup: Map<string, JsInfo>;
}) {
  if (turn.role === "note") {
    return (
      <div className="rounded-lg bg-amber-50 px-4 py-3 text-[13px] italic leading-6 text-amber-900 ring-1 ring-amber-200">
        {turn.text}
      </div>
    );
  }

  const hasMetadata =
    (turn.jobStoryIds && turn.jobStoryIds.length > 0) ||
    turn.dataLookup ||
    turn.knowledgeRef ||
    turn.handoff ||
    (turn.validations && turn.validations.length > 0) ||
    turn.attachment;

  if (turn.role === "user") {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Message box */}
        <div className="flex items-start gap-3 border-b border-gray-100 bg-emerald-50/40 px-4 py-4 sm:px-5">
          <span className="flex h-7 shrink-0 items-center rounded-md bg-emerald-600 px-2 text-[11px] font-bold uppercase tracking-wider text-white">
            {turn.turn.toString().padStart(2, "0")} · Socia
          </span>
          <div className="min-w-0 flex-1">
            <pre className="whitespace-pre-wrap break-words font-sans text-[16px] leading-7 text-gray-900">
              {turn.text}
            </pre>
            {turn.timestamp && (
              <p className="mt-1.5 text-[11px] text-gray-500">{turn.timestamp}</p>
            )}
          </div>
          <CopyButton text={turn.text} />
        </div>

        {hasMetadata && <TurnAnnotations turn={turn} jsLookup={jsLookup} />}
      </div>
    );
  }

  if (turn.role === "system") {
    return (
      <div className="rounded-2xl border border-orange-200 bg-white shadow-sm">
        <div className="flex items-start gap-3 border-b border-orange-100 bg-orange-50/60 px-4 py-4 sm:px-5">
          <span className="flex h-7 shrink-0 items-center rounded-md bg-orange-600 px-2 text-[11px] font-bold uppercase tracking-wider text-white">
            {turn.turn.toString().padStart(2, "0")} · Sistema
          </span>
          <div className="min-w-0 flex-1">
            <pre className="whitespace-pre-wrap break-words font-sans text-[15px] leading-7 text-orange-900">
              {turn.text}
            </pre>
            {turn.timestamp && (
              <p className="mt-1.5 text-[11px] text-orange-700/70">
                {turn.timestamp}
              </p>
            )}
          </div>
        </div>
        {hasMetadata && <TurnAnnotations turn={turn} jsLookup={jsLookup} />}
      </div>
    );
  }

  // agent — no text shown, only annotations
  return (
    <div className="rounded-2xl border border-indigo-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-indigo-100 bg-indigo-50/40 px-4 py-4 sm:px-5">
        <span className="flex h-7 shrink-0 items-center rounded-md bg-indigo-600 px-2 text-[11px] font-bold uppercase tracking-wider text-white">
          {turn.turn.toString().padStart(2, "0")} · Concierge
        </span>
        <p className="flex items-center gap-1.5 text-[13px] italic leading-6 text-gray-500">
          <svg
            className="h-4 w-4 shrink-0"
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
          Respuesta del agente en vivo — lo que sigue es lo que debe cumplir
        </p>
        {turn.timestamp && (
          <span className="ml-auto text-[11px] text-gray-500">
            {turn.timestamp}
          </span>
        )}
      </div>
      {hasMetadata && <TurnAnnotations turn={turn} jsLookup={jsLookup} />}
    </div>
  );
}

function TurnAnnotations({
  turn,
  jsLookup,
}: {
  turn: DemoGuionTurn;
  jsLookup: Map<string, JsInfo>;
}) {
  const hasJs = turn.jobStoryIds && turn.jobStoryIds.length > 0;
  const hasPills = turn.dataLookup || turn.knowledgeRef || turn.handoff;
  const hasValidations = turn.validations && turn.validations.length > 0;

  return (
    <div className="space-y-3.5 px-4 py-4 sm:px-5">
      {hasJs && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Valida
          </span>
          {turn.jobStoryIds!.map((js) => (
            <JsBadge key={js} id={js} info={jsLookup.get(js)} size="md" />
          ))}
        </div>
      )}

      {hasPills && (
        <div className="flex flex-wrap gap-1.5">
          {turn.dataLookup && (
            <span className="inline-flex items-center gap-1 rounded bg-gray-50 px-2 py-1 text-[12px] font-mono font-semibold text-gray-700 ring-1 ring-gray-200">
              🗂 {turn.dataLookup}
            </span>
          )}
          {turn.knowledgeRef && (
            <span className="inline-flex items-center gap-1 rounded bg-indigo-50 px-2 py-1 text-[12px] font-mono font-semibold text-indigo-700 ring-1 ring-indigo-200">
              📚 {turn.knowledgeRef}
            </span>
          )}
          {turn.handoff && (
            <span className="inline-flex items-center gap-1 rounded bg-orange-50 px-2 py-1 text-[12px] font-mono font-semibold text-orange-700 ring-1 ring-orange-200">
              👤 {turn.handoff}
            </span>
          )}
        </div>
      )}

      {turn.attachment && (
        <div className="flex items-center gap-2.5 rounded-lg bg-gray-50 px-3 py-2.5 ring-1 ring-gray-200">
          <span className="text-xl">
            {turn.attachment.type === "form"
              ? "📄"
              : turn.attachment.type === "pdf"
                ? "📕"
                : turn.attachment.type === "image"
                  ? "🖼"
                  : "🔗"}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-gray-800">
              {turn.attachment.filename ?? turn.attachment.label}
            </p>
            <p className="text-[11px] text-gray-500">{turn.attachment.label}</p>
          </div>
        </div>
      )}

      {hasValidations && (
        <ul className="space-y-1.5 border-t border-gray-100 pt-3">
          {turn.validations!.map((v) => (
            <li
              key={v}
              className="flex items-start gap-2 text-[13px] leading-6 text-gray-700"
            >
              <svg
                className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-500"
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

function JsBadge({
  id,
  info,
  size = "sm",
}: {
  id: string;
  info?: JsInfo;
  size?: "sm" | "md";
}) {
  const hasTooltip = info && (info.cuando || info.yoQuiero || info.paraPoder);
  const sizeCls =
    size === "md"
      ? "px-2 py-0.5 text-[12px]"
      : "px-1.5 py-0.5 text-[11px]";
  return (
    <span className="group/js relative inline-flex">
      <span
        className={`rounded bg-gray-900 font-mono font-bold text-white ${sizeCls}`}
      >
        {id}
      </span>
      {hasTooltip && (
        <span
          role="tooltip"
          className="pointer-events-none absolute left-0 top-full z-[100] mt-2 hidden w-80 rounded-lg bg-gray-900 px-4 py-3 text-left text-[12px] leading-5 text-white shadow-xl ring-1 ring-black/10 group-hover/js:block"
        >
          <span className="mb-1.5 block font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-300">
            {id} · {info!.name}
          </span>
          {info!.cuando && (
            <span className="mb-1 block">
              <span className="font-semibold text-emerald-300">Cuando</span>{" "}
              {info!.cuando}
            </span>
          )}
          {info!.yoQuiero && (
            <span className="mb-1 block">
              <span className="font-semibold text-emerald-300">Yo quiero</span>{" "}
              {info!.yoQuiero}
            </span>
          )}
          {info!.paraPoder && (
            <span className="block">
              <span className="font-semibold text-emerald-300">Para poder</span>{" "}
              {info!.paraPoder}
            </span>
          )}
        </span>
      )}
    </span>
  );
}


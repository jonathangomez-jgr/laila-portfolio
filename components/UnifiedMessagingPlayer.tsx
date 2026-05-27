"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/* ── Brand ── */
const WA = "#25D366";
const WA_DARK = "#128C7E";
const WA_BG = "#ECE5DD";
const SF_EB15 = "#001E5B";
const SF_EB50 = "#066AFE";
const SF_CB68 = "#00B3FF";

const SCENES = [
  {
    n: 1,
    historia:
      "Maria Clara irá al concierto de Taylor Swift, así que pidió una blusa de su artista favorita. Hoy es el día que llega su pedido, y el paquete ya salió a ruta.",
    solucion:
      "El pedido sale a ruta, y la actualización del estado de pedido dispara la notificación de WhatsApp a Maria Clara. Se inicia la sesión de mensajería.",
    tags: ["Unified Messaging", "WhatsApp"],
  },
  {
    n: 2,
    historia:
      "Maria Clara no estará en casa porque saldrá a visitar un Loft que le gustó para rentarlo. Así que pide cambiar la fecha de entrega.",
    solucion:
      "Con la respuesta de Maria Clara, la comunicación se transfiere a Agentforce.",
    tags: ["WhatsApp", "Flow"],
  },
  {
    n: 3,
    historia:
      "Agentforce identifica el pedido y le pide la nueva fecha de entrega.",
    solucion:
      "Antes de entregar la conversación a Agentforce, el flujo busca el transcript de la sesión, y por ser un pedido, busca la última orden de Maria Clara, así como los artículos que incluye y se lo entrega a Agentforce para darle el contexto de forma proactiva. Agentforce se une a la conversación.",
    tags: ["Agentforce", "Service Cloud"],
  },
  {
    n: 4,
    historia: "Maria clara indica el día que le gustaría le llegara su pedido.",
    solucion: "",
    tags: ["WhatsApp"],
  },
  {
    n: 5,
    historia: "Agentforce interpreta el mensaje y confirma la fecha de entrega.",
    solucion:
      "Agentforce entiende e interpreta el mensaje, y confirma en formato de fecha.",
    tags: ["Agentforce"],
  },
  {
    n: 6,
    historia: "Maria clara confirma.",
    solucion: "",
    tags: ["WhatsApp"],
  },
  {
    n: 7,
    historia:
      "Agentforce actualiza la fecha de entrega. Y pregunta si hay algo más que pueda ayudar.",
    solucion:
      "Agentforce genera la actualización del registro programando la nueva fecha de entrega.",
    tags: ["Agentforce", "Service Cloud"],
  },
  {
    n: 8,
    historia:
      "Maria Clara comenta que es todo para finalizar la comunicación.",
    solucion: "",
    tags: ["WhatsApp"],
  },
  {
    n: 9,
    historia: "Agentforce se despide.",
    solucion: "Agentforce finaliza la sesión de mensajería.",
    tags: ["Agentforce", "Messaging Session"],
  },
  {
    n: 10,
    historia:
      "Tiempo después, Maria Clara recibe una promoción para mejorar sus lugares para el concierto.",
    solucion:
      "Marketing Cloud genera una campaña Outbound de WhatsApp. Se inicia sesión de mensajería.",
    tags: ["Marketing Cloud", "WhatsApp Outbound"],
  },
  {
    n: 11,
    historia:
      "Maria Clara quiere conocer las opciones de upgrade disponibles.",
    solucion:
      "Con la respuesta de Maria Clara, la conversación será transferida a Agentforce.",
    tags: ["WhatsApp", "Flow"],
  },
  {
    n: 12,
    historia: "Agentforce responde en contexto a la conversación.",
    solucion:
      "El Flow que transfiere la conversación, busca previamente los registros de los lugares que tiene actualmente y personaliza el mensaje. Agentforce se une a la conversación.",
    tags: ["Agentforce", "Flow"],
  },
  {
    n: 13,
    historia:
      "Agentforce comenta la opción disponible para upgrade de las entradas de Maria Clara al concierto.",
    solucion:
      "Agentforce busca los espacios disponibles y genera la respuesta.",
    tags: ["Agentforce"],
  },
  {
    n: 14,
    historia: "Maria Clara confirma.",
    solucion: "",
    tags: ["WhatsApp"],
  },
  {
    n: 15,
    historia:
      "Agentforce confirma la transacción, y pregunta si necesita algo más.",
    solucion:
      "Agentforce confirma los nuevos lugares para Maria Clara y genera el cargo en puntos y en saldo de su tarjeta vinculada. Se liberan los lugares en entrada General que tenía previamente Maria Clara.",
    tags: ["Agentforce", "Service Cloud"],
  },
  {
    n: 16,
    historia: "Maria Clara confirma que eso es todo.",
    solucion: "",
    tags: ["WhatsApp"],
  },
  {
    n: 17,
    historia: "Agentforce se despide.",
    solucion:
      "Agentforce sale de la conversación. Se finaliza Messaging Session.",
    tags: ["Agentforce", "Messaging Session"],
  },
  {
    n: 18,
    historia:
      "Se envía una encuesta de satisfacción, para evaluar la interacción con Agentforce.",
    solucion:
      "Se automatiza el envío de encuesta posterior a que finaliza el Messaging Session. Las respuestas quedan vinculadas al Cliente y al Agente de Agentforce de esa Messaging Session.",
    tags: ["Marketing Cloud", "CSAT"],
  },
  {
    n: 19,
    historia:
      "Después del concierto, que fue muy cerca de donde está el loft que visitó, se decide por rentarlo y escribe al mismo número de WhatsApp.",
    solucion: "Se inicia Messaging Session Inbound, iniciado por el cliente.",
    tags: ["WhatsApp Inbound", "Messaging Session"],
  },
  {
    n: 20,
    historia:
      "Agentforce responde con un mensaje personalizado y alineado al primer mensaje de Maria Clara.",
    solucion:
      "Se lee el transcript de la conversación, y se genera un mensaje personalizado de bienvenida y se transfiere según el tipo de mensaje.",
    tags: ["Agentforce", "Flow"],
  },
  {
    n: 21,
    historia: "Maria Clara pregunta si aún está disponible.",
    solucion: "",
    tags: ["WhatsApp"],
  },
  {
    n: 22,
    historia:
      "Agentforce comunica que ya no está disponible pero le ofrece una mejor opción.",
    solucion:
      "Agentforce busca la última visita de Maria Clara y revisa el estado de la propiedad. Como ya está apartada, busca opciones similares.",
    tags: ["Agentforce", "Service Cloud"],
  },
  {
    n: 23,
    historia: "Maria clara quiere conocer más.",
    solucion: "",
    tags: ["WhatsApp"],
  },
  {
    n: 24,
    historia: "Agentforce le ofrece a Maria Clara hablar con su asesor.",
    solucion:
      "Por el comportamiento previo, Agentforce identifica que es momento de transferir con su asesor.",
    tags: ["Agentforce", "Human Escalation"],
  },
  {
    n: 25,
    historia: "Maria Clara acepta hablar con su asesor.",
    solucion: "",
    tags: ["WhatsApp"],
  },
  {
    n: 26,
    historia: "Agentforce escala hacia un asesor humano.",
    solucion:
      "Agentforce sale de la conversación. El Flow busca el propietario del registro del cliente para asignarle a esta persona la conversación.",
    tags: ["Agentforce", "Flow", "Human Handoff"],
  },
  {
    n: 27,
    historia:
      "Laura, la asesora de Maria Clara da continuidad a la conversación de forma natural.",
    solucion:
      "El Flow de ruteo busca quién es el propietario del registro del cliente y a esta se le asigna la conversación. Laura se une a la conversación.",
    tags: ["Human Agent", "Service Cloud"],
  },
];

const TOTAL = SCENES.length;

const ANIM_CSS = `
@keyframes um-slide-up   { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
@keyframes um-slide-down { from { opacity:0; transform:translateY(-28px) } to { opacity:1; transform:translateY(0) } }
@keyframes um-bubble-in  { from { opacity:0; transform:scale(0.88) translateY(12px) } to { opacity:1; transform:scale(1) translateY(0) } }
@keyframes um-fade-in    { from { opacity:0 } to { opacity:1 } }
.um-next  .um-img-wrap { animation: um-slide-up   0.42s cubic-bezier(.22,1,.36,1) both }
.um-prev  .um-img-wrap { animation: um-slide-down 0.42s cubic-bezier(.22,1,.36,1) both }
.um-next  .um-story    { animation: um-slide-up   0.45s cubic-bezier(.22,1,.36,1) 0.06s both }
.um-prev  .um-story    { animation: um-slide-down 0.45s cubic-bezier(.22,1,.36,1) 0.06s both }
.um-bubble { animation: um-bubble-in 0.35s cubic-bezier(.22,1,.36,1) both }
.um-solution-reveal { animation: um-fade-in 0.5s ease 0.2s both }
`;

/* ── Groups for the chapter badges ── */
const GROUPS: { label: string; from: number; to: number; color: string }[] = [
  { label: "Actualización de pedido", from: 1, to: 9, color: WA_DARK },
  { label: "Upgrade de entradas", from: 10, to: 18, color: SF_EB50 },
  { label: "Búsqueda de loft", from: 19, to: 27, color: "#7C3AED" },
];

function groupFor(n: number) {
  return GROUPS.find((g) => n >= g.from && n <= g.to)!;
}

type Props = { onClose: () => void };

export default function UnifiedMessagingPlayer({ onClose }: Props) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const rightRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((next: number, d: "next" | "prev") => {
    if (next < 0 || next >= TOTAL) return;
    setDir(d);
    setIdx(next);
  }, []);

  const next = useCallback(() => goTo(idx + 1, "next"), [goTo, idx]);
  const prev = useCallback(() => goTo(idx - 1, "prev"), [goTo, idx]);

  useEffect(() => {
    rightRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [idx]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " " || e.key === "PageDown") {
        e.preventDefault(); next();
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault(); prev();
      }
      if (e.key === "Escape") onClose();
      if (e.key === "f" || e.key === "F") {
        if (!document.fullscreenElement) void document.documentElement.requestFullscreen();
        else void document.exitFullscreen();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, onClose]);

  const scene = SCENES[idx];
  const group = groupFor(scene.n);
  const progress = ((idx + 1) / TOTAL) * 100;
  const imgSrc = `/Laila/laila-demos/unified-messaging/w-${String(scene.n).padStart(2, "0")}.PNG`;
  const animClass = `um-${dir}`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ANIM_CSS }} />

      <div
        className="fixed inset-0 z-50 flex flex-col"
        style={{ background: `linear-gradient(160deg, ${SF_EB15} 0%, #0a1a40 100%)` }}
        role="dialog"
        aria-modal="true"
        aria-label="Historia: Soft Transitions with Unified Messaging"
      >
        {/* ── Top bar ── */}
        <header
          className="relative z-10 flex shrink-0 items-center justify-between px-5 py-2.5 sm:px-7"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", backgroundColor: "rgba(0,0,0,0.18)" }}
        >
          <div className="flex items-center gap-3">
            <Image
              src="/sfdc-logos/corporate-logo-horiz-allw.svg"
              alt="Salesforce"
              width={100}
              height={32}
              className="h-5 w-auto object-contain"
            />
            <span className="h-4 w-px bg-white/20" />
            <div
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1"
              style={{ backgroundColor: `${WA}22`, border: `1px solid ${WA}40` }}
            >
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill={WA} aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="text-[10px] font-bold tracking-wider" style={{ color: WA }}>WhatsApp</span>
            </div>
          </div>

          <span
            className="hidden text-[11px] font-semibold sm:block"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {group.label}
          </span>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white/40 transition hover:text-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </header>

        {/* ── Main ── */}
        <main className="relative z-10 flex flex-1 overflow-hidden">
          <div className={`${animClass} flex w-full flex-col lg:flex-row lg:items-stretch`}>

            {/* LEFT — WhatsApp phone frame */}
            <div className="um-img-wrap flex shrink-0 items-center justify-center p-4 lg:w-[46%] lg:p-6">
              <div
                className="relative flex h-full w-full max-w-[340px] flex-col overflow-hidden rounded-3xl shadow-2xl"
                style={{
                  background: WA_BG,
                  border: "8px solid #1a1a2e",
                  boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)`,
                }}
              >
                {/* WA top bar */}
                <div
                  className="flex shrink-0 items-center gap-3 px-3 py-2.5"
                  style={{ background: `linear-gradient(90deg, ${WA_DARK} 0%, ${WA} 100%)` }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-black text-white">
                    SF
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-white leading-none">Salesforce</p>
                    <p className="text-[9px] text-white/70 mt-0.5">en línea</p>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="um-bubble relative flex-1 overflow-hidden">
                  <Image
                    key={imgSrc}
                    src={imgSrc}
                    alt={`Escena ${scene.n}`}
                    fill
                    className="object-cover object-top"
                    sizes="340px"
                    unoptimized
                    priority
                  />
                </div>

                {/* Scene badge */}
                <div
                  className="absolute left-3 top-[52px] flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black text-white shadow-lg"
                  style={{ background: group.color }}
                >
                  <span>{String(scene.n).padStart(2, "0")}</span>
                  <span className="opacity-60">/</span>
                  <span className="opacity-60">{TOTAL}</span>
                </div>
              </div>
            </div>

            {/* RIGHT — Story timeline */}
            <div
              ref={rightRef}
              className="um-story flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-4 lg:py-8 lg:pr-8"
            >
              {/* Chapter badge */}
              <div>
                <span
                  className="rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white"
                  style={{ background: group.color }}
                >
                  {group.label}
                </span>
              </div>

              {/* Scene heading */}
              <div className="border-l-2 pl-4" style={{ borderColor: `${WA}60` }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/35">
                  Escena {String(scene.n).padStart(2, "0")} · {String(idx + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
                </p>
                <h2
                  className="mt-2 font-black leading-snug text-white"
                  style={{ fontSize: "clamp(1.15rem, 2.2vw, 1.6rem)" }}
                >
                  {scene.historia}
                </h2>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {scene.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full px-2.5 py-1 text-[10px] font-semibold"
                    style={{
                      backgroundColor: `${SF_CB68}15`,
                      color: SF_CB68,
                      border: `1px solid ${SF_CB68}30`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Timeline connector */}
              <div className="flex items-stretch gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className="h-3 w-3 rounded-full shadow-md"
                    style={{ backgroundColor: WA, boxShadow: `0 0 8px ${WA}80` }}
                  />
                  <div className="flex-1 w-px" style={{ background: `linear-gradient(to bottom, ${WA}50, transparent)` }} />
                </div>

                <div className="flex-1 pb-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: WA }}>
                    Qué ocurre
                  </p>

                  {/* Solution box */}
                  {scene.solucion ? (
                    <div
                      className="um-solution-reveal rounded-2xl p-4"
                      style={{
                        background: `linear-gradient(135deg, rgba(37,211,102,0.08) 0%, rgba(6,106,254,0.06) 100%)`,
                        border: `1px solid ${WA}30`,
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg"
                          style={{ backgroundColor: `${WA}25` }}
                        >
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke={WA} strokeWidth={2.5} aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <div>
                          <p className="mb-1 text-[9px] font-bold uppercase tracking-widest" style={{ color: WA }}>
                            Solución Técnica
                          </p>
                          <p className="text-sm font-medium leading-6 text-white/80">
                            {scene.solucion}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="um-solution-reveal rounded-2xl p-4"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <p className="text-xs text-white/30 italic">
                        Interacción del cliente — sin lógica adicional del sistema.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Timeline — mini scene list */}
              <div
                className="rounded-2xl p-4"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <p className="mb-3 text-[9px] font-bold uppercase tracking-widest text-white/25">
                  Progreso de la historia
                </p>
                <div className="flex flex-col gap-1">
                  {GROUPS.map((g) => {
                    const active = scene.n >= g.from && scene.n <= g.to;
                    const done = scene.n > g.to;
                    const pct = active
                      ? ((scene.n - g.from) / (g.to - g.from + 1)) * 100
                      : done ? 100 : 0;
                    return (
                      <div key={g.label} className="flex items-center gap-2.5">
                        <div
                          className="h-1.5 w-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: active ? g.color : done ? g.color : "rgba(255,255,255,0.12)" }}
                        />
                        <p
                          className="w-36 shrink-0 text-[10px] font-semibold"
                          style={{ color: active ? "rgba(255,255,255,0.8)" : done ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.18)" }}
                        >
                          {g.label}
                        </p>
                        <div className="flex-1 rounded-full overflow-hidden" style={{ height: "3px", backgroundColor: "rgba(255,255,255,0.08)" }}>
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${pct}%`, backgroundColor: g.color }}
                          />
                        </div>
                        <p className="text-[9px] text-white/20 tabular-nums">{g.from}–{g.to}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="h-4 shrink-0" />
            </div>
          </div>
        </main>

        {/* ── Footer ── */}
        <footer
          className="relative z-10 shrink-0 px-4 py-3 sm:px-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)", backgroundColor: "rgba(0,0,0,0.22)" }}
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={prev}
              disabled={idx === 0}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold text-white/60 transition hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              style={{ borderColor: "rgba(255,255,255,0.18)" }}
              aria-label="Escena anterior"
            >←</button>

            <div className="flex flex-1 flex-col items-center gap-2.5">
              {/* Progress bar */}
              <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${WA} 0%, ${SF_EB50} 100%)` }}
                />
              </div>

              {/* Dot nav — grouped */}
              <div className="flex items-center gap-1" role="tablist" aria-label="Escenas">
                {SCENES.map((s, i) => {
                  const g = groupFor(s.n);
                  return (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={idx === i}
                      aria-label={`Ir a escena ${i + 1}`}
                      onClick={() => goTo(i, i > idx ? "next" : "prev")}
                      className="rounded-full transition-all duration-300 focus:outline-none"
                      style={{
                        width: idx === i ? "18px" : "5px",
                        height: "5px",
                        backgroundColor: idx === i ? g.color : i < idx ? `${g.color}55` : "rgba(255,255,255,0.15)",
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <span className="hidden w-12 shrink-0 text-right text-xs font-semibold tabular-nums text-white/25 sm:block">
              {String(idx + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={next}
              disabled={idx === TOTAL - 1}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold text-white/60 transition hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              style={{ borderColor: "rgba(255,255,255,0.18)" }}
              aria-label="Escena siguiente"
            >→</button>
          </div>

          <p className="mt-1.5 text-center text-[10px] text-white/20">
            ← → Navegar · Esc Cerrar · F Pantalla completa
          </p>
        </footer>
      </div>
    </>
  );
}

"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/* ── Brand ── */
const WA = "#25D366";
const WA_DARK = "#128C7E";
const WA_BG = "#ECE5DD";
const SF_EB15 = "#001E5B";
const SF_EB30 = "#022AC0";
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

/* ── Unified slide model ── */
type WhatsappSlide  = { type: "whatsapp";  n: number; historia: string; solucion: string; tags: string[] };
type SectionSlide   = { type: "section";   title: string; subtitle: string };
type WaSectionSlide = { type: "wasection" };
type ScreenSlide    = { type: "screen";    n: number; src: string };
type FullImageSlide = { type: "fullimage"; src: string; cover?: boolean };
type Slide = WhatsappSlide | SectionSlide | WaSectionSlide | ScreenSlide | FullImageSlide;

const BASE = "/Laila/laila-demos/unified-messaging";

const SLIDES: Slide[] = [
  // ── Intro presentation slides (pp-01 to pp-07) — cover full width
  ...Array.from({ length: 7 }, (_, i) => ({
    type: "fullimage" as const,
    cover: true,
    src: `${BASE}/pp-${String(i + 1).padStart(2, "0")}.png`,
  })),
  // ── WhatsApp story intro slide
  { type: "wasection" as const },
  // ── WhatsApp story (w-01 to w-27)
  ...SCENES.map(s => ({ type: "whatsapp" as const, ...s })),
  // ── Section divider
  { type: "section" as const, title: "Under the Hood", subtitle: "Cómo jugar con los registros" },
  // ── Flow Builder screens (fw-01 to fw-07)
  ...Array.from({ length: 7 }, (_, i) => ({
    type: "screen" as const,
    n: i + 1,
    src: `${BASE}/fw-${String(i + 1).padStart(2, "0")}.png`,
  })),
  // ── Closing slide
  { type: "fullimage" as const, cover: true, src: `${BASE}/end-thank-you.png` },
];

const TOTAL = SLIDES.length; // 44

const ANIM_CSS = `
@keyframes um-slide-up   { from { opacity:0; transform:translateY(22px) } to { opacity:1; transform:translateY(0) } }
@keyframes um-slide-down { from { opacity:0; transform:translateY(-22px) } to { opacity:1; transform:translateY(0) } }
@keyframes um-fade-in    { from { opacity:0 } to { opacity:1 } }
.um-next .um-story { animation: um-slide-up   0.38s cubic-bezier(.22,1,.36,1) both }
.um-prev .um-story { animation: um-slide-down 0.38s cubic-bezier(.22,1,.36,1) both }
.um-solution-reveal { animation: um-fade-in 0.45s ease 0.15s both }
.um-img-layer { transition: opacity 700ms ease }
.um-blob-a {
  position:absolute; border-radius:50%; pointer-events:none;
  top:-10%; left:-8%; width:45%; height:45%;
  background:rgba(0,179,255,0.22); filter:blur(90px);
}
.um-blob-b {
  position:absolute; border-radius:50%; pointer-events:none;
  bottom:-15%; right:-5%; width:35%; height:35%;
  background:rgba(6,106,254,0.28); filter:blur(90px);
}
`;

/* ── Chapter groups — by 0-based slide index ── */
// pp(0-6) | wasection(7) | wa(8-34) | section(35) | fw(36-42) | end(43)
const GROUPS: { label: string; fromIdx: number; toIdx: number; color: string }[] = [
  { label: "Introducción",            fromIdx: 0,  toIdx: 7,  color: SF_EB50  },
  { label: "Actualización de pedido", fromIdx: 8,  toIdx: 16, color: WA_DARK  },
  { label: "Upgrade de entradas",     fromIdx: 17, toIdx: 25, color: SF_EB50  },
  { label: "Búsqueda de loft",        fromIdx: 26, toIdx: 34, color: "#7C3AED" },
  { label: "Under the Hood",          fromIdx: 35, toIdx: 43, color: SF_CB68  },
];

function groupForIdx(i: number) {
  return GROUPS.find((g) => i >= g.fromIdx && i <= g.toIdx) ?? GROUPS[0];
}

type Props = { onClose: () => void };

export default function UnifiedMessagingPlayer({ onClose }: Props) {
  const [idx, setIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const [imgVisible, setImgVisible] = useState(true);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const [mobileTab, setMobileTab] = useState<"historia" | "pantalla">("historia");
  const rightRef = useRef<HTMLDivElement>(null);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const goTo = useCallback((next: number, d: "next" | "prev") => {
    if (next < 0 || next >= TOTAL) return;
    setDir(d);
    setPrevIdx(idx);
    setImgVisible(false);
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    fadeTimer.current = setTimeout(() => {
      setIdx(next);
      setImgVisible(true);
      setPrevIdx(null);
    }, 80);
  }, [idx]);

  const next = useCallback(() => goTo(idx + 1, "next"), [goTo, idx]);
  const prev = useCallback(() => goTo(idx - 1, "prev"), [goTo, idx]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) next();
      else prev();
    }
  }, [next, prev]);

  useEffect(() => () => { if (fadeTimer.current) clearTimeout(fadeTimer.current); }, []);

  useEffect(() => {
    rightRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    setMobileTab("historia");
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

  const slide    = SLIDES[idx];
  const group    = groupForIdx(idx);
  const progress = ((idx + 1) / TOTAL) * 100;
  const animClass = `um-${dir}`;

  // For whatsapp slides: crossfade src
  const waSlide = slide.type === "whatsapp" ? slide : null;
  const imgSrc  = waSlide ? `${BASE}/w-${String(waSlide.n).padStart(2, "0")}.PNG` : "";
  // Preload adjacent images
  const nextSlide = idx + 1 < TOTAL ? SLIDES[idx + 1] : null;
  const prevSlide = idx - 1 >= 0    ? SLIDES[idx - 1] : null;
  const nextSrc = nextSlide?.type === "whatsapp"  ? `${BASE}/w-${String(nextSlide.n).padStart(2, "0")}.PNG`
                : nextSlide?.type === "fullimage" ? nextSlide.src
                : nextSlide?.type === "screen"    ? nextSlide.src
                : null;
  const prevSrc = prevSlide?.type === "whatsapp"  ? `${BASE}/w-${String(prevSlide.n).padStart(2, "0")}.PNG`
                : prevSlide?.type === "fullimage" ? prevSlide.src
                : prevSlide?.type === "screen"    ? prevSlide.src
                : null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ANIM_CSS }} />

      <div
        className="fixed inset-0 z-50 flex flex-col"
        style={{
          background: `linear-gradient(150deg, ${SF_EB50} 0%, ${SF_EB30} 45%, ${SF_EB15} 100%)`,
          touchAction: "pan-y",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Historia: Soft Transitions with Unified Messaging"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Ambient globs */}
        <div className="um-blob-a" aria-hidden />
        <div className="um-blob-b" aria-hidden />

        {/* ── Top bar ── */}
        <header
          className="relative z-10 flex shrink-0 items-center justify-between px-4 py-2.5 sm:px-7"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.10)", backgroundColor: "rgba(0,0,0,0.15)" }}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/sfdc-logos/corporate-logo-horiz-allw.svg"
              alt="Salesforce"
              width={100}
              height={32}
              className="h-4 w-auto object-contain sm:h-5"
            />
            <span className="h-4 w-px bg-white/20" />
            <div
              className="flex items-center gap-1.5 rounded-full px-2 py-1 sm:px-2.5"
              style={{ backgroundColor: `${WA}22`, border: `1px solid ${WA}40` }}
            >
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill={WA} aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="text-[10px] font-bold tracking-wider" style={{ color: WA }}>WhatsApp</span>
            </div>
          </div>

          <span className="max-w-[120px] truncate text-center text-[10px] font-semibold text-white/50 sm:max-w-none sm:text-[11px]">
            {group.label}
          </span>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white/45 transition hover:text-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </header>

        {/* ── Main ── */}
        <main className="relative z-10 flex-1 overflow-hidden" style={{ position: "relative" }}>

          {nextSrc && <link rel="preload" as="image" href={nextSrc} />}
          {prevSrc && <link rel="preload" as="image" href={prevSrc} />}

          {/* ── FULLIMAGE slide — absolutely fills the main area ── */}
          {slide.type === "fullimage" && (
            <div className={`${animClass} um-story absolute inset-0 overflow-hidden`}>
              <Image
                key={slide.src}
                src={slide.src}
                alt=""
                fill
                className={slide.cover ? "object-cover object-center" : "object-contain"}
                sizes="100vw"
                unoptimized
                priority
              />
            </div>
          )}

          {/* ── WASECTION slide — WhatsApp chapter intro ── */}
          {slide.type === "wasection" && (
            <div className={`${animClass} um-story absolute inset-0 flex flex-col items-center justify-center gap-5 overflow-y-auto px-8 text-center sm:gap-7`}>
              {/* WhatsApp logo large */}
              <div
                className="flex h-20 w-20 items-center justify-center rounded-[28px] shadow-2xl sm:h-24 sm:w-24"
                style={{ background: `linear-gradient(135deg, ${WA_DARK} 0%, ${WA} 100%)`, boxShadow: `0 20px 60px ${WA}55` }}
              >
                <svg viewBox="0 0 24 24" fill="white" className="h-12 w-12 sm:h-14 sm:w-14" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">Salesforce · Unified Messaging</p>
                <h2 className="mt-3 font-black text-white" style={{ fontSize: "clamp(2.4rem, 7.5vw, 5.8rem)", lineHeight: 1.0 }}>
                  Soft Handoff
                </h2>
              </div>

              {/* Subtitle with inline WA pill */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 rounded-full px-4 py-2" style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.18)" }}>
                  <svg viewBox="0 0 24 24" fill={WA} className="h-4 w-4 shrink-0" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="text-base font-semibold text-white/80">WhatsApp</span>
                </div>
                <p className="text-base font-semibold text-white/55 sm:text-lg">Cada participante como si fuera el único</p>
              </div>

              <p className="mt-2 text-[11px] text-white/22 hidden sm:block">← → Navegar · Esc Cerrar</p>
              <p className="mt-2 text-[11px] text-white/22 sm:hidden">Desliza para navegar</p>
            </div>
          )}

          {/* ── SECTION slide ── */}
          {slide.type === "section" && (
            <div className={`${animClass} um-story absolute inset-0 flex flex-col items-center justify-center gap-5 overflow-y-auto px-8 text-center sm:gap-6`}>
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl sm:h-16 sm:w-16"
                style={{ background: `linear-gradient(135deg, ${SF_CB68} 0%, ${SF_EB50} 100%)`, boxShadow: `0 12px 40px ${SF_EB50}55` }}
              >
                {/* code icon */}
                <svg className="h-7 w-7 text-white sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">Salesforce · Unified Messaging</p>
              <h2 className="font-black text-white" style={{ fontSize: "clamp(2.2rem, 7vw, 5.5rem)", lineHeight: 1.05 }}>
                {slide.title}
              </h2>
              <p className="text-base font-semibold text-white/60 sm:text-xl">{slide.subtitle}</p>
              <p className="mt-2 text-[11px] text-white/22 hidden sm:block">← → Navegar · Esc Cerrar</p>
              <p className="mt-2 text-[11px] text-white/22 sm:hidden">Desliza para navegar</p>
            </div>
          )}

          {/* ── SCREEN slide ── */}
          {slide.type === "screen" && (
            <div className={`${animClass} um-story absolute inset-0 flex flex-col items-center justify-start overflow-y-auto p-4 lg:p-6`}>
              {/* Monitor frame */}
              <div className="w-full max-w-5xl">
                {/* Browser chrome bar */}
                <div
                  className="flex items-center gap-2 rounded-t-xl px-4 py-2.5"
                  style={{ background: "rgba(0,0,0,0.50)" }}
                >
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                  <span className="h-3 w-3 rounded-full bg-green-400/80" />
                  <div
                    className="ml-3 flex flex-1 items-center rounded-md px-3 py-1 text-[11px] text-white/30"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  >
                    salesforce.com · Flow Builder
                  </div>
                  <span className="text-[10px] font-semibold text-white/30">
                    {String(slide.n).padStart(2, "0")} / 07
                  </span>
                </div>
                {/* Screen content */}
                <div
                  className="overflow-hidden rounded-b-xl"
                  style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.55)" }}
                >
                  <Image
                    key={slide.src}
                    src={slide.src}
                    alt={`Flow Builder ${slide.n}`}
                    width={1280}
                    height={800}
                    className="h-auto w-full"
                    unoptimized
                    priority
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── WHATSAPP slide ── */}
          {slide.type === "whatsapp" && (
            <div className="absolute inset-0 flex flex-col overflow-hidden lg:flex-row">

              {/* Mobile tab bar — only visible below lg */}
              <div
                className="flex shrink-0 border-b border-white/10 lg:hidden"
                style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
              >
                {(["historia", "pantalla"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setMobileTab(tab)}
                    className="flex-1 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors focus:outline-none"
                    style={{
                      color: mobileTab === tab ? "white" : "rgba(255,255,255,0.38)",
                      borderBottom: `2px solid ${mobileTab === tab ? group.color : "transparent"}`,
                    }}
                  >
                    {tab === "historia" ? "Historia" : "Pantalla"}
                  </button>
                ))}
              </div>

              {/* LEFT — WhatsApp phone
                  Mobile: visible only when pantalla tab is active
                  Desktop: always visible as 46% column */}
              <div className={`flex shrink-0 items-start justify-center p-4 ${mobileTab === "historia" ? "hidden lg:flex" : ""} lg:w-[46%] lg:self-stretch lg:overflow-y-auto lg:p-6`}>
                <div
                  className="relative w-full max-w-[260px] overflow-hidden rounded-3xl sm:max-w-[340px]"
                  style={{ background: WA_BG, boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }}
                >
                  <div
                    className="sticky top-0 z-10 flex shrink-0 items-center gap-3 px-3 py-2.5"
                    style={{ background: `linear-gradient(90deg, ${WA_DARK} 0%, ${WA} 100%)` }}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-black text-white">SF</div>
                    <div>
                      <p className="text-[11px] font-bold text-white leading-none">Salesforce</p>
                      <p className="text-[9px] text-white/70 mt-0.5">en línea</p>
                    </div>
                  </div>
                  <div className="relative w-full">
                    <Image
                      src={imgSrc}
                      alt={`Escena ${slide.n}`}
                      width={340}
                      height={680}
                      className="um-img-layer h-auto w-full"
                      style={{ opacity: imgVisible ? 1 : 0 }}
                      unoptimized
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT — Story
                  Mobile: visible only when historia tab is active
                  Desktop: always visible as flex-1 column */}
              <div className={`${animClass} flex flex-col overflow-y-auto ${mobileTab === "pantalla" ? "hidden lg:flex lg:flex-1 lg:overflow-hidden" : "flex-1"}`}>
                <div
                  ref={rightRef}
                  className="um-story flex flex-1 flex-col gap-5 px-4 py-4 sm:gap-6 sm:px-5 sm:py-5 lg:self-stretch lg:overflow-y-auto lg:py-10 lg:pr-10"
                >
                  <div>
                    <span
                      className="rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-white"
                      style={{ background: group.color }}
                    >
                      {group.label}
                    </span>
                  </div>

                  <div className="border-l-2 pl-4" style={{ borderColor: `${group.color}80` }}>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40">
                      Escena {String(slide.n).padStart(2, "0")} · {String(idx + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
                    </p>
                    <h2 className="mt-2 font-black leading-snug text-white" style={{ fontSize: "clamp(1.15rem, 2.5vw, 1.9rem)" }}>
                      {slide.historia}
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {slide.tags.map((t) => (
                      <span key={t} className="rounded-full px-3 py-1 text-xs font-semibold"
                        style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.80)", border: "1px solid rgba(255,255,255,0.20)" }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-stretch gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-3.5 w-3.5 rounded-full shadow-md"
                        style={{ backgroundColor: group.color, boxShadow: `0 0 10px ${group.color}80` }} />
                      <div className="flex-1 w-px" style={{ background: `linear-gradient(to bottom, ${group.color}70, transparent)` }} />
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-xs font-bold uppercase tracking-widest mb-3 text-white/50">Qué ocurre</p>
                      {slide.solucion ? (
                        <div className="um-solution-reveal rounded-2xl p-4 sm:p-5"
                          style={{
                            background: "rgba(255,255,255,0.10)",
                            backdropFilter: "blur(16px)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            borderBottomWidth: "3px",
                            borderBottomColor: group.color,
                          }}>
                          <div className="flex items-start gap-3 sm:gap-4">
                            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10"
                              style={{ backgroundColor: `${group.color}25`, border: `1px solid ${group.color}40` }}>
                              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke={group.color} strokeWidth={2} aria-hidden>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                            </div>
                            <div>
                              <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: group.color }}>Solución Técnica</p>
                              <p className="text-[14px] font-medium leading-7 text-white/90 sm:text-[15px]">{slide.solucion}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="um-solution-reveal rounded-2xl p-4 sm:p-5"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}>
                          <p className="text-sm italic text-white/30">Interacción del cliente — sin lógica adicional del sistema.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl p-4 sm:p-5" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}>
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/30">Progreso</p>
                    <div className="flex flex-col gap-2">
                      {GROUPS.map((g) => {
                        const active = idx >= g.fromIdx && idx <= g.toIdx;
                        const done   = idx > g.toIdx;
                        const pct    = active ? ((idx - g.fromIdx) / (g.toIdx - g.fromIdx + 1)) * 100 : done ? 100 : 0;
                        return (
                          <div key={g.label} className="flex items-center gap-2.5">
                            <div className="h-2 w-2 rounded-full shrink-0"
                              style={{ backgroundColor: active ? g.color : done ? `${g.color}80` : "rgba(255,255,255,0.18)" }} />
                            <p className="w-32 shrink-0 text-[11px] font-semibold sm:w-36"
                              style={{ color: active ? "rgba(255,255,255,0.90)" : done ? "rgba(255,255,255,0.40)" : "rgba(255,255,255,0.22)" }}>
                              {g.label}
                            </p>
                            <div className="flex-1 rounded-full overflow-hidden" style={{ height: "3px", backgroundColor: "rgba(255,255,255,0.12)" }}>
                              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: g.color }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="h-4 shrink-0" />
                </div>
              </div>
            </div>
          )}
        </main>

        {/* ── Footer ── */}
        <footer
          className="relative z-10 shrink-0 px-3 py-2.5 sm:px-6 sm:py-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.10)", backgroundColor: "rgba(0,0,0,0.18)" }}
        >
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={prev}
              disabled={idx === 0}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold text-white/60 transition hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              style={{ borderColor: "rgba(255,255,255,0.20)" }}
              aria-label="Escena anterior"
            >←</button>

            <div className="flex flex-1 flex-col items-center gap-2">
              {/* Progress bar */}
              <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/12">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${group.color} 0%, ${SF_EB50} 100%)` }}
                />
              </div>

              {/* Mobile: 5 group segment dots */}
              <div className="flex items-center gap-1.5 sm:hidden">
                {GROUPS.map((g) => {
                  const active = idx >= g.fromIdx && idx <= g.toIdx;
                  const done   = idx > g.toIdx;
                  return (
                    <button
                      key={g.label}
                      type="button"
                      onClick={() => goTo(g.fromIdx, g.fromIdx > idx ? "next" : "prev")}
                      className="h-[5px] rounded-full transition-all duration-300 focus:outline-none"
                      style={{
                        width: active ? "28px" : "10px",
                        backgroundColor: active ? g.color : done ? `${g.color}55` : "rgba(255,255,255,0.18)",
                      }}
                      aria-label={`Ir a ${g.label}`}
                    />
                  );
                })}
              </div>

              {/* Desktop: full 44-dot nav */}
              <div className="hidden sm:flex items-center gap-1" role="tablist" aria-label="Slides">
                {SLIDES.map((_, i) => {
                  const g = groupForIdx(i);
                  return (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={idx === i}
                      aria-label={`Ir a slide ${i + 1}`}
                      onClick={() => goTo(i, i > idx ? "next" : "prev")}
                      className="rounded-full transition-all duration-300 focus:outline-none"
                      style={{
                        width: idx === i ? "18px" : "5px",
                        height: "5px",
                        backgroundColor: idx === i ? g.color : i < idx ? `${g.color}60` : "rgba(255,255,255,0.18)",
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <span className="w-10 shrink-0 text-right text-[10px] font-semibold tabular-nums text-white/25 sm:w-12 sm:text-xs">
              {String(idx + 1).padStart(2, "0")}/{String(TOTAL).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={next}
              disabled={idx === TOTAL - 1}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold text-white/60 transition hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              style={{ borderColor: "rgba(255,255,255,0.20)" }}
              aria-label="Escena siguiente"
            >→</button>
          </div>

          <p className="mt-1 text-center text-[10px] text-white/22 hidden sm:block">
            ← → Navegar · Esc Cerrar · F Pantalla completa
          </p>
          <p className="mt-1 text-center text-[10px] text-white/22 sm:hidden">
            Desliza para navegar
          </p>
        </footer>
      </div>
    </>
  );
}

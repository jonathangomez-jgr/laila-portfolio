"use client";

import { useState } from "react";

type Subagent = {
  id: string;
  name: string;
  emoji: string;
  role: string;
  trigger: string;
  autoCase?: string;
  extra?: string;
};

const FUNCTIONAL: Subagent[] = [
  {
    id: "quote",
    name: "Quote Management",
    emoji: "💰",
    role: "Cotización nacional e internacional",
    trigger: "cotizar · precio · tarifa · quote",
    autoCase: "Caso de cotización nacional o internacional",
    extra: "Clasifica Domestic/International antes de pedir cualquier detalle.",
  },
  {
    id: "order",
    name: "Orden Management",
    emoji: "📦",
    role: "Rastreo de envíos",
    trigger: "rastreo · guía · tracking · orden",
    autoCase: "Caso de seguimiento (silencioso)",
    extra: "Ejecuta PE_GetOrderStatus con el número de guía.",
  },
  {
    id: "geninfo",
    name: "General Information",
    emoji: "ℹ️",
    role: "FAQ, sitio web y respuestas predefinidas",
    trigger: "consultas informativas, políticas, requisitos",
    autoCase: "Caso de consulta de información general",
    extra: "Captura la pregunta antes de responder.",
  },
  {
    id: "jobbranch",
    name: "Job / Branch Info",
    emoji: "🏢",
    role: "Sucursales o vacantes de empleo",
    trigger: "sucursal · empleo · vacantes · trabajo",
    autoCase: "Caso de sucursales o de empleo",
    extra: "Entrega URL oficial correspondiente.",
  },
  {
    id: "case",
    name: "Case Management",
    emoji: "🎫",
    role: "Crear · consultar · comentar casos",
    trigger: "reclamo · queja · quiero crear caso",
    autoCase: "Caso de solicitud de servicio con número visible al cliente",
    extra: "Asunto ≤6 palabras · descripción ≤3 oraciones.",
  },
  {
    id: "escalation",
    name: "Escalation",
    emoji: "👤",
    role: "Transferencia a agente humano",
    trigger: "quiero hablar con humano · asesor · agente",
    extra: "Chequea Business Hours antes de transferir. Si está cerrado, ofrece crear caso.",
  },
];

const FALLBACKS: Subagent[] = [
  {
    id: "ambiguous",
    name: "Ambiguous Question",
    emoji: "🤔",
    role: "Pide más detalle cuando la solicitud es vaga",
    trigger: "'tengo un problema', 'ayuda', frases sin contexto",
  },
  {
    id: "offtopic",
    name: "Off Topic",
    emoji: "🧭",
    role: "Redirige cuando la solicitud sale del alcance",
    trigger: "preguntas de cultura general, política, deportes",
  },
];

type Category = "router" | "gate" | "functional" | "fallback" | "escalation";

const CATEGORY_STYLES: Record<
  Category,
  { chip: string; label: string; wrap: string; accent: string }
> = {
  router: {
    chip: "bg-[#5f6fff] text-white",
    label: "Enrutador",
    wrap: "border-[#5f6fff]/60 bg-gradient-to-br from-[#eef2ff] via-white to-[#f5f7ff] shadow-lg shadow-[#5f6fff]/10",
    accent: "text-[#5f6fff]",
  },
  gate: {
    chip: "bg-amber-500 text-white",
    label: "Gate obligatorio",
    wrap: "border-amber-300 bg-gradient-to-br from-amber-50 via-white to-amber-50/40 shadow-lg shadow-amber-500/10",
    accent: "text-amber-700",
  },
  functional: {
    chip: "bg-[#eaf5fe] text-[#066afe]",
    label: "Subagente funcional",
    wrap: "border-gray-200 bg-white hover:border-[#066afe]/50 hover:shadow-md hover:shadow-[#066afe]/10",
    accent: "text-[#066afe]",
  },
  escalation: {
    chip: "bg-rose-500 text-white",
    label: "Hand-off",
    wrap: "border-rose-200 bg-gradient-to-br from-rose-50 via-white to-rose-50/40 hover:border-rose-400 hover:shadow-md hover:shadow-rose-500/10",
    accent: "text-rose-700",
  },
  fallback: {
    chip: "bg-gray-200 text-gray-700",
    label: "Fallback",
    wrap: "border-gray-200 bg-gray-50/70 hover:border-gray-400",
    accent: "text-gray-700",
  },
};

function Tile({
  subagent,
  category,
  size = "md",
}: {
  subagent: Subagent;
  category: Category;
  size?: "sm" | "md" | "lg";
}) {
  const [hovered, setHovered] = useState(false);
  const s = CATEGORY_STYLES[category];

  const pad = size === "lg" ? "p-5" : size === "sm" ? "p-3" : "p-4";
  const nameSize = size === "lg" ? "text-lg" : "text-sm";
  const emojiSize = size === "lg" ? "text-3xl" : "text-2xl";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative cursor-default rounded-2xl border-2 ${pad} transition-all duration-200 ${s.wrap}`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span
          className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${s.chip}`}
        >
          {s.label}
        </span>
        <span className={emojiSize}>{subagent.emoji}</span>
      </div>
      <h4 className={`font-semibold leading-tight text-gray-950 ${nameSize}`}>
        {subagent.name}
      </h4>
      <p className={`mt-1 text-xs leading-snug ${s.accent}`}>{subagent.role}</p>

      <div
        className={`overflow-hidden transition-all duration-200 ${
          hovered || size === "lg" ? "mt-3 max-h-80 opacity-100" : "mt-0 max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-2 border-t border-gray-200/70 pt-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              Se activa cuando
            </p>
            <p className="mt-0.5 text-xs leading-snug text-gray-700">{subagent.trigger}</p>
          </div>
          {subagent.autoCase && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
                Autocaso
              </p>
              <p className="mt-0.5 text-xs leading-snug text-gray-700">{subagent.autoCase}</p>
            </div>
          )}
          {subagent.extra && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                Detalle
              </p>
              <p className="mt-0.5 text-xs leading-snug text-gray-700">{subagent.extra}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Connector({ label }: { label?: string }) {
  return (
    <div className="relative mx-auto flex flex-col items-center">
      <div className="h-6 w-px bg-gradient-to-b from-[#5f6fff]/70 to-[#5f6fff]/20" />
      {label && (
        <span className="my-1 rounded-full border border-[#5f6fff]/20 bg-white px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#5f6fff]">
          {label}
        </span>
      )}
      <div className="h-6 w-px bg-gradient-to-b from-[#5f6fff]/20 to-transparent" />
      <svg
        className="mt-[-6px] h-3 w-3 text-[#5f6fff]/60"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M6 10L2 4h8L6 10z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export default function PaquetexpressAgentArchitecture() {
  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-[#fafbff] to-white p-5 shadow-sm sm:my-10 sm:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5f6fff]">
            Arquitectura · Agent Script
          </p>
          <h3 className="mt-1 text-xl font-semibold tracking-tight text-gray-950 sm:text-2xl">
            Un enrutador · un gate · 6 subagentes funcionales · 2 fallbacks
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Pasa el cursor por cada tarjeta para ver cuándo se activa y qué caso crea automáticamente.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          v29 · AiAuthoringBundle
        </div>
      </div>

      {/* Tier 1 · Router */}
      <div>
        <div className="mx-auto max-w-md">
          <Tile
            subagent={{
              id: "router",
              name: "Agent Router",
              emoji: "🚦",
              role: "Bienvenida y decisión de siguiente paso",
              trigger: "Todo turno del cliente",
              extra:
                "Envía a Customer Verification si isVerified=False. Ya verificado, ruta según pendingIntent (Quote, Order, Case, GeneralInfo, JobBranch o Escalation).",
            }}
            category="router"
            size="lg"
          />
        </div>
        <Connector />
      </div>

      {/* Tier 2 · Gate */}
      <div>
        <div className="mx-auto max-w-md">
          <Tile
            subagent={{
              id: "verification",
              name: "Customer Verification",
              emoji: "🔐",
              role: "Verifica identidad — nombre + correo",
              trigger:
                "Siempre al inicio; bloqueante para cualquier otro subagente sensible",
              extra:
                "Ejecuta el flujo AG_Get_and_create_contact. Nunca pide tarjeta, contraseña o ID oficial. En paralelo captura pendingIntent en silencio para reanudar automáticamente después.",
            }}
            category="gate"
            size="lg"
          />
        </div>
        <div className="mt-3 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-medium text-amber-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-3 w-3"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                clipRule="evenodd"
              />
            </svg>
            Todos los subagentes funcionales quedan bloqueados hasta que isVerified = True
          </span>
        </div>
        <Connector label="una vez verificado" />
      </div>

      {/* Tier 3 · Functional subagents */}
      <div className="mb-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Los 6 subagentes especialistas
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FUNCTIONAL.map((sub) => (
            <Tile
              key={sub.id}
              subagent={sub}
              category={sub.id === "escalation" ? "escalation" : "functional"}
            />
          ))}
        </div>
      </div>

      {/* Escalation callout */}
      <div className="mb-6 rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50/70 via-white to-white p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">⏰</span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-rose-700">
                Chequeo obligatorio antes de escalar
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Check_Now_is_within_Business_Hours_by_Name</span>
                {" "}se ejecuta contra Business Hours <em>&ldquo;Horario Paquete&rdquo;</em> antes de transferir.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Abierto → transfiere
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 py-0.5 font-medium text-gray-700">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
              Cerrado → ofrece crear caso
            </span>
          </div>
        </div>
      </div>

      {/* Tier 4 · Fallbacks */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Subagentes de contención (fallbacks)
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {FALLBACKS.map((sub) => (
            <Tile key={sub.id} subagent={sub} category="fallback" />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-gray-100 pt-5 text-xs text-gray-500">
        <span className="font-semibold uppercase tracking-wider">Leyenda</span>
        {(["router", "gate", "functional", "escalation", "fallback"] as Category[]).map((c) => (
          <span key={c} className="inline-flex items-center gap-1.5">
            <span
              className={`inline-block h-2.5 w-2.5 rounded-full ${
                c === "router"
                  ? "bg-[#5f6fff]"
                  : c === "gate"
                    ? "bg-amber-500"
                    : c === "functional"
                      ? "bg-[#066afe]"
                      : c === "escalation"
                        ? "bg-rose-500"
                        : "bg-gray-400"
              }`}
            />
            {CATEGORY_STYLES[c].label}
          </span>
        ))}
        <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] italic text-gray-500">
          💡 Pasa el cursor por cualquier subagente para ver el detalle
        </span>
      </div>
    </div>
  );
}

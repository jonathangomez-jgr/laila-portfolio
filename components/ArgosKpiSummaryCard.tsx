"use client";

/* ─── Salesforce brand palette — Brand Guidelines 2026 ─── */
const SF = {
  eb15: "#001E5B",
  eb30: "#022AC0",
  eb50: "#066AFE",
  cb68: "#00B3FF",
  cb80: "#90D0FE",
  cb95: "#EAF5FE",
  teal20: "#023434",
  teal60: "#06A59A",
  teal80: "#04E1CB",
  violet20: "#481A54",
  violet30: "#730394",
  violet65: "#D17DFE",
  violet95: "#F9F0FF",
  white: "#FFFFFF",
};

const PILLARS = [
  {
    id: "P1",
    label: "Pilar 1",
    name: "Market Share",
    headline: "+15%",
    sub: "market share canal masivo",
    note: "meta SPRINT 4.0 · 12 meses",
    accent: SF.cb68,
    labelColor: SF.cb80,
    noteColor: SF.cb95,
  },
  {
    id: "P2",
    label: "Pilar 2",
    name: "Segmentación",
    headline: "6+",
    sub: "campañas Machine Sellers activas",
    note: "automatizadas · sin intervención manual",
    accent: SF.violet65,
    labelColor: SF.violet65,
    noteColor: SF.violet95,
  },
  {
    id: "P3",
    label: "Pilar 3",
    name: "Integración",
    headline: "100%",
    sub: "Argos ONE + SAP integrados al CRM",
    note: "visión 360° sin silos · 12 meses",
    accent: SF.teal80,
    labelColor: SF.teal80,
    noteColor: "#DEF9F3",
  },
];

export default function ArgosKpiSummaryCard() {
  return (
    <div className="mt-8">
      <div
        className="overflow-hidden rounded-2xl ring-1 ring-white/10"
        style={{
          background: `linear-gradient(135deg, ${SF.eb15} 0%, #001133 50%, ${SF.teal20} 100%)`,
          boxShadow: `0 20px 50px ${SF.eb30}55`,
        }}
      >
        {/* ── Header ── */}
        <div
          className="flex flex-wrap items-center justify-between gap-3 border-b px-6 py-4"
          style={{ borderColor: `${SF.eb50}25` }}
        >
          <div className="flex items-center gap-2.5">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: SF.cb68 }}
            />
            <p
              className="text-[11px] font-bold uppercase tracking-[0.22em]"
              style={{ color: SF.cb80 }}
            >
              Resultados clave · 12 meses
            </p>
          </div>
          <p
            className="text-[11px]"
            style={{ color: SF.cb95, opacity: 0.4 }}
          >
            3 pilares estratégicos · Horizonte SPRINT 4.0
          </p>
        </div>

        {/* ── 3 headline stats ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {PILLARS.map((p, i) => (
            <div
              key={p.id}
              className="flex flex-col items-center px-8 py-10 text-center"
              style={{
                borderRight:
                  i < PILLARS.length - 1
                    ? `1px solid ${SF.eb50}18`
                    : undefined,
                borderBottom:
                  i < PILLARS.length - 1
                    ? `1px solid ${SF.eb50}18`
                    : undefined,
              }}
            >
              {/* Pillar badge */}
              <span
                className="mb-4 inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                style={{
                  backgroundColor: `${p.accent}18`,
                  color: p.accent,
                  border: `1px solid ${p.accent}40`,
                }}
              >
                {p.label} · {p.name}
              </span>

              {/* Big number */}
              <p
                className="font-black leading-none tracking-tight"
                style={{
                  color: SF.white,
                  fontSize: "clamp(3rem, 7vw, 4.5rem)",
                }}
              >
                {p.headline}
              </p>

              {/* Subtitle */}
              <p
                className="mt-3 text-sm font-semibold leading-snug"
                style={{ color: p.labelColor }}
              >
                {p.sub}
              </p>

              {/* Note */}
              <p
                className="mt-2 text-[11px]"
                style={{ color: p.noteColor, opacity: 0.45 }}
              >
                {p.note}
              </p>
            </div>
          ))}
        </div>

        {/* ── Footer ── */}
        <div
          className="border-t px-6 py-3"
          style={{
            borderColor: `${SF.eb50}18`,
            backgroundColor: `${SF.eb15}70`,
          }}
        >
          <p
            className="text-center text-[10px]"
            style={{ color: SF.cb95, opacity: 0.3 }}
          >
            Basado en discovery con equipo Cementos Argos · Mayo 2026
          </p>
        </div>
      </div>
    </div>
  );
}

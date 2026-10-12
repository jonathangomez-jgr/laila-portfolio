"use client";

import { useMemo, useState } from "react";
import {
  CATEGORIES as BW_CATEGORIES,
  betterwareAgentDocs,
  type AgentCategory as BWAgentCategory,
  type AgentSubagentDoc as BWAgentSubagentDoc,
} from "@/data/betterwareAgentDocumentation";
import {
  PAQUETEXPRESS_CATEGORIES,
  paquetexpressAgentDocs,
  type PaquetexpressAgentCategory,
  type PaquetexpressAuditFinding,
  type PaquetexpressGapWave,
  type PaquetexpressSubagentDoc,
  type PaquetexpressTestScenario,
} from "@/data/paquetexpressAgentDocumentation";

// -----------------------------------------------------------------------------
// Adaptador común entre los docs de Betterware y Paquetexpress
// -----------------------------------------------------------------------------

type ActionLite = { name: string; target: string; description?: string };

type SubagentLite = {
  id: string;
  number: number;
  name: string;
  category: string;
  developerName?: string;
  estado?: string;
  descripcion: string;
  activacion: string;
  respuestas: string;
  acciones: ActionLite[];
  criterios: string[];
  escenarios?: PaquetexpressTestScenario[];
};

type DocLite = {
  name: string;
  developerName: string;
  botId?: string;
  version: string;
  estado?: string;
  revision: string;
  canal?: string;
  base: string;
  resumenAudit?: string;
  hallazgos?: PaquetexpressAuditFinding[];
  planOlas?: PaquetexpressGapWave[];
  categories: string[];
  subagents: SubagentLite[];
};

function adaptBetterware(): DocLite {
  return {
    name: betterwareAgentDocs.name,
    developerName: betterwareAgentDocs.developerName,
    version: betterwareAgentDocs.version,
    revision: betterwareAgentDocs.revision,
    base: betterwareAgentDocs.base,
    categories: BW_CATEGORIES as unknown as string[],
    subagents: betterwareAgentDocs.subagents.map((s: BWAgentSubagentDoc) => ({
      id: s.id,
      number: s.number,
      name: s.name,
      category: s.category as BWAgentCategory,
      descripcion: s.descripcion,
      activacion: s.activacion,
      respuestas: s.respuestas,
      acciones: s.acciones,
      criterios: s.criterios,
    })),
  };
}

function adaptPaquetexpress(): DocLite {
  return {
    name: paquetexpressAgentDocs.name,
    developerName: paquetexpressAgentDocs.developerName,
    botId: paquetexpressAgentDocs.botId,
    version: paquetexpressAgentDocs.version,
    estado: paquetexpressAgentDocs.estado,
    revision: paquetexpressAgentDocs.revision,
    canal: paquetexpressAgentDocs.canal,
    base: paquetexpressAgentDocs.base,
    resumenAudit: paquetexpressAgentDocs.resumenAudit,
    hallazgos: paquetexpressAgentDocs.hallazgos,
    planOlas: paquetexpressAgentDocs.planOlas,
    categories: PAQUETEXPRESS_CATEGORIES as unknown as string[],
    subagents: paquetexpressAgentDocs.subagents.map((s: PaquetexpressSubagentDoc) => ({
      id: s.id,
      number: s.number,
      name: s.name,
      developerName: s.developerName,
      estado: s.estado,
      category: s.category as PaquetexpressAgentCategory,
      descripcion: s.descripcion,
      activacion: s.activacion,
      respuestas: s.respuestas,
      acciones: s.acciones,
      criterios: s.criterios,
      escenarios: s.escenarios,
    })),
  };
}

function pickDoc(slug: string): DocLite {
  if (slug === "paquetexpress") return adaptPaquetexpress();
  return adaptBetterware();
}

// -----------------------------------------------------------------------------
// Componente
// -----------------------------------------------------------------------------

type SectionId =
  | "descripcion"
  | "activacion"
  | "respuestas"
  | "acciones"
  | "criterios"
  | "escenarios"
  | "todo";

const BASE_SECTIONS: Array<{ id: SectionId; label: string }> = [
  { id: "descripcion", label: "Descripción" },
  { id: "activacion", label: "Activación" },
  { id: "respuestas", label: "Respuestas" },
  { id: "acciones", label: "Acciones" },
  { id: "criterios", label: "Criterios de aceptación" },
  { id: "todo", label: "Ver todo" },
];

const norm = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

type ViewMode = "subagents" | "audit";

export default function AgentDocsTab({ slug }: { slug?: string } = {}) {
  const doc = useMemo(() => pickDoc(slug ?? ""), [slug]);
  const hasAudit = Boolean(doc.hallazgos && doc.hallazgos.length > 0);
  const [mode, setMode] = useState<ViewMode>(hasAudit ? "audit" : "subagents");
  const [selectedId, setSelectedId] = useState<string>(doc.subagents[0].id);
  const [activeSection, setActiveSection] = useState<SectionId>("descripcion");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("");

  const countsByCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of doc.categories) counts[cat] = 0;
    for (const s of doc.subagents) counts[s.category] = (counts[s.category] ?? 0) + 1;
    return counts;
  }, [doc]);

  const filtered = useMemo(() => {
    const q = norm(search);
    return doc.subagents.filter(
      (a) =>
        (!category || a.category === category) &&
        (!q || norm(JSON.stringify(a)).includes(q)),
    );
  }, [doc, search, category]);

  const grouped = useMemo(() => {
    const groups: Array<[string, SubagentLite[]]> = [];
    for (const cat of doc.categories) {
      const items = filtered.filter((a) => a.category === cat);
      if (items.length > 0) groups.push([cat, items]);
    }
    return groups;
  }, [doc, filtered]);

  const selected = doc.subagents.find((s) => s.id === selectedId) ?? doc.subagents[0];
  const sections = useMemo<Array<{ id: SectionId; label: string }>>(() => {
    if (!selected.escenarios || selected.escenarios.length === 0) return BASE_SECTIONS;
    return [
      ...BASE_SECTIONS.slice(0, 5),
      { id: "escenarios", label: `Escenarios de prueba (${selected.escenarios.length})` },
      BASE_SECTIONS[5],
    ];
  }, [selected]);

  const statusLabel = doc.estado ?? "";

  return (
    <div className="agent-docs">
      {/* Encabezado con versión + estado */}
      <header className="doc-header">
        <div className="doc-head-main">
          <div className="doc-eyebrow">Documentación del agente</div>
          <h1>{doc.name}</h1>
          <p className="doc-dev">
            <code>{doc.developerName}</code>
          </p>
          {doc.canal && <p className="doc-channel">Canal: {doc.canal}</p>}
          <p className="doc-base">{doc.base}</p>
        </div>
        <div className="doc-head-badges">
          <span className="badge version">{doc.version}</span>
          {statusLabel && (
            <span className={`badge status status-${statusLabel.toLowerCase()}`}>
              {statusLabel}
            </span>
          )}
          <span className="badge revision">Rev. {doc.revision}</span>
          {doc.botId && <span className="badge botid">{doc.botId}</span>}
        </div>
      </header>

      {hasAudit && (
        <nav className="mode-switch" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "audit"}
            className={mode === "audit" ? "active" : ""}
            onClick={() => setMode("audit")}
          >
            🔍 Audit del agente
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "subagents"}
            className={mode === "subagents" ? "active" : ""}
            onClick={() => setMode("subagents")}
          >
            🧩 Subagentes ({doc.subagents.length})
          </button>
        </nav>
      )}

      {mode === "audit" && doc.hallazgos && doc.planOlas && (
        <AuditView
          resumen={doc.resumenAudit ?? ""}
          hallazgos={doc.hallazgos}
          planOlas={doc.planOlas}
          onJumpToSubagent={(id) => {
            setMode("subagents");
            setSelectedId(id);
            setActiveSection("descripcion");
          }}
        />
      )}

      {mode === "subagents" && (
      <>
      {/* Dashboard de categorías */}
      <div className="dash-grid">
        <button
          type="button"
          onClick={() => {
            setCategory("");
            setSearch("");
          }}
          className={`dash-total ${category === "" && !search ? "is-selected" : ""}`}
        >
          <strong>{doc.subagents.length}</strong>
          <span>Subagentes en total</span>
        </button>
        {doc.categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(category === cat ? "" : cat)}
            className={`dash-cat ${category === cat ? "is-selected" : ""}`}
          >
            <strong>{countsByCategory[cat] ?? 0}</strong>
            <span>{cat}</span>
          </button>
        ))}
      </div>

      <div className="agent-workspace">
        {/* Sidebar / directorio */}
        <aside className="directory">
          <label htmlFor="agent-search">Buscar subagente o solicitud</label>
          <input
            id="agent-search"
            type="search"
            placeholder="Nombre, tema o acción…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <label htmlFor="agent-cat">Categoría</label>
          <select
            id="agent-cat"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {doc.categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <div className="list-meta">
            <span>
              {filtered.length} de {doc.subagents.length} subagentes
            </span>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("");
              }}
            >
              Limpiar
            </button>
          </div>

          <div className="agent-list">
            {grouped.length === 0 ? (
              <div className="empty">
                <strong>Sin coincidencias</strong>
                <p>Prueba otro término o limpia los filtros.</p>
              </div>
            ) : (
              grouped.map(([cat, items]) => (
                <div key={cat} className="group">
                  <h3>{cat}</h3>
                  {items.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => {
                        setSelectedId(a.id);
                        setActiveSection("descripcion");
                      }}
                      className={`list-item ${selectedId === a.id ? "selected" : ""}`}
                    >
                      <span className="list-num">{String(a.number).padStart(2, "0")}</span>
                      <span className="list-name">{a.name}</span>
                      {a.estado && (
                        <span className={`list-badge badge-${(a.estado || "").toLowerCase().replace(/[^a-z0-9]/g, "-")}`}>
                          {a.estado}
                        </span>
                      )}
                      <span className="list-chev" aria-hidden="true">
                        ›
                      </span>
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>
        </aside>

        {/* Sheet */}
        <article className="sheet">
          <header className="sheet-head">
            <div>
              <div className="eyebrow">
                {selected.category.toUpperCase()} · {String(selected.number).padStart(2, "0")}
                {selected.estado && (
                  <span className="eyebrow-status">· {selected.estado}</span>
                )}
              </div>
              <h1>{selected.name}</h1>
              {selected.developerName && (
                <p className="sheet-dev">
                  <code>{selected.developerName}</code>
                </p>
              )}
            </div>
            <button
              type="button"
              className="copy-btn"
              onClick={() => {
                if (typeof window !== "undefined") {
                  navigator.clipboard?.writeText(
                    `${window.location.origin}${window.location.pathname}?tab=agent-docs&agent=${selected.id}`,
                  );
                }
              }}
            >
              Copiar enlace a ficha
            </button>
          </header>

          <nav className="section-tabs" role="tablist">
            {sections.map((s) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={activeSection === s.id}
                className={activeSection === s.id ? "active" : ""}
                onClick={() => setActiveSection(s.id)}
              >
                {s.label}
              </button>
            ))}
          </nav>

          <div className="sections">
            {(activeSection === "descripcion" || activeSection === "todo") && (
              <section className="field">
                <h2>Qué hace</h2>
                <p>{selected.descripcion}</p>
              </section>
            )}
            {(activeSection === "activacion" || activeSection === "todo") && (
              <section className="field">
                <h2>Cuándo se activa</h2>
                <p>{selected.activacion}</p>
              </section>
            )}
            {(activeSection === "respuestas" || activeSection === "todo") && (
              <section className="field">
                <h2>Respuestas que da</h2>
                <p>{selected.respuestas}</p>
              </section>
            )}
            {(activeSection === "acciones" || activeSection === "todo") && (
              <section className="field">
                <h2>Acciones que usa</h2>
                {selected.acciones.length === 0 ? (
                  <p className="muted">Este subagente no ejecuta acciones backing — opera solo con instrucciones.</p>
                ) : (
                  <div className="action-list">
                    {selected.acciones.map((a) => (
                      <div key={a.name} className="action-block">
                        <div className="action-name">
                          <strong>{a.name}</strong>
                          <code>{a.target}</code>
                        </div>
                        {a.description && <p>{a.description}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
            {(activeSection === "criterios" || activeSection === "todo") && (
              <section className="field">
                <h2>Criterios de aceptación</h2>
                <p className="field-hint">Condiciones de validación definidas para este subagente en esta ficha.</p>
                <ol className="criteria">
                  {selected.criterios.map((c, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: emphasize(c) }} />
                  ))}
                </ol>
              </section>
            )}
            {(activeSection === "escenarios" || activeSection === "todo") &&
              selected.escenarios &&
              selected.escenarios.length > 0 && (
                <section className="field">
                  <h2>Escenarios de prueba</h2>
                  <p className="field-hint">
                    Flujos completos con datos reales de la hoja <em>Datos de prueba</em> y conversación de ejemplo.
                  </p>
                  <div className="scenarios">
                    {selected.escenarios.map((e) => (
                      <ScenarioCard key={e.id} escenario={e} />
                    ))}
                  </div>
                </section>
              )}
          </div>
        </article>
      </div>
      </>
      )}

      <footer className="docs-foot">
        <span>
          <strong>Agente:</strong> {doc.name} ({doc.developerName}) · Versión {doc.version}
          {statusLabel ? ` · ${statusLabel}` : ""} · Revisión {doc.revision}
        </span>
        <p className="base-note">{doc.base}</p>
      </footer>

      <style jsx>{`
        .agent-docs {
          --brand: #00acc8;
          --deep: #075464;
          --ink: #23394d;
          --muted: #667b8e;
          --line: #dce5ed;
          --bg: #f3f6f9;
          --accent: #d97706;
          color: var(--ink);
          font-size: 14px;
          line-height: 1.65;
        }
        .doc-header {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 24px;
          align-items: start;
          background: linear-gradient(135deg, #075464 0%, #0b7a90 100%);
          color: #e2f6f9;
          padding: 22px 26px;
          border-radius: 9px;
          margin-bottom: 20px;
        }
        @media (max-width: 820px) {
          .doc-header {
            grid-template-columns: 1fr;
          }
        }
        .doc-eyebrow {
          font-size: 10px;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: #a3dde6;
          margin-bottom: 6px;
        }
        .doc-head-main h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 650;
          color: #ffffff;
          letter-spacing: -0.4px;
        }
        .doc-dev {
          margin: 6px 0 0;
          font-size: 12px;
          color: #c7edf3;
        }
        .doc-dev code,
        .sheet-dev code {
          background: rgba(255, 255, 255, 0.1);
          padding: 1px 6px;
          border-radius: 3px;
          font-family: ui-monospace, monospace;
          font-size: 11px;
        }
        .doc-channel {
          margin: 6px 0 0;
          font-size: 11px;
          color: #b4e2eb;
        }
        .doc-base {
          margin: 10px 0 0;
          font-size: 12.5px;
          color: #e8f5f8;
          line-height: 1.65;
        }
        .doc-head-badges {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }
        @media (max-width: 820px) {
          .doc-head-badges {
            flex-direction: row;
            align-items: center;
          }
        }
        .badge {
          display: inline-flex;
          align-items: center;
          padding: 6px 11px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 650;
          letter-spacing: 0.3px;
        }
        .badge.version {
          background: #ffffff;
          color: #075464;
          font-size: 13px;
          padding: 7px 15px;
        }
        .badge.status {
          background: var(--accent);
          color: #ffffff;
          text-transform: uppercase;
        }
        .badge.status-draft {
          background: #d97706;
        }
        .badge.status-published {
          background: #15803d;
        }
        .badge.revision {
          background: rgba(255, 255, 255, 0.14);
          color: #e2f6f9;
        }
        .badge.botid {
          background: rgba(255, 255, 255, 0.08);
          color: #b4e2eb;
          font-family: ui-monospace, monospace;
          font-size: 10px;
        }
        .mode-switch {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          border-bottom: 1px solid #dce5ed;
          padding-bottom: 10px;
        }
        .mode-switch button {
          background: white;
          border: 1px solid #dce5ed;
          padding: 9px 16px;
          border-radius: 6px;
          font-size: 13px;
          color: #475569;
          cursor: pointer;
          font-weight: 600;
        }
        .mode-switch button:hover {
          background: #f3f6f9;
        }
        .mode-switch button.active {
          background: #075464;
          color: white;
          border-color: #075464;
        }
        .dash-grid {
          display: grid;
          grid-template-columns: 1.05fr repeat(auto-fit, minmax(100px, 1fr));
          gap: 10px;
          margin-bottom: 24px;
        }
        @media (max-width: 1200px) {
          .dash-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (max-width: 600px) {
          .dash-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
          }
          .dash-total {
            grid-column: 1 / -1;
          }
        }
        .dash-total,
        .dash-cat {
          display: flex;
          align-items: center;
          gap: 12px;
          text-align: left;
          padding: 15px 16px;
          border: 1px solid #dce9ed;
          border-radius: 7px;
          background: white;
          cursor: pointer;
          transition: all 0.15s;
        }
        .dash-total {
          background: var(--deep);
          color: white;
          border-color: var(--deep);
        }
        .dash-total:hover {
          background: #096476;
        }
        .dash-total.is-selected {
          outline: 2px solid var(--brand);
          outline-offset: 2px;
        }
        .dash-total strong,
        .dash-cat strong {
          font-size: 25px;
          font-weight: 650;
          line-height: 1;
        }
        .dash-total span,
        .dash-cat span {
          font-size: 10px;
          line-height: 1.5;
        }
        .dash-cat strong {
          color: var(--deep);
        }
        .dash-cat span {
          color: #456775;
        }
        .dash-cat:hover,
        .dash-cat.is-selected {
          background: #e5f7fa;
          border-color: var(--brand);
        }
        .dash-total span {
          color: #e2f6f9;
        }

        .agent-workspace {
          display: grid;
          grid-template-columns: 320px minmax(0, 1fr);
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 1050px) {
          .agent-workspace {
            grid-template-columns: 260px minmax(0, 1fr);
            gap: 18px;
          }
        }
        @media (max-width: 850px) {
          .agent-workspace {
            grid-template-columns: 1fr;
          }
        }

        .directory {
          background: white;
          border: 1px solid var(--line);
          border-radius: 7px;
          padding: 18px;
          position: sticky;
          top: 16px;
          max-height: calc(100vh - 32px);
          overflow-y: auto;
        }
        @media (max-width: 850px) {
          .directory {
            position: static;
            max-height: 420px;
          }
        }
        .directory label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          margin-bottom: 6px;
          color: var(--ink);
        }
        .directory label:not(:first-child) {
          margin-top: 14px;
        }
        .directory input,
        .directory select {
          width: 100%;
          background: white;
          border: 1px solid #cbd9e5;
          border-radius: 5px;
          padding: 10px;
          color: var(--ink);
          font-size: 12px;
          font-family: inherit;
        }
        .list-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 10px;
          color: var(--muted);
          margin: 14px 0;
        }
        .list-meta button {
          border: 0;
          padding: 3px 5px;
          font-size: 10px;
          background: transparent;
          color: var(--brand);
          cursor: pointer;
        }
        .group {
          margin-top: 17px;
        }
        .group h3 {
          font-size: 10px;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: #778ca0;
          margin: 0 0 7px;
          font-weight: 650;
        }
        .list-item {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 11px 9px;
          border-radius: 5px;
          color: var(--ink);
          line-height: 1.4;
          font-size: 12px;
          border-left: 3px solid transparent;
          margin: 3px 0;
          background: white;
          border-top: 0;
          border-right: 0;
          border-bottom: 0;
          width: 100%;
          text-align: left;
          cursor: pointer;
          transition: background 0.15s;
        }
        .list-item:hover {
          background: #f0f6fb;
        }
        .list-item.selected {
          background: #e8f7fa;
          color: var(--deep);
          border-left-color: var(--brand);
          font-weight: 600;
        }
        .list-num {
          font-size: 10px;
          font-family: ui-monospace, monospace;
          color: #8296a8;
          padding-top: 2px;
          min-width: 18px;
        }
        .list-name {
          flex: 1;
        }
        .list-badge {
          font-size: 9px;
          padding: 2px 6px;
          border-radius: 10px;
          background: #e2f6f9;
          color: #075464;
          font-weight: 650;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .list-badge.badge-draft {
          background: #fef3c7;
          color: #92400e;
        }
        .list-badge.badge-implementado,
        .list-badge.badge-implementado--voice- {
          background: #dcfce7;
          color: #166534;
        }
        .list-badge.badge-diseño-pendiente,
        .list-badge.badge-dise-o-pendiente {
          background: #fee2e2;
          color: #991b1b;
        }
        .list-chev {
          margin-left: auto;
          font-size: 18px;
          color: #90a7b8;
          font-weight: 400;
        }

        .sheet {
          background: white;
          border: 1px solid var(--line);
          border-radius: 7px;
          padding: 29px 34px;
          min-width: 0;
        }
        @media (max-width: 1050px) {
          .sheet {
            padding: 23px;
          }
        }
        .sheet-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
        }
        @media (max-width: 1050px) {
          .sheet-head {
            display: block;
          }
          .copy-btn {
            margin-top: 14px;
          }
        }
        .eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.6px;
          color: #70899c;
          font-size: 10px;
        }
        .eyebrow-status {
          margin-left: 5px;
          color: #d97706;
          font-weight: 650;
        }
        .sheet h1 {
          margin: 8px 0 0;
          font-size: 26px;
          line-height: 1.25;
          letter-spacing: -0.6px;
          color: var(--deep);
          font-weight: 650;
        }
        .sheet-dev {
          margin: 4px 0 0;
          font-size: 11px;
          color: var(--muted);
        }
        .sheet-dev code {
          background: #f3f6f9;
          color: var(--deep);
        }
        .copy-btn {
          white-space: nowrap;
          font-size: 10px;
          padding: 7px 9px;
          margin-top: 6px;
          background: white;
          border: 1px solid #cbd9e5;
          color: var(--brand);
          border-radius: 5px;
          cursor: pointer;
        }
        .copy-btn:hover {
          background: #eaf4fc;
        }

        .section-tabs {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
          margin: 24px 0 8px;
          border-top: 1px solid #dbe9ec;
          border-bottom: 1px solid #dbe9ec;
          padding: 12px 0;
        }
        .section-tabs button {
          font-size: 11px;
          padding: 7px 10px;
          background: #f8fbfc;
          border: 1px solid #dce9ec;
          border-radius: 4px;
          color: #426570;
          cursor: pointer;
        }
        .section-tabs button:hover {
          background: #e9f4fc;
        }
        .section-tabs button.active {
          background: var(--brand);
          border-color: var(--brand);
          color: #003b46;
          font-weight: 650;
        }

        .field {
          padding: 21px 0 12px;
          min-height: 240px;
        }
        .field h2 {
          font-size: 19px;
          font-weight: 650;
          margin: 0 0 20px;
          color: var(--deep);
        }
        .field p {
          font-size: 13px;
          margin: 0 0 14px;
          line-height: 1.85;
        }
        .field p.muted {
          color: var(--muted);
          font-style: italic;
        }
        .field-hint {
          color: var(--muted);
          font-size: 11px !important;
        }

        .action-list {
          display: grid;
          gap: 12px;
        }
        .action-block {
          padding: 17px 19px;
          background: #f5fafb;
          border: 1px solid #dfecef;
          border-left: 3px solid var(--brand);
          border-radius: 5px;
          font-size: 13px;
        }
        .action-name {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 10px;
        }
        .action-name strong {
          font-weight: 650;
          color: #164b57;
        }
        .action-name code {
          font-family: ui-monospace, monospace;
          font-size: 11px;
          color: var(--muted);
          background: white;
          padding: 2px 6px;
          border-radius: 3px;
          border: 1px solid #e5edf0;
        }
        .action-block p {
          margin: 7px 0 0;
          color: #456572;
        }

        .criteria {
          padding-left: 25px;
          list-style: decimal;
        }
        .criteria li {
          background: #fbfcfd;
          padding: 14px 15px;
          margin-bottom: 9px;
          border: 1px solid #e5edf0;
          border-radius: 6px;
          font-size: 13px;
          line-height: 1.85;
        }
        .criteria li::marker {
          font-size: 11px;
          color: var(--brand);
          font-weight: 650;
        }
        .criteria :global(strong) {
          font-weight: 650;
          color: #164b57;
        }

        .scenarios {
          display: grid;
          gap: 18px;
        }

        .empty {
          padding: 25px 7px;
          font-size: 12px;
          color: var(--muted);
        }
        .empty strong {
          display: block;
          color: var(--ink);
          margin-bottom: 4px;
        }

        .docs-foot {
          margin-top: 28px;
          padding: 18px 20px;
          border-top: 1px solid var(--line);
          color: var(--muted);
          font-size: 11px;
        }
        .docs-foot strong {
          color: var(--deep);
        }
        .base-note {
          margin: 6px 0 0;
          font-size: 11px;
          color: #70899c;
        }
      `}</style>
    </div>
  );
}

// -----------------------------------------------------------------------------
// AuditView — vista de hallazgos + plan por olas
// -----------------------------------------------------------------------------

function AuditView({
  resumen,
  hallazgos,
  planOlas,
  onJumpToSubagent,
}: {
  resumen: string;
  hallazgos: PaquetexpressAuditFinding[];
  planOlas: PaquetexpressGapWave[];
  onJumpToSubagent: (id: string) => void;
}) {
  const criticos = hallazgos.filter((h) => h.severidad === "Crítico");
  const altos = hallazgos.filter((h) => h.severidad === "Alto");
  const medios = hallazgos.filter((h) => h.severidad === "Medio");
  const obs = hallazgos.filter((h) => h.severidad === "Observación");

  return (
    <section className="audit-view">
      <div className="audit-summary">
        <h2>Resumen ejecutivo</h2>
        <p>{resumen}</p>
      </div>

      <div className="audit-counts">
        <div className="count-card critico">
          <strong>{criticos.length}</strong>
          <span>Críticos</span>
        </div>
        <div className="count-card alto">
          <strong>{altos.length}</strong>
          <span>Altos</span>
        </div>
        <div className="count-card medio">
          <strong>{medios.length}</strong>
          <span>Medios</span>
        </div>
        <div className="count-card obs">
          <strong>{obs.length}</strong>
          <span>Observaciones</span>
        </div>
      </div>

      <h2 className="audit-h2">Hallazgos</h2>
      <div className="findings">
        {hallazgos.map((h) => (
          <article key={h.id} className={`finding sev-${h.severidad.toLowerCase().replace("ó", "o")}`}>
            <header>
              <span className="finding-id">{h.id}</span>
              <span className={`finding-sev sev-badge-${h.severidad.toLowerCase().replace("ó", "o")}`}>
                {h.severidad}
              </span>
              <h3>{h.titulo}</h3>
            </header>
            <dl>
              <dt>Evidencia</dt>
              <dd>{h.evidencia}</dd>
              <dt>Impacto</dt>
              <dd>{h.impacto}</dd>
              <dt>Fix propuesto</dt>
              <dd>{h.fix}</dd>
            </dl>
          </article>
        ))}
      </div>

      <h2 className="audit-h2">Plan por olas</h2>
      <div className="waves">
        {planOlas.map((w, i) => (
          <article key={i} className="wave">
            <header>
              <h3>{w.nombre}</h3>
              <p>{w.objetivo}</p>
            </header>
            <ul>
              {w.items.map((item, j) => (
                <li key={j}>
                  <strong>{item.titulo}</strong>
                  <p>{item.detalle}</p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="audit-cta">
        <p>
          Para ver el detalle de un subagente mencionado en el audit, abre la pestaña
          <button type="button" className="link-btn" onClick={() => onJumpToSubagent("rad_management")}>
            Subagentes → RAD Management
          </button>
          .
        </p>
      </div>

      <style jsx>{`
        .audit-view {
          display: flex;
          flex-direction: column;
          gap: 22px;
          margin-bottom: 28px;
          color: #23394d;
        }
        .audit-summary {
          background: #ffffff;
          border: 1px solid #dce5ed;
          border-left: 4px solid #075464;
          border-radius: 8px;
          padding: 20px 24px;
        }
        .audit-summary h2 {
          margin: 0 0 8px;
          font-size: 15px;
          color: #075464;
          font-weight: 650;
          text-transform: uppercase;
          letter-spacing: 0.6px;
        }
        .audit-summary p {
          margin: 0;
          font-size: 13.5px;
          line-height: 1.75;
          color: #334455;
        }
        .audit-counts {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }
        @media (max-width: 700px) {
          .audit-counts {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        .count-card {
          background: #ffffff;
          border: 1px solid #dce5ed;
          border-radius: 7px;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .count-card strong {
          font-size: 28px;
          font-weight: 650;
          line-height: 1;
        }
        .count-card span {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #667b8e;
          font-weight: 650;
        }
        .count-card.critico {
          border-left: 4px solid #dc2626;
        }
        .count-card.critico strong {
          color: #dc2626;
        }
        .count-card.alto {
          border-left: 4px solid #ea580c;
        }
        .count-card.alto strong {
          color: #ea580c;
        }
        .count-card.medio {
          border-left: 4px solid #ca8a04;
        }
        .count-card.medio strong {
          color: #ca8a04;
        }
        .count-card.obs {
          border-left: 4px solid #0891b2;
        }
        .count-card.obs strong {
          color: #0891b2;
        }
        .audit-h2 {
          margin: 12px 0 4px;
          font-size: 20px;
          font-weight: 650;
          color: #075464;
        }
        .findings {
          display: grid;
          gap: 12px;
        }
        .finding {
          background: white;
          border: 1px solid #dce5ed;
          border-radius: 7px;
          padding: 18px 22px;
          border-left-width: 4px;
          border-left-style: solid;
        }
        .finding.sev-critico {
          border-left-color: #dc2626;
        }
        .finding.sev-alto {
          border-left-color: #ea580c;
        }
        .finding.sev-medio {
          border-left-color: #ca8a04;
        }
        .finding.sev-observacion {
          border-left-color: #0891b2;
        }
        .finding header {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 10px;
        }
        .finding-id {
          font-family: ui-monospace, monospace;
          font-size: 11px;
          background: #f3f6f9;
          color: #075464;
          padding: 2px 8px;
          border-radius: 3px;
          border: 1px solid #e5edf0;
          font-weight: 650;
        }
        .finding-sev {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          padding: 3px 9px;
          border-radius: 999px;
          color: white;
          font-weight: 650;
        }
        .sev-badge-critico {
          background: #dc2626;
        }
        .sev-badge-alto {
          background: #ea580c;
        }
        .sev-badge-medio {
          background: #ca8a04;
        }
        .sev-badge-observacion {
          background: #0891b2;
        }
        .finding h3 {
          margin: 0;
          font-size: 15px;
          font-weight: 650;
          color: #075464;
          flex: 1;
          min-width: 240px;
        }
        .finding dl {
          margin: 0;
          display: grid;
          grid-template-columns: 115px minmax(0, 1fr);
          gap: 7px 14px;
        }
        .finding dt {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #667b8e;
          font-weight: 650;
          padding-top: 2px;
        }
        .finding dd {
          margin: 0;
          font-size: 13px;
          line-height: 1.7;
          color: #334455;
        }
        .waves {
          display: grid;
          gap: 14px;
        }
        .wave {
          background: #f8fbfc;
          border: 1px solid #dce9ec;
          border-left: 4px solid #0891b2;
          border-radius: 7px;
          padding: 18px 22px;
        }
        .wave header h3 {
          margin: 0;
          font-size: 15px;
          font-weight: 650;
          color: #075464;
        }
        .wave header p {
          margin: 5px 0 14px;
          font-size: 12px;
          color: #667b8e;
          line-height: 1.65;
        }
        .wave ul {
          margin: 0;
          padding-left: 0;
          list-style: none;
          display: grid;
          gap: 10px;
        }
        .wave li {
          background: white;
          border: 1px solid #e5edf0;
          border-radius: 5px;
          padding: 10px 14px;
        }
        .wave li strong {
          font-size: 13px;
          color: #164b57;
          font-weight: 650;
        }
        .wave li p {
          margin: 5px 0 0;
          font-size: 12px;
          line-height: 1.7;
          color: #456572;
        }
        .audit-cta {
          background: #ecfeff;
          border: 1px solid #a5f3fc;
          border-radius: 7px;
          padding: 14px 18px;
          font-size: 13px;
          color: #164b57;
        }
        .audit-cta p {
          margin: 0;
        }
        .link-btn {
          background: transparent;
          border: 0;
          color: #0891b2;
          font-weight: 650;
          padding: 0 4px;
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
}

const EMPHASIS_PATTERNS = /(Dado que|cuando |entonces |Nunca |Solo |Siempre )/g;
function emphasize(s: string): string {
  const escaped = s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
  return escaped.replace(EMPHASIS_PATTERNS, "<strong>$1</strong>");
}

// -----------------------------------------------------------------------------
// Escenario — tarjeta expandible
// -----------------------------------------------------------------------------

function ScenarioCard({ escenario }: { escenario: PaquetexpressTestScenario }) {
  const [open, setOpen] = useState(true);
  const flujoClass = escenario.flujo
    .toLowerCase()
    .replace(/\s|\(|\)/g, "-")
    .replace(/-+/g, "-");

  return (
    <article className={`scenario scenario-${flujoClass}`}>
      <header
        className="scenario-head"
        role="button"
        tabIndex={0}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((v) => !v);
          }
        }}
      >
        <div className="scenario-head-left">
          <span className={`scenario-flujo flujo-${flujoClass}`}>{escenario.flujo}</span>
          <span className="scenario-id">{escenario.id}</span>
          <h3>{escenario.titulo}</h3>
        </div>
        <span className="scenario-toggle" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </header>
      {open && (
        <div className="scenario-body">
          <p className="scenario-desc">{escenario.descripcion}</p>

          <h4>Precondiciones</h4>
          <ul className="scenario-list">
            {escenario.precondiciones.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>

          <h4>Datos de prueba</h4>
          <table className="scenario-data">
            <tbody>
              {escenario.datosDePrueba.map((d, i) => (
                <tr key={i}>
                  <th>{d.campo}</th>
                  <td>{d.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4>Conversación de ejemplo</h4>
          <div className="scenario-convo">
            {escenario.conversacion.map((t, i) => (
              <div key={i} className={`turn turn-${t.speaker.toLowerCase()}`}>
                <span className="turn-speaker">{t.speaker}</span>
                <div className="turn-content">
                  <p className="turn-text">{t.text}</p>
                  {t.nota && <p className="turn-nota">{t.nota}</p>}
                </div>
              </div>
            ))}
          </div>

          <h4>Resultado esperado</h4>
          <p className="scenario-result">{escenario.resultadoEsperado}</p>
        </div>
      )}

      <style jsx>{`
        .scenario {
          border: 1px solid #dce9ec;
          border-radius: 7px;
          background: white;
          overflow: hidden;
        }
        .scenario-flujo-normal {
          border-left: 4px solid #15803d;
        }
        .scenario-flujo-prepago-rpp- {
          border-left: 4px solid #0891b2;
        }
        .scenario-flujo-prepago-rpp,
        .scenario-flujo-prepago- {
          border-left: 4px solid #0891b2;
        }
        .scenario-flujo-ww {
          border-left: 4px solid #a855f7;
        }
        .scenario-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 18px;
          background: #f8fbfc;
          cursor: pointer;
          gap: 12px;
        }
        .scenario-head:hover {
          background: #eaf4fc;
        }
        .scenario-head-left {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          flex: 1;
        }
        .scenario-head-left h3 {
          margin: 0;
          font-size: 14px;
          font-weight: 650;
          color: var(--deep);
          flex: 1;
          min-width: 220px;
        }
        .scenario-flujo {
          display: inline-flex;
          font-size: 10px;
          letter-spacing: 0.4px;
          padding: 3px 8px;
          border-radius: 999px;
          font-weight: 650;
          text-transform: uppercase;
          color: white;
        }
        .flujo-normal {
          background: #15803d;
        }
        .flujo-prepago-rpp-,
        .flujo-prepago-rpp,
        .flujo-prepago- {
          background: #0891b2;
        }
        .flujo-ww {
          background: #a855f7;
        }
        .flujo-general {
          background: #4b5563;
        }
        .scenario-id {
          font-family: ui-monospace, monospace;
          font-size: 10px;
          color: var(--muted);
          background: white;
          padding: 2px 7px;
          border-radius: 3px;
          border: 1px solid #e5edf0;
        }
        .scenario-toggle {
          font-size: 20px;
          color: var(--muted);
          font-weight: 400;
        }
        .scenario-body {
          padding: 18px 22px 22px;
          border-top: 1px solid #e5edf0;
        }
        .scenario-body h4 {
          margin: 20px 0 10px;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          color: #456775;
          font-weight: 650;
        }
        .scenario-body h4:first-child {
          margin-top: 0;
        }
        .scenario-desc {
          margin: 0 0 10px;
          font-size: 13px;
          line-height: 1.7;
          color: #334455;
        }
        .scenario-list {
          padding-left: 20px;
          margin: 0;
        }
        .scenario-list li {
          font-size: 12.5px;
          line-height: 1.7;
          margin-bottom: 4px;
        }
        .scenario-data {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
          margin-top: 4px;
          border: 1px solid #e5edf0;
          border-radius: 5px;
          overflow: hidden;
        }
        .scenario-data th,
        .scenario-data td {
          border-top: 1px solid #e5edf0;
          padding: 8px 12px;
          text-align: left;
          vertical-align: top;
        }
        .scenario-data tr:first-child th,
        .scenario-data tr:first-child td {
          border-top: 0;
        }
        .scenario-data th {
          background: #f8fbfc;
          font-weight: 650;
          color: var(--deep);
          width: 32%;
          font-size: 11.5px;
        }
        .scenario-data td {
          font-size: 12px;
          color: #334455;
          font-family: ui-monospace, monospace;
        }
        .scenario-convo {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .turn {
          display: grid;
          grid-template-columns: 90px minmax(0, 1fr);
          gap: 10px;
          align-items: start;
          padding: 7px 10px;
          border-radius: 5px;
        }
        .turn-agente {
          background: #ecfeff;
        }
        .turn-cliente {
          background: #fef9c3;
        }
        .turn-sistema {
          background: #f3f4f6;
        }
        .turn-speaker {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          font-weight: 650;
          padding-top: 2px;
          color: #334455;
        }
        .turn-content {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .turn-text {
          margin: 0;
          font-size: 13px;
          line-height: 1.65;
          color: #1f2937;
        }
        .turn-nota {
          margin: 0;
          font-size: 10.5px;
          color: #6b7280;
          font-style: italic;
        }
        .scenario-result {
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          border-left: 4px solid #15803d;
          padding: 12px 15px;
          border-radius: 5px;
          font-size: 12.5px;
          line-height: 1.7;
          color: #065f46;
          margin: 0;
        }
      `}</style>
    </article>
  );
}

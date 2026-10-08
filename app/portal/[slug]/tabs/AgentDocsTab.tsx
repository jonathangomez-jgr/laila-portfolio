"use client";

import { useMemo, useState } from "react";
import {
  CATEGORIES,
  betterwareAgentDocs,
  type AgentCategory,
  type AgentSubagentDoc,
} from "@/data/betterwareAgentDocumentation";

type SectionId = "descripcion" | "activacion" | "respuestas" | "acciones" | "criterios" | "todo";

const SECTIONS: Array<{ id: SectionId; label: string }> = [
  { id: "descripcion", label: "Descripción" },
  { id: "activacion", label: "Activación" },
  { id: "respuestas", label: "Respuestas" },
  { id: "acciones", label: "Acciones" },
  { id: "criterios", label: "Criterios de aceptación" },
  { id: "todo", label: "Ver todo" },
];

const norm = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function AgentDocsTab() {
  const doc = betterwareAgentDocs;
  const [selectedId, setSelectedId] = useState<string>(doc.subagents[0].id);
  const [activeSection, setActiveSection] = useState<SectionId>("descripcion");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<AgentCategory | "">("");

  const countsByCategory = useMemo(() => {
    const counts: Record<AgentCategory, number> = {
      "Atención y seguridad": 0,
      "Servicio y trámites": 0,
      "Puntos y programas": 0,
      "Pedidos y logística": 0,
      "Red y datos comerciales": 0,
      "Saldos y pagos": 0,
    };
    for (const s of doc.subagents) counts[s.category]++;
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
    const groups: Array<[AgentCategory, AgentSubagentDoc[]]> = [];
    for (const cat of CATEGORIES) {
      const items = filtered.filter((a) => a.category === cat);
      if (items.length > 0) groups.push([cat, items]);
    }
    return groups;
  }, [filtered]);

  const selected = doc.subagents.find((s) => s.id === selectedId) ?? doc.subagents[0];

  return (
    <div className="agent-docs">
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
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(category === cat ? "" : cat)}
            className={`dash-cat ${category === cat ? "is-selected" : ""}`}
          >
            <strong>{countsByCategory[cat]}</strong>
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
            onChange={(e) => setCategory(e.target.value as AgentCategory | "")}
          >
            <option value="">Todas las categorías</option>
            {CATEGORIES.map((c) => (
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
              </div>
              <h1>{selected.name}</h1>
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
            {SECTIONS.map((s) => (
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
          </div>
        </article>
      </div>

      <footer className="docs-foot">
        <span>
          <strong>Agente:</strong> {doc.name} ({doc.developerName}) · Versión {doc.version} · Revisión{" "}
          {doc.revision}
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
          color: var(--ink);
          font-size: 14px;
          line-height: 1.65;
        }
        .dash-grid {
          display: grid;
          grid-template-columns: 1.05fr repeat(6, minmax(0, 1fr));
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
          grid-template-columns: 300px minmax(0, 1fr);
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
          align-items: flex-start;
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
        .sheet h1 {
          margin: 8px 0 0;
          font-size: 26px;
          line-height: 1.25;
          letter-spacing: -0.6px;
          color: var(--deep);
          font-weight: 650;
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

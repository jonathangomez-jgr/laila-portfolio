"use client";

// Tabla genérica del handover: búsqueda sin acentos, filtros por columna,
// fila expandible con detalle y enlaces automáticos entre Ids (ACT-01, R-07, FLW-005…).
// Recibe los datos por props desde un Server Component: no importa datos.

import { Fragment, useMemo, useState } from "react";

export type HandoverColumn = { key: string; label: string; className?: string; badge?: boolean };
export type HandoverRow = {
  id: string;
  cells: Record<string, string>;
  detail?: Array<[string, string]>;
};

type Props = {
  columns: HandoverColumn[];
  rows: HandoverRow[];
  filterKeys?: string[];
  /** Etiqueta para filtros sobre claves que no son columnas visibles. */
  filterLabels?: Record<string, string>;
  /** Prefijo de Id → sección del tab (para construir enlaces). */
  linkMap: Record<string, string>;
  baseHref: string;
  placeholder?: string;
};

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const ID_RE = /\b((?:ACT|PP|R|OQ|MAN|PRE|DEP|POST|RB|HV18|GO|SEC|FLW|APX|TST|MCK|PT|RET|DC|LBL|RSS|INT|CINT|OBJ|FLD|RT|AUT|WF|VR|EA|TRG|BH|DATA|QUE|QRC|SCH|STD|USR|AR|ARR|ENT|AGT|PS|CHN|OMNI|FEAT|ENV)-\d{1,3})\b/g;

const BADGE: Record<string, string> = {
  Crítica: "bg-rose-100 text-rose-800",
  Alta: "bg-amber-100 text-amber-800",
  Media: "bg-sky-100 text-sky-800",
  Baja: "bg-slate-100 text-slate-700",
  Confirmado: "bg-emerald-100 text-emerald-800",
  Efectivo: "bg-emerald-100 text-emerald-800",
  Pendiente: "bg-amber-100 text-amber-800",
  "No verificado": "bg-slate-200 text-slate-700",
  Deducido: "bg-sky-100 text-sky-800",
  "No ejecutada": "bg-slate-100 text-slate-700",
  Abierto: "bg-rose-100 text-rose-800",
  Cerrado: "bg-emerald-100 text-emerald-800",
  Sí: "bg-rose-100 text-rose-800",
  Completa: "bg-emerald-100 text-emerald-800",
  Parcial: "bg-amber-100 text-amber-800",
};

function Linked({ text, linkMap, baseHref }: { text: string; linkMap: Record<string, string>; baseHref: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(ID_RE)) {
    const id = m[1];
    const section = linkMap[id.split("-")[0]];
    if (m.index! > last) parts.push(text.slice(last, m.index));
    parts.push(
      section ? (
        <a key={`${id}-${m.index}`} href={`${baseHref}&s=${section}#${id}`} className="font-mono text-cyan-700 hover:underline">
          {id}
        </a>
      ) : (
        id
      ),
    );
    last = m.index! + id.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

export default function HandoverTable({ columns, rows, filterKeys = [], filterLabels = {}, linkMap, baseHref, placeholder }: Props) {
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [open, setOpen] = useState<string | null>(null);

  const options = useMemo(() => {
    const out: Record<string, string[]> = {};
    for (const k of filterKeys) out[k] = [...new Set(rows.map((r) => r.cells[k]).filter(Boolean))].sort();
    return out;
  }, [rows, filterKeys]);

  const visible = useMemo(() => {
    const nq = norm(q.trim());
    return rows.filter((r) => {
      for (const [k, v] of Object.entries(filters)) if (v && r.cells[k] !== v) return false;
      if (!nq) return true;
      const hay = norm([r.id, ...Object.values(r.cells), ...(r.detail ?? []).flat()].join(" "));
      return nq.split(/\s+/).every((t) => hay.includes(t));
    });
  }, [rows, q, filters]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder ?? "Buscar…"}
          className="min-w-[220px] flex-1 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm focus:border-cyan-500 focus:outline-none"
        />
        {filterKeys.map((k) => (
          <select
            key={k}
            value={filters[k] ?? ""}
            onChange={(e) => setFilters((f) => ({ ...f, [k]: e.target.value }))}
            className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700"
          >
            <option value="">{columns.find((c) => c.key === k)?.label ?? filterLabels[k] ?? k}: todos</option>
            {options[k].map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        ))}
        <span className="text-xs text-slate-500">
          {visible.length} de {rows.length}
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 py-2">Id</th>
              {columns.map((c) => (
                <th key={c.key} className={`px-3 py-2 ${c.className ?? ""}`}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {visible.map((r) => {
              const isOpen = open === r.id;
              return (
                <Fragment key={r.id}>
                  <tr
                    id={r.id}
                    onClick={() => r.detail && setOpen(isOpen ? null : r.id)}
                    className={`align-top ${r.detail ? "cursor-pointer hover:bg-cyan-50/40" : ""} ${isOpen ? "bg-cyan-50/60" : ""}`}
                  >
                    <td className="whitespace-nowrap px-3 py-2 font-mono text-[11px] text-slate-500">
                      {r.detail && <span className="mr-1 text-slate-400">{isOpen ? "▾" : "▸"}</span>}
                      {r.id}
                    </td>
                    {columns.map((c) => {
                      const v = r.cells[c.key] ?? "";
                      return (
                        <td key={c.key} className={`px-3 py-2 text-slate-700 ${c.className ?? ""}`}>
                          {c.badge && v ? (
                            <span className={`inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold ${BADGE[v] ?? "bg-slate-100 text-slate-700"}`}>
                              {v}
                            </span>
                          ) : (
                            <Linked text={v} linkMap={linkMap} baseHref={baseHref} />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                  {isOpen && r.detail && (
                    <tr className="bg-slate-50/70">
                      <td colSpan={columns.length + 1} className="px-4 py-3">
                        <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-[180px_1fr]">
                          {r.detail.map(([k, v], i) => (
                            <Fragment key={`${k}-${i}`}>
                              <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{k}</dt>
                              <dd className="whitespace-pre-wrap break-words text-xs text-slate-700">
                                <Linked text={v} linkMap={linkMap} baseHref={baseHref} />
                              </dd>
                            </Fragment>
                          ))}
                        </dl>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
            {visible.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-3 py-6 text-center text-slate-500">
                  Sin resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

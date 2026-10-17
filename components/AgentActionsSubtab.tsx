"use client";

import { useMemo, useState, useEffect, useRef } from "react";

type ActionDoc = { name: string; target: string; description?: string };
type Subagent = { id: string; name: string; acciones: ActionDoc[] };
type Doc = { subagents: Subagent[] };

type TargetType = "flow" | "apex" | "prompt" | "utils" | "model" | "other";
type Owner = "FDE" | "Partner" | "Built-in";

export type ActionRow = {
  key: string; // name + target
  name: string;
  target: string;
  targetType: TargetType;
  targetName: string;
  owner: Owner;
  description: string | null;
  usedIn: string[]; // subagent names
};

function parseTarget(target: string): {
  type: TargetType;
  name: string;
  owner: Owner;
} {
  const m = target.match(/^(flow|apex|prompt|utils|model):\/\/(.+)$/);
  if (m) {
    const type = m[1] as TargetType;
    const name = m[2];
    const isFde = name.startsWith("FDE_");
    const owner: Owner =
      type === "utils" ? "Built-in" : isFde ? "FDE" : "Partner";
    return { type, name, owner };
  }
  const atMatch = target.match(/^@utils\.(.+)$/);
  if (atMatch) {
    return { type: "utils", name: `@utils.${atMatch[1]}`, owner: "Built-in" };
  }
  return { type: "other", name: target, owner: "Partner" };
}

function buildActionsCatalog(doc: Doc): ActionRow[] {
  const byKey = new Map<string, ActionRow>();
  for (const sub of doc.subagents) {
    for (const a of sub.acciones) {
      const { type, name, owner } = parseTarget(a.target);
      const key = `${a.name}::${a.target}`;
      const existing = byKey.get(key);
      if (existing) {
        if (!existing.usedIn.includes(sub.name)) existing.usedIn.push(sub.name);
        if (!existing.description && a.description) existing.description = a.description;
      } else {
        byKey.set(key, {
          key,
          name: a.name,
          target: a.target,
          targetType: type,
          targetName: name,
          owner,
          description: a.description ?? null,
          usedIn: [sub.name],
        });
      }
    }
  }
  return Array.from(byKey.values()).sort((x, y) =>
    x.name.localeCompare(y.name),
  );
}

function ownerBadge(owner: Owner) {
  const cls =
    owner === "FDE"
      ? "bg-cyan-100 text-cyan-800 border-cyan-200"
      : owner === "Partner"
        ? "bg-amber-100 text-amber-800 border-amber-200"
        : "bg-slate-100 text-slate-700 border-slate-200";
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${cls}`}
    >
      {owner}
    </span>
  );
}

function typeIcon(type: TargetType) {
  const map: Record<TargetType, string> = {
    flow: "🔁",
    apex: "⚙️",
    prompt: "✨",
    utils: "⚡",
    model: "🧠",
    other: "·",
  };
  return map[type];
}

export default function AgentActionsSubtab({
  doc,
  focusedActionName,
  onClearFocus,
}: {
  doc: Doc;
  focusedActionName?: string | null;
  onClearFocus?: () => void;
}) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TargetType | "">("");
  const [ownerFilter, setOwnerFilter] = useState<Owner | "">("");

  const catalog = useMemo(() => buildActionsCatalog(doc), [doc]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return catalog.filter((a) => {
      if (typeFilter && a.targetType !== typeFilter) return false;
      if (ownerFilter && a.owner !== ownerFilter) return false;
      if (
        q &&
        !a.name.toLowerCase().includes(q) &&
        !a.targetName.toLowerCase().includes(q) &&
        !(a.description ?? "").toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [catalog, search, typeFilter, ownerFilter]);

  const totals = useMemo(() => {
    const byOwner: Record<Owner, number> = { FDE: 0, Partner: 0, "Built-in": 0 };
    for (const a of catalog) byOwner[a.owner]++;
    return byOwner;
  }, [catalog]);

  // Scroll + highlight when parent sets focusedActionName
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const [highlightKey, setHighlightKey] = useState<string | null>(null);

  useEffect(() => {
    if (!focusedActionName) return;
    // Find first match by name (if multiple targets, prefer first)
    const match = catalog.find((a) => a.name === focusedActionName);
    if (match) {
      // Clear filters so the row is visible
      setSearch("");
      setTypeFilter("");
      setOwnerFilter("");
      setHighlightKey(match.key);
      // Scroll
      setTimeout(() => {
        const el = refs.current[match.key];
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      // Clear focus state after a bit so re-click re-triggers
      setTimeout(() => {
        onClearFocus?.();
      }, 100);
      // Fade highlight
      setTimeout(() => setHighlightKey(null), 2600);
    }
  }, [focusedActionName, catalog, onClearFocus]);

  return (
    <div className="space-y-4">
      {/* Header + filters */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Catálogo de acciones
            </p>
            <h2 className="mt-0.5 text-lg font-bold text-slate-900">
              {catalog.length} acciones ·{" "}
              <span className="text-cyan-700">{totals["FDE"]} FDE</span> ·{" "}
              <span className="text-amber-700">{totals["Partner"]} Partner</span> ·{" "}
              <span className="text-slate-500">
                {totals["Built-in"]} built-in
              </span>
            </h2>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <input
            type="search"
            placeholder="Buscar nombre, target o descripción…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[220px] rounded-md border border-slate-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:border-cyan-400"
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as TargetType | "")}
            className="rounded-md border border-slate-200 px-2 py-1.5 text-sm bg-white"
          >
            <option value="">Todos los tipos</option>
            <option value="flow">Flow</option>
            <option value="apex">Apex</option>
            <option value="prompt">Prompt</option>
            <option value="utils">Built-in</option>
            <option value="model">Model</option>
          </select>
          <select
            value={ownerFilter}
            onChange={(e) => setOwnerFilter(e.target.value as Owner | "")}
            className="rounded-md border border-slate-200 px-2 py-1.5 text-sm bg-white"
          >
            <option value="">Todos los owners</option>
            <option value="FDE">Solo FDE</option>
            <option value="Partner">Solo Partner</option>
            <option value="Built-in">Solo built-in</option>
          </select>
          {(search || typeFilter || ownerFilter) && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setTypeFilter("");
                setOwnerFilter("");
              }}
              className="text-xs text-slate-500 hover:text-slate-800 px-2"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Actions table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="grid grid-cols-[1fr_1fr] gap-0 border-b border-slate-200 bg-slate-50">
          <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Acción del agente
          </div>
          <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-l border-slate-200">
            Target invocado
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="px-4 py-10 text-center text-sm text-slate-500">
            Sin coincidencias con los filtros.
          </div>
        ) : (
          filtered.map((a) => {
            const isHighlighted = highlightKey === a.key;
            return (
              <div
                key={a.key}
                ref={(el) => {
                  refs.current[a.key] = el;
                }}
                className={
                  "grid grid-cols-[1fr_1fr] border-b border-slate-100 transition-colors " +
                  (isHighlighted ? "bg-cyan-50" : "hover:bg-slate-50")
                }
              >
                <div className="px-4 py-3">
                  <div className="flex items-start gap-2">
                    <code className="text-sm font-mono font-semibold text-slate-900">
                      {a.name}
                    </code>
                    {ownerBadge("FDE")}
                  </div>
                  {a.description && (
                    <p className="mt-1 text-xs text-slate-600 leading-snug">
                      {a.description}
                    </p>
                  )}
                  {a.usedIn.length > 0 && (
                    <p className="mt-1.5 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                      Usada en:{" "}
                      <span className="font-normal normal-case tracking-normal text-slate-500">
                        {a.usedIn.join(" · ")}
                      </span>
                    </p>
                  )}
                </div>
                <div className="px-4 py-3 border-l border-slate-100">
                  <div className="flex items-start gap-2">
                    <span className="text-sm" aria-hidden>
                      {typeIcon(a.targetType)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {a.targetType}
                        </span>
                        {ownerBadge(a.owner)}
                      </div>
                      <code className="mt-0.5 block text-xs font-mono text-slate-800 break-all">
                        {a.targetName}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

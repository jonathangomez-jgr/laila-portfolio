"use client";

import { useEffect, useMemo, useOptimistic, useState, useTransition } from "react";
import type { FDEItem } from "@/lib/salesforce/fdeTracker";
import FDEItemCreator from "@/components/FDEItemCreator";
import FDEItemStatusEditor from "@/components/FDEItemStatusEditor";
import type {
  CreateItemResult,
  UpdateStatusResult,
} from "@/app/[lang]/customer-projects/[slug]/tracker/actions";

type BoundCreateItemAction = (
  prev: CreateItemResult | null,
  formData: FormData,
) => Promise<CreateItemResult>;

type BoundUpdateStatusAction = (
  prev: UpdateStatusResult | null,
  formData: FormData,
) => Promise<UpdateStatusResult>;

type ItemStatus = NonNullable<FDEItem["JGR_FDE_Status__c"]>;

type SortKey =
  | "status"
  | "priority"
  | "targetDate"
  | "lastUpdate"
  | "code"
  | "title";

const SORT_OPTIONS: Array<{ key: SortKey; label: string }> = [
  { key: "status", label: "Estado (agrupado)" },
  { key: "priority", label: "Prioridad (Alta → Baja)" },
  { key: "targetDate", label: "Fecha objetivo (más próxima)" },
  { key: "lastUpdate", label: "Última actualización" },
  { key: "code", label: "Código (ITEM-00…)" },
  { key: "title", label: "Título (A-Z)" },
];

const PRIORITY_ORDER: Record<string, number> = {
  Alta: 0,
  Media: 1,
  Baja: 2,
};

function sortItems(items: FDEItem[], key: SortKey): FDEItem[] {
  const copy = [...items];
  const nullsLast = (a: string | null, b: string | null): number => {
    if (a === b) return 0;
    if (!a) return 1;
    if (!b) return -1;
    return a < b ? -1 : 1;
  };
  switch (key) {
    case "priority":
      return copy.sort((a, b) => {
        const pa = PRIORITY_ORDER[a.JGR_FDE_Priority__c ?? ""] ?? 99;
        const pb = PRIORITY_ORDER[b.JGR_FDE_Priority__c ?? ""] ?? 99;
        if (pa !== pb) return pa - pb;
        return (a.JGR_FDE_Item_Code__c ?? "").localeCompare(
          b.JGR_FDE_Item_Code__c ?? "",
        );
      });
    case "targetDate":
      return copy.sort((a, b) =>
        nullsLast(a.JGR_FDE_Target_Date__c, b.JGR_FDE_Target_Date__c),
      );
    case "lastUpdate":
      return copy.sort((a, b) => {
        const da = a.JGR_FDE_Last_Update_Date__c ?? a.LastModifiedDate;
        const db = b.JGR_FDE_Last_Update_Date__c ?? b.LastModifiedDate;
        if (da === db) return 0;
        return da < db ? 1 : -1; // más reciente primero
      });
    case "code":
      return copy.sort((a, b) =>
        (a.JGR_FDE_Item_Code__c ?? a.Name).localeCompare(
          b.JGR_FDE_Item_Code__c ?? b.Name,
        ),
      );
    case "title":
      return copy.sort((a, b) =>
        a.JGR_FDE_Title__c.localeCompare(b.JGR_FDE_Title__c, "es", {
          sensitivity: "base",
        }),
      );
    case "status":
    default:
      return copy;
  }
}

const ACTIVE_STATUSES: ItemStatus[] = [
  "Backlog",
  "En Revisión",
  "En Progreso",
  "Bloqueado",
];
const CLOSED_STATUSES: ItemStatus[] = ["Cerrado", "Descartado"];

const STATUS_HEADER_STYLES: Record<ItemStatus, string> = {
  "En Progreso": "bg-emerald-50 text-emerald-700 border-emerald-200",
  Bloqueado: "bg-rose-50 text-rose-700 border-rose-200",
  "En Revisión": "bg-amber-50 text-amber-800 border-amber-200",
  Backlog: "bg-amber-100 text-amber-900 border-amber-300",
  Cerrado: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Descartado: "bg-neutral-50 text-neutral-500 border-neutral-200",
};

const STATUS_CARD_ACCENT: Record<ItemStatus, string> = {
  "En Progreso": "border-l-emerald-400",
  Bloqueado: "border-l-rose-400",
  "En Revisión": "border-l-amber-400",
  Backlog: "border-l-amber-500 bg-amber-50/50",
  Cerrado: "border-l-indigo-300",
  Descartado: "border-l-neutral-300 opacity-80",
};

const STATUS_COLUMN_BG: Record<ItemStatus, string> = {
  "En Progreso": "bg-emerald-50/40",
  Bloqueado: "bg-rose-50/40",
  "En Revisión": "bg-amber-50/40",
  Backlog: "bg-amber-100/50",
  Cerrado: "bg-indigo-50/40",
  Descartado: "bg-neutral-50/40",
};

const PRIORITY_STYLES: Record<string, string> = {
  Alta: "bg-rose-100 text-rose-800",
  Media: "bg-amber-100 text-amber-800",
  Baja: "bg-slate-100 text-slate-700",
};

const TYPE_STYLES: Record<string, string> = {
  Mejora: "bg-indigo-100 text-indigo-800",
  Bug: "bg-rose-100 text-rose-800",
  Riesgo: "bg-orange-100 text-orange-800",
  Decisión: "bg-violet-100 text-violet-800",
  Tarea: "bg-sky-100 text-sky-800",
};

function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function Chip({ label, className }: { label: string; className: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${className}`}
    >
      {label}
    </span>
  );
}

function Section({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  if (!value?.trim()) return null;
  return (
    <div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p className="whitespace-pre-line text-sm leading-6 text-gray-700">
        {value}
      </p>
    </div>
  );
}

/**
 * Modal con el detalle completo del item · se abre desde el Kanban al dar
 * clic en una card. Mantiene el status editor funcional (sync a Salesforce)
 * y los mismos campos que la vista Lista.
 */
function ItemDetailModal({
  item,
  onClose,
  boundUpdateStatusAction,
}: {
  item: FDEItem;
  onClose: () => void;
  boundUpdateStatusAction: BoundUpdateStatusAction;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const code = item.JGR_FDE_Item_Code__c ?? item.Name;
  const status = (item.JGR_FDE_Status__c ?? "Backlog") as ItemStatus;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`item-${item.Id}-title`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl sm:rounded-2xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div className="min-w-0">
            <p className="mb-1 text-xs font-mono uppercase tracking-wider text-indigo-600">
              {code}
            </p>
            <h2
              id={`item-${item.Id}-title`}
              className="text-lg font-semibold leading-snug text-gray-950"
            >
              {item.JGR_FDE_Title__c}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="shrink-0 rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>
        </header>

        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
          <div className="flex flex-wrap gap-2">
            {item.JGR_FDE_Priority__c && (
              <Chip
                label={item.JGR_FDE_Priority__c}
                className={
                  PRIORITY_STYLES[item.JGR_FDE_Priority__c] ??
                  "bg-gray-100 text-gray-700"
                }
              />
            )}
            {item.JGR_FDE_Type__c && (
              <Chip
                label={item.JGR_FDE_Type__c}
                className={
                  TYPE_STYLES[item.JGR_FDE_Type__c] ??
                  "bg-gray-100 text-gray-700"
                }
              />
            )}
            {item.JGR_FDE_Owner_Party__c && (
              <Chip
                label={item.JGR_FDE_Owner_Party__c}
                className="bg-gray-100 text-gray-700"
              />
            )}
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Estado
            </p>
            <FDEItemStatusEditor
              itemId={item.Id}
              currentStatus={status}
              boundAction={boundUpdateStatusAction}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Section
              label="Comportamiento actual"
              value={item.JGR_FDE_Description__c}
            />
            <Section label="Riesgo potencial" value={item.JGR_FDE_Risk__c} />
            <Section
              label="Recomendación"
              value={item.JGR_FDE_Recommendation__c}
            />
            <Section
              label="Acciones a realizar"
              value={item.JGR_FDE_Actions__c}
            />
          </div>

          {item.JGR_FDE_Last_Update_Note__c && (
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Último avance
                {item.JGR_FDE_Last_Update_Date__c && (
                  <span className="ml-2 font-normal normal-case text-gray-400">
                    · {formatDate(item.JGR_FDE_Last_Update_Date__c)}
                  </span>
                )}
              </p>
              <p className="whitespace-pre-line text-sm leading-6 text-gray-700">
                {item.JGR_FDE_Last_Update_Note__c}
              </p>
            </div>
          )}

          {(item.JGR_FDE_Dependency__c || item.JGR_FDE_Target_Date__c) && (
            <div className="flex flex-wrap gap-x-6 gap-y-1 border-t border-slate-100 pt-4 text-xs text-gray-500">
              {item.JGR_FDE_Dependency__c && (
                <span>
                  <span className="font-semibold">Dependencia:</span>{" "}
                  {item.JGR_FDE_Dependency__c}
                </span>
              )}
              {item.JGR_FDE_Target_Date__c && (
                <span>
                  <span className="font-semibold">Fecha objetivo:</span>{" "}
                  {formatDate(item.JGR_FDE_Target_Date__c)}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Card completa (usada en vista Lista). Mantiene paridad con el ItemCard
 * original de FDETracker pero agrega acento visual por estado para destacar
 * los items "Backlog" que necesitan atención.
 */
function ListItemCard({
  item,
  boundUpdateStatusAction,
}: {
  item: FDEItem;
  boundUpdateStatusAction: BoundUpdateStatusAction;
}) {
  const code = item.JGR_FDE_Item_Code__c ?? item.Name;
  const status = (item.JGR_FDE_Status__c ?? "Backlog") as ItemStatus;
  const accent = STATUS_CARD_ACCENT[status];
  return (
    <article
      className={`soft-card overflow-hidden border-l-4 p-6 ${accent}`}
    >
      <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mb-1 text-xs font-mono uppercase tracking-wider text-indigo-600">
            {code}
          </p>
          <h3 className="text-lg font-semibold text-gray-950">
            {item.JGR_FDE_Title__c}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {item.JGR_FDE_Priority__c && (
            <Chip
              label={item.JGR_FDE_Priority__c}
              className={
                PRIORITY_STYLES[item.JGR_FDE_Priority__c] ??
                "bg-gray-100 text-gray-700"
              }
            />
          )}
          {item.JGR_FDE_Type__c && (
            <Chip
              label={item.JGR_FDE_Type__c}
              className={
                TYPE_STYLES[item.JGR_FDE_Type__c] ?? "bg-gray-100 text-gray-700"
              }
            />
          )}
          {item.JGR_FDE_Owner_Party__c && (
            <Chip
              label={item.JGR_FDE_Owner_Party__c}
              className="bg-gray-100 text-gray-700"
            />
          )}
        </div>
      </header>

      <div className="mb-4">
        <FDEItemStatusEditor
          itemId={item.Id}
          currentStatus={status}
          boundAction={boundUpdateStatusAction}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Section
          label="Comportamiento actual"
          value={item.JGR_FDE_Description__c}
        />
        <Section label="Riesgo potencial" value={item.JGR_FDE_Risk__c} />
        <Section label="Recomendación" value={item.JGR_FDE_Recommendation__c} />
        <Section label="Acciones a realizar" value={item.JGR_FDE_Actions__c} />
      </div>

      {(item.JGR_FDE_Last_Update_Note__c ||
        item.JGR_FDE_Dependency__c ||
        item.JGR_FDE_Target_Date__c) && (
        <div className="mt-4 border-t border-gray-100 pt-4">
          {item.JGR_FDE_Last_Update_Note__c && (
            <div className="mb-2">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Último avance
                {item.JGR_FDE_Last_Update_Date__c && (
                  <span className="ml-2 font-normal normal-case text-gray-400">
                    · {formatDate(item.JGR_FDE_Last_Update_Date__c)}
                  </span>
                )}
              </p>
              <p className="whitespace-pre-line text-sm leading-6 text-gray-700">
                {item.JGR_FDE_Last_Update_Note__c}
              </p>
            </div>
          )}
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-500">
            {item.JGR_FDE_Dependency__c && (
              <span>
                <span className="font-semibold">Dependencia:</span>{" "}
                {item.JGR_FDE_Dependency__c}
              </span>
            )}
            {item.JGR_FDE_Target_Date__c && (
              <span>
                <span className="font-semibold">Fecha objetivo:</span>{" "}
                {formatDate(item.JGR_FDE_Target_Date__c)}
              </span>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

/** Card compacta (usada en vista Kanban). Es draggable y clickeable. */
function KanbanCard({
  item,
  onDragStart,
  onOpen,
  dragging,
}: {
  item: FDEItem;
  onDragStart: (itemId: string) => void;
  onOpen: (itemId: string) => void;
  dragging: boolean;
}) {
  const code = item.JGR_FDE_Item_Code__c ?? item.Name;
  const status = (item.JGR_FDE_Status__c ?? "Backlog") as ItemStatus;
  const accent = STATUS_CARD_ACCENT[status];
  return (
    <article
      draggable
      role="button"
      tabIndex={0}
      aria-label={`Ver detalle de ${code}`}
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", item.Id);
        onDragStart(item.Id);
      }}
      onClick={() => onOpen(item.Id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(item.Id);
        }
      }}
      className={`cursor-pointer rounded-lg border border-slate-200 border-l-4 bg-white p-3 shadow-sm transition hover:border-indigo-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-300 active:cursor-grabbing ${accent} ${
        dragging ? "opacity-40" : ""
      }`}
    >
      <p className="mb-1 text-[10px] font-mono uppercase tracking-wider text-indigo-600">
        {code}
      </p>
      <h4 className="mb-2 text-sm font-semibold leading-snug text-gray-950">
        {item.JGR_FDE_Title__c}
      </h4>
      <div className="flex flex-wrap gap-1">
        {item.JGR_FDE_Priority__c && (
          <Chip
            label={item.JGR_FDE_Priority__c}
            className={
              PRIORITY_STYLES[item.JGR_FDE_Priority__c] ??
              "bg-gray-100 text-gray-700"
            }
          />
        )}
        {item.JGR_FDE_Type__c && (
          <Chip
            label={item.JGR_FDE_Type__c}
            className={
              TYPE_STYLES[item.JGR_FDE_Type__c] ?? "bg-gray-100 text-gray-700"
            }
          />
        )}
        {item.JGR_FDE_Owner_Party__c && (
          <Chip
            label={item.JGR_FDE_Owner_Party__c}
            className="bg-gray-100 text-gray-700"
          />
        )}
      </div>
      {item.JGR_FDE_Target_Date__c && (
        <p className="mt-2 text-[11px] text-gray-500">
          🎯 {formatDate(item.JGR_FDE_Target_Date__c)}
        </p>
      )}
    </article>
  );
}

function StatusHeader({
  status,
  count,
}: {
  status: ItemStatus;
  count: number;
}) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span
        className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${STATUS_HEADER_STYLES[status]}`}
      >
        {status}
      </span>
      <span className="text-xs text-gray-400">
        {count} {count === 1 ? "item" : "items"}
      </span>
    </div>
  );
}

function GroupedList({
  statuses,
  byStatus,
  boundUpdateStatusAction,
}: {
  statuses: ItemStatus[];
  byStatus: Map<ItemStatus, FDEItem[]>;
  boundUpdateStatusAction: BoundUpdateStatusAction;
}) {
  const nonEmpty = statuses.filter((s) => (byStatus.get(s)?.length ?? 0) > 0);
  if (nonEmpty.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-gray-200 p-8 text-center text-sm text-gray-500">
        No hay items en esta vista.
      </p>
    );
  }
  return (
    <div className="space-y-8">
      {nonEmpty.map((status) => {
        const items = byStatus.get(status) ?? [];
        return (
          <div key={status}>
            <StatusHeader status={status} count={items.length} />
            <div className="space-y-4">
              {items.map((item) => (
                <ListItemCard
                  key={item.Id}
                  item={item}
                  boundUpdateStatusAction={boundUpdateStatusAction}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FlatList({
  items,
  boundUpdateStatusAction,
}: {
  items: FDEItem[];
  boundUpdateStatusAction: BoundUpdateStatusAction;
}) {
  if (items.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-gray-200 p-8 text-center text-sm text-gray-500">
        No hay items en esta vista.
      </p>
    );
  }
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <ListItemCard
          key={item.Id}
          item={item}
          boundUpdateStatusAction={boundUpdateStatusAction}
        />
      ))}
    </div>
  );
}

type OptimisticMove = { itemId: string; status: ItemStatus };

function KanbanBoard({
  items,
  statuses,
  boundUpdateStatusAction,
}: {
  items: FDEItem[];
  statuses: ItemStatus[];
  boundUpdateStatusAction: BoundUpdateStatusAction;
}) {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverStatus, setDragOverStatus] = useState<ItemStatus | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [optimisticItems, applyOptimistic] = useOptimistic<
    FDEItem[],
    OptimisticMove
  >(items, (state, move) =>
    state.map((it) =>
      it.Id === move.itemId
        ? { ...it, JGR_FDE_Status__c: move.status }
        : it,
    ),
  );

  const grouped = useMemo(() => {
    const map = new Map<ItemStatus, FDEItem[]>();
    for (const s of statuses) map.set(s, []);
    for (const item of optimisticItems) {
      const s = (item.JGR_FDE_Status__c ?? "Backlog") as ItemStatus;
      if (!map.has(s)) continue;
      map.get(s)!.push(item);
    }
    return map;
  }, [optimisticItems, statuses]);

  const handleDrop = (status: ItemStatus, itemId: string) => {
    setDragOverStatus(null);
    setDraggingId(null);
    const current = items.find((i) => i.Id === itemId);
    if (!current) return;
    if (current.JGR_FDE_Status__c === status) return;

    const fd = new FormData();
    fd.append("itemId", itemId);
    fd.append("status", status);

    startTransition(async () => {
      applyOptimistic({ itemId, status });
      const result = await boundUpdateStatusAction(null, fd);
      if (!result.ok) {
        setError(result.error ?? "No se pudo actualizar el estado.");
      } else {
        setError(null);
      }
    });
  };

  return (
    <div>
      {error && (
        <div className="mb-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-800">
          ✗ {error}
        </div>
      )}
      <div className="hidden text-[11px] text-gray-500 md:block">
        Tip · haz clic en una card para ver el detalle completo · arrastra los
        items entre columnas para cambiar su estado (el cambio se guarda en
        Salesforce).
      </div>
      <div
        className={`mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 ${
          statuses.length >= 4 ? "lg:grid-cols-4" : ""
        }`}
      >
        {statuses.map((status) => {
          const colItems = grouped.get(status) ?? [];
          const isOver = dragOverStatus === status;
          return (
            <div
              key={status}
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                if (dragOverStatus !== status) setDragOverStatus(status);
              }}
              onDragLeave={(e) => {
                // ignore events on inner children
                if (e.currentTarget.contains(e.relatedTarget as Node)) return;
                setDragOverStatus((cur) => (cur === status ? null : cur));
              }}
              onDrop={(e) => {
                e.preventDefault();
                const id = e.dataTransfer.getData("text/plain");
                if (id) handleDrop(status, id);
              }}
              className={`flex max-h-[70vh] flex-col rounded-xl border p-2 transition ${
                STATUS_COLUMN_BG[status]
              } ${
                isOver
                  ? "border-indigo-400 ring-2 ring-indigo-200"
                  : "border-slate-200"
              }`}
            >
              <div className="mb-2 flex items-center justify-between px-1">
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_HEADER_STYLES[status]}`}
                >
                  {status}
                </span>
                <span className="text-[11px] font-semibold text-gray-500">
                  {colItems.length}
                </span>
              </div>
              <div className="flex-1 space-y-2 overflow-y-auto pr-1">
                {colItems.length === 0 ? (
                  <p className="rounded-lg border border-dashed border-slate-200 bg-white/50 p-4 text-center text-[11px] text-gray-400">
                    Suelta un item aquí
                  </p>
                ) : (
                  colItems.map((item) => (
                    <KanbanCard
                      key={item.Id}
                      item={item}
                      dragging={draggingId === item.Id}
                      onDragStart={(id) => setDraggingId(id)}
                      onOpen={(id) => setSelectedItemId(id)}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedItemId &&
        (() => {
          const selected = optimisticItems.find(
            (i) => i.Id === selectedItemId,
          );
          if (!selected) return null;
          return (
            <ItemDetailModal
              item={selected}
              onClose={() => setSelectedItemId(null)}
              boundUpdateStatusAction={boundUpdateStatusAction}
            />
          );
        })()}
    </div>
  );
}

export default function FDEProjectBacklogBoard({
  projectId,
  projectName,
  items,
  boundCreateItemAction,
  boundUpdateStatusAction,
}: {
  projectId: string;
  projectName: string;
  items: FDEItem[];
  boundCreateItemAction: BoundCreateItemAction;
  boundUpdateStatusAction: BoundUpdateStatusAction;
}) {
  const [lifecycle, setLifecycle] = useState<"active" | "closed">("active");
  const [view, setView] = useState<"list" | "kanban">("kanban");
  const [sortBy, setSortBy] = useState<SortKey>("status");

  const { active, closed, byStatus } = useMemo(() => {
    const map = new Map<ItemStatus, FDEItem[]>();
    const act: FDEItem[] = [];
    const clo: FDEItem[] = [];
    for (const item of items) {
      const s = (item.JGR_FDE_Status__c ?? "Backlog") as ItemStatus;
      const bucket = map.get(s) ?? [];
      bucket.push(item);
      map.set(s, bucket);
      if (CLOSED_STATUSES.includes(s)) clo.push(item);
      else act.push(item);
    }
    return { active: act, closed: clo, byStatus: map };
  }, [items]);

  return (
    <>
      <FDEItemCreator
        projectId={projectId}
        projectName={projectName}
        boundAction={boundCreateItemAction}
      />

      {items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-gray-200 p-8 text-center text-sm text-gray-500">
          Aún no hay items visibles para este proyecto.
        </p>
      ) : (
        <>
          {/* Sub-tabs lifecycle · view toggle */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div
              role="tablist"
              aria-label="Ciclo de vida de items"
              className="inline-flex rounded-full border border-slate-200 bg-white p-1 text-xs font-semibold"
            >
              <button
                role="tab"
                aria-selected={lifecycle === "active"}
                onClick={() => setLifecycle("active")}
                className={`rounded-full px-3 py-1.5 transition ${
                  lifecycle === "active"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Activos
                <span
                  className={`ml-2 inline-block rounded-full px-1.5 text-[10px] ${
                    lifecycle === "active"
                      ? "bg-white/25 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {active.length}
                </span>
              </button>
              <button
                role="tab"
                aria-selected={lifecycle === "closed"}
                onClick={() => setLifecycle("closed")}
                className={`rounded-full px-3 py-1.5 transition ${
                  lifecycle === "closed"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Cerrados
                <span
                  className={`ml-2 inline-block rounded-full px-1.5 text-[10px] ${
                    lifecycle === "closed"
                      ? "bg-white/25 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {closed.length}
                </span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {view === "list" && (
                <label className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
                  <span className="font-semibold">Ordenar por</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortKey)}
                    className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.key} value={o.key}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <div
                role="tablist"
                aria-label="Vista"
                className="inline-flex rounded-full border border-slate-200 bg-white p-1 text-xs font-semibold"
              >
                <button
                  role="tab"
                  aria-selected={view === "list"}
                  onClick={() => setView("list")}
                  className={`rounded-full px-3 py-1.5 transition ${
                    view === "list"
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  title="Vista lista"
                >
                  ☰ Lista
                </button>
                <button
                  role="tab"
                  aria-selected={view === "kanban"}
                  onClick={() => setView("kanban")}
                  className={`rounded-full px-3 py-1.5 transition ${
                    view === "kanban"
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  title="Vista kanban con drag & drop"
                >
                  ▦ Kanban
                </button>
              </div>
            </div>
          </div>

          {view === "kanban" ? (
            <KanbanBoard
              items={lifecycle === "active" ? active : closed}
              statuses={
                lifecycle === "active" ? ACTIVE_STATUSES : CLOSED_STATUSES
              }
              boundUpdateStatusAction={boundUpdateStatusAction}
            />
          ) : sortBy === "status" ? (
            <GroupedList
              statuses={
                lifecycle === "active" ? ACTIVE_STATUSES : CLOSED_STATUSES
              }
              byStatus={byStatus}
              boundUpdateStatusAction={boundUpdateStatusAction}
            />
          ) : (
            <FlatList
              items={sortItems(
                lifecycle === "active" ? active : closed,
                sortBy,
              )}
              boundUpdateStatusAction={boundUpdateStatusAction}
            />
          )}
        </>
      )}
    </>
  );
}

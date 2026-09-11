"use client";

import { useActionState, useRef, useState } from "react";
import type { UpdateStatusResult } from "@/app/[lang]/customer-projects/[slug]/tracker/actions";

type Action = (
  prev: UpdateStatusResult | null,
  formData: FormData,
) => Promise<UpdateStatusResult>;

type ItemStatus =
  | "Backlog"
  | "En Progreso"
  | "Bloqueado"
  | "En Revisión"
  | "Cerrado"
  | "Descartado";

const STATUSES: ItemStatus[] = [
  "Backlog",
  "En Progreso",
  "Bloqueado",
  "En Revisión",
  "Cerrado",
  "Descartado",
];

export default function FDEItemStatusEditor({
  itemId,
  currentStatus,
  boundAction,
}: {
  itemId: string;
  currentStatus: string;
  boundAction: Action;
}) {
  const [state, formAction, pending] = useActionState<
    UpdateStatusResult | null,
    FormData
  >(boundAction, null);
  const [openNote, setOpenNote] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={formAction} className="flex flex-wrap items-start gap-2">
      <input type="hidden" name="itemId" value={itemId} />
      <label className="sr-only" htmlFor={`status-${itemId}`}>
        Cambiar estado
      </label>
      <select
        id={`status-${itemId}`}
        name="status"
        defaultValue={currentStatus}
        disabled={pending}
        onChange={(e) => {
          if (!openNote) {
            // Submit immediately if no note is being written.
            e.currentTarget.form?.requestSubmit();
          }
        }}
        className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={() => setOpenNote((v) => !v)}
        className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-50"
      >
        {openNote ? "Cancelar nota" : "+ Nota de avance"}
      </button>

      {openNote && (
        <div className="mt-2 flex w-full flex-col gap-2">
          <textarea
            name="note"
            rows={2}
            placeholder="Breve nota del avance (se guarda en 'Último avance')…"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
          <button
            type="submit"
            disabled={pending}
            className="self-start rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
          >
            {pending ? "Guardando…" : "Guardar cambio + nota"}
          </button>
        </div>
      )}

      {state?.ok && (
        <span className="text-xs text-emerald-600">✓ Estado actualizado</span>
      )}
      {state && !state.ok && (
        <span className="text-xs text-rose-600">✗ {state.error}</span>
      )}
    </form>
  );
}

"use client";

import { useActionState, useEffect, useRef } from "react";
import type { CreateItemResult } from "@/app/[lang]/customer-projects/[slug]/tracker/actions";

type Action = (
  prev: CreateItemResult | null,
  formData: FormData,
) => Promise<CreateItemResult>;

export default function FDEItemCreator({
  projectId,
  projectName,
  boundAction,
}: {
  projectId: string;
  projectName: string;
  boundAction: Action;
}) {
  const [state, formAction, pending] = useActionState<
    CreateItemResult | null,
    FormData
  >(boundAction, null);

  const formRef = useRef<HTMLFormElement>(null);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (state?.ok) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <details
      ref={detailsRef}
      className="mb-6 rounded-2xl border border-indigo-100 bg-indigo-50/40 open:bg-white open:shadow-sm"
    >
      <summary className="cursor-pointer list-none px-5 py-4 text-sm font-semibold text-indigo-700">
        <span className="inline-flex items-center gap-2">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Nuevo item para {projectName}
        </span>
      </summary>

      <form
        ref={formRef}
        action={formAction}
        className="grid grid-cols-1 gap-4 border-t border-indigo-100 p-5 md:grid-cols-2"
      >
        <input type="hidden" name="projectId" value={projectId} />

        <label className="md:col-span-2">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Título *
          </span>
          <input
            required
            type="text"
            name="title"
            maxLength={120}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </label>

        <label className="md:col-span-2">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Descripción / Comportamiento actual
          </span>
          <textarea
            name="description"
            rows={3}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </label>

        <label>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Riesgo potencial
          </span>
          <textarea
            name="risk"
            rows={2}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </label>

        <label>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Recomendación
          </span>
          <textarea
            name="recommendation"
            rows={2}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </label>

        <label className="md:col-span-2">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Acciones a realizar
          </span>
          <textarea
            name="actions"
            rows={2}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </label>

        <label>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Prioridad
          </span>
          <select
            name="priority"
            defaultValue="Media"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            <option>Alta</option>
            <option>Media</option>
            <option>Baja</option>
          </select>
        </label>

        <label>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Tipo
          </span>
          <select
            name="type"
            defaultValue="Mejora"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            <option>Mejora</option>
            <option>Bug</option>
            <option>Riesgo</option>
            <option>Decisión</option>
            <option>Tarea</option>
          </select>
        </label>

        <label>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Responsable
          </span>
          <select
            name="ownerParty"
            defaultValue="Cliente"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            <option>Cliente</option>
            <option>Salesforce</option>
            <option>Partner</option>
            <option>Compartida</option>
          </select>
        </label>

        <label>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Fecha objetivo
          </span>
          <input
            type="date"
            name="targetDate"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </label>

        <label className="md:col-span-2">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Dependencia
          </span>
          <input
            type="text"
            name="dependency"
            maxLength={255}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </label>

        <div className="flex flex-wrap items-center gap-3 md:col-span-2">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
          >
            {pending ? "Guardando…" : "Crear item"}
          </button>
          {state?.ok && (
            <span className="text-sm text-emerald-600">
              ✓ Creado {state.code}. Se refleja en la lista de abajo.
            </span>
          )}
          {state && !state.ok && (
            <span className="text-sm text-rose-600">✗ {state.error}</span>
          )}
        </div>
      </form>
    </details>
  );
}

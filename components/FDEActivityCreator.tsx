"use client";

import { useActionState, useEffect, useRef } from "react";
import type { CreateActivityResult } from "@/app/[lang]/customer-projects/[slug]/tracker/actions";
import type { FDEItem } from "@/lib/salesforce/fdeTracker";

type Action = (
  prev: CreateActivityResult | null,
  formData: FormData,
) => Promise<CreateActivityResult>;

export default function FDEActivityCreator({
  projectId,
  projectName,
  items,
  boundAction,
}: {
  projectId: string;
  projectName: string;
  items: FDEItem[];
  boundAction: Action;
}) {
  const [state, formAction, pending] = useActionState<
    CreateActivityResult | null,
    FormData
  >(boundAction, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok) {
      formRef.current?.reset();
    }
  }, [state]);

  const today = new Date().toISOString().slice(0, 10);

  return (
    <details className="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50/40 open:bg-white open:shadow-sm">
      <summary className="cursor-pointer list-none px-5 py-4 text-sm font-semibold text-emerald-700">
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
          Registrar actividad realizada para {projectName}
        </span>
      </summary>

      <form
        ref={formRef}
        action={formAction}
        className="grid grid-cols-1 gap-4 border-t border-emerald-100 p-5 md:grid-cols-2"
      >
        <input type="hidden" name="projectId" value={projectId} />

        <label className="md:col-span-2">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Título de la actividad *
          </span>
          <input
            required
            type="text"
            name="title"
            maxLength={120}
            placeholder="Ej. Prototipo del flujo con búsqueda previa"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </label>

        <label className="md:col-span-2">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Descripción / detalle
          </span>
          <textarea
            name="description"
            rows={3}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </label>

        <label>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Fecha
          </span>
          <input
            type="date"
            name="activityDate"
            defaultValue={today}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </label>

        <label>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Categoría
          </span>
          <select
            name="category"
            defaultValue="Build"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          >
            <option>Discovery</option>
            <option>Diseño</option>
            <option>Build</option>
            <option>Testing</option>
            <option>Deployment</option>
            <option>Meeting</option>
            <option>Documentación</option>
            <option>Otro</option>
          </select>
        </label>

        <label>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Realizada por
          </span>
          <select
            name="ownerParty"
            defaultValue="Salesforce"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          >
            <option>Salesforce</option>
            <option>Cliente</option>
            <option>Partner</option>
            <option>Compartida</option>
          </select>
        </label>

        <label>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Autor
          </span>
          <input
            type="text"
            name="author"
            maxLength={120}
            placeholder="Ej. Jonathan Gomez"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </label>

        <label className="md:col-span-2">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Item relacionado (opcional)
          </span>
          <select
            name="relatedItemId"
            defaultValue=""
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          >
            <option value="">— sin item —</option>
            {items.map((item) => (
              <option key={item.Id} value={item.Id}>
                {item.JGR_FDE_Item_Code__c ?? item.Name} · {item.JGR_FDE_Title__c}
              </option>
            ))}
          </select>
        </label>

        <div className="flex flex-wrap items-center gap-3 md:col-span-2">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
          >
            {pending ? "Guardando…" : "Registrar actividad"}
          </button>
          {state?.ok && (
            <span className="text-sm text-emerald-600">
              ✓ Actividad registrada. Aparece arriba en la lista.
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

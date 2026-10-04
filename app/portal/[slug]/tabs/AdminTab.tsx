"use client";

import { useCallback, useEffect, useState } from "react";

type Insider = {
  id: string;
  email: string;
  fullName: string;
  role: "Salesforce" | "Partner" | "Client";
  company: string | null;
  projects: string[];
  isActive: boolean;
  lastLogin: string | null;
};

const ROLE_STYLES: Record<string, string> = {
  Salesforce: "bg-blue-100 text-blue-900",
  Partner: "bg-amber-100 text-amber-900",
  Client: "bg-emerald-100 text-emerald-900",
};

function fmtLastLogin(iso: string | null): string {
  if (!iso) return "Nunca";
  const d = new Date(iso);
  return d.toLocaleString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminTab({ slug }: { slug: string }) {
  const [insiders, setInsiders] = useState<Insider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formEmail, setFormEmail] = useState("");
  const [formName, setFormName] = useState("");
  const [formRole, setFormRole] = useState<Insider["role"]>("Client");
  const [formCompany, setFormCompany] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/portal/insiders?slug=${encodeURIComponent(slug)}`,
        { cache: "no-store" },
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { insiders: Insider[] };
      setInsiders(data.insiders);
    } catch (err) {
      console.error(err);
      setError("No pudimos cargar los Insiders. Reintentá en un momento.");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    load();
  }, [load]);

  async function toggleActive(insider: Insider) {
    const next = !insider.isActive;
    setInsiders((prev) =>
      prev.map((i) => (i.id === insider.id ? { ...i, isActive: next } : i)),
    );
    try {
      const res = await fetch("/api/portal/insiders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: insider.id, isActive: next }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    } catch (err) {
      console.error(err);
      // revert
      setInsiders((prev) =>
        prev.map((i) =>
          i.id === insider.id ? { ...i, isActive: insider.isActive } : i,
        ),
      );
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!formEmail.trim() || !formName.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/portal/insiders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formEmail.trim(),
          fullName: formName.trim(),
          role: formRole,
          company: formCompany.trim() || null,
          slug,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setFormEmail("");
      setFormName("");
      setFormRole("Client");
      setFormCompany("");
      setShowForm(false);
      await load();
    } catch (err) {
      console.error(err);
      alert("No pudimos crear al Insider. Reintentá.");
    } finally {
      setSubmitting(false);
    }
  }

  const activeCount = insiders.filter((i) => i.isActive).length;
  const byRole = {
    Salesforce: insiders.filter((i) => i.role === "Salesforce").length,
    Partner: insiders.filter((i) => i.role === "Partner").length,
    Client: insiders.filter((i) => i.role === "Client").length,
  };

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600">
              Admin del Programa Insiders
            </p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">
              Lista blanca del portal
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Las personas acá listadas pueden pedir magic link al portal. Al
              desactivar a alguien, no podrá volver a entrar hasta que lo
              reactives.
            </p>
          </div>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
          >
            {showForm ? "Cancelar" : "+ Agregar Insider"}
          </button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-4">
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              Total
            </p>
            <p className="mt-0.5 text-xl font-semibold text-slate-900">
              {insiders.length}
            </p>
          </div>
          <div className="rounded-xl bg-emerald-50 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
              Activos
            </p>
            <p className="mt-0.5 text-xl font-semibold text-emerald-900">
              {activeCount}
            </p>
          </div>
          <div className="rounded-xl bg-amber-50 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-700">
              Partner
            </p>
            <p className="mt-0.5 text-xl font-semibold text-amber-900">
              {byRole.Partner}
            </p>
          </div>
          <div className="rounded-xl bg-emerald-50 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
              Client
            </p>
            <p className="mt-0.5 text-xl font-semibold text-emerald-900">
              {byRole.Client}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={submit}
          className="rounded-2xl border border-blue-200 bg-blue-50/50 p-5"
        >
          <h3 className="mb-3 text-sm font-semibold text-slate-900">
            Nuevo Insider
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-[11px] font-semibold text-slate-700">
                Correo
              </span>
              <input
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                required
                className="mt-1 w-full rounded border border-slate-300 bg-white px-2.5 py-1.5 text-sm"
              />
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold text-slate-700">
                Nombre completo
              </span>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
                className="mt-1 w-full rounded border border-slate-300 bg-white px-2.5 py-1.5 text-sm"
              />
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold text-slate-700">
                Rol
              </span>
              <select
                value={formRole}
                onChange={(e) => setFormRole(e.target.value as Insider["role"])}
                className="mt-1 w-full rounded border border-slate-300 bg-white px-2.5 py-1.5 text-sm"
              >
                <option value="Salesforce">Salesforce</option>
                <option value="Partner">Partner</option>
                <option value="Client">Client</option>
              </select>
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold text-slate-700">
                Empresa <span className="text-slate-400">(opcional)</span>
              </span>
              <input
                type="text"
                value={formCompany}
                onChange={(e) => setFormCompany(e.target.value)}
                className="mt-1 w-full rounded border border-slate-300 bg-white px-2.5 py-1.5 text-sm"
              />
            </label>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? "Guardando…" : "Agregar al proyecto"}
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-slate-900">
          Insiders del proyecto
        </h3>
        {loading ? (
          <p className="text-sm text-slate-500">Cargando…</p>
        ) : error ? (
          <p className="text-sm text-rose-700">{error}</p>
        ) : insiders.length === 0 ? (
          <p className="text-sm text-slate-500">
            Todavía no hay Insiders para este proyecto.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {insiders.map((i) => (
              <li
                key={i.id}
                className="flex flex-wrap items-center justify-between gap-3 py-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900">
                      {i.fullName}
                    </p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        ROLE_STYLES[i.role] ?? "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {i.role}
                      {i.company ? ` · ${i.company}` : ""}
                    </span>
                  </div>
                  <p className="truncate text-xs text-slate-500">{i.email}</p>
                  <p className="text-[11px] text-slate-400">
                    Último login: {fmtLastLogin(i.lastLogin)}
                  </p>
                </div>
                <button
                  onClick={() => toggleActive(i)}
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                    i.isActive
                      ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                  title="Click para alternar"
                >
                  {i.isActive ? "● Activo" : "○ Inactivo"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

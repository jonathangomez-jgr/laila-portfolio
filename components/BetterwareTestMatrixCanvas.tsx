"use client";

import { useEffect, useMemo, useState } from "react";
import type { FDETestCase, FDETestCaseStatus, FDETestExecution } from "@/lib/salesforce/fdeTracker";

const STATUS_STYLES: Record<FDETestCaseStatus | "none", string> = {
  Pass: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Fail: "bg-rose-100 text-rose-800 border-rose-200",
  Blocked: "bg-amber-100 text-amber-800 border-amber-200",
  Partial: "bg-orange-100 text-orange-800 border-orange-200",
  Not_Run: "bg-slate-100 text-slate-700 border-slate-200",
  none: "bg-slate-50 text-slate-500 border-slate-200",
};

const PRIORITY_STYLES: Record<string, string> = {
  Alta: "bg-rose-100 text-rose-800",
  Media: "bg-amber-100 text-amber-800",
  Baja: "bg-slate-100 text-slate-700",
};

const CATEGORY_STYLES: Record<string, string> = {
  Seguridad: "bg-rose-50 text-rose-700",
  Autenticación: "bg-indigo-50 text-indigo-700",
  Routing: "bg-blue-50 text-blue-700",
  Subagente_Account: "bg-emerald-50 text-emerald-700",
  Subagente_Orders: "bg-emerald-50 text-emerald-700",
  Subagente_Payments: "bg-emerald-50 text-emerald-700",
  Subagente_Rewards: "bg-emerald-50 text-emerald-700",
  Subagente_Access: "bg-emerald-50 text-emerald-700",
  Subagente_Tickets: "bg-emerald-50 text-emerald-700",
  Edge_Case: "bg-violet-50 text-violet-700",
  Regresión: "bg-cyan-50 text-cyan-700",
  Carga: "bg-fuchsia-50 text-fuchsia-700",
};

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("es-MX", {
    year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

function Chip({ label, className }: { label: string; className: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${className}`}>
      {label}
    </span>
  );
}

function lastExecutionStatus(c: FDETestCase): FDETestCaseStatus | null {
  const latest = c.executions[0];
  return latest?.JGR_FDE_Status__c ?? null;
}

function ExecutionForm({ testCase, onDone, onCancel }: { testCase: FDETestCase; onDone: () => void; onCancel: () => void }) {
  const [status, setStatus] = useState<FDETestCaseStatus>("Pass");
  const [environment, setEnvironment] = useState("Sandbox");
  const [agentVersion, setAgentVersion] = useState<string>("FDE_PILOT_INSIDER");
  const [agentBuild, setAgentBuild] = useState<string>("1");
  const [actualResult, setActualResult] = useState("");
  const [defectNotes, setDefectNotes] = useState("");
  const [executedByName, setExecutedByName] = useState("Jonathan Gomez");
  const [transcript, setTranscript] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/betterware/test-matrix/execution", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testCaseId: testCase.Id,
          environment,
          agentVersion,
          agentBuild: agentBuild.trim() === "" ? null : Number(agentBuild),
          status,
          actualResult,
          defectNotes: defectNotes || undefined,
          executedByName,
          transcript: transcript || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Server error" }));
        throw new Error(data.error || "Error al guardar");
      }
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50/40 p-4 space-y-3">
      <h5 className="text-sm font-semibold text-blue-900">Registrar nueva ejecución</h5>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <label className="block">
          <span className="font-semibold text-slate-700">Status</span>
          <select value={status} onChange={(e) => setStatus(e.target.value as FDETestCaseStatus)} className="mt-1 w-full rounded border border-slate-300 bg-white px-2 py-1">
            {(["Pass", "Fail", "Blocked", "Partial", "Not_Run"] as FDETestCaseStatus[]).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="font-semibold text-slate-700">Environment</span>
          <select value={environment} onChange={(e) => setEnvironment(e.target.value)} className="mt-1 w-full rounded border border-slate-300 bg-white px-2 py-1">
            {["Sandbox", "UAT", "Pre_Prod", "Production"].map((e) => <option key={e} value={e}>{e}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="font-semibold text-slate-700">Agent Version</span>
          <select value={agentVersion} onChange={(e) => setAgentVersion(e.target.value)} className="mt-1 w-full rounded border border-slate-300 bg-white px-2 py-1">
            {["V40_LEGACY", "FDE_PILOT_INSIDER", "FDE_PILOT_ROLLOUT", "N_A"].map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="font-semibold text-slate-700">Agent Build <span className="font-normal text-slate-500">(nº)</span></span>
          <input
            type="number"
            min={1}
            step={1}
            value={agentBuild}
            onChange={(e) => setAgentBuild(e.target.value)}
            placeholder="1"
            className="mt-1 w-full rounded border border-slate-300 bg-white px-2 py-1"
          />
        </label>
        <label className="block col-span-2">
          <span className="font-semibold text-slate-700">Ejecutado por</span>
          <input value={executedByName} onChange={(e) => setExecutedByName(e.target.value)} className="mt-1 w-full rounded border border-slate-300 bg-white px-2 py-1" />
        </label>
        <label className="block col-span-2">
          <span className="font-semibold text-slate-700">Resultado actual</span>
          <textarea value={actualResult} onChange={(e) => setActualResult(e.target.value)} rows={3} className="mt-1 w-full rounded border border-slate-300 bg-white px-2 py-1" />
        </label>
        {status !== "Pass" && (
          <label className="block col-span-2">
            <span className="font-semibold text-slate-700">Notas de defect</span>
            <textarea value={defectNotes} onChange={(e) => setDefectNotes(e.target.value)} rows={2} className="mt-1 w-full rounded border border-slate-300 bg-white px-2 py-1" />
          </label>
        )}
        <label className="block col-span-2">
          <span className="font-semibold text-slate-700">Transcript (opcional)</span>
          <textarea value={transcript} onChange={(e) => setTranscript(e.target.value)} rows={3} className="mt-1 w-full rounded border border-slate-300 bg-white px-2 py-1" />
        </label>
      </div>
      {error && <p className="text-xs text-rose-700">{error}</p>}
      <div className="flex gap-2 justify-end">
        <button onClick={onCancel} disabled={submitting} className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-50">Cancelar</button>
        <button onClick={submit} disabled={submitting} className="rounded-md bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50">
          {submitting ? "Guardando..." : "Guardar ejecución"}
        </button>
      </div>
    </div>
  );
}

function TestCaseDetail({ testCase, onClose, onExecutionRecorded, readOnly = false }: { testCase: FDETestCase; onClose: () => void; onExecutionRecorded: () => void; readOnly?: boolean }) {
  const [recording, setRecording] = useState(false);
  const lastStatus = lastExecutionStatus(testCase);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end bg-slate-900/40 p-0 sm:items-center sm:justify-center sm:p-6">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl bg-white p-6 shadow-xl sm:rounded-2xl">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-xs text-slate-500">{testCase.JGR_FDE_Test_Code__c} · {testCase.Name}</p>
            <h3 className="text-lg font-semibold text-slate-900">{testCase.JGR_FDE_Title__c}</h3>
          </div>
          <button onClick={onClose} className="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 hover:bg-slate-50">Cerrar</button>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {testCase.JGR_FDE_Category__c && (
            <Chip label={testCase.JGR_FDE_Category__c} className={CATEGORY_STYLES[testCase.JGR_FDE_Category__c] ?? "bg-slate-100 text-slate-700"} />
          )}
          {testCase.JGR_FDE_Priority__c && (
            <Chip label={testCase.JGR_FDE_Priority__c} className={PRIORITY_STYLES[testCase.JGR_FDE_Priority__c] ?? ""} />
          )}
          {testCase.JGR_FDE_Scenario_Type__c && (
            <Chip label={testCase.JGR_FDE_Scenario_Type__c} className="bg-violet-100 text-violet-800" />
          )}
          {testCase.JGR_FDE_Related_Finding__c && (
            <Chip label={`Hallazgo ${testCase.JGR_FDE_Related_Finding__c}`} className="bg-indigo-100 text-indigo-800" />
          )}
          <Chip label={`Último status: ${lastStatus ?? "Sin ejecutar"}`} className={STATUS_STYLES[lastStatus ?? "none"]} />
        </div>

        {testCase.JGR_FDE_Source__c && (
          <p className="mb-3 text-xs text-slate-500"><strong>Fuente:</strong> {testCase.JGR_FDE_Source__c}</p>
        )}

        {testCase.JGR_FDE_Description__c && (
          <div className="mb-4">
            <h4 className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Descripción</h4>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{testCase.JGR_FDE_Description__c}</p>
          </div>
        )}

        {testCase.JGR_FDE_Prerequisites__c && (
          <div className="mb-4">
            <h4 className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Prerequisites</h4>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{testCase.JGR_FDE_Prerequisites__c}</p>
          </div>
        )}

        {testCase.JGR_FDE_Steps__c && (
          <div className="mb-4">
            <h4 className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Pasos</h4>
            <p className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-slate-700 bg-slate-50 border border-slate-200 rounded p-3">{testCase.JGR_FDE_Steps__c}</p>
          </div>
        )}

        {testCase.JGR_FDE_Expected_Result__c && (
          <div className="mb-4">
            <h4 className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Resultado esperado</h4>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-emerald-900 bg-emerald-50 border border-emerald-200 rounded p-3">{testCase.JGR_FDE_Expected_Result__c}</p>
          </div>
        )}

        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Histórico de ejecuciones ({testCase.executions.length})</h4>
            {!recording && !readOnly && (
              <button onClick={() => setRecording(true)} className="rounded-md bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700">
                + Registrar ejecución
              </button>
            )}
          </div>
          {recording && !readOnly && (
            <ExecutionForm
              testCase={testCase}
              onCancel={() => setRecording(false)}
              onDone={() => { setRecording(false); onExecutionRecorded(); }}
            />
          )}
          {testCase.executions.length === 0 ? (
            <p className="mt-2 text-xs text-slate-500">Sin ejecuciones registradas.</p>
          ) : (
            <ul className="mt-2 space-y-2">
              {testCase.executions.map((e) => (
                <li key={e.Id} className="rounded-md border border-slate-200 bg-white p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-slate-500">{e.Name} · {formatDate(e.JGR_FDE_Executed_Date__c)}</span>
                    <Chip label={e.JGR_FDE_Status__c ?? "—"} className={STATUS_STYLES[e.JGR_FDE_Status__c ?? "none"]} />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {e.JGR_FDE_Environment__c} · {e.JGR_FDE_Agent_Version__c ?? "—"}
                    {e.JGR_FDE_Agent_Build__c != null && (
                      <span className="ml-1 inline-flex items-center rounded bg-slate-200 px-1.5 py-0 font-mono text-[10px] font-semibold text-slate-700">
                        build v{e.JGR_FDE_Agent_Build__c}
                      </span>
                    )}
                    {" · "}{e.JGR_FDE_Executed_By_Name__c ?? "Anónimo"}
                  </p>
                  {e.JGR_FDE_Actual_Result__c && (
                    <p className="mt-1 text-sm text-slate-700 whitespace-pre-wrap">{e.JGR_FDE_Actual_Result__c}</p>
                  )}
                  {e.JGR_FDE_Defect_Notes__c && (
                    <p className="mt-1 text-sm text-rose-700 whitespace-pre-wrap"><strong>Defect:</strong> {e.JGR_FDE_Defect_Notes__c}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BetterwareTestMatrixCanvas({
  readOnly = false,
}: {
  readOnly?: boolean;
} = {}) {
  const [cases, setCases] = useState<FDETestCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<FDETestCase | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/betterware/test-matrix", { cache: "no-store" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Server error" }));
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setCases(data.cases ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const stats = useMemo(() => {
    const total = cases.length;
    const sevenDaysAgo = Date.now() - 7 * 24 * 3600 * 1000;
    let recent = 0;
    let pass = 0;
    let notRun = 0;
    let blocked = 0;
    for (const c of cases) {
      const latest = c.executions[0];
      if (!latest) {
        notRun++;
        continue;
      }
      if (latest.JGR_FDE_Status__c === "Blocked") blocked++;
      if (new Date(latest.JGR_FDE_Executed_Date__c).getTime() >= sevenDaysAgo) {
        recent++;
        if (latest.JGR_FDE_Status__c === "Pass") pass++;
      }
    }
    return {
      total,
      passRate: recent === 0 ? null : Math.round((pass / recent) * 100),
      notRun,
      blocked,
    };
  }, [cases]);

  const filtered = useMemo(() => {
    return cases.filter((c) => {
      if (filterCategory !== "all" && c.JGR_FDE_Category__c !== filterCategory) return false;
      if (filterPriority !== "all" && c.JGR_FDE_Priority__c !== filterPriority) return false;
      if (filterStatus !== "all") {
        const latest = lastExecutionStatus(c);
        if (filterStatus === "Not_Run" && latest !== null) return false;
        if (filterStatus !== "Not_Run" && latest !== filterStatus) return false;
      }
      return true;
    });
  }, [cases, filterCategory, filterPriority, filterStatus]);

  const categories = useMemo(() => {
    const s = new Set<string>();
    cases.forEach((c) => c.JGR_FDE_Category__c && s.add(c.JGR_FDE_Category__c));
    return Array.from(s).sort();
  }, [cases]);

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Matriz de pruebas · FDE_BW_Service_Agent
          </p>
          <h3 className="text-xl font-semibold text-slate-900">
            Suite de pruebas con histórico persistente en Salesforce
          </h3>
        </div>
        <button onClick={load} disabled={loading} className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-50 disabled:opacity-50">
          {loading ? "Cargando..." : "↻ Actualizar"}
        </button>
      </div>

      <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Total</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{stats.total}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Pass rate · 7d</p>
          <p className="mt-1 text-2xl font-bold text-emerald-700">{stats.passRate === null ? "—" : `${stats.passRate}%`}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Not Run</p>
          <p className="mt-1 text-2xl font-bold text-slate-700">{stats.notRun}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Blocked</p>
          <p className="mt-1 text-2xl font-bold text-amber-700">{stats.blocked}</p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-3">
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="rounded border border-slate-300 px-2 py-1 text-xs">
          <option value="all">Todas las categorías</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="rounded border border-slate-300 px-2 py-1 text-xs">
          <option value="all">Cualquier prioridad</option>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="rounded border border-slate-300 px-2 py-1 text-xs">
          <option value="all">Cualquier status</option>
          <option value="Pass">Pass</option>
          <option value="Fail">Fail</option>
          <option value="Blocked">Blocked</option>
          <option value="Partial">Partial</option>
          <option value="Not_Run">Sin ejecutar</option>
        </select>
        <span className="ml-auto self-center font-mono text-[11px] text-slate-500">
          {filtered.length} / {cases.length}
        </span>
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
          Error cargando desde Salesforce: {error}
        </div>
      )}

      {loading && cases.length === 0 ? (
        <p className="text-sm text-slate-500">Cargando test cases desde Laila…</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-[11px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-3 py-2">Code</th>
                <th className="px-3 py-2">Title</th>
                <th className="px-3 py-2">Category</th>
                <th className="px-3 py-2">Priority</th>
                <th className="px-3 py-2">Last Status</th>
                <th className="px-3 py-2">Last Exec</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const latest = c.executions[0];
                const status = latest?.JGR_FDE_Status__c ?? null;
                return (
                  <tr
                    key={c.Id}
                    onClick={() => setSelected(c)}
                    className="cursor-pointer border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-3 py-2 font-mono text-xs text-slate-700">{c.JGR_FDE_Test_Code__c}</td>
                    <td className="px-3 py-2">
                      <p className="text-slate-900 font-medium">{c.JGR_FDE_Title__c}</p>
                      {c.JGR_FDE_Related_Finding__c && (
                        <p className="text-[11px] text-slate-500">Hallazgo {c.JGR_FDE_Related_Finding__c}</p>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      {c.JGR_FDE_Category__c && (
                        <Chip label={c.JGR_FDE_Category__c} className={CATEGORY_STYLES[c.JGR_FDE_Category__c] ?? "bg-slate-100 text-slate-700"} />
                      )}
                    </td>
                    <td className="px-3 py-2">
                      {c.JGR_FDE_Priority__c && (
                        <Chip label={c.JGR_FDE_Priority__c} className={PRIORITY_STYLES[c.JGR_FDE_Priority__c] ?? ""} />
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <Chip label={status ?? "Sin ejecutar"} className={STATUS_STYLES[status ?? "none"]} />
                    </td>
                    <td className="px-3 py-2 text-xs text-slate-600">
                      {latest ? formatDate(latest.JGR_FDE_Executed_Date__c) : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <TestCaseDetail
          testCase={selected}
          onClose={() => setSelected(null)}
          onExecutionRecorded={() => {
            setSelected(null);
            load();
          }}
          readOnly={readOnly}
        />
      )}
    </div>
  );
}

import type { TeamMember } from "@/data/salesforceTeam";

const ROLE_STYLES: Record<string, string> = {
  "Líder Técnico": "bg-blue-100 text-blue-800",
  "Forward Deployed Engineer": "bg-slate-100 text-slate-700",
  "Associate Forward Deployed Engineer": "bg-slate-100 text-slate-700",
  "Solution Engineer": "bg-indigo-100 text-indigo-800",
  "Deployment Strategist": "bg-emerald-100 text-emerald-800",
};

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Deterministic avatar tint derived from the name — stable across renders.
const AVATAR_TINTS = [
  "bg-blue-500",
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-violet-500",
  "bg-teal-500",
];

function tintFor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i += 1) h = (h * 31 + name.charCodeAt(i)) | 0;
  return AVATAR_TINTS[Math.abs(h) % AVATAR_TINTS.length];
}

export default function SalesforceTeamCard({
  members,
  customerName,
}: {
  members: TeamMember[];
  customerName?: string;
}) {
  if (members.length === 0) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600">
          Salesforce Team
        </p>
        <h3 className="mt-1 text-base font-semibold text-slate-900">
          Equipo asignado{customerName ? ` · ${customerName}` : ""}
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          {members.length} {members.length === 1 ? "persona" : "personas"} de Salesforce colaborando en este proyecto.
        </p>
      </div>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m) => (
          <li
            key={m.name}
            className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white ${tintFor(m.name)}`}
              aria-hidden
            >
              {initials(m.name)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">
                {m.name}
              </p>
              <div className="mt-1 flex flex-wrap gap-1">
                {m.roles.map((r) => (
                  <span
                    key={r}
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${ROLE_STYLES[r] ?? "bg-slate-100 text-slate-700"}`}
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

import Link from "next/link";
import type { Agent } from "@/lib/agentforce/types";

type Props = {
  agent: Agent;
  lang: string;
};

type Category = "router" | "gate" | "functional" | "control" | "handoff";

// Category mapping for the Fan_Agent topology. When more agents are added we can
// move this to data, but for now classifying by id keeps things explicit.
const categorize = (subId: string): Category => {
  if (subId === "topic-selector") return "router";
  if (subId === "servicecustomerverification") return "gate";
  if (subId === "escalation") return "handoff";
  if (["ambiguous-question", "off-topic"].includes(subId)) return "control";
  return "functional";
};

const STYLES: Record<
  Category,
  { wrap: string; chip: string; label: string }
> = {
  router: {
    wrap: "border-[#5f6fff] bg-gradient-to-br from-[#eef2ff] to-white shadow-md",
    chip: "bg-[#5f6fff] text-white",
    label: "Router",
  },
  gate: {
    wrap: "border-amber-300 bg-gradient-to-br from-amber-50 to-white",
    chip: "bg-amber-500 text-white",
    label: "Verification gate",
  },
  functional: {
    wrap: "border-gray-200 bg-white hover:border-[#5f6fff]/50",
    chip: "bg-[#eaf5fe] text-[#066afe]",
    label: "Topic",
  },
  control: {
    wrap: "border-gray-200 bg-gray-50",
    chip: "bg-gray-200 text-gray-700",
    label: "Control",
  },
  handoff: {
    wrap: "border-rose-200 bg-gradient-to-br from-rose-50 to-white",
    chip: "bg-rose-500 text-white",
    label: "Hand-off",
  },
};

function SubagentTile({
  href,
  name,
  category,
  actionCount,
  note,
}: {
  href: string;
  name: string;
  category: Category;
  actionCount: number;
  note?: string;
}) {
  const s = STYLES[category];
  return (
    <Link
      href={href}
      className={`group block rounded-xl border-2 p-3 transition hover:-translate-y-0.5 hover:shadow-md ${s.wrap}`}
    >
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${s.chip}`}
        >
          {s.label}
        </span>
        <span className="text-[10px] text-gray-500">
          {actionCount === 0 ? "—" : `${actionCount} ${actionCount === 1 ? "action" : "actions"}`}
        </span>
      </div>
      <h4 className="text-sm font-semibold leading-tight text-gray-950 group-hover:text-[#5f6fff]">
        {name}
      </h4>
      {note && <p className="mt-1 text-[11px] leading-snug text-gray-500">{note}</p>}
    </Link>
  );
}

const NOTES: Record<string, string> = {
  "topic-selector": "Welcomes user, picks topic from intent.",
  servicecustomerverification:
    "Must run before topics that touch PII or mutate data.",
  premium: "Laila differentiator — points → seats + Slack notify.",
  escalation: "Hand-off via OmniChannel routing flow.",
  "ambiguous-question": "User intent unclear — ask for clarification.",
  "off-topic": "Out-of-scope request — polite redirect.",
};

export default function AgentforceArchitecture({ agent, lang }: Props) {
  const base = `/${lang}/general-demos/agentforce/${agent.id}`;

  const router = agent.subagents.find((s) => s.id === "topic-selector");
  const gate = agent.subagents.find((s) => s.id === "servicecustomerverification");
  const functional = agent.subagents.filter((s) => categorize(s.id) === "functional");
  const control = agent.subagents.filter((s) => categorize(s.id) === "control");
  const handoff = agent.subagents.find((s) => s.id === "escalation");

  return (
    <div className="my-10 overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-b from-white to-gray-50/50 p-6 sm:p-8">
      {/* Planner header */}
      <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#5f6fff]">
            Planner · Atlas
          </p>
          <h3 className="mt-1 text-xl font-semibold tracking-tight text-gray-950 sm:text-2xl">
            Concurrent Multi-Agent Orchestration
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            The planner reads each user turn, picks one or more topics, and invokes their actions.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Adaptive responses · Rich content
        </div>
      </div>

      {/* Tier 1: router */}
      {router && (
        <div className="mb-3">
          <div className="mx-auto max-w-md">
            <SubagentTile
              href={`${base}/subagents/${router.id}`}
              name={router.name}
              category="router"
              actionCount={router.actions.length}
              note={NOTES[router.id]}
            />
          </div>
          <div className="mx-auto my-3 h-6 w-px bg-gradient-to-b from-[#5f6fff] to-transparent" />
        </div>
      )}

      {/* Tier 2: verification gate (functional, but flagged) */}
      {gate && (
        <div className="mb-6">
          <div className="mx-auto max-w-md">
            <SubagentTile
              href={`${base}/subagents/${gate.id}`}
              name={gate.name}
              category="gate"
              actionCount={gate.actions.length}
              note={NOTES.servicecustomerverification}
            />
          </div>
          <p className="mt-3 text-center text-xs text-gray-500">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 font-medium text-amber-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-3 w-3"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                  clipRule="evenodd"
                />
              </svg>
              Required before any topic that returns or mutates customer data
            </span>
          </p>
        </div>
      )}

      {/* Tier 3: functional topics grid */}
      {functional.length > 0 && (
        <div className="mb-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Functional topics
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {functional.map((s) => (
              <SubagentTile
                key={s.id}
                href={`${base}/subagents/${s.id}`}
                name={s.name}
                category="functional"
                actionCount={s.actions.length}
                note={s.id.includes("premium") ? NOTES.premium : undefined}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tier 4: control + handoff */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {control.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Control
            </p>
            <div className="grid grid-cols-2 gap-3">
              {control.map((s) => (
                <SubagentTile
                  key={s.id}
                  href={`${base}/subagents/${s.id}`}
                  name={s.name}
                  category="control"
                  actionCount={s.actions.length}
                  note={NOTES[s.id]}
                />
              ))}
            </div>
          </div>
        )}
        {handoff && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Hand-off
            </p>
            <SubagentTile
              href={`${base}/subagents/${handoff.id}`}
              name={handoff.name}
              category="handoff"
              actionCount={handoff.actions.length}
              note={NOTES.escalation}
            />
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-gray-100 pt-5 text-xs text-gray-500">
        <span className="font-semibold uppercase tracking-wider">Legend</span>
        {(["router", "gate", "functional", "control", "handoff"] as Category[]).map((c) => (
          <span key={c} className="inline-flex items-center gap-1.5">
            <span
              className={`inline-block h-2.5 w-2.5 rounded-full ${
                c === "router"
                  ? "bg-[#5f6fff]"
                  : c === "gate"
                    ? "bg-amber-500"
                    : c === "functional"
                      ? "bg-[#066afe]"
                      : c === "handoff"
                        ? "bg-rose-500"
                        : "bg-gray-400"
              }`}
            />
            {STYLES[c].label}
          </span>
        ))}
      </div>
    </div>
  );
}

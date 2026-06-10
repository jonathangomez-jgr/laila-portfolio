import Link from "next/link";
import type { Agent } from "@/lib/agentforce/types";

type Props = {
  agents: Agent[];
  lang: string;
  // What is being referenced — used to label per-agent metadata.
  reference:
    | { kind: "subagent"; id: string }
    | { kind: "action"; id: string };
};

export default function UsedInAgents({ agents, lang, reference }: Props) {
  if (agents.length === 0) return null;

  const heading =
    reference.kind === "subagent"
      ? `Used in ${agents.length} ${agents.length === 1 ? "agent" : "agents"}`
      : `Used in ${agents.length} ${agents.length === 1 ? "agent" : "agents"}`;

  return (
    <section className="mt-12">
      <h2 className="mb-5 text-2xl font-semibold tracking-tight text-gray-950">
        {heading}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {agents.map((agent) => {
          const meta =
            reference.kind === "subagent"
              ? agent.subagents.find((s) => s.id === reference.id)
              : agent.actions.find((a) => a.id === reference.id);

          // Build a useful per-agent caption.
          let caption: string | null = null;
          if (reference.kind === "subagent") {
            const sub = meta as Agent["subagents"][number] | undefined;
            if (sub) {
              caption = `${sub.actions.length} ${sub.actions.length === 1 ? "action" : "actions"} in this agent`;
            }
          } else {
            const act = meta as Agent["actions"][number] | undefined;
            if (act) {
              caption = `Called from ${act.usedBy.length} ${act.usedBy.length === 1 ? "subagent" : "subagents"}`;
            }
          }

          const href = `/${lang}/general-demos/agentforce/${agent.id}`;

          return (
            <Link
              key={agent.id}
              href={href}
              className="block rounded-2xl border border-gray-200 bg-gradient-to-br from-[#eef2ff] via-white to-white p-5 transition hover:-translate-y-0.5 hover:border-[#5f6fff] hover:shadow-md"
            >
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#5f6fff]">
                Agent
              </p>
              <h3 className="mb-2 text-base font-semibold text-gray-950">
                {agent.name}
              </h3>
              {agent.blurb && (
                <p className="mb-3 line-clamp-2 text-sm leading-6 text-gray-600">
                  {agent.blurb}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                <span>
                  {agent.subagents.length}{" "}
                  {agent.subagents.length === 1 ? "subagent" : "subagents"}
                </span>
                <span className="h-1 w-1 rounded-full bg-gray-300" />
                <span>
                  {agent.actions.length}{" "}
                  {agent.actions.length === 1 ? "action" : "actions"}
                </span>
                {caption && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-gray-300" />
                    <span className="font-medium text-[#5f6fff]">{caption}</span>
                  </>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

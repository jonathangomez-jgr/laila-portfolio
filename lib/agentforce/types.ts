export type AgentSummary = {
  id: string;
  name: string;
  blurb: string;
};

export type SubagentRef = {
  id: string;
  name: string;
};

export type ActionRef = {
  id: string;
  name: string;
};

export type Subagent = {
  id: string;
  agentId: string;
  name: string;
  purpose: string;
  markdown: string;
  actions: ActionRef[];
};

export type Action = {
  id: string;
  agentId: string;
  name: string;
  purpose: string;
  markdown: string;
  usedBy: SubagentRef[];
};

export type Agent = {
  id: string;
  name: string;
  blurb: string;
  markdown: string;
  subagents: Subagent[];
  actions: Action[];
};

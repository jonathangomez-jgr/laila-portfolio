import { sfQuery, sfCreate, sfUpdate } from "../salesforce";

// ============================================================================
// Types exposed to API routes + components
// ============================================================================

export type Severity = "Blocker" | "Critical" | "Nice-to-have";
export type Result = "Pass" | "PassWithObservations" | "Fail" | "NA";
export type EvaluationStatus = "InProgress" | "Submitted" | "Archived";
export type FinalDecision = "Si" | "No";
export type EvaluatorRole = "Client" | "Partner" | "Salesforce";

export type EvaluationType = "Partial" | "Consolidated";

export type CriterionDTO = {
  id: string;
  categoryId: string;
  topic: string | null;
  givenWhenThen: string;
  severity: Severity;
  sortOrder: number;
  isBlocked: boolean;
  blockedReason: string | null;
  criterionKey: string | null;
};

export type CategoryDTO = {
  id: string;
  name: string;
  description: string | null;
  sortOrder: number;
  criteria: CriterionDTO[];
};

export type TemplateDTO = {
  id: string;
  label: string;
  projectSlug: string;
  agentApiName: string | null;
  version: string | null;
  welcomeMessage: string | null;
  categories: CategoryDTO[];
  totalCriteria: number;
};

export type ResponseDTO = {
  id: string;
  criterionId: string;
  result: Result | null;
  comment: string | null;
  answeredAt: string | null;
  answeredByPortalAccessId: string | null;
  answeredByName: string | null;
  answeredByEmail: string | null;
  sourceEvaluationId: string | null;
  sourceEvaluationName: string | null;
  sourceEvaluationVersion: string | null;
};

export type CollaboratorDTO = {
  portalAccessId: string;
  name: string;
  email: string | null;
  answeredCount: number;
  lastAnsweredAt: string | null;
};

export type EvaluationDTO = {
  id: string;
  name: string;
  templateId: string;
  evaluatorPortalAccessId: string | null;
  evaluatorName: string | null;
  evaluatorEmail: string | null;
  evaluatorRole: EvaluatorRole | null;
  evaluationType: EvaluationType;
  status: EvaluationStatus;
  startedAt: string | null;
  submittedAt: string | null;
  finalDecision: FinalDecision | null;
  confidenceLevel: number | null;
  finalComment: string | null;
  currentPage: number;
  responses: ResponseDTO[];
  collaborators: CollaboratorDTO[];
  progress: {
    answered: number;
    total: number;
    pct: number;
  };
};

// ============================================================================
// Template · fetch active for a project slug
// ============================================================================

type TemplateRow = {
  Id: string;
  Label__c: string;
  ProjectSlug__c: string;
  AgentApiName__c: string | null;
  Version__c: string | null;
  WelcomeMessage__c: string | null;
};
type CategoryRow = {
  Id: string;
  Name: string;
  Description__c: string | null;
  SortOrder__c: number;
};
type CriterionRow = {
  Id: string;
  Category__c: string;
  Topic__c: string | null;
  GivenWhenThen__c: string;
  Severity__c: Severity;
  SortOrder__c: number;
  IsBlocked__c: boolean | null;
  BlockedReason__c: string | null;
  CriterionKey__c: string | null;
};

async function hydrateTemplate(tmpl: TemplateRow): Promise<TemplateDTO> {

  const cats = await sfQuery<CategoryRow>(
    `SELECT Id, Name, Description__c, SortOrder__c
     FROM JGR_FDE_AcceptanceCategory__c
     WHERE Template__c = '${tmpl.Id}'
     ORDER BY SortOrder__c ASC`,
  );
  const crits = await sfQuery<CriterionRow>(
    `SELECT Id, Category__c, Topic__c, GivenWhenThen__c, Severity__c, SortOrder__c,
            IsBlocked__c, BlockedReason__c, CriterionKey__c
     FROM JGR_FDE_AcceptanceCriterion__c
     WHERE Category__c IN (${cats.map((c) => `'${c.Id}'`).join(",") || "''"})
     ORDER BY SortOrder__c ASC`,
  );

  const critsByCat = new Map<string, CriterionDTO[]>();
  for (const c of crits) {
    const list = critsByCat.get(c.Category__c) ?? [];
    list.push({
      id: c.Id,
      categoryId: c.Category__c,
      topic: c.Topic__c,
      givenWhenThen: c.GivenWhenThen__c,
      severity: c.Severity__c,
      sortOrder: c.SortOrder__c,
      isBlocked: c.IsBlocked__c === true,
      blockedReason: c.BlockedReason__c,
      criterionKey: c.CriterionKey__c,
    });
    critsByCat.set(c.Category__c, list);
  }

  const categories: CategoryDTO[] = cats.map((c) => ({
    id: c.Id,
    name: c.Name,
    description: c.Description__c,
    sortOrder: c.SortOrder__c,
    criteria: critsByCat.get(c.Id) ?? [],
  }));

  return {
    id: tmpl.Id,
    label: tmpl.Label__c,
    projectSlug: tmpl.ProjectSlug__c,
    agentApiName: tmpl.AgentApiName__c,
    version: tmpl.Version__c,
    welcomeMessage: tmpl.WelcomeMessage__c,
    categories,
    totalCriteria: crits.length,
  };
}

export async function getActiveTemplateForSlug(
  slug: string,
): Promise<TemplateDTO | null> {
  const tmpls = await sfQuery<TemplateRow>(
    `SELECT Id, Label__c, ProjectSlug__c, AgentApiName__c, Version__c, WelcomeMessage__c
     FROM JGR_FDE_AcceptanceTemplate__c
     WHERE ProjectSlug__c = '${slug.replace(/'/g, "\\'")}' AND IsActive__c = true
     ORDER BY CreatedDate DESC
     LIMIT 1`,
  );
  if (tmpls.length === 0) return null;
  return hydrateTemplate(tmpls[0]);
}

export async function getTemplateById(
  id: string,
): Promise<TemplateDTO | null> {
  const tmpls = await sfQuery<TemplateRow>(
    `SELECT Id, Label__c, ProjectSlug__c, AgentApiName__c, Version__c, WelcomeMessage__c
     FROM JGR_FDE_AcceptanceTemplate__c
     WHERE Id = '${id}'
     LIMIT 1`,
  );
  if (tmpls.length === 0) return null;
  return hydrateTemplate(tmpls[0]);
}

// ============================================================================
// Evaluation · start / get / submit
// ============================================================================

type EvaluationRow = {
  Id: string;
  Name: string;
  Template__c: string;
  Evaluator__c: string | null;
  EvaluatorName__c: string | null;
  EvaluatorEmail__c: string | null;
  EvaluatorRole__c: EvaluatorRole | null;
  EvaluationType__c: EvaluationType | null;
  Status__c: EvaluationStatus;
  StartedAt__c: string | null;
  SubmittedAt__c: string | null;
  FinalDecision__c: FinalDecision | null;
  ConfidenceLevel__c: number | null;
  FinalComment__c: string | null;
  CurrentPage__c: number;
};
type ResponseRow = {
  Id: string;
  Criterion__c: string;
  Result__c: Result | null;
  Comment__c: string | null;
  AnsweredAt__c: string | null;
  AnsweredByPortalAccess__c: string | null;
  AnsweredByName__c: string | null;
  AnsweredByEmail__c: string | null;
  SourceEvaluation__c: string | null;
  SourceEvaluation__r?: { Name?: string | null; Template__r?: { Version__c?: string | null } | null } | null;
};

const EVAL_SELECT_FIELDS = `Id, Name, Template__c, Evaluator__c, EvaluatorName__c, EvaluatorEmail__c, EvaluatorRole__c, EvaluationType__c,
            Status__c, StartedAt__c, SubmittedAt__c, FinalDecision__c,
            ConfidenceLevel__c, FinalComment__c, CurrentPage__c`;

const RESPONSE_SELECT_FIELDS = `Id, Criterion__c, Result__c, Comment__c, AnsweredAt__c,
            AnsweredByPortalAccess__c, AnsweredByName__c, AnsweredByEmail__c,
            SourceEvaluation__c, SourceEvaluation__r.Name, SourceEvaluation__r.Template__r.Version__c`;

function buildCollaborators(responses: ResponseRow[]): CollaboratorDTO[] {
  const byId = new Map<string, CollaboratorDTO>();
  for (const r of responses) {
    if (!r.AnsweredByPortalAccess__c) continue;
    const existing = byId.get(r.AnsweredByPortalAccess__c);
    if (existing) {
      existing.answeredCount += 1;
      if (
        r.AnsweredAt__c &&
        (!existing.lastAnsweredAt || r.AnsweredAt__c > existing.lastAnsweredAt)
      ) {
        existing.lastAnsweredAt = r.AnsweredAt__c;
      }
    } else {
      byId.set(r.AnsweredByPortalAccess__c, {
        portalAccessId: r.AnsweredByPortalAccess__c,
        name: r.AnsweredByName__c ?? "Evaluador",
        email: r.AnsweredByEmail__c,
        answeredCount: 1,
        lastAnsweredAt: r.AnsweredAt__c,
      });
    }
  }
  return Array.from(byId.values()).sort(
    (a, b) => b.answeredCount - a.answeredCount,
  );
}

function toEvaluationDTO(
  row: EvaluationRow,
  responses: ResponseRow[],
): EvaluationDTO {
  const answered = responses.filter((r) => r.Result__c != null).length;
  const total = responses.length;
  return {
    id: row.Id,
    name: row.Name,
    templateId: row.Template__c,
    evaluatorPortalAccessId: row.Evaluator__c,
    evaluatorName: row.EvaluatorName__c,
    evaluatorEmail: row.EvaluatorEmail__c,
    evaluatorRole: row.EvaluatorRole__c,
    evaluationType: row.EvaluationType__c ?? "Partial",
    status: row.Status__c,
    startedAt: row.StartedAt__c,
    submittedAt: row.SubmittedAt__c,
    finalDecision: row.FinalDecision__c,
    confidenceLevel: row.ConfidenceLevel__c,
    finalComment: row.FinalComment__c,
    currentPage: row.CurrentPage__c ?? 0,
    responses: responses.map((r) => ({
      id: r.Id,
      criterionId: r.Criterion__c,
      result: r.Result__c,
      comment: r.Comment__c,
      answeredAt: r.AnsweredAt__c,
      answeredByPortalAccessId: r.AnsweredByPortalAccess__c,
      answeredByName: r.AnsweredByName__c,
      answeredByEmail: r.AnsweredByEmail__c,
      sourceEvaluationId: r.SourceEvaluation__c,
      sourceEvaluationName: r.SourceEvaluation__r?.Name ?? null,
      sourceEvaluationVersion: r.SourceEvaluation__r?.Template__r?.Version__c ?? null,
    })),
    collaborators: buildCollaborators(responses),
    progress: {
      answered,
      total,
      pct: total === 0 ? 0 : Math.round((answered / total) * 100),
    },
  };
}

export async function getEvaluationById(
  id: string,
): Promise<EvaluationDTO | null> {
  const rows = await sfQuery<EvaluationRow>(
    `SELECT ${EVAL_SELECT_FIELDS}
     FROM JGR_FDE_AcceptanceEvaluation__c
     WHERE Id = '${id}'
     LIMIT 1`,
  );
  if (rows.length === 0) return null;
  const responses = await sfQuery<ResponseRow>(
    `SELECT ${RESPONSE_SELECT_FIELDS}
     FROM JGR_FDE_AcceptanceResponse__c
     WHERE Evaluation__c = '${id}'`,
  );
  return toEvaluationDTO(rows[0], responses);
}

export async function findInProgressEvaluationForRole(
  templateId: string,
  role: EvaluatorRole,
): Promise<EvaluationDTO | null> {
  const rows = await sfQuery<EvaluationRow>(
    `SELECT ${EVAL_SELECT_FIELDS}
     FROM JGR_FDE_AcceptanceEvaluation__c
     WHERE Template__c = '${templateId}'
       AND EvaluatorRole__c = '${role}'
       AND Status__c = 'InProgress'
     ORDER BY StartedAt__c DESC
     LIMIT 1`,
  );
  if (rows.length === 0) return null;
  return getEvaluationById(rows[0].Id);
}

export async function listEvaluationsForTemplateAndRole(
  templateId: string,
  role: EvaluatorRole,
): Promise<EvaluationDTO[]> {
  const rows = await sfQuery<EvaluationRow>(
    `SELECT ${EVAL_SELECT_FIELDS}
     FROM JGR_FDE_AcceptanceEvaluation__c
     WHERE Template__c = '${templateId}'
       AND EvaluatorRole__c = '${role}'
       AND Status__c != 'Archived'
     ORDER BY StartedAt__c DESC
     LIMIT 50`,
  );
  const out: EvaluationDTO[] = [];
  for (const row of rows) {
    const responses = await sfQuery<ResponseRow>(
      `SELECT ${RESPONSE_SELECT_FIELDS}
       FROM JGR_FDE_AcceptanceResponse__c
       WHERE Evaluation__c = '${row.Id}'`,
    );
    out.push(toEvaluationDTO(row, responses));
  }
  return out;
}

export async function startEvaluation(params: {
  templateId: string;
  evaluatorPortalAccessId: string;
  evaluatorName: string;
  evaluatorEmail: string;
  evaluatorRole: EvaluatorRole;
}): Promise<EvaluationDTO> {
  const now = new Date().toISOString();
  const { id } = await sfCreate("JGR_FDE_AcceptanceEvaluation__c", {
    Template__c: params.templateId,
    Evaluator__c: params.evaluatorPortalAccessId,
    EvaluatorName__c: params.evaluatorName,
    EvaluatorEmail__c: params.evaluatorEmail,
    EvaluatorRole__c: params.evaluatorRole,
    Status__c: "InProgress",
    StartedAt__c: now,
    CurrentPage__c: 0,
  });

  const cats = await sfQuery<{ Id: string }>(
    `SELECT Id FROM JGR_FDE_AcceptanceCategory__c WHERE Template__c = '${params.templateId}'`,
  );
  const criteria = await sfQuery<{ Id: string }>(
    `SELECT Id FROM JGR_FDE_AcceptanceCriterion__c
     WHERE Category__c IN (${cats.map((c) => `'${c.Id}'`).join(",") || "''"})`,
  );

  // Pre-create 1 Response per Criterion (via Composite Tree for efficiency)
  for (const crit of criteria) {
    await sfCreate("JGR_FDE_AcceptanceResponse__c", {
      Evaluation__c: id,
      Criterion__c: crit.Id,
    });
  }

  const dto = await getEvaluationById(id);
  if (!dto) throw new Error("Evaluation created but could not be read back");
  return dto;
}

// ----------------------------------------------------------------------------
// Role guards · usados por todas las rutas de mutación para evitar que un
// usuario de un rol toque la evaluación de otro rol.
// ----------------------------------------------------------------------------

export async function getEvaluationRoleById(
  evaluationId: string,
): Promise<EvaluatorRole | null | undefined> {
  const rows = await sfQuery<{ EvaluatorRole__c: EvaluatorRole | null }>(
    `SELECT EvaluatorRole__c
     FROM JGR_FDE_AcceptanceEvaluation__c
     WHERE Id = '${evaluationId}'
     LIMIT 1`,
  );
  if (rows.length === 0) return undefined;
  return rows[0].EvaluatorRole__c;
}

export async function getEvaluationRoleByResponseId(
  responseId: string,
): Promise<EvaluatorRole | null | undefined> {
  const rows = await sfQuery<{
    Evaluation__r: { EvaluatorRole__c: EvaluatorRole | null } | null;
  }>(
    `SELECT Evaluation__r.EvaluatorRole__c
     FROM JGR_FDE_AcceptanceResponse__c
     WHERE Id = '${responseId}'
     LIMIT 1`,
  );
  if (rows.length === 0) return undefined;
  return rows[0].Evaluation__r?.EvaluatorRole__c ?? null;
}

export async function updateResponse(params: {
  evaluationId: string;
  responseId: string;
  result: Result | null;
  comment: string | null;
  answeredBy: {
    portalAccessId: string;
    name: string;
    email: string;
  };
}): Promise<void> {
  // Ensure Evaluation is InProgress (immutability guard)
  const evals = await sfQuery<{ Status__c: EvaluationStatus }>(
    `SELECT Status__c FROM JGR_FDE_AcceptanceEvaluation__c WHERE Id = '${params.evaluationId}' LIMIT 1`,
  );
  if (evals.length === 0) throw new Error("Evaluation not found");
  if (evals[0].Status__c !== "InProgress") {
    throw new Error("Evaluation is locked (status != InProgress)");
  }

  await sfUpdate("JGR_FDE_AcceptanceResponse__c", params.responseId, {
    Result__c: params.result,
    Comment__c: params.comment,
    AnsweredAt__c: new Date().toISOString(),
    AnsweredByPortalAccess__c: params.answeredBy.portalAccessId,
    AnsweredByName__c: params.answeredBy.name,
    AnsweredByEmail__c: params.answeredBy.email,
  });
}

export async function updateCurrentPage(
  evaluationId: string,
  page: number,
): Promise<void> {
  await sfUpdate("JGR_FDE_AcceptanceEvaluation__c", evaluationId, {
    CurrentPage__c: page,
  });
}

export async function submitEvaluation(params: {
  evaluationId: string;
  finalDecision: FinalDecision;
  confidenceLevel: number | null;
  finalComment: string | null;
  signer?: {
    portalAccessId: string;
    name: string;
    email: string;
  };
}): Promise<EvaluationDTO> {
  const update: Record<string, unknown> = {
    Status__c: "Submitted",
    SubmittedAt__c: new Date().toISOString(),
    FinalDecision__c: params.finalDecision,
    ConfidenceLevel__c: params.confidenceLevel,
    FinalComment__c: params.finalComment,
  };
  if (params.signer) {
    update.Evaluator__c = params.signer.portalAccessId;
    update.EvaluatorName__c = params.signer.name;
    update.EvaluatorEmail__c = params.signer.email;
  }
  await sfUpdate("JGR_FDE_AcceptanceEvaluation__c", params.evaluationId, update);
  const dto = await getEvaluationById(params.evaluationId);
  if (!dto) throw new Error("Evaluation submitted but could not be read back");
  return dto;
}

// ============================================================================
// Consolidación · merge de evaluaciones por CriterionKey (misma role + slug)
// ============================================================================

export type ConsolidationPreview = {
  masterTemplateId: string;
  masterTemplateLabel: string;
  totalCriteria: number;
  sourceEvaluations: {
    id: string;
    name: string;
    version: string | null;
    label: string;
    status: EvaluationStatus;
    submittedAt: string | null;
  }[];
  byResult: {
    Pass: number;
    PassWithObservations: number;
    Fail: number;
    NA: number;
    Unanswered: number;
  };
};

// Devuelve el template "maestro" (más antiguo por CreatedDate) para un slug.
// Ese template se usa como universo completo del merge consolidado.
async function getMasterTemplateForSlug(
  slug: string,
): Promise<{ id: string; label: string } | null> {
  const rows = await sfQuery<{ Id: string; Label__c: string }>(
    `SELECT Id, Label__c
     FROM JGR_FDE_AcceptanceTemplate__c
     WHERE ProjectSlug__c = '${slug.replace(/'/g, "\\'")}'
     ORDER BY CreatedDate ASC
     LIMIT 1`,
  );
  if (rows.length === 0) return null;
  return { id: rows[0].Id, label: rows[0].Label__c };
}

type LatestRespRow = {
  CriterionKey: string;
  Result__c: Result | null;
  Comment__c: string | null;
  AnsweredAt__c: string | null;
  AnsweredByPortalAccess__c: string | null;
  AnsweredByName__c: string | null;
  AnsweredByEmail__c: string | null;
  Evaluation__c: string;
  Evaluation__r: { Name: string; Template__c: string } | null;
};

// Para cada CriterionKey, devuelve la última respuesta registrada (por AnsweredAt desc)
// de cualquier eval Partial del mismo rol en el slug. Solo respuestas con result != null.
async function getLatestResponsesByKey(
  slug: string,
  role: EvaluatorRole,
): Promise<Map<string, LatestRespRow>> {
  const rows = await sfQuery<{
    Criterion__r: { CriterionKey__c: string | null } | null;
    Result__c: Result | null;
    Comment__c: string | null;
    AnsweredAt__c: string | null;
    AnsweredByPortalAccess__c: string | null;
    AnsweredByName__c: string | null;
    AnsweredByEmail__c: string | null;
    Evaluation__c: string;
    Evaluation__r: { Name: string; Template__c: string } | null;
  }>(
    `SELECT Criterion__r.CriterionKey__c, Result__c, Comment__c, AnsweredAt__c,
            AnsweredByPortalAccess__c, AnsweredByName__c, AnsweredByEmail__c,
            Evaluation__c, Evaluation__r.Name, Evaluation__r.Template__c
     FROM JGR_FDE_AcceptanceResponse__c
     WHERE Result__c != null
       AND Evaluation__r.EvaluatorRole__c = '${role}'
       AND Evaluation__r.EvaluationType__c = 'Partial'
       AND Evaluation__r.Template__r.ProjectSlug__c = '${slug.replace(/'/g, "\\'")}'
     ORDER BY AnsweredAt__c DESC`,
  );

  const byKey = new Map<string, LatestRespRow>();
  for (const r of rows) {
    const key = r.Criterion__r?.CriterionKey__c;
    if (!key) continue;
    if (byKey.has(key)) continue; // first one is the most recent (DESC order)
    byKey.set(key, {
      CriterionKey: key,
      Result__c: r.Result__c,
      Comment__c: r.Comment__c,
      AnsweredAt__c: r.AnsweredAt__c,
      AnsweredByPortalAccess__c: r.AnsweredByPortalAccess__c,
      AnsweredByName__c: r.AnsweredByName__c,
      AnsweredByEmail__c: r.AnsweredByEmail__c,
      Evaluation__c: r.Evaluation__c,
      Evaluation__r: r.Evaluation__r,
    });
  }
  return byKey;
}

export async function previewConsolidation(
  slug: string,
  role: EvaluatorRole,
): Promise<ConsolidationPreview | null> {
  const master = await getMasterTemplateForSlug(slug);
  if (!master) return null;

  // Count criteria in master
  const critCount = await sfQuery<{ c: number; k: string | null }>(
    `SELECT CriterionKey__c k, COUNT(Id) c
     FROM JGR_FDE_AcceptanceCriterion__c
     WHERE Category__r.Template__c = '${master.id}'
     GROUP BY CriterionKey__c`,
  );
  const masterKeys = new Set(
    critCount.map((r) => r.k).filter((k): k is string => !!k),
  );
  const totalCriteria = critCount.reduce((s, r) => s + r.c, 0);

  // All partial evals of this slug + role
  const sources = await sfQuery<{
    Id: string;
    Name: string;
    Status__c: EvaluationStatus;
    SubmittedAt__c: string | null;
    Template__r: { Label__c: string; Version__c: string | null } | null;
  }>(
    `SELECT Id, Name, Status__c, SubmittedAt__c,
            Template__r.Label__c, Template__r.Version__c
     FROM JGR_FDE_AcceptanceEvaluation__c
     WHERE EvaluatorRole__c = '${role}'
       AND EvaluationType__c = 'Partial'
       AND Status__c IN ('Submitted', 'InProgress')
       AND Template__r.ProjectSlug__c = '${slug.replace(/'/g, "\\'")}'
     ORDER BY SubmittedAt__c DESC NULLS LAST`,
  );

  const latest = await getLatestResponsesByKey(slug, role);
  const byResult = { Pass: 0, PassWithObservations: 0, Fail: 0, NA: 0, Unanswered: 0 };
  for (const key of masterKeys) {
    const r = latest.get(key)?.Result__c ?? null;
    if (r === "Pass") byResult.Pass++;
    else if (r === "PassWithObservations") byResult.PassWithObservations++;
    else if (r === "Fail") byResult.Fail++;
    else if (r === "NA") byResult.NA++;
    else byResult.Unanswered++;
  }

  return {
    masterTemplateId: master.id,
    masterTemplateLabel: master.label,
    totalCriteria,
    sourceEvaluations: sources.map((s) => ({
      id: s.Id,
      name: s.Name,
      version: s.Template__r?.Version__c ?? null,
      label: s.Template__r?.Label__c ?? "",
      status: s.Status__c,
      submittedAt: s.SubmittedAt__c,
    })),
    byResult,
  };
}

export async function createConsolidatedEvaluation(params: {
  slug: string;
  role: EvaluatorRole;
  signer: { portalAccessId: string; name: string; email: string };
}): Promise<EvaluationDTO> {
  const master = await getMasterTemplateForSlug(params.slug);
  if (!master) throw new Error("master template not found");

  // Create the consolidated eval
  const now = new Date().toISOString();
  const { id: newEvalId } = await sfCreate("JGR_FDE_AcceptanceEvaluation__c", {
    Template__c: master.id,
    Evaluator__c: params.signer.portalAccessId,
    EvaluatorName__c: params.signer.name,
    EvaluatorEmail__c: params.signer.email,
    EvaluatorRole__c: params.role,
    EvaluationType__c: "Consolidated",
    Status__c: "InProgress",
    StartedAt__c: now,
    CurrentPage__c: 0,
  });

  // Get all criteria of master template with their key
  const crits = await sfQuery<{
    Id: string;
    CriterionKey__c: string | null;
  }>(
    `SELECT Id, CriterionKey__c
     FROM JGR_FDE_AcceptanceCriterion__c
     WHERE Category__r.Template__c = '${master.id}'`,
  );

  const latest = await getLatestResponsesByKey(params.slug, params.role);

  // Create one response per criterion, prefilled if there's a latest match
  for (const c of crits) {
    const inherited = c.CriterionKey__c ? latest.get(c.CriterionKey__c) : null;
    const payload: Record<string, unknown> = {
      Evaluation__c: newEvalId,
      Criterion__c: c.Id,
    };
    if (inherited) {
      payload.Result__c = inherited.Result__c;
      payload.Comment__c = inherited.Comment__c;
      payload.AnsweredAt__c = inherited.AnsweredAt__c;
      payload.AnsweredByPortalAccess__c = inherited.AnsweredByPortalAccess__c;
      payload.AnsweredByName__c = inherited.AnsweredByName__c;
      payload.AnsweredByEmail__c = inherited.AnsweredByEmail__c;
      payload.SourceEvaluation__c = inherited.Evaluation__c;
    }
    await sfCreate("JGR_FDE_AcceptanceResponse__c", payload);
  }

  const dto = await getEvaluationById(newEvalId);
  if (!dto) throw new Error("Consolidated eval created but could not be read back");
  return dto;
}

// En la landing, chequear si existe ya una Consolidated InProgress para (slug, role).
export async function findConsolidatedInProgress(
  slug: string,
  role: EvaluatorRole,
): Promise<EvaluationDTO | null> {
  const rows = await sfQuery<EvaluationRow>(
    `SELECT ${EVAL_SELECT_FIELDS}
     FROM JGR_FDE_AcceptanceEvaluation__c
     WHERE EvaluatorRole__c = '${role}'
       AND EvaluationType__c = 'Consolidated'
       AND Status__c = 'InProgress'
       AND Template__r.ProjectSlug__c = '${slug.replace(/'/g, "\\'")}'
     ORDER BY StartedAt__c DESC
     LIMIT 1`,
  );
  if (rows.length === 0) return null;
  return getEvaluationById(rows[0].Id);
}

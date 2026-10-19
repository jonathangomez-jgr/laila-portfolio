import { sfQuery, sfCreate, sfUpdate } from "../salesforce";

// ============================================================================
// Types exposed to API routes + components
// ============================================================================

export type Severity = "Blocker" | "Critical" | "Nice-to-have";
export type Result = "Pass" | "Fail" | "NA";
export type EvaluationStatus = "InProgress" | "Submitted" | "Archived";
export type FinalDecision = "Si" | "No";
export type EvaluatorRole = "Client" | "Partner" | "Salesforce";

export type CriterionDTO = {
  id: string;
  categoryId: string;
  topic: string | null;
  givenWhenThen: string;
  severity: Severity;
  sortOrder: number;
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
};

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
  const tmpl = tmpls[0];

  const cats = await sfQuery<CategoryRow>(
    `SELECT Id, Name, Description__c, SortOrder__c
     FROM JGR_FDE_AcceptanceCategory__c
     WHERE Template__c = '${tmpl.Id}'
     ORDER BY SortOrder__c ASC`,
  );
  const crits = await sfQuery<CriterionRow>(
    `SELECT Id, Category__c, Topic__c, GivenWhenThen__c, Severity__c, SortOrder__c
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
};

const EVAL_SELECT_FIELDS = `Id, Name, Template__c, Evaluator__c, EvaluatorName__c, EvaluatorEmail__c, EvaluatorRole__c,
            Status__c, StartedAt__c, SubmittedAt__c, FinalDecision__c,
            ConfidenceLevel__c, FinalComment__c, CurrentPage__c`;

const RESPONSE_SELECT_FIELDS = `Id, Criterion__c, Result__c, Comment__c, AnsweredAt__c,
            AnsweredByPortalAccess__c, AnsweredByName__c, AnsweredByEmail__c`;

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

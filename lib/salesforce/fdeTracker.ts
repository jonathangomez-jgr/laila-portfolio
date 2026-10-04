import { sfCreate, sfQuery, sfUpdate } from "../salesforce";

export type FDEItem = {
  Id: string;
  Name: string;
  JGR_FDE_Item_Code__c: string | null;
  JGR_FDE_Title__c: string;
  JGR_FDE_Description__c: string | null;
  JGR_FDE_Risk__c: string | null;
  JGR_FDE_Recommendation__c: string | null;
  JGR_FDE_Actions__c: string | null;
  JGR_FDE_Priority__c: "Alta" | "Media" | "Baja" | null;
  JGR_FDE_Type__c: "Mejora" | "Bug" | "Riesgo" | "Decisión" | "Tarea" | null;
  JGR_FDE_Owner_Party__c:
    | "Salesforce"
    | "Cliente"
    | "Partner"
    | "Compartida"
    | null;
  JGR_FDE_Dependency__c: string | null;
  JGR_FDE_Status__c:
    | "Backlog"
    | "En Progreso"
    | "Bloqueado"
    | "En Revisión"
    | "Cerrado"
    | "Descartado"
    | null;
  JGR_FDE_Target_Date__c: string | null;
  JGR_FDE_Last_Update_Note__c: string | null;
  JGR_FDE_Last_Update_Date__c: string | null;
  LastModifiedDate: string;
};

export type FDEActivity = {
  Id: string;
  Name: string;
  JGR_FDE_Title__c: string;
  JGR_FDE_Description__c: string | null;
  JGR_FDE_Activity_Date__c: string | null;
  JGR_FDE_Category__c:
    | "Discovery"
    | "Diseño"
    | "Build"
    | "Testing"
    | "Deployment"
    | "Meeting"
    | "Documentación"
    | "Otro"
    | null;
  JGR_FDE_Owner_Party__c:
    | "Salesforce"
    | "Cliente"
    | "Partner"
    | "Compartida"
    | null;
  JGR_FDE_Author__c: string | null;
  JGR_FDE_Related_Item__c: string | null;
  RelatedItemCode: string | null;
};

export type FDEProject = {
  Id: string;
  Name: string;
  JGR_FDE_Project_Name__c: string;
  JGR_FDE_Description__c: string | null;
  JGR_FDE_Status__c: string | null;
  JGR_FDE_Start_Date__c: string | null;
  JGR_FDE_Target_End_Date__c: string | null;
  JGR_FDE_Partner__c: string | null;
  JGR_FDE_Portfolio_Slug__c: string | null;
  items: FDEItem[];
  activities: FDEActivity[];
};

const PROJECT_FIELDS = [
  "Id",
  "Name",
  "JGR_FDE_Project_Name__c",
  "JGR_FDE_Description__c",
  "JGR_FDE_Status__c",
  "JGR_FDE_Start_Date__c",
  "JGR_FDE_Target_End_Date__c",
  "JGR_FDE_Partner__c",
  "JGR_FDE_Portfolio_Slug__c",
].join(", ");

const ACTIVITY_FIELDS = [
  "Id",
  "Name",
  "JGR_FDE_Project__c",
  "JGR_FDE_Title__c",
  "JGR_FDE_Description__c",
  "JGR_FDE_Activity_Date__c",
  "JGR_FDE_Category__c",
  "JGR_FDE_Owner_Party__c",
  "JGR_FDE_Author__c",
  "JGR_FDE_Related_Item__c",
  "JGR_FDE_Related_Item__r.JGR_FDE_Item_Code__c",
  "LastModifiedDate",
].join(", ");

const ITEM_FIELDS = [
  "Id",
  "Name",
  "JGR_FDE_Project__c",
  "JGR_FDE_Item_Code__c",
  "JGR_FDE_Title__c",
  "JGR_FDE_Description__c",
  "JGR_FDE_Risk__c",
  "JGR_FDE_Recommendation__c",
  "JGR_FDE_Actions__c",
  "JGR_FDE_Priority__c",
  "JGR_FDE_Type__c",
  "JGR_FDE_Owner_Party__c",
  "JGR_FDE_Dependency__c",
  "JGR_FDE_Status__c",
  "JGR_FDE_Target_Date__c",
  "JGR_FDE_Last_Update_Note__c",
  "JGR_FDE_Last_Update_Date__c",
  "LastModifiedDate",
].join(", ");

function escapeSoql(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

// Fetch every FDE Project tagged with a given customer slug (matches customerProjects.ts
// slugs) that is enabled for the client portal, plus the items visible to the client,
// ordered by code.
export async function getTrackerForCustomer(
  customerSlug: string,
): Promise<FDEProject[]> {
  const safeSlug = escapeSoql(customerSlug);
  const projects = await sfQuery<Omit<FDEProject, "items">>(
    `SELECT ${PROJECT_FIELDS} FROM JGR_FDE_Project__c ` +
      `WHERE JGR_FDE_Customer_Slug__c = '${safeSlug}' ` +
      `AND JGR_FDE_Client_Portal_Enabled__c = true ` +
      `ORDER BY JGR_FDE_Start_Date__c NULLS LAST, Name`,
  );

  if (projects.length === 0) return [];

  const projectIds = projects.map((p) => `'${p.Id}'`).join(",");
  const items = await sfQuery<FDEItem & { JGR_FDE_Project__c: string }>(
    `SELECT ${ITEM_FIELDS} FROM JGR_FDE_Item__c ` +
      `WHERE JGR_FDE_Project__c IN (${projectIds}) ` +
      `AND JGR_FDE_Visible_To_Client__c = true ` +
      `ORDER BY JGR_FDE_Item_Code__c NULLS LAST, Name`,
  );

  const itemsByProject = new Map<string, FDEItem[]>();
  for (const item of items) {
    const bucket = itemsByProject.get(item.JGR_FDE_Project__c) ?? [];
    bucket.push(item);
    itemsByProject.set(item.JGR_FDE_Project__c, bucket);
  }

  type ActivityRow = Omit<FDEActivity, "RelatedItemCode"> & {
    JGR_FDE_Project__c: string;
    JGR_FDE_Related_Item__r?: { JGR_FDE_Item_Code__c: string | null } | null;
  };
  const activityRows = await sfQuery<ActivityRow>(
    `SELECT ${ACTIVITY_FIELDS} FROM JGR_FDE_Activity__c ` +
      `WHERE JGR_FDE_Project__c IN (${projectIds}) ` +
      `AND JGR_FDE_Visible_To_Client__c = true ` +
      `ORDER BY JGR_FDE_Activity_Date__c DESC NULLS LAST, LastModifiedDate DESC`,
  );

  const activitiesByProject = new Map<string, FDEActivity[]>();
  for (const row of activityRows) {
    const activity: FDEActivity = {
      Id: row.Id,
      Name: row.Name,
      JGR_FDE_Title__c: row.JGR_FDE_Title__c,
      JGR_FDE_Description__c: row.JGR_FDE_Description__c,
      JGR_FDE_Activity_Date__c: row.JGR_FDE_Activity_Date__c,
      JGR_FDE_Category__c: row.JGR_FDE_Category__c,
      JGR_FDE_Owner_Party__c: row.JGR_FDE_Owner_Party__c,
      JGR_FDE_Author__c: row.JGR_FDE_Author__c,
      JGR_FDE_Related_Item__c: row.JGR_FDE_Related_Item__c,
      RelatedItemCode: row.JGR_FDE_Related_Item__r?.JGR_FDE_Item_Code__c ?? null,
    };
    const bucket = activitiesByProject.get(row.JGR_FDE_Project__c) ?? [];
    bucket.push(activity);
    activitiesByProject.set(row.JGR_FDE_Project__c, bucket);
  }

  return projects.map((p) => ({
    ...p,
    items: itemsByProject.get(p.Id) ?? [],
    activities: activitiesByProject.get(p.Id) ?? [],
  }));
}

async function getNextItemCode(projectId: string): Promise<string> {
  const rows = await sfQuery<{ JGR_FDE_Item_Code__c: string | null }>(
    `SELECT JGR_FDE_Item_Code__c FROM JGR_FDE_Item__c ` +
      `WHERE JGR_FDE_Project__c = '${escapeSoql(projectId)}'`,
  );
  let max = 0;
  for (const row of rows) {
    const match = row.JGR_FDE_Item_Code__c?.match(/^AI-(\d+)$/i);
    if (match) {
      const n = parseInt(match[1], 10);
      if (n > max) max = n;
    }
  }
  return `AI-${String(max + 1).padStart(2, "0")}`;
}

export type NewFDEItemInput = {
  projectId: string;
  title: string;
  description?: string;
  risk?: string;
  recommendation?: string;
  actions?: string;
  priority?: "Alta" | "Media" | "Baja";
  type?: "Mejora" | "Bug" | "Riesgo" | "Decisión" | "Tarea";
  ownerParty?: "Salesforce" | "Cliente" | "Partner" | "Compartida";
  dependency?: string;
  targetDate?: string;
};

export async function createFDEItem(
  input: NewFDEItemInput,
): Promise<{ id: string; code: string }> {
  const code = await getNextItemCode(input.projectId);
  const fields: Record<string, unknown> = {
    JGR_FDE_Project__c: input.projectId,
    JGR_FDE_Item_Code__c: code,
    JGR_FDE_Title__c: input.title,
    JGR_FDE_Status__c: "Backlog",
    JGR_FDE_Visible_To_Client__c: true,
    JGR_FDE_Priority__c: input.priority ?? "Media",
    JGR_FDE_Type__c: input.type ?? "Mejora",
    JGR_FDE_Owner_Party__c: input.ownerParty ?? "Cliente",
  };
  if (input.description) fields.JGR_FDE_Description__c = input.description;
  if (input.risk) fields.JGR_FDE_Risk__c = input.risk;
  if (input.recommendation)
    fields.JGR_FDE_Recommendation__c = input.recommendation;
  if (input.actions) fields.JGR_FDE_Actions__c = input.actions;
  if (input.dependency) fields.JGR_FDE_Dependency__c = input.dependency;
  if (input.targetDate) fields.JGR_FDE_Target_Date__c = input.targetDate;

  const result = await sfCreate("JGR_FDE_Item__c", fields);
  return { id: result.id, code };
}

export type ItemStatus =
  | "Backlog"
  | "En Progreso"
  | "Bloqueado"
  | "En Revisión"
  | "Cerrado"
  | "Descartado";

export async function updateItemStatus(
  itemId: string,
  status: ItemStatus,
  note?: string,
): Promise<void> {
  const fields: Record<string, unknown> = {
    JGR_FDE_Status__c: status,
  };
  if (note && note.trim().length > 0) {
    fields.JGR_FDE_Last_Update_Note__c = note.trim();
    fields.JGR_FDE_Last_Update_Date__c = new Date().toISOString().slice(0, 10);
  }
  await sfUpdate("JGR_FDE_Item__c", itemId, fields);
}

export type NewFDEActivityInput = {
  projectId: string;
  title: string;
  description?: string;
  activityDate?: string;
  category?:
    | "Discovery"
    | "Diseño"
    | "Build"
    | "Testing"
    | "Deployment"
    | "Meeting"
    | "Documentación"
    | "Otro";
  ownerParty?: "Salesforce" | "Cliente" | "Partner" | "Compartida";
  author?: string;
  relatedItemId?: string;
};

export async function createFDEActivity(
  input: NewFDEActivityInput,
): Promise<{ id: string }> {
  const fields: Record<string, unknown> = {
    JGR_FDE_Project__c: input.projectId,
    JGR_FDE_Title__c: input.title,
    JGR_FDE_Visible_To_Client__c: true,
    JGR_FDE_Category__c: input.category ?? "Build",
    JGR_FDE_Owner_Party__c: input.ownerParty ?? "Salesforce",
    JGR_FDE_Activity_Date__c:
      input.activityDate ?? new Date().toISOString().slice(0, 10),
  };
  if (input.description) fields.JGR_FDE_Description__c = input.description;
  if (input.author) fields.JGR_FDE_Author__c = input.author;
  if (input.relatedItemId)
    fields.JGR_FDE_Related_Item__c = input.relatedItemId;

  return sfCreate("JGR_FDE_Activity__c", fields);
}

// ============================================================================
// Test Matrix (FDE Test Cases + Executions)
// ============================================================================

export type FDETestCaseStatus = "Pass" | "Fail" | "Blocked" | "Partial" | "Not_Run";

export type FDETestExecution = {
  Id: string;
  Name: string;
  JGR_FDE_TestCase__c: string;
  JGR_FDE_Executed_Date__c: string;
  JGR_FDE_Environment__c: string | null;
  JGR_FDE_Agent_Version__c: string | null;
  JGR_FDE_Agent_Build__c: number | null;
  JGR_FDE_Status__c: FDETestCaseStatus | null;
  JGR_FDE_Actual_Result__c: string | null;
  JGR_FDE_Defect_Notes__c: string | null;
  JGR_FDE_Executed_By_Name__c: string | null;
  JGR_FDE_Transcript__c: string | null;
};

export type FDETestCase = {
  Id: string;
  Name: string;
  JGR_FDE_Test_Code__c: string;
  JGR_FDE_Title__c: string;
  JGR_FDE_Description__c: string | null;
  JGR_FDE_Category__c: string | null;
  JGR_FDE_Priority__c: "Alta" | "Media" | "Baja" | null;
  JGR_FDE_Scenario_Type__c: string | null;
  JGR_FDE_Source__c: string | null;
  JGR_FDE_Prerequisites__c: string | null;
  JGR_FDE_Steps__c: string | null;
  JGR_FDE_Expected_Result__c: string | null;
  JGR_FDE_Related_Finding__c: string | null;
  JGR_FDE_Is_Active__c: boolean;
  LastModifiedDate: string;
  executions: FDETestExecution[];
};

const TESTCASE_FIELDS = [
  "Id",
  "Name",
  "JGR_FDE_Test_Code__c",
  "JGR_FDE_Title__c",
  "JGR_FDE_Description__c",
  "JGR_FDE_Category__c",
  "JGR_FDE_Priority__c",
  "JGR_FDE_Scenario_Type__c",
  "JGR_FDE_Source__c",
  "JGR_FDE_Prerequisites__c",
  "JGR_FDE_Steps__c",
  "JGR_FDE_Expected_Result__c",
  "JGR_FDE_Related_Finding__c",
  "JGR_FDE_Is_Active__c",
  "LastModifiedDate",
].join(", ");

const EXECUTION_FIELDS = [
  "Id",
  "Name",
  "JGR_FDE_TestCase__c",
  "JGR_FDE_Executed_Date__c",
  "JGR_FDE_Environment__c",
  "JGR_FDE_Agent_Version__c",
  "JGR_FDE_Agent_Build__c",
  "JGR_FDE_Status__c",
  "JGR_FDE_Actual_Result__c",
  "JGR_FDE_Defect_Notes__c",
  "JGR_FDE_Executed_By_Name__c",
  "JGR_FDE_Transcript__c",
].join(", ");

export async function getTestMatrixForCustomer(
  customerSlug: string,
): Promise<FDETestCase[]> {
  const safeSlug = escapeSoql(customerSlug);
  const projects = await sfQuery<{ Id: string }>(
    `SELECT Id FROM JGR_FDE_Project__c ` +
      `WHERE JGR_FDE_Customer_Slug__c = '${safeSlug}'`,
  );
  if (projects.length === 0) return [];
  const projectIds = projects.map((p) => `'${p.Id}'`).join(",");

  const cases = await sfQuery<FDETestCase>(
    `SELECT ${TESTCASE_FIELDS} FROM JGR_FDE_TestCase__c ` +
      `WHERE JGR_FDE_Project__c IN (${projectIds}) ` +
      `AND JGR_FDE_Is_Active__c = true ` +
      `ORDER BY JGR_FDE_Test_Code__c`,
  );

  if (cases.length === 0) return [];

  const caseIds = cases.map((c) => `'${c.Id}'`).join(",");
  const executions = await sfQuery<FDETestExecution>(
    `SELECT ${EXECUTION_FIELDS} FROM JGR_FDE_TestExecution__c ` +
      `WHERE JGR_FDE_TestCase__c IN (${caseIds}) ` +
      `ORDER BY JGR_FDE_Executed_Date__c DESC`,
  );

  const byCase = new Map<string, FDETestExecution[]>();
  for (const e of executions) {
    const bucket = byCase.get(e.JGR_FDE_TestCase__c) ?? [];
    bucket.push(e);
    byCase.set(e.JGR_FDE_TestCase__c, bucket);
  }

  return cases.map((c) => ({
    ...c,
    executions: (byCase.get(c.Id) ?? []).slice(0, 10),
  }));
}

export type NewTestExecutionInput = {
  testCaseId: string;
  environment: string;
  agentVersion: string | null;
  agentBuild?: number | null;
  status: FDETestCaseStatus;
  actualResult: string;
  defectNotes?: string;
  executedByName: string;
  transcript?: string;
};

export async function createTestExecution(
  input: NewTestExecutionInput,
): Promise<string> {
  const fields: Record<string, unknown> = {
    JGR_FDE_TestCase__c: input.testCaseId,
    JGR_FDE_Executed_Date__c: new Date().toISOString(),
    JGR_FDE_Environment__c: input.environment,
    JGR_FDE_Status__c: input.status,
    JGR_FDE_Actual_Result__c: input.actualResult,
    JGR_FDE_Executed_By_Name__c: input.executedByName,
  };
  if (input.agentVersion) fields.JGR_FDE_Agent_Version__c = input.agentVersion;
  if (input.agentBuild != null) fields.JGR_FDE_Agent_Build__c = input.agentBuild;
  if (input.defectNotes) fields.JGR_FDE_Defect_Notes__c = input.defectNotes;
  if (input.transcript) fields.JGR_FDE_Transcript__c = input.transcript;
  const result = await sfCreate("JGR_FDE_TestExecution__c", fields);
  return result.id;
}

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

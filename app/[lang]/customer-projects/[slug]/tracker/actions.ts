"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import {
  createFDEActivity,
  createFDEItem,
  updateItemStatus,
  type ItemStatus,
} from "@/lib/salesforce/fdeTracker";

const PRIORITY_SET = new Set(["Alta", "Media", "Baja"]);
const TYPE_SET = new Set(["Mejora", "Bug", "Riesgo", "Decisión", "Tarea"]);
const OWNER_SET = new Set(["Salesforce", "Cliente", "Partner", "Compartida"]);
const ITEM_STATUS_SET = new Set<ItemStatus>([
  "Backlog",
  "En Progreso",
  "Bloqueado",
  "En Revisión",
  "Cerrado",
  "Descartado",
]);
const ACTIVITY_CATEGORY_SET = new Set([
  "Discovery",
  "Diseño",
  "Build",
  "Testing",
  "Deployment",
  "Meeting",
  "Documentación",
  "Otro",
]);

function pick(
  value: FormDataEntryValue | null,
  allowed: Set<string>,
): string | undefined {
  if (typeof value !== "string") return undefined;
  return allowed.has(value) ? value : undefined;
}

function trimmed(value: FormDataEntryValue | null): string | undefined {
  if (typeof value !== "string") return undefined;
  const t = value.trim();
  return t.length === 0 ? undefined : t;
}

export type CreateItemResult =
  | { ok: true; code: string; id: string }
  | { ok: false; error: string };

export async function createItemAction(
  params: { lang: string; slug: string },
  _prev: CreateItemResult | null,
  formData: FormData,
): Promise<CreateItemResult> {
  const cookieStore = await cookies();
  const hasAccess =
    cookieStore.get(`project-access-${params.slug}`)?.value === "granted" ||
    cookieStore.get("projects-section-access")?.value === "granted";
  if (!hasAccess) {
    return { ok: false, error: "Sesión sin acceso. Recarga e ingresa el código de acceso." };
  }

  const projectId = trimmed(formData.get("projectId"));
  const title = trimmed(formData.get("title"));
  if (!projectId) return { ok: false, error: "Falta el proyecto." };
  if (!title) return { ok: false, error: "El título es obligatorio." };

  try {
    const result = await createFDEItem({
      projectId,
      title,
      description: trimmed(formData.get("description")),
      risk: trimmed(formData.get("risk")),
      recommendation: trimmed(formData.get("recommendation")),
      actions: trimmed(formData.get("actions")),
      priority: pick(formData.get("priority"), PRIORITY_SET) as
        | "Alta"
        | "Media"
        | "Baja"
        | undefined,
      type: pick(formData.get("type"), TYPE_SET) as
        | "Mejora"
        | "Bug"
        | "Riesgo"
        | "Decisión"
        | "Tarea"
        | undefined,
      ownerParty: pick(formData.get("ownerParty"), OWNER_SET) as
        | "Salesforce"
        | "Cliente"
        | "Partner"
        | "Compartida"
        | undefined,
      dependency: trimmed(formData.get("dependency")),
      targetDate: trimmed(formData.get("targetDate")),
    });

    revalidatePath(
      `/${params.lang}/customer-projects/${params.slug}/tracker`,
    );
    return { ok: true, code: result.code, id: result.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    return { ok: false, error: message };
  }
}

export type UpdateStatusResult =
  | { ok: true; status: ItemStatus }
  | { ok: false; error: string };

export async function updateItemStatusAction(
  params: { lang: string; slug: string },
  _prev: UpdateStatusResult | null,
  formData: FormData,
): Promise<UpdateStatusResult> {
  const cookieStore = await cookies();
  const hasAccess =
    cookieStore.get(`project-access-${params.slug}`)?.value === "granted" ||
    cookieStore.get("projects-section-access")?.value === "granted";
  if (!hasAccess) {
    return { ok: false, error: "Sesión sin acceso." };
  }

  const itemId = trimmed(formData.get("itemId"));
  const rawStatus = formData.get("status");
  const note = trimmed(formData.get("note"));

  if (!itemId) return { ok: false, error: "Falta el item." };
  if (typeof rawStatus !== "string" || !ITEM_STATUS_SET.has(rawStatus as ItemStatus)) {
    return { ok: false, error: "Estado inválido." };
  }
  const status = rawStatus as ItemStatus;

  try {
    await updateItemStatus(itemId, status, note);
    revalidatePath(
      `/${params.lang}/customer-projects/${params.slug}/tracker`,
    );
    return { ok: true, status };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    return { ok: false, error: message };
  }
}

export type CreateActivityResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

export async function createActivityAction(
  params: { lang: string; slug: string },
  _prev: CreateActivityResult | null,
  formData: FormData,
): Promise<CreateActivityResult> {
  const cookieStore = await cookies();
  const hasAccess =
    cookieStore.get(`project-access-${params.slug}`)?.value === "granted" ||
    cookieStore.get("projects-section-access")?.value === "granted";
  if (!hasAccess) {
    return { ok: false, error: "Sesión sin acceso." };
  }

  const projectId = trimmed(formData.get("projectId"));
  const title = trimmed(formData.get("title"));
  if (!projectId) return { ok: false, error: "Falta el proyecto." };
  if (!title) return { ok: false, error: "El título es obligatorio." };

  try {
    const result = await createFDEActivity({
      projectId,
      title,
      description: trimmed(formData.get("description")),
      activityDate: trimmed(formData.get("activityDate")),
      category: pick(formData.get("category"), ACTIVITY_CATEGORY_SET) as
        | "Discovery"
        | "Diseño"
        | "Build"
        | "Testing"
        | "Deployment"
        | "Meeting"
        | "Documentación"
        | "Otro"
        | undefined,
      ownerParty: pick(formData.get("ownerParty"), OWNER_SET) as
        | "Salesforce"
        | "Cliente"
        | "Partner"
        | "Compartida"
        | undefined,
      author: trimmed(formData.get("author")),
      relatedItemId: trimmed(formData.get("relatedItemId")),
    });
    revalidatePath(
      `/${params.lang}/customer-projects/${params.slug}/tracker`,
    );
    return { ok: true, id: result.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    return { ok: false, error: message };
  }
}

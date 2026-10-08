"use server";

import { revalidatePath } from "next/cache";
import {
  createFDEActivity,
  createFDEItem,
  updateItemStatus,
  type ItemStatus,
} from "@/lib/salesforce/fdeTracker";
import { getCurrentUser, userHasAccessToSlug } from "@/lib/portalAuth";
import type {
  CreateActivityResult,
  CreateItemResult,
  UpdateStatusResult,
} from "@/app/[lang]/customer-projects/[slug]/tracker/actions";

// Re-export the types so client components can import either path interchangeably.
export type {
  CreateActivityResult,
  CreateItemResult,
  UpdateStatusResult,
} from "@/app/[lang]/customer-projects/[slug]/tracker/actions";

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

function pick(value: FormDataEntryValue | null, allowed: Set<string>): string | undefined {
  if (typeof value !== "string") return undefined;
  return allowed.has(value) ? value : undefined;
}

function trimmed(value: FormDataEntryValue | null): string | undefined {
  if (typeof value !== "string") return undefined;
  const t = value.trim();
  return t.length === 0 ? undefined : t;
}

async function gate(slug: string) {
  const user = await getCurrentUser();
  if (!user) return { ok: false as const, error: "Sesión expirada. Vuelve a iniciar sesión en el portal." };
  if (!userHasAccessToSlug(user, slug)) {
    return { ok: false as const, error: "Tu cuenta no tiene acceso a este proyecto." };
  }
  return { ok: true as const, user };
}

export async function createPortalItemAction(
  params: { slug: string },
  _prev: CreateItemResult | null,
  formData: FormData,
): Promise<CreateItemResult> {
  const g = await gate(params.slug);
  if (!g.ok) return { ok: false, error: g.error };

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
    revalidatePath(`/portal/${params.slug}`);
    return { ok: true, code: result.code, id: result.id };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Error desconocido" };
  }
}

export async function updatePortalItemStatusAction(
  params: { slug: string },
  _prev: UpdateStatusResult | null,
  formData: FormData,
): Promise<UpdateStatusResult> {
  const g = await gate(params.slug);
  if (!g.ok) return { ok: false, error: g.error };

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
    revalidatePath(`/portal/${params.slug}`);
    return { ok: true, status };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Error desconocido" };
  }
}

export async function createPortalActivityAction(
  params: { slug: string },
  _prev: CreateActivityResult | null,
  formData: FormData,
): Promise<CreateActivityResult> {
  const g = await gate(params.slug);
  if (!g.ok) return { ok: false, error: g.error };

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
      author: trimmed(formData.get("author")) ?? g.user.name,
      relatedItemId: trimmed(formData.get("relatedItemId")),
    });
    revalidatePath(`/portal/${params.slug}`);
    return { ok: true, id: result.id };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Error desconocido" };
  }
}

import Link from "next/link";
import type { FDEActivity, FDEItem, FDEProject } from "@/lib/salesforce/fdeTracker";
import FDEItemCreator from "@/components/FDEItemCreator";
import FDEItemStatusEditor from "@/components/FDEItemStatusEditor";
import FDEActivityCreator from "@/components/FDEActivityCreator";
import type {
  CreateActivityResult,
  CreateItemResult,
  UpdateStatusResult,
} from "@/app/[lang]/customer-projects/[slug]/tracker/actions";

export type TrackerTab = "backlog" | "activities";

const STATUS_ORDER: Array<FDEItem["JGR_FDE_Status__c"]> = [
  "En Progreso",
  "Bloqueado",
  "En Revisión",
  "Backlog",
  "Cerrado",
  "Descartado",
];

const STATUS_STYLES: Record<string, string> = {
  "En Progreso": "bg-emerald-50 text-emerald-700 border-emerald-200",
  Bloqueado: "bg-rose-50 text-rose-700 border-rose-200",
  "En Revisión": "bg-amber-50 text-amber-800 border-amber-200",
  Backlog: "bg-slate-50 text-slate-700 border-slate-200",
  Cerrado: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Descartado: "bg-neutral-50 text-neutral-500 border-neutral-200",
};

const PRIORITY_STYLES: Record<string, string> = {
  Alta: "bg-rose-100 text-rose-800",
  Media: "bg-amber-100 text-amber-800",
  Baja: "bg-slate-100 text-slate-700",
};

const TYPE_STYLES: Record<string, string> = {
  Mejora: "bg-indigo-100 text-indigo-800",
  Bug: "bg-rose-100 text-rose-800",
  Riesgo: "bg-orange-100 text-orange-800",
  Decisión: "bg-violet-100 text-violet-800",
  Tarea: "bg-sky-100 text-sky-800",
};

const CATEGORY_STYLES: Record<string, string> = {
  Discovery: "bg-violet-100 text-violet-800",
  Diseño: "bg-fuchsia-100 text-fuchsia-800",
  Build: "bg-emerald-100 text-emerald-800",
  Testing: "bg-amber-100 text-amber-800",
  Deployment: "bg-indigo-100 text-indigo-800",
  Meeting: "bg-sky-100 text-sky-800",
  Documentación: "bg-slate-100 text-slate-700",
  Otro: "bg-gray-100 text-gray-700",
};

function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function Chip({ label, className }: { label: string; className: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}
    >
      {label}
    </span>
  );
}

function Section({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  if (!value?.trim()) return null;
  return (
    <div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p className="whitespace-pre-line text-sm leading-6 text-gray-700">
        {value}
      </p>
    </div>
  );
}

type BoundCreateItemAction = (
  prev: CreateItemResult | null,
  formData: FormData,
) => Promise<CreateItemResult>;

type BoundUpdateStatusAction = (
  prev: UpdateStatusResult | null,
  formData: FormData,
) => Promise<UpdateStatusResult>;

type BoundCreateActivityAction = (
  prev: CreateActivityResult | null,
  formData: FormData,
) => Promise<CreateActivityResult>;

function ItemCard({
  item,
  boundUpdateStatusAction,
}: {
  item: FDEItem;
  boundUpdateStatusAction: BoundUpdateStatusAction;
}) {
  const code = item.JGR_FDE_Item_Code__c ?? item.Name;
  return (
    <article className="soft-card overflow-hidden p-6">
      <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mb-1 text-xs font-mono uppercase tracking-wider text-indigo-600">
            {code}
          </p>
          <h3 className="text-lg font-semibold text-gray-950">
            {item.JGR_FDE_Title__c}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {item.JGR_FDE_Priority__c && (
            <Chip
              label={item.JGR_FDE_Priority__c}
              className={
                PRIORITY_STYLES[item.JGR_FDE_Priority__c] ??
                "bg-gray-100 text-gray-700"
              }
            />
          )}
          {item.JGR_FDE_Type__c && (
            <Chip
              label={item.JGR_FDE_Type__c}
              className={
                TYPE_STYLES[item.JGR_FDE_Type__c] ?? "bg-gray-100 text-gray-700"
              }
            />
          )}
          {item.JGR_FDE_Owner_Party__c && (
            <Chip
              label={item.JGR_FDE_Owner_Party__c}
              className="bg-gray-100 text-gray-700"
            />
          )}
        </div>
      </header>

      <div className="mb-4">
        <FDEItemStatusEditor
          itemId={item.Id}
          currentStatus={item.JGR_FDE_Status__c ?? "Backlog"}
          boundAction={boundUpdateStatusAction}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Section
          label="Comportamiento actual"
          value={item.JGR_FDE_Description__c}
        />
        <Section label="Riesgo potencial" value={item.JGR_FDE_Risk__c} />
        <Section label="Recomendación" value={item.JGR_FDE_Recommendation__c} />
        <Section label="Acciones a realizar" value={item.JGR_FDE_Actions__c} />
      </div>

      {(item.JGR_FDE_Last_Update_Note__c ||
        item.JGR_FDE_Dependency__c ||
        item.JGR_FDE_Target_Date__c) && (
        <div className="mt-4 border-t border-gray-100 pt-4">
          {item.JGR_FDE_Last_Update_Note__c && (
            <div className="mb-2">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Último avance
                {item.JGR_FDE_Last_Update_Date__c && (
                  <span className="ml-2 font-normal normal-case text-gray-400">
                    · {formatDate(item.JGR_FDE_Last_Update_Date__c)}
                  </span>
                )}
              </p>
              <p className="whitespace-pre-line text-sm leading-6 text-gray-700">
                {item.JGR_FDE_Last_Update_Note__c}
              </p>
            </div>
          )}
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-500">
            {item.JGR_FDE_Dependency__c && (
              <span>
                <span className="font-semibold">Dependencia:</span>{" "}
                {item.JGR_FDE_Dependency__c}
              </span>
            )}
            {item.JGR_FDE_Target_Date__c && (
              <span>
                <span className="font-semibold">Fecha objetivo:</span>{" "}
                {formatDate(item.JGR_FDE_Target_Date__c)}
              </span>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

function ActivityCard({ activity }: { activity: FDEActivity }) {
  return (
    <article className="soft-card p-5">
      <header className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div className="flex-1">
          <p className="mb-1 text-xs font-mono uppercase tracking-wider text-emerald-600">
            {activity.Name}
            {activity.JGR_FDE_Activity_Date__c && (
              <span className="ml-2 text-gray-400">
                · {formatDate(activity.JGR_FDE_Activity_Date__c)}
              </span>
            )}
          </p>
          <h3 className="text-base font-semibold text-gray-950">
            {activity.JGR_FDE_Title__c}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {activity.JGR_FDE_Category__c && (
            <Chip
              label={activity.JGR_FDE_Category__c}
              className={
                CATEGORY_STYLES[activity.JGR_FDE_Category__c] ??
                "bg-gray-100 text-gray-700"
              }
            />
          )}
          {activity.JGR_FDE_Owner_Party__c && (
            <Chip
              label={activity.JGR_FDE_Owner_Party__c}
              className="bg-gray-100 text-gray-700"
            />
          )}
        </div>
      </header>

      {activity.JGR_FDE_Description__c && (
        <p className="whitespace-pre-line text-sm leading-6 text-gray-700">
          {activity.JGR_FDE_Description__c}
        </p>
      )}

      {(activity.JGR_FDE_Author__c || activity.RelatedItemCode) && (
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 border-t border-gray-100 pt-3 text-xs text-gray-500">
          {activity.JGR_FDE_Author__c && (
            <span>
              <span className="font-semibold">Autor:</span>{" "}
              {activity.JGR_FDE_Author__c}
            </span>
          )}
          {activity.RelatedItemCode && (
            <span>
              <span className="font-semibold">Item relacionado:</span>{" "}
              <span className="font-mono">{activity.RelatedItemCode}</span>
            </span>
          )}
        </div>
      )}
    </article>
  );
}

function ProjectBacklog({
  project,
  boundCreateItemAction,
  boundUpdateStatusAction,
}: {
  project: FDEProject;
  boundCreateItemAction: BoundCreateItemAction;
  boundUpdateStatusAction: BoundUpdateStatusAction;
}) {
  const grouped = new Map<string, FDEItem[]>();
  for (const item of project.items) {
    const key = item.JGR_FDE_Status__c ?? "Backlog";
    const bucket = grouped.get(key) ?? [];
    bucket.push(item);
    grouped.set(key, bucket);
  }
  const orderedStatuses = STATUS_ORDER.filter(
    (s) => s && grouped.has(s),
  ) as string[];

  return (
    <>
      <FDEItemCreator
        projectId={project.Id}
        projectName={project.JGR_FDE_Project_Name__c}
        boundAction={boundCreateItemAction}
      />

      {project.items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-gray-200 p-8 text-center text-sm text-gray-500">
          Aún no hay items visibles para este proyecto.
        </p>
      ) : (
        <div className="space-y-8">
          {orderedStatuses.map((status) => {
            const items = grouped.get(status) ?? [];
            return (
              <div key={status}>
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${STATUS_STYLES[status] ?? "bg-gray-50 text-gray-700 border-gray-200"}`}
                  >
                    {status}
                  </span>
                  <span className="text-xs text-gray-400">
                    {items.length} {items.length === 1 ? "item" : "items"}
                  </span>
                </div>
                <div className="space-y-4">
                  {items.map((item) => (
                    <ItemCard
                      key={item.Id}
                      item={item}
                      boundUpdateStatusAction={boundUpdateStatusAction}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

function ProjectActivities({
  project,
  boundCreateActivityAction,
}: {
  project: FDEProject;
  boundCreateActivityAction: BoundCreateActivityAction;
}) {
  return (
    <>
      <FDEActivityCreator
        projectId={project.Id}
        projectName={project.JGR_FDE_Project_Name__c}
        items={project.items}
        boundAction={boundCreateActivityAction}
      />

      {project.activities.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-gray-200 p-8 text-center text-sm text-gray-500">
          Aún no hay actividades registradas para este proyecto.
        </p>
      ) : (
        <div className="space-y-4">
          {project.activities.map((activity) => (
            <ActivityCard key={activity.Id} activity={activity} />
          ))}
        </div>
      )}
    </>
  );
}

function ProjectBlock({
  project,
  tab,
  boundCreateItemAction,
  boundUpdateStatusAction,
  boundCreateActivityAction,
}: {
  project: FDEProject;
  tab: TrackerTab;
  boundCreateItemAction: BoundCreateItemAction;
  boundUpdateStatusAction: BoundUpdateStatusAction;
  boundCreateActivityAction: BoundCreateActivityAction;
}) {
  return (
    <section className="mb-12">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <p className="eyebrow mb-2">Proyecto · {project.Name}</p>
          <h2 className="text-2xl font-semibold text-gray-950 sm:text-3xl">
            {project.JGR_FDE_Project_Name__c}
          </h2>
          {project.JGR_FDE_Description__c && (
            <p className="mt-2 max-w-3xl leading-7 text-gray-600">
              {project.JGR_FDE_Description__c}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2 text-right text-xs text-gray-500">
          {project.JGR_FDE_Status__c && (
            <Chip
              label={project.JGR_FDE_Status__c}
              className="bg-indigo-100 text-indigo-800"
            />
          )}
          {(project.JGR_FDE_Start_Date__c ||
            project.JGR_FDE_Target_End_Date__c) && (
            <span>
              {formatDate(project.JGR_FDE_Start_Date__c) ?? "…"} →{" "}
              {formatDate(project.JGR_FDE_Target_End_Date__c) ?? "…"}
            </span>
          )}
          {project.JGR_FDE_Partner__c && (
            <span>Partner: {project.JGR_FDE_Partner__c}</span>
          )}
        </div>
      </header>

      {tab === "backlog" ? (
        <ProjectBacklog
          project={project}
          boundCreateItemAction={boundCreateItemAction}
          boundUpdateStatusAction={boundUpdateStatusAction}
        />
      ) : (
        <ProjectActivities
          project={project}
          boundCreateActivityAction={boundCreateActivityAction}
        />
      )}
    </section>
  );
}

function TabLink({
  label,
  count,
  href,
  active,
}: {
  label: string;
  count: number;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition ${
        active
          ? "border-indigo-500 bg-indigo-600 text-white shadow-sm"
          : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
      }`}
    >
      {label}
      <span
        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-bold ${
          active ? "bg-white/25 text-white" : "bg-gray-100 text-gray-600"
        }`}
      >
        {count}
      </span>
    </Link>
  );
}

export default function FDETracker({
  projects,
  customerName,
  lang,
  slug,
  tab,
  lastRefreshedAt,
  boundCreateItemAction,
  boundUpdateStatusAction,
  boundCreateActivityAction,
}: {
  projects: FDEProject[];
  customerName: string;
  lang: string;
  slug: string;
  tab: TrackerTab;
  lastRefreshedAt: Date;
  boundCreateItemAction: BoundCreateItemAction;
  boundUpdateStatusAction: BoundUpdateStatusAction;
  boundCreateActivityAction: BoundCreateActivityAction;
}) {
  const timestamp = lastRefreshedAt.toLocaleString("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const totalItems = projects.reduce((n, p) => n + p.items.length, 0);
  const totalActivities = projects.reduce(
    (n, p) => n + p.activities.length,
    0,
  );

  const baseHref = `/${lang}/customer-projects/${slug}/tracker`;

  return (
    <main className="px-4 pb-16 pt-10 sm:px-6 sm:pt-12 md:px-8 md:pt-16">
      <section className="mx-auto w-full sm:w-[min(90%,1400px)]">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <p className="eyebrow mb-3">{customerName} · Delivery Tracker</p>
            <h1 className="section-title max-w-4xl text-3xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
              Seguimiento de proyectos
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
              Vista en vivo del backlog, action items, actividades realizadas
              y avances registrados en la org Salesforce del equipo
              Agentforce. Filtrada por visibilidad al cliente.
            </p>
          </div>
          <p className="text-xs text-gray-400">
            Última actualización · {timestamp}
          </p>
        </div>

        <nav className="mb-8 flex flex-wrap gap-3">
          <TabLink
            label="Backlog y action items"
            count={totalItems}
            href={`${baseHref}?tab=backlog`}
            active={tab === "backlog"}
          />
          <TabLink
            label="Actividades realizadas"
            count={totalActivities}
            href={`${baseHref}?tab=activities`}
            active={tab === "activities"}
          />
        </nav>

        {projects.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-200 p-12 text-center">
            <p className="text-gray-500">
              No hay proyectos activos con vista al portal para {customerName}.
            </p>
          </div>
        ) : (
          projects.map((project) => (
            <ProjectBlock
              key={project.Id}
              project={project}
              tab={tab}
              boundCreateItemAction={boundCreateItemAction}
              boundUpdateStatusAction={boundUpdateStatusAction}
              boundCreateActivityAction={boundCreateActivityAction}
            />
          ))
        )}
      </section>
    </main>
  );
}

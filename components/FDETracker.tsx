import Link from "next/link";
import type { FDEActivity, FDEProject } from "@/lib/salesforce/fdeTracker";
import FDEActivityCreator from "@/components/FDEActivityCreator";
import FDEProjectBacklogBoard from "@/components/FDEProjectBacklogBoard";
import type {
  CreateActivityResult,
  CreateItemResult,
  UpdateStatusResult,
} from "@/app/[lang]/customer-projects/[slug]/tracker/actions";

export type TrackerTab = "backlog" | "activities";

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
  return (
    <FDEProjectBacklogBoard
      projectId={project.Id}
      projectName={project.JGR_FDE_Project_Name__c}
      items={project.items}
      boundCreateItemAction={boundCreateItemAction}
      boundUpdateStatusAction={boundUpdateStatusAction}
    />
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
  tabsHrefBuilder,
  heading = "Seguimiento de proyectos",
  subheading,
  hideInnerNav = false,
  hideHeader = false,
  hideTimestamp = false,
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
  tabsHrefBuilder?: (tab: TrackerTab) => string;
  heading?: string;
  subheading?: string;
  hideInnerNav?: boolean;
  hideHeader?: boolean;
  hideTimestamp?: boolean;
}) {
  void lang; // retained for API compatibility; unused when tabsHrefBuilder is provided
  const timestamp = lastRefreshedAt.toLocaleString("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const totalItems = projects.reduce((n, p) => n + p.items.length, 0);
  const totalActivities = projects.reduce(
    (n, p) => n + p.activities.length,
    0,
  );

  const defaultBaseHref = `/${lang}/customer-projects/${slug}/tracker`;
  const buildHref = (t: TrackerTab) =>
    tabsHrefBuilder ? tabsHrefBuilder(t) : `${defaultBaseHref}?tab=${t}`;

  return (
    <main className={hideHeader ? "" : "px-4 pb-16 pt-10 sm:px-6 sm:pt-12 md:px-8 md:pt-16"}>
      <section className={hideHeader ? "mx-auto w-full" : "mx-auto w-full sm:w-[min(90%,1400px)]"}>
        {!hideHeader && (
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <p className="eyebrow mb-3">{customerName} · Delivery Tracker</p>
              <h1 className="section-title max-w-4xl text-3xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
                {heading}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
                {subheading ??
                  "Vista en vivo del backlog, action items, actividades realizadas y avances registrados en la org Salesforce del equipo Agentforce. Filtrada por visibilidad al cliente."}
              </p>
            </div>
            {!hideTimestamp && (
              <p className="text-xs text-gray-400">
                Última actualización · {timestamp}
              </p>
            )}
          </div>
        )}

        {!hideInnerNav && (
          <nav className="mb-8 flex flex-wrap gap-3">
            <TabLink
              label="Backlog y action items"
              count={totalItems}
              href={buildHref("backlog")}
              active={tab === "backlog"}
            />
            <TabLink
              label="Actividades realizadas"
              count={totalActivities}
              href={buildHref("activities")}
              active={tab === "activities"}
            />
          </nav>
        )}

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

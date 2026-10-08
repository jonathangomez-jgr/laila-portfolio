import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCurrentUser, userHasAccessToSlug } from "@/lib/portalAuth";
import { customerProjects } from "@/data/customerProjects";
import OverviewTab from "./tabs/OverviewTab";
import DocumentosTab from "./tabs/DocumentosTab";
import PlanTab from "./tabs/PlanTab";
import PruebasTab from "./tabs/PruebasTab";
import CalendarioTab from "./tabs/CalendarioTab";
import AdminTab from "./tabs/AdminTab";
import AgentDocsTab from "./tabs/AgentDocsTab";

export const dynamic = "force-dynamic";

const ROLE_STYLES: Record<string, string> = {
  Salesforce: "bg-blue-100 text-blue-900",
  Partner: "bg-amber-100 text-amber-900",
  Client: "bg-emerald-100 text-emerald-900",
};

type TabId =
  | "overview"
  | "calendario"
  | "plan"
  | "pruebas"
  | "documentos"
  | "admin"
  | "agent-docs";

const TABS: Array<{ id: TabId; label: string; adminOnly?: boolean }> = [
  { id: "overview", label: "🏠 Overview" },
  { id: "calendario", label: "📅 Calendario" },
  { id: "plan", label: "📋 Plan" },
  { id: "pruebas", label: "🧪 Pruebas" },
  { id: "documentos", label: "📎 Documentos" },
  { id: "admin", label: "⚙️ Admin pruebas", adminOnly: true },
  { id: "agent-docs", label: "🤖 Documentación agente" },
];

export default async function PortalSlugPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tab?: string; planTab?: string }>;
}) {
  const { slug } = await params;
  const { tab: tabParam, planTab: planTabParam } = await searchParams;
  const user = await getCurrentUser();
  if (!user) redirect(`/portal/login?returnTo=/portal/${slug}`);

  const project = customerProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  if (!userHasAccessToSlug(user, slug)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-12">
        <div className="w-full max-w-md rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
          <h1 className="mb-2 text-lg font-semibold">Sin acceso a este proyecto</h1>
          <p>
            Tu cuenta no está autorizada para ver <strong>{slug}</strong>.
            Contactá al equipo Salesforce si necesitás acceso.
          </p>
          <Link
            href="/portal"
            className="mt-4 inline-block text-xs font-semibold text-blue-700 hover:underline"
          >
            ← Ver mis proyectos
          </Link>
        </div>
      </main>
    );
  }

  const canSeeAdmin = user.role !== "Client";
  const visibleTabs = TABS.filter((t) => !t.adminOnly || canSeeAdmin);
  const activeTab: TabId = (visibleTabs.find((t) => t.id === tabParam)?.id ??
    "overview") as TabId;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4">
          <Link href="/portal" className="flex min-w-0 items-center gap-3">
            {project.logo && (
              <Image
                src={project.logo}
                alt={project.customerName}
                width={32}
                height={32}
                className="shrink-0 rounded"
              />
            )}
            <div className="min-w-0">
              <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-blue-600 sm:text-[11px]">
                Portal · {project.customerName}
              </p>
              <h1 className="truncate text-xs font-semibold text-slate-900 sm:text-sm">
                {project.title}
              </h1>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-xs font-semibold text-slate-900">{user.name}</p>
              <span
                className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  ROLE_STYLES[user.role] ?? "bg-slate-100 text-slate-700"
                }`}
              >
                {user.role}
                {user.company ? ` · ${user.company}` : ""}
              </span>
            </div>
            <span
              className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold sm:hidden ${
                ROLE_STYLES[user.role] ?? "bg-slate-100 text-slate-700"
              }`}
              title={`${user.name}${user.company ? ` · ${user.company}` : ""}`}
            >
              {user.role}
            </span>
            <form action="/api/portal/auth/logout" method="POST">
              <button
                type="submit"
                className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-600 hover:bg-slate-50 sm:px-3 sm:text-xs"
                title="Cerrar sesión"
              >
                ↩ <span className="hidden sm:inline">Salir</span>
              </button>
            </form>
          </div>
        </div>

        {/* Nav tabs · scroll horizontal en mobile */}
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto border-t border-slate-100 px-4 sm:px-5">
          {visibleTabs.map((t) => {
            const isActive = t.id === activeTab;
            return (
              <Link
                key={t.id}
                href={`/portal/${slug}?tab=${t.id}`}
                className={`shrink-0 whitespace-nowrap border-b-2 px-3 py-2.5 text-xs font-semibold transition ${
                  isActive
                    ? "border-blue-600 text-blue-700"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-5 sm:py-8">
        {activeTab === "overview" && (
          <OverviewTab slug={slug} user={user} />
        )}
        {activeTab === "documentos" && (
          <DocumentosTab slug={slug} user={user} />
        )}
        {activeTab === "plan" && (
          <PlanTab
            user={user}
            slug={slug}
            customerName={project.customerName}
            planTab={
              planTabParam === "backlog" || planTabParam === "activities"
                ? planTabParam
                : "timeline"
            }
          />
        )}
        {activeTab === "pruebas" && <PruebasTab user={user} slug={slug} />}
        {activeTab === "calendario" && <CalendarioTab user={user} slug={slug} />}
        {activeTab === "admin" && <AdminTab slug={slug} />}
        {activeTab === "agent-docs" && <AgentDocsTab />}
      </section>
    </main>
  );
}

import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "@/lib/i18n";
import DemoAccessGate from "@/components/DemoAccessGate";
import FDETracker, { type TrackerTab } from "@/components/FDETracker";
import { customerProjects } from "@/data/customerProjects";
import { getTrackerForCustomer } from "@/lib/salesforce/fdeTracker";
import { verifyProjectPasscode } from "../actions";
import {
  createActivityAction,
  createItemAction,
  updateItemStatusAction,
} from "./actions";

export const dynamic = "force-dynamic";

export default async function TrackerPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string; slug: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { lang, slug } = await params;
  const { tab: tabParam } = await searchParams;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const project = customerProjects.find((item) => item.slug === slug);

  if (!project) notFound();

  const cookieStore = await cookies();
  const hasAccess =
    cookieStore.get(`project-access-${slug}`)?.value === "granted" ||
    cookieStore.get("projects-section-access")?.value === "granted";

  if (!hasAccess) {
    return (
      <DemoAccessGate
        slug={slug}
        customerName={project.customerName}
        logo={project.logo}
        dict={dict}
        verifyAction={verifyProjectPasscode}
      />
    );
  }

  const tab: TrackerTab = tabParam === "activities" ? "activities" : "backlog";

  let projects: Awaited<ReturnType<typeof getTrackerForCustomer>> = [];
  let loadError: string | null = null;
  try {
    projects = await getTrackerForCustomer(slug);
  } catch (err) {
    loadError = err instanceof Error ? err.message : "Unknown error";
  }

  if (loadError) {
    return (
      <main className="px-4 pb-16 pt-10 sm:px-6 sm:pt-12 md:px-8 md:pt-16">
        <section className="mx-auto max-w-3xl">
          <p className="eyebrow mb-4">{project.customerName} · Tracker</p>
          <h1 className="section-title text-4xl font-semibold text-gray-950">
            No pudimos cargar el tracker
          </h1>
          <p className="mt-4 leading-7 text-gray-600">
            Ocurrió un error al consultar Salesforce. Reintenta en un momento o
            avísale a Jonathan si persiste.
          </p>
          <pre className="mt-6 whitespace-pre-wrap rounded-2xl bg-gray-50 p-4 text-xs text-gray-500">
            {loadError}
          </pre>
        </section>
      </main>
    );
  }

  const boundCreateItemAction = createItemAction.bind(null, { lang, slug });
  const boundUpdateStatusAction = updateItemStatusAction.bind(null, {
    lang,
    slug,
  });
  const boundCreateActivityAction = createActivityAction.bind(null, {
    lang,
    slug,
  });

  return (
    <FDETracker
      projects={projects}
      customerName={project.customerName}
      lang={lang}
      slug={slug}
      tab={tab}
      lastRefreshedAt={new Date()}
      boundCreateItemAction={boundCreateItemAction}
      boundUpdateStatusAction={boundUpdateStatusAction}
      boundCreateActivityAction={boundCreateActivityAction}
    />
  );
}

import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCurrentUser } from "@/lib/portalAuth";
import { customerProjects } from "@/data/customerProjects";
import { globalProgress } from "@/data/plans";
import { getEffectivePlan } from "@/lib/portalPlan";

export const dynamic = "force-dynamic";

export default async function PortalIndexPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/portal/login");

  const projects = customerProjects.filter((p) =>
    user.projects.includes(p.slug),
  );

  // Si solo tiene 1 proyecto, saltamos el selector y entramos directo.
  if (projects.length === 1) {
    redirect(`/portal/${projects[0].slug}`);
  }

  // Fetch de planes efectivos (con overrides de Salesforce aplicados) en
  // paralelo para no serializar las queries.
  const effectivePlans = await Promise.all(
    projects.map((p) => getEffectivePlan(p.slug)),
  );
  const progressBySlug = new Map<string, number | null>();
  projects.forEach((p, i) => {
    const plan = effectivePlans[i];
    progressBySlug.set(p.slug, plan ? globalProgress(plan) : null);
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600">
          Portal · {user.role}
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900">
          Hola, {user.name}
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Estos son tus proyectos activos
        </p>

        {projects.length === 0 ? (
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
            Tu cuenta todavía no tiene proyectos asignados. Contactá al equipo
            Salesforce para ser agregado.
          </div>
        ) : (
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {projects.map((p) => {
              const progress = progressBySlug.get(p.slug) ?? null;

              return (
                <Link
                  key={p.slug}
                  href={`/portal/${p.slug}`}
                  className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
                >
                  {/* Header: logo + customerName */}
                  <div className="flex items-center gap-3">
                    {p.logo && (
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white ring-1 ring-slate-200">
                        <Image
                          src={p.logo}
                          alt={p.customerName}
                          width={36}
                          height={36}
                          className="h-9 w-auto object-contain"
                        />
                      </div>
                    )}
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                      {p.customerName}
                    </p>
                  </div>

                  {/* Title + description */}
                  <h3 className="mt-3 text-lg font-semibold leading-snug text-slate-900 group-hover:text-blue-700">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs text-slate-500">
                    {p.description}
                  </p>

                  {/* Progress bar */}
                  {progress !== null && (
                    <div className="mt-4 pt-3">
                      <div className="mb-1.5 flex items-baseline justify-between">
                        <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                          Avance global
                        </span>
                        <span className="text-xs font-semibold text-slate-900">
                          {progress}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                        <div
                          className="h-full rounded-full bg-blue-600 transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        )}

        <form action="/api/portal/auth/logout" method="POST" className="mt-6">
          <button
            type="submit"
            className="text-xs text-slate-500 hover:text-slate-800"
          >
            Cerrar sesión
          </button>
        </form>
      </div>
    </main>
  );
}

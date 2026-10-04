import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/portalAuth";
import { customerProjects } from "@/data/customerProjects";

export const dynamic = "force-dynamic";

export default async function PortalIndexPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/portal/login");

  const projects = customerProjects.filter((p) =>
    user.projects.includes(p.slug),
  );

  if (projects.length === 1) {
    redirect(`/portal/${projects[0].slug}`);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600">
          Portal · {user.role}
        </p>
        <h1 className="mb-6 mt-1 text-2xl font-semibold text-slate-900">
          Hola, {user.name}
        </h1>

        {projects.length === 0 ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
            Tu cuenta todavía no tiene proyectos asignados. Contactá al equipo
            Salesforce para ser agregado.
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/portal/${p.slug}`}
                className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  {p.customerName}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900 group-hover:text-blue-700">
                  {p.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs text-slate-500">
                  {p.description}
                </p>
              </Link>
            ))}
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

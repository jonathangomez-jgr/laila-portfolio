import type { PortalUser } from "@/lib/portalAuth";
import { getDocsForSlug, CATEGORY_ORDER } from "@/data/docs";

export default function DocumentosTab({
  slug,
  user,
}: {
  slug: string;
  user: PortalUser;
}) {
  const visible = getDocsForSlug(slug).filter((d) =>
    d.visibleTo.includes(user.role),
  );

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600">
          Documentos del proyecto
        </p>
        <h2 className="mt-1 text-xl font-semibold text-slate-900">
          Material compartible
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          {user.role === "Client"
            ? "Documentos ejecutivos y del Programa Insiders. Hacé click en cualquier card para abrirlo."
            : "Material ejecutivo, técnico y de arquitectura. Hacé click en cualquier card para abrirlo."}
        </p>
      </div>

      {CATEGORY_ORDER.map((cat) => {
        const items = visible.filter((d) => d.category === cat);
        if (items.length === 0) return null;
        return (
          <section key={cat}>
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              {cat}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((d) => (
                <a
                  key={d.slug}
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-md"
                >
                  <div className="text-2xl">{d.icon}</div>
                  <p className="mt-2 text-sm font-semibold text-slate-900 group-hover:text-blue-700">
                    {d.label}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">{d.description}</p>
                </a>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

import BetterwareTestMatrixCanvas from "@/components/BetterwareTestMatrixCanvas";
import type { PortalUser } from "@/lib/portalAuth";

export default function PruebasTab({
  user,
  slug,
}: {
  user: PortalUser;
  slug: string;
}) {
  // Salesforce + Partner registran ejecuciones; Client ve dashboard + lista
  // sin posibilidad de abrir el form de registrar.
  const canEdit = user.role === "Salesforce" || user.role === "Partner";

  return (
    <div className="space-y-4">
      {!canEdit && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
          <p className="font-semibold">Vista de alto nivel</p>
          <p className="mt-0.5 text-amber-800">
            Podés ver el dashboard y la lista de casos. El registro de nuevas
            ejecuciones queda a cargo del equipo Salesforce + Partner.
          </p>
        </div>
      )}
      <BetterwareTestMatrixCanvas readOnly={!canEdit} slug={slug} />
    </div>
  );
}

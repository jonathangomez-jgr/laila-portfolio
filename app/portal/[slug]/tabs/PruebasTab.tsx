"use client";

import { useState } from "react";
import BetterwareTestMatrixCanvas from "@/components/BetterwareTestMatrixCanvas";
import AcceptanceWizardLanding from "@/components/AcceptanceWizardLanding";
import type { PortalUser } from "@/lib/portalAuth";

type SubtabId = "unitarias" | "aceptacion";

export default function PruebasTab({
  user,
  slug,
}: {
  user: PortalUser;
  slug: string;
}) {
  const [subtab, setSubtab] = useState<SubtabId>("unitarias");
  const canEditMatrix = user.role === "Salesforce" || user.role === "Partner";

  const subtabs: { id: SubtabId; label: string }[] = [
    { id: "unitarias", label: "🧪 Pruebas unitarias" },
    { id: "aceptacion", label: "✅ Pruebas de aceptación" },
  ];

  return (
    <div className="space-y-4">
      {/* Subtabs nav */}
      <div className="flex gap-1 border-b border-slate-200">
        {subtabs.map((st) => (
          <button
            key={st.id}
            type="button"
            onClick={() => setSubtab(st.id)}
            className={
              "px-4 py-2 text-sm font-semibold transition border-b-2 -mb-px " +
              (subtab === st.id
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300")
            }
          >
            {st.label}
          </button>
        ))}
      </div>

      {subtab === "unitarias" && (
        <div className="space-y-4">
          {!canEditMatrix && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
              <p className="font-semibold">Vista de alto nivel</p>
              <p className="mt-0.5 text-amber-800">
                Puedes ver el dashboard y la lista de casos. El registro de nuevas
                ejecuciones queda a cargo del equipo Salesforce + Partner.
              </p>
            </div>
          )}
          <BetterwareTestMatrixCanvas readOnly={!canEditMatrix} slug={slug} />
        </div>
      )}

      {subtab === "aceptacion" && (
        <AcceptanceWizardLanding user={user} slug={slug} />
      )}
    </div>
  );
}

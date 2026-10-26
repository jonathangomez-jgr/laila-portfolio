// ============================================================================
// Archivos protegidos del portal · servidos por /api/portal/files/[key]
// Viven en Laila (Salesforce Files), nunca en public/ ni en git: traen datos
// de distribuidoras. Cada key resuelve a la última versión del Title indicado.
// ============================================================================

import type { PortalRole } from "@/lib/portalAuth";

export type ProtectedFile = {
  slug: string;
  title: string;
  roles: readonly PortalRole[];
};

const BETTERWARE_SEGUIMIENTO_ROLES: readonly PortalRole[] = ["Salesforce", "Client"];

export const PROTECTED_FILES: Record<string, ProtectedFile> = {
  "betterware-seguimiento-diario-pdf": {
    slug: "betterware",
    title: "FDE_Seguimiento_Betty_Diario_PDF",
    roles: BETTERWARE_SEGUIMIENTO_ROLES,
  },
  "betterware-seguimiento-diario-xlsx": {
    slug: "betterware",
    title: "FDE_Seguimiento_Betty_Diario_XLSX",
    roles: BETTERWARE_SEGUIMIENTO_ROLES,
  },
  "betterware-seguimiento-consolidado-pdf": {
    slug: "betterware",
    title: "FDE_Seguimiento_Betty_Consolidado_PDF",
    roles: BETTERWARE_SEGUIMIENTO_ROLES,
  },
  "betterware-seguimiento-consolidado-xlsx": {
    slug: "betterware",
    title: "FDE_Seguimiento_Betty_Consolidado_XLSX",
    roles: BETTERWARE_SEGUIMIENTO_ROLES,
  },
};

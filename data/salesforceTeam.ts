// ============================================================================
// Equipo Salesforce por proyecto (portal overview)
// Keyed por slug del portal. Cada miembro tiene una o más roles por proyecto.
// Para proyectos sin equipo listado, el componente oculta la tarjeta.
// ============================================================================

export type TeamRole =
  | "Líder Técnico"
  | "Forward Deployed Engineer"
  | "Associate Forward Deployed Engineer"
  | "Solution Engineer"
  | "Deployment Strategist";

export type TeamMember = {
  name: string;
  roles: TeamRole[];
};

export const salesforceTeam: Record<string, TeamMember[]> = {
  betterware: [
    { name: "Jonathan Gómez", roles: ["Líder Técnico", "Forward Deployed Engineer"] },
    { name: "Leandro de Souza", roles: ["Forward Deployed Engineer"] },
    { name: "Mapa Rodriguez", roles: ["Forward Deployed Engineer"] },
  ],
  jafra: [
    { name: "Jonathan Gómez", roles: ["Forward Deployed Engineer"] },
    { name: "Leandro de Souza", roles: ["Forward Deployed Engineer"] },
    { name: "Mapa Rodriguez", roles: ["Forward Deployed Engineer"] },
  ],
  paquetexpress: [
    { name: "Jonathan Gómez", roles: ["Forward Deployed Engineer"] },
    { name: "Regina Segura", roles: ["Forward Deployed Engineer"] },
    { name: "Ximena Macías", roles: ["Forward Deployed Engineer"] },
    { name: "Andres Rivas", roles: ["Forward Deployed Engineer"] },
  ],
  "telasist-retencion": [
    { name: "Jonathan Gómez", roles: ["Líder Técnico", "Forward Deployed Engineer"] },
    { name: "Ximena Macías", roles: ["Forward Deployed Engineer"] },
    { name: "Carlos Sosa", roles: ["Forward Deployed Engineer"] },
    { name: "Jonatas Amorin", roles: ["Forward Deployed Engineer"] },
    { name: "Moises Quintana", roles: ["Solution Engineer"] },
    { name: "Vinicius Oni", roles: ["Associate Forward Deployed Engineer"] },
  ],
  pam: [
    { name: "Jonathan Gómez", roles: ["Forward Deployed Engineer"] },
    { name: "Regina Segura", roles: ["Forward Deployed Engineer"] },
    { name: "Pablo Reynoso", roles: ["Deployment Strategist"] },
  ],
};

export function getSalesforceTeamForSlug(slug: string): TeamMember[] {
  return salesforceTeam[slug] ?? [];
}

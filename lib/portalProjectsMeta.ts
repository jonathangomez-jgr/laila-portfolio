// Metadata pública ligera por proyecto habilitado en el portal.
// Esto se importa desde el client (login page) para pintar branding sin
// arrastrar el blob completo de customerProjects.ts.
// Para habilitar un proyecto nuevo en el portal, agregá una entry acá
// (y asegurate que el slug exista en customerProjects.ts para el resto del flow).

export type PortalProjectMeta = {
  slug: string;
  customerName: string;
  logo: string;
  tagline?: string;
};

export const portalProjectsMeta: PortalProjectMeta[] = [
  {
    slug: "betterware",
    customerName: "Betterware México",
    logo: "/Customers/Betterware/images/Logo-betterware.png",
    tagline: "Rewrite determinístico del Service Agent · FDE",
  },
  {
    slug: "jafra",
    customerName: "Jafra",
    logo: "/Customers/Jafra/images/jafra-logo.webp",
    tagline: "Janet v2 · Agentforce determinístico para consultoras",
  },
];

export function getPortalProjectMeta(
  slug: string | null | undefined,
): PortalProjectMeta | null {
  if (!slug) return null;
  return portalProjectsMeta.find((p) => p.slug === slug) ?? null;
}

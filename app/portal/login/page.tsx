import PortalLoginShell from "./LoginForm";

// Force dynamic rendering: el client component usa useSearchParams(),
// que no es compatible con prerender estático (Vercel genera 404 si
// intenta estaticar esta ruta).
export const dynamic = "force-dynamic";

export default function Page() {
  return <PortalLoginShell />;
}

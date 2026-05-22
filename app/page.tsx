import { redirect } from "next/navigation";

// This page is never reached in practice because proxy.ts redirects / to /es
// but we keep it as a fallback
export default function RootPage() {
  redirect("/es");
}

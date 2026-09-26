import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "@/lib/i18n";
import DemoAccessGate from "@/components/DemoAccessGate";
import PaquetexpressVoiceDemoPresentation from "@/components/PaquetexpressVoiceDemoPresentation";
import { customerProjects } from "@/data/customerProjects";
import { paquetexpressVoiceDemoScenes } from "@/data/paquetexpress/voiceDemoScenes";
import { verifyProjectPasscode } from "../actions";

export default async function PaquetexpressVoiceDemoPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  if (!hasLocale(lang)) notFound();
  if (slug !== "paquetexpress") notFound();

  const dict = await getDictionary(lang);
  const project = customerProjects.find((item) => item.slug === slug);

  if (!project) notFound();

  const cookieStore = await cookies();
  const hasAccess =
    cookieStore.get(`project-access-${slug}`)?.value === "granted" ||
    cookieStore.get("projects-section-access")?.value === "granted";

  if (!hasAccess) {
    return (
      <DemoAccessGate
        slug={slug}
        customerName={project.customerName}
        logo={project.logo}
        dict={dict}
        verifyAction={verifyProjectPasscode}
      />
    );
  }

  return (
    <PaquetexpressVoiceDemoPresentation
      scenes={paquetexpressVoiceDemoScenes}
    />
  );
}

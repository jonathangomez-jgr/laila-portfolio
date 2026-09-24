import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "@/lib/i18n";
import DemoAccessGate from "@/components/DemoAccessGate";
import EmbeddedMessaging from "@/components/EmbeddedMessaging";
import AgentDeliverableDetail from "@/components/deliverable/AgentDeliverableDetail";
import { paquetexpressDeliverable } from "@/data/paquetexpressDeliverable";
import { customerProjects } from "@/data/customerProjects";
import { verifyDeliverablePasscode } from "./actions";
import { DELIVERABLE_COOKIE } from "./passcode";

type DeliverablePageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function PaquetexpressDeliverablePage({
  params,
}: DeliverablePageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  const cookieStore = await cookies();
  const hasAccess = cookieStore.get(DELIVERABLE_COOKIE)?.value === "granted";

  if (!hasAccess) {
    return (
      <DemoAccessGate
        slug={paquetexpressDeliverable.slug}
        customerName={paquetexpressDeliverable.customerName}
        logo={paquetexpressDeliverable.customerLogo}
        dict={dict}
        verifyAction={verifyDeliverablePasscode}
      />
    );
  }

  const paquetexpressProject = customerProjects.find(
    (project) => project.slug === "paquetexpress"
  );

  return (
    <>
      <AgentDeliverableDetail deliverable={paquetexpressDeliverable} />
      {paquetexpressProject?.embeddedMessaging && (
        <EmbeddedMessaging config={paquetexpressProject.embeddedMessaging} />
      )}
    </>
  );
}

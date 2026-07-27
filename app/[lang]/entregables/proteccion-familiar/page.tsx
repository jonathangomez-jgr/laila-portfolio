import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "@/lib/i18n";
import DemoAccessGate from "@/components/DemoAccessGate";
import AgentDeliverableDetail from "@/components/deliverable/AgentDeliverableDetail";
import { proteccionFamiliarDeliverable } from "@/data/proteccionFamiliarDeliverable";
import { verifyDeliverablePasscode } from "./actions";
import { DELIVERABLE_COOKIE } from "./passcode";

type DeliverablePageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function ProteccionFamiliarDeliverablePage({
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
        slug={proteccionFamiliarDeliverable.slug}
        customerName={proteccionFamiliarDeliverable.customerName}
        logo={proteccionFamiliarDeliverable.customerLogo}
        dict={dict}
        verifyAction={verifyDeliverablePasscode}
      />
    );
  }

  return <AgentDeliverableDetail deliverable={proteccionFamiliarDeliverable} />;
}

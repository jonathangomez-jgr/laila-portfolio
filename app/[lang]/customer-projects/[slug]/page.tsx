import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "@/lib/i18n";
import CustomerDemoDetail from "@/components/CustomerDemoDetail";
import DemoAccessGate from "@/components/DemoAccessGate";
import { customerProjects } from "@/data/customerProjects";
import { verifyProjectPasscode } from "./actions";

type CustomerProjectPageProps = {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
};

export default async function CustomerProjectPage({
  params,
}: CustomerProjectPageProps) {
  const { lang, slug } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const project = customerProjects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <main className="px-6 pb-16 pt-12 md:px-8 md:pt-16">
        <section className="mx-auto max-w-4xl">
          <p className="eyebrow mb-4">{dict.customerDetail.eyebrow}</p>

          <h1 className="section-title text-5xl font-semibold tracking-tight text-gray-950">
            {dict.customerDetail.demoNotFound}
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            {dict.customerDetail.demoNotFoundDesc}
          </p>
        </section>
      </main>
    );
  }

  const cookieStore = await cookies();
  const hasAccess =
    cookieStore.get(`project-access-${slug}`)?.value === "granted";

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

  return <CustomerDemoDetail demo={project} lang={lang} dict={dict} />;
}

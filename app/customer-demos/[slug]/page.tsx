import { cookies } from "next/headers";
import CustomerDemoDetail from "../../../components/CustomerDemoDetail";
import DemoAccessGate from "../../../components/DemoAccessGate";
import { customerDemos } from "../../../data/customerDemos";

type CustomerDemoPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CustomerDemoPage({
  params,
}: CustomerDemoPageProps) {
  const { slug } = await params;

  const demo = customerDemos.find((item) => item.slug === slug);

  if (!demo) {
    return (
      <main className="px-6 pb-16 pt-12 md:px-8 md:pt-16">
        <section className="mx-auto max-w-4xl">
          <p className="eyebrow mb-4">Customer Demo</p>

          <h1 className="section-title text-5xl font-semibold tracking-tight text-gray-950">
            Demo not found
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            No existe un caso configurado para este cliente. Revisa el slug o
            agrega el caso en el archivo de datos.
          </p>
        </section>
      </main>
    );
  }

  const cookieStore = await cookies();
  const hasAccess =
    cookieStore.get(`demo-access-${slug}`)?.value === "granted";

  if (!hasAccess) {
    return (
      <DemoAccessGate
        slug={slug}
        customerName={demo.customerName}
        logo={demo.logo}
      />
    );
  }

  return <CustomerDemoDetail demo={demo} />;
}

import PageHero from "@/components/PageHero";
import DemoCard from "@/components/DemoCard";

const customerDemos = [
  {
    title: "Customer Demo Template",
    description:
      "Plantilla para documentar una demo específica de cliente, con contexto, objetivo, solución y valor demostrado.",
    industry: "Customer-specific",
    product: "Multiple",
    href: "/customer-demos/customer-demo-template",
  },
];

export default function CustomerDemosPage() {
  return (
    <main>
      <PageHero
        eyebrow="Customer's Demos"
        title="Demos y casos preparados para conversaciones específicas con clientes."
        description="Esta sección organiza los activos construidos para clientes o escenarios concretos. Puede incluir contexto, problema, solución propuesta, narrativa, resultados esperados y materiales asociados."
      />

      <section className="mx-auto max-w-7xl px-8 py-8">
        <div className="mb-8 rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
          <h2 className="mb-2 text-xl font-semibold">Nota de confidencialidad</h2>
          <p className="text-gray-700">
            Esta sección puede manejar versiones públicas, anonimizadas o privadas de cada demo
            para evitar exponer información sensible de clientes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {customerDemos.map((demo) => (
            <DemoCard key={demo.href} {...demo} />
          ))}
        </div>
      </section>
    </main>
  );
}
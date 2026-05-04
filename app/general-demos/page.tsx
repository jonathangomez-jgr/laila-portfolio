import PageHero from "@/components/PageHero";
import DemoCard from "@/components/DemoCard";

const demos = [
  {
    title: "Consumer Goods Mobile Execution",
    description:
      "Demo genérica para mostrar ejecución comercial, visitas, cuentas, pedidos y operación móvil.",
    industry: "Consumer Goods",
    product: "CG Cloud",
    href: "/general-demos/consumer-goods-mobile-execution",
  },
  {
    title: "Data Cloud & Loyalty Activation",
    description:
      "Demo para explicar unificación de perfiles, asistencia a eventos, segmentación y activación.",
    industry: "Sports & Entertainment",
    product: "Data Cloud",
    href: "/general-demos/data-cloud-loyalty-activation",
  },
  {
    title: "Field Service Quotes",
    description:
      "Demo sobre generación de cotizaciones desde una experiencia de servicio en campo.",
    industry: "Field Service",
    product: "Salesforce Field Service",
    href: "/general-demos/field-service-quotes",
  },
];

export default function GeneralDemosPage() {
  return (
    <main>
      <PageHero
        eyebrow="General Demos"
        title="Demos reutilizables para diferentes industrias, productos y conversaciones."
        description="Esta sección contiene demos que no pertenecen a un cliente específico, pero que pueden adaptarse rápidamente a diferentes escenarios comerciales."
      />

      <section className="mx-auto max-w-7xl px-8 py-8">
        <div className="mb-8 rounded-2xl border border-gray-200 p-6">
          <h2 className="mb-3 text-xl font-semibold">Filtros futuros</h2>
          <p className="text-gray-600">
            Aquí después podremos agregar filtros por industria, producto, tipo de solución,
            nivel de madurez o tecnología utilizada.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {demos.map((demo) => (
            <DemoCard key={demo.href} {...demo} />
          ))}
        </div>
      </section>
    </main>
  );
}
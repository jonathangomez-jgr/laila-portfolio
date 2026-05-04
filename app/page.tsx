import SectionCard from "@/components/SectionCard";
import DemoCard from "@/components/DemoCard";

export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-7xl px-8 py-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
          Personal & Professional Portfolio
        </p>

        <h1 className="max-w-5xl text-6xl font-bold tracking-tight text-gray-950">
          Construyo demos, narrativas y soluciones empresariales con IA, Salesforce y Laila.
        </h1>

        <p className="mt-6 max-w-3xl text-xl leading-8 text-gray-600">
          Este sitio reúne mi trabajo alrededor de Laila, demos generales y casos
          diseñados para conversaciones ejecutivas con clientes.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="/laila"
            className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
          >
            Explorar Laila
          </a>

          <a
            href="/customer-demos"
            className="rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-950"
          >
            Ver customer demos
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8 py-12">
        <h2 className="mb-8 text-3xl font-bold">Áreas principales</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <SectionCard
            title="Laila"
            description="El proyecto insignia: visión, experiencia, arquitectura, agentes, roadmap y demos internas."
            href="/laila"
          />

          <SectionCard
            title="General Demos"
            description="Demos reutilizables no asociadas a un cliente específico, organizadas por industria, producto y tipo de solución."
            href="/general-demos"
          />

          <SectionCard
            title="Customer's Demos"
            description="Casos y presentaciones construidas para conversaciones específicas con clientes."
            href="/customer-demos"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8 py-12">
        <h2 className="mb-8 text-3xl font-bold">Demos destacados</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <DemoCard
            title="Consumer Goods Mobile Execution"
            description="Demo enfocada en ejecución comercial, visitas, cuentas, pedidos y operación móvil."
            industry="Consumer Goods"
            product="Salesforce CG Cloud"
            href="/general-demos/consumer-goods-mobile-execution"
          />

          <DemoCard
            title="Data Cloud & Loyalty Activation"
            description="Caso de unificación de perfiles, segmentación y activación de audiencias."
            industry="Sports & Entertainment"
            product="Data Cloud"
            href="/general-demos/data-cloud-loyalty-activation"
          />

          <DemoCard
            title="Agentforce Customer Experience"
            description="Experiencia basada en agentes para asistencia, automatización y generación de valor."
            industry="Cross-industry"
            product="Agentforce"
            href="/general-demos/agentforce-customer-experience"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8 py-16">
        <div className="rounded-3xl bg-gray-950 p-10 text-white">
          <h2 className="mb-4 text-3xl font-bold">¿Para qué sirve este portafolio?</h2>
          <p className="max-w-3xl text-lg leading-8 text-gray-300">
            Para mostrar de forma clara qué he construido, cómo pienso las soluciones,
            cómo traduzco problemas de negocio en demos accionables y cómo Laila acelera
            la creación de activos reutilizables para conversaciones con clientes.
          </p>
        </div>
      </section>
    </main>
  );
}
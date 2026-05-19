import PageHero from "@/components/PageHero";
import DemoCard from "@/components/DemoCard";
import { generalDemos } from "@/data/generalDemos";

export default function GeneralDemosPage() {
  return (
    <main>
      <PageHero
        eyebrow="General Demos"
        title="Demos reutilizables para diferentes industrias, productos y conversaciones."
        description="Esta sección contiene demos que no pertenecen a un cliente específico, pero que pueden adaptarse rápidamente a diferentes escenarios comerciales."
      />

      <section className="mx-auto max-w-[1360px] px-5 py-8 sm:px-8">
        <div className="mb-8 rounded-2xl border border-gray-200 p-6">
          <h2 className="mb-3 text-xl font-semibold">Filtros futuros</h2>
          <p className="text-gray-600">
            Aquí después podremos agregar filtros por industria, producto, tipo de solución,
            nivel de madurez o tecnología utilizada.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {generalDemos.filter((d) => !d.hidden).map((demo) => (
            <DemoCard
              key={demo.slug}
              title={demo.title}
              description={demo.description}
              industries={demo.industries}
              solutions={demo.solutions}
              href={`/general-demos/${demo.slug}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

import PageHero from "@/components/PageHero";
import LailaMetadataDashboard from "@/components/LailaMetadataDashboard";
import LailaRecordsDashboard from "@/components/LailaRecordsDashboard";
import LailaSystemLandscapePlaceholder from "@/components/LailaSystemLandscapePlaceholder";

export default function LailaArchitecturePage() {
  return (
    <main>
      <PageHero
        eyebrow="Laila / Architecture"
        title="Arquitectura conceptual de Laila."
        description="Vista de componentes, agentes, datos, prompts, integraciones, outputs y posibles extensiones técnicas."
      />

      {/* ── Laila en Números ── */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-8">
        <div className="mb-10">
          <p className="eyebrow mb-4">Métricas del Org</p>
          <h2 className="section-title text-3xl font-semibold text-gray-950 sm:text-4xl">
            Laila en Números
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
            Indicadores reales del org de Salesforce que potencia las demostraciones y narrativas de Laila.
          </p>
        </div>

        <div className="space-y-10">
          <LailaMetadataDashboard />
          <LailaRecordsDashboard />
        </div>
      </section>

      {/* ── System Landscape ── */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-8">
        <div className="mb-8">
          <p className="eyebrow mb-4">Infraestructura</p>
          <h2 className="section-title text-3xl font-semibold text-gray-950 sm:text-4xl">
            System Landscape
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
            Vista arquitectónica de las integraciones, datos y componentes que componen el ecosistema de Laila.
          </p>
        </div>

        <LailaSystemLandscapePlaceholder />
      </section>
    </main>
  );
}

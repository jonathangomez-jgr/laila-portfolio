import PageHero from "@/components/PageHero";

export default function TimelinePage() {
  return (
    <main>
      <PageHero
        eyebrow="Career Timeline"
        title="Hitos profesionales y evolución de mi enfoque."
        description="Una línea de tiempo para mostrar experiencia, aprendizajes y momentos clave."
      />

      <section className="mx-auto max-w-4xl px-8 py-8">
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Etapa actual</p>
            <h2 className="text-xl font-semibold">AI, Agentforce, Data Cloud y Laila</h2>
            <p className="mt-2 text-gray-600">
              Construcción de demos, narrativas y activos reutilizables para conversaciones ejecutivas.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
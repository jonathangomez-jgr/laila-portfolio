export default function GeneralDemoDetailPage() {
  return (
    <main className="mx-auto max-w-4xl px-8 py-16">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
        General Demo
      </p>

      <h1 className="mb-6 text-4xl font-bold">Demo reutilizable</h1>

      <div className="space-y-8 text-lg leading-8 text-gray-700">
        <section>
          <h2 className="mb-2 text-2xl font-semibold text-gray-950">Contexto de negocio</h2>
          <p>Describe aquí el escenario de negocio que esta demo busca representar.</p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-gray-950">Narrativa</h2>
          <p>Explica la historia que se cuenta durante la demo.</p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-gray-950">Personas</h2>
          <p>Define los usuarios, roles o stakeholders involucrados.</p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-gray-950">Capacidades demostradas</h2>
          <p>Lista las capacidades funcionales, técnicas o de negocio que se demuestran.</p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-gray-950">Flujo de la demo</h2>
          <p>Describe paso a paso cómo se ejecuta la demo.</p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-gray-950">Assets</h2>
          <p>Agrega screenshots, videos, documentos, diagramas o links relevantes.</p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-gray-950">Notas de configuración</h2>
          <p>Incluye objetos, datos, permisos, dependencias o pasos técnicos relevantes.</p>
        </section>
      </div>
    </main>
  );
}
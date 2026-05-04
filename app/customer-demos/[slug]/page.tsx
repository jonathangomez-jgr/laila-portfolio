export default function CustomerDemoDetailPage() {
  return (
    <main className="mx-auto max-w-4xl px-8 py-16">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
        Customer Demo
      </p>

      <h1 className="mb-6 text-4xl font-bold">Caso específico de cliente</h1>

      <div className="space-y-8 text-lg leading-8 text-gray-700">
        <section>
          <h2 className="mb-2 text-2xl font-semibold text-gray-950">Cliente o industria</h2>
          <p>Nombre público, nombre anonimizado o industria del cliente.</p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-gray-950">Contexto</h2>
          <p>Describe el momento, reto o necesidad que dio origen a la demo.</p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-gray-950">Objetivo de la presentación</h2>
          <p>Explica qué se buscaba demostrar o provocar en la conversación con el cliente.</p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-gray-950">Solución propuesta</h2>
          <p>Describe la solución conceptual, funcional o técnica presentada.</p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-gray-950">Narrativa de valor</h2>
          <p>Explica la historia comercial detrás de la demo.</p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-gray-950">Resultados esperados</h2>
          <p>Describe impacto, ROI esperado, mejora operativa o valor estratégico.</p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-gray-950">Assets</h2>
          <p>Incluye presentaciones, screenshots, videos, scripts, diagramas o links.</p>
        </section>
      </div>
    </main>
  );
}
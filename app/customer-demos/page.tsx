import Image from "next/image";
import { customerDemos } from "../../data/customerDemos";

export default function CustomerDemosPage() {
  return (
    <main className="px-6 pb-16 pt-12 md:px-8 md:pt-16">
      <section className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="eyebrow mb-4">Customer&apos;s Demos</p>

          <h1 className="section-title max-w-4xl text-5xl font-semibold tracking-tight text-gray-950">
            Demos y casos preparados para conversaciones específicas con clientes.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            Esta sección organiza los activos construidos para clientes o
            escenarios concretos. Puede incluir contexto, problema, solución
            propuesta, narrativa, resultados esperados y materiales asociados.
          </p>
        </div>

        <div className="mb-8 rounded-3xl border border-yellow-200 bg-yellow-50/80 p-6">
          <h2 className="mb-2 text-xl font-semibold text-gray-950">
            Nota de confidencialidad
          </h2>

          <p className="leading-7 text-gray-700">
            Esta sección puede manejar versiones públicas, anonimizadas o
            privadas de cada demo para evitar exponer información sensible de
            clientes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {customerDemos.map((demo) => (
            <a
  key={demo.slug}
  href={`/customer-demos/${demo.slug}`}
  className="soft-card group overflow-hidden p-7 transition hover:-translate-y-1 hover:shadow-xl"
>
  <div className="mb-6 flex items-start justify-between gap-6">
    <div>
      <p className="eyebrow mb-3">{demo.industry}</p>

      <h2 className="text-2xl font-semibold text-gray-950">
        {demo.customerName}
      </h2>
    </div>

    <div className="flex h-20 w-36 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-white via-indigo-50/60 to-blue-50 p-4 shadow-[0_12px_30px_rgba(99,102,241,0.08)]">
      {demo.logo ? (
        <Image
          src={demo.logo}
          alt={`${demo.customerName} logo`}
          width={160}
          height={80}
          className="h-auto max-h-12 w-auto object-contain"
        />
      ) : (
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
          Logo
        </span>
      )}
    </div>
  </div>

  <p className="text-sm font-semibold text-indigo-600">
    {demo.title}
  </p>

  <p className="mt-4 leading-7 text-gray-600">
    {demo.description}
  </p>

  <div className="mt-6 flex flex-wrap gap-2">
    {demo.tags.map((tag) => (
      <span
        key={tag}
        className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600"
      >
        {tag}
      </span>
    ))}
  </div>
</a>
          ))}
        </div>
      </section>
    </main>
  );
}
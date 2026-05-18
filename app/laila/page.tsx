import LailaHero from "@/components/LailaHero";

const lailaSections = [
  {
    title: "👤 Personas",
    description:
      "Las personas que dan vida al universo Laila: la creadora, la ejecutora y la exploradora.",
    href: "/laila/personas",
  },
  {
    title: "🎯 Product Vision",
    description:
      "Propósito, usuarios, visión, principios de diseño y valor que Laila busca generar.",
    href: "/laila/product-vision",
  },
  {
    title: "🎨 Experience Design",
    description:
      "Flujos, experiencia de usuario, pantallas, tono, interacciones y momentos clave.",
    href: "/laila/experience-design",
  },
  {
    title: "🎬 Demo",
    description:
      "Espacio para mostrar videos, capturas, recorridos o prototipos de Laila.",
    href: "/laila/demo",
  },
  {
    title: "🏗️ Architecture",
    description:
      "Vista conceptual de módulos, agentes, datos, integraciones, prompts y outputs.",
    href: "/laila/architecture",
  },
  {
    title: "🗺️ Roadmap",
    description:
      "Fases futuras, backlog, evolución y oportunidades de crecimiento de Laila.",
    href: "/laila/roadmap",
  },
];

export default function LailaPage() {
  return (
    <main className="mx-auto max-w-[1360px] px-5 py-10 sm:px-8 sm:py-16">
      <LailaHero />

      {/* ── Mini dashboard ── */}
      <section className="mb-10">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
                Laila · Live Org
              </p>
              <h2 className="text-xl font-semibold text-gray-950">Laila en Números</h2>
            </div>
            <a
              href="/laila/architecture"
              className="text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-800"
            >
              Ver arquitectura completa →
            </a>
          </div>

          <div className="flex flex-col gap-3 sm:grid sm:grid-cols-3 sm:gap-6">
            <div className="flex items-center gap-4 rounded-2xl border border-violet-100 bg-violet-50 px-5 py-4 sm:flex-col sm:items-center sm:text-center">
              <p className="text-3xl font-bold tabular-nums text-violet-600 sm:text-4xl">17</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-500 sm:mt-1.5">
                Agentforce Agents
              </p>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-indigo-100 bg-indigo-50 px-5 py-4 sm:flex-col sm:items-center sm:text-center">
              <p className="text-3xl font-bold tabular-nums text-indigo-600 sm:text-4xl">31</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500 sm:mt-1.5">
                Objetos con Registros
              </p>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-sky-100 bg-sky-50 px-5 py-4 sm:flex-col sm:items-center sm:text-center">
              <p className="text-3xl font-bold tabular-nums text-sky-600 sm:text-4xl">17.1K</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-sky-500 sm:mt-1.5">
                Registros Creados
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-3xl font-bold">Explorar Laila</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lailaSections.map((section) => (
            <a
              key={section.href}
              href={section.href}
              className="rounded-2xl border border-gray-200 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="mb-3 text-xl font-semibold text-gray-950">
                {section.title}
              </h3>

              <p className="leading-7 text-gray-600">
                {section.description}
              </p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
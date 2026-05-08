const lailaSections = [
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
    <main className="mx-auto max-w-[1360px] px-8 py-16">
      <div className="mb-12 h-52 w-full overflow-hidden rounded-2xl">
        <img
          src="/laila-back.jpg"
          alt="Laila banner"
          className="h-full w-full object-cover"
        />
      </div>

      <section className="mb-12 flex items-start justify-between gap-8">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
            All About Laila
          </p>

          <h1 className="mb-6 max-w-4xl text-5xl font-bold tracking-tight text-gray-950">
            Laila es el núcleo del portafolio.
          </h1>

          <p className="max-w-3xl text-xl leading-8 text-gray-600">
            Una plataforma conceptual para acelerar soluciones, demos, narrativas
            y activos reutilizables con inteligencia artificial.
          </p>
        </div>

        <img
          src="/laila-logo-full.png"
          alt="Laila logo"
          className="h-32 w-auto flex-shrink-0 object-contain"
        />
      </section>

      <section>
        <h2 className="mb-6 text-3xl font-bold">Explorar Laila</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
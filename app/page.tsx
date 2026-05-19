import SiteQRModal from "@/components/SiteQRModal";

const featuredCards = [
  {
    title: "Laila",
    description:
      "Visión, experiencia, arquitectura y evolución del núcleo conceptual del portafolio.",
    href: "/laila",
  },
  {
    title: "General Demos",
    description:
      "Assets reutilizables para distintas industrias, soluciones y conversaciones.",
    href: "/general-demos",
  },
  {
    title: "Customer's Demos",
    description:
      "Casos específicos para conversaciones con clientes y presentaciones dirigidas.",
    href: "/customer-demos",
  },
];

export default function Home() {
  return (
    <main className="px-5 pb-10 pt-28 sm:px-6 sm:pt-36 md:px-8">
      <section className="grid gap-6 lg:grid-cols-[1.25fr_0.95fr]">
        <div className="glass-card p-6 sm:p-8 md:p-12">
          <p className="eyebrow mb-4">Hello ✨</p>

          <h1 className="section-title max-w-4xl text-4xl font-semibold leading-tight text-gray-900 sm:text-5xl md:text-6xl">
            Reliable AI
            <br />
            Business Solutions.
            <br />
            <span className="bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
              powered by Laila.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Un espacio para mostrar cómo el uso de la IA de forma creativa y en su sentido más humano puede transformar la manera de alcanzar los objetivos más aspiracionales de los clientes.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/laila"
              className="primary-button px-6 py-3 text-sm font-semibold"
            >
              Explore Laila
            </a>

            <a
              href="/general-demos"
              className="secondary-button px-6 py-3 text-sm font-semibold"
            >
              View demos
            </a>

            <SiteQRModal />
          </div>
        </div>
 
        <div className="grid gap-6">
          <div className="relative overflow-hidden rounded-[32px] border border-indigo-200/50 bg-gradient-to-br from-indigo-500 via-blue-500 to-sky-400 p-6 text-white shadow-[0_24px_70px_rgba(79,70,229,0.25)] sm:min-h-[260px] sm:p-8">
  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
  <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-blue-200/25 blur-3xl" />

  <div className="relative z-10">
    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/75">
      Featured Focus
    </p>

    <h2 className="mt-5 max-w-lg text-3xl font-semibold leading-tight text-white">
      From business context to executive-ready demos.
    </h2>

    <p className="mt-5 max-w-md text-base leading-7 text-white/85">
      Laila ayuda a estructurar ideas, convertirlas en solución y expresarlas
      en activos visuales, narrativos y demostrables.
    </p>

    <div className="mt-8 flex flex-wrap gap-3">
      <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur">
        AI Strategy
      </span>
      <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur">
        Demo Design
      </span>
      <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur">
        Storytelling
      </span>
    </div>
  </div>
</div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="soft-card p-6">
              <p className="text-sm font-medium text-gray-500">Core Areas</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="soft-pill px-4 py-2 text-sm text-gray-700">
                  AI
                </span>
                <span className="soft-pill px-4 py-2 text-sm text-gray-700">
                  Salesforce
                </span>
                <span className="soft-pill px-4 py-2 text-sm text-gray-700">
                  Agentforce
                </span>
                <span className="soft-pill px-4 py-2 text-sm text-gray-700">
                  Data Cloud
                </span>
              </div>
            </div>

            <div className="soft-card p-6">
              <p className="text-sm font-medium text-gray-500">Approach</p>
              <h3 className="mt-3 text-xl font-semibold text-gray-900">
                Strategy + Storytelling + Solution Design
              </h3>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                Una combinación entre narrativa comercial, criterio técnico y
                prototipado rápido.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {featuredCards.map((card) => (
          <a
            key={card.href}
            href={card.href}
            className="soft-card p-7 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="eyebrow mb-3">Section</p>
            <h3 className="text-2xl font-semibold text-gray-900">
              {card.title}
            </h3>
            <p className="mt-4 leading-7 text-gray-600">{card.description}</p>
          </a>
        ))}
      </section>

      <section className="mt-8">
        <div className="soft-card p-8 md:p-10">
          <p className="eyebrow mb-4">Why this portfolio</p>
          <h2 className="section-title text-3xl font-semibold text-gray-900 md:text-4xl">
            A more visual and structured way to present what I build.
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            Un espacio colaborativo para centralizar ideas, soluciones y aprendizajes que permitan acelerar la creación de valor con IA. Laila busca convertir el conocimiento compartido en herramientas reutilizables, rutas claras y experiencias que ayuden a los clientes a alcanzar sus objetivos más ambiciosos.
          </p>

          <div className="relative mt-8 border-t border-gray-100 px-1 pt-8">
            <div className="absolute left-1 top-8 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-[#066afe]/40 via-[#730394]/30 to-transparent" />
            <p className="eyebrow mb-4 pl-6">Agradecimientos</p>
            <p className="max-w-3xl pl-6 text-sm font-light leading-8 tracking-wide text-gray-500 sm:text-base sm:leading-9">
              Laila no nació sola — y eso la hace más real.{" "}
              <span className="font-medium text-gray-700">Larissa</span> le dio alma creativa.{" "}
              <span className="font-medium text-gray-700">Gabo</span> y{" "}
              <span className="font-medium text-gray-700">Caro</span> creyeron desde el principio.{" "}
              <span className="font-medium text-gray-700">Aura</span>,{" "}
              <span className="font-medium text-gray-700">Juanes</span>,{" "}
              <span className="font-medium text-gray-700">Cami</span>,{" "}
              <span className="font-medium text-gray-700">Juli</span> y{" "}
              <span className="font-medium text-gray-700">Luisfa</span>{" "}
              confiaron en ella y cada reto que trajeron la hizo crecer.
              Y a todos quienes han aportado una idea, una opinión, o simplemente se han dejado sorprender por lo que Laila puede hacer — esto también es de ustedes.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
        <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-8 py-20 lg:grid-cols-2">
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-gray-400">
              Jonathan Gomez | Laila - Portfolio
            </p>

            <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-white md:text-7xl">
              Reliable AI Business Solutions
            </h1>

            <p className="mt-6 max-w-2xl text-xl leading-8 text-gray-300">
              Un portafolio personal-profesional para mostrar cómo el uso de la IA de forma creativa y en su sentido más humano puede transformar la manera de alcanzar los objetivos más aspiracionales de los clientes.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/laila"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-950 transition hover:bg-gray-200"
              >
                Explorar Laila
              </a>

              <a
                href="/customer-demos"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Ver customer demos
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
              <div className="mb-6 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl bg-white p-5">
                  <p className="text-sm font-semibold text-gray-500">
                    Demo Strategy
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-gray-950">
                    From idea to executive-ready story
                  </h2>
                  <p className="mt-3 text-gray-600">
                    Laila ayuda a convertir contexto, problemas de negocio y
                    capacidades tecnológicas en narrativas demostrables.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-white/90 p-5">
                    <p className="text-sm font-semibold text-gray-500">
                      General Demos
                    </p>
                    <p className="mt-2 text-3xl font-bold text-gray-950">12+</p>
                    <p className="mt-1 text-sm text-gray-600">
                      Assets reutilizables
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/90 p-5">
                    <p className="text-sm font-semibold text-gray-500">
                      Customer Demos
                    </p>
                    <p className="mt-2 text-3xl font-bold text-gray-950">6+</p>
                    <p className="mt-1 text-sm text-gray-600">
                      Diferentes de Industria
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-gray-950 p-5 text-white">
                  <p className="text-sm text-gray-400">Core focus</p>
                  <p className="mt-2 text-lg font-semibold">
                    AI + Data + Storytelling + Solution Design
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-blue-400/20 blur-3xl" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8 py-16">
        <h2 className="mb-8 text-3xl font-bold text-gray-950">
          Áreas principales
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <a
            href="/laila"
            className="rounded-2xl border border-gray-200 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="mb-3 text-xl font-semibold">Laila</h3>
            <p className="leading-7 text-gray-600">
              El proyecto central: visión, experiencia, arquitectura, roadmap y
              demos internas.
            </p>
          </a>

          <a
            href="/general-demos"
            className="rounded-2xl border border-gray-200 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="mb-3 text-xl font-semibold">General Demos</h3>
            <p className="leading-7 text-gray-600">
              Demos reutilizables no asociadas a un cliente específico.
            </p>
          </a>

          <a
            href="/customer-demos"
            className="rounded-2xl border border-gray-200 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="mb-3 text-xl font-semibold">Customer&apos;s Demos</h3>
            <p className="leading-7 text-gray-600">
              Casos y presentaciones construidas para conversaciones específicas
              con clientes.
            </p>
          </a>
        </div>
      </section>
    </main>
  );
}
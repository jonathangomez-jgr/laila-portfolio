import Image from "next/image";

const highlights = [
  {
    label: "Current Role",
    value: "Principal Solution Engineer",
  },
  {
    label: "Focus",
    value: "AI, Agentforce, Data Cloud, Service Cloud",
  },
  {
    label: "Specialty",
    value: "Solution Design & Stunning Demos",
  },
  {
    label: "Core Project",
    value: "Laila",
  },
  {
    label: "Based in",
    value: "Mexico 🇲🇽",
  },
  {
    label: "Strength",
    value: "Business + Technology Bridge",
  },
];

export default function AboutPage() {
  return (
    <main className="px-6 pb-16 pt-12 md:px-8 md:pt-16">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="eyebrow mb-4">About Me</p>

          <h1 className="section-title max-w-4xl text-5xl font-semibold tracking-tight text-gray-950">
            Mindset drives results
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            Esta página presenta una visión más personal-profesional sobre mí:
            mi enfoque, mi experiencia, mi forma de trabajar y el tipo de valor
            que busco construir a través de soluciones y narrativas.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="soft-card p-8 md:p-10">
            <p className="eyebrow mb-4">My Approach</p>

            <h2 className="text-4xl font-semibold leading-tight text-gray-950">
              I connect business goals & desires, technology and storytelling.
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Me interesa construir soluciones que no solo funcionen, sino que
              también se entiendan, inspiren confianza y ayuden a mover
              conversaciones con clientes de forma clara y estratégica.
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Mi trabajo suele vivir en la intersección entre diseño de soluciones, narrativa ejecutiva, experiencia digital, AI y todo dentro de Salesforce.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="soft-pill px-4 py-2 text-sm text-gray-700">
                Solution Design
              </span>
              <span className="soft-pill px-4 py-2 text-sm text-gray-700">
                Executive Storytelling
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
              <span className="soft-pill px-4 py-2 text-sm text-gray-700">
                AI Solutions
              </span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[32px] border border-indigo-200/50 bg-gradient-to-br from-indigo-500 via-blue-500 to-sky-400 p-8 text-white shadow-[0_24px_70px_rgba(79,70,229,0.25)]">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-blue-200/25 blur-3xl" />

            <div className="relative z-10">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/75">
                Profile Snapshot
              </p>

              <div className="mt-6 flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
                <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full border-4 border-white/30 bg-white/15 shadow-lg sm:h-32 sm:w-32">
  <Image
    src="/jonathan-profile.jpg"
    alt="Jonathan Gomez"
    fill
    sizes="(max-width: 640px) 160px, 128px"
    className="rounded-full object-cover object-center"
    priority
  />
</div>

                <div>
                  <h2 className="text-3xl font-semibold text-white">
                    Jonathan Gomez
                  </h2>
                  <p className="mt-2 text-base text-white/85">
                    Principal Solution Engineer
                  </p>
                  <p className="mt-1 text-sm text-white/75">
                    Crafting stories of business transformation through AI-powered experiences — designed to captivate, inspire, and make possibilities feel real.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-white/15 p-4 backdrop-blur"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="soft-card p-7">
            <p className="eyebrow mb-3">What I enjoy</p>
            <h3 className="text-2xl font-semibold text-gray-950">
              Turning complexity into clarity
            </h3>
            <p className="mt-4 leading-7 text-gray-600">
              Me gusta traducir problemas complejos en historias, soluciones y
              experiencias que sean fáciles de entender y presentar.
            </p>
          </div>

          <div className="soft-card p-7">
            <p className="eyebrow mb-3">How I work</p>
            <h3 className="text-2xl font-semibold text-gray-950">
              Strategic and hands-on
            </h3>
            <p className="mt-4 leading-7 text-gray-600">
              Combino pensamiento estratégico con ejecución práctica:
              estructura, contenido, demo, narrativa y detalle visual.
            </p>
          </div>

          <div className="soft-card p-7">
            <p className="eyebrow mb-3">Why Laila matters</p>
            <h3 className="text-2xl font-semibold text-gray-950">
              A platform for what I build
            </h3>
            <p className="mt-4 leading-7 text-gray-600">
              Laila resume mi interés por conectar creatividad, negocio,
              tecnología y experiencia para construir algo reutilizable y con
              visión.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
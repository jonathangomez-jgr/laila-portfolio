import Image from "next/image";
import PageHero from "@/components/PageHero";

type PersonaAccent = "indigo" | "violet" | "sky";

const personas: {
  name: string;
  role: string;
  tagline: string;
  description: string;
  image: string;
  accent: PersonaAccent;
}[] = [
  {
    name: "Laila",
    role: "La chispa creadora",
    tagline: "La magia que lo conecta todo.",
    description:
      "Laila es la representación viva de todo lo que habita en este universo: creatividad, tecnología, inclusión y posibilidad. Crea para compartir, imagina para inspirar y cree profundamente que todas las industrias, todas las ideas y todas las personas tienen un lugar en la transformación.",
    image: "/Personas/Laila-Agent.png",
    accent: "indigo",
  },
  {
    name: "Janine Service",
    role: "La ejecutiva brillante",
    tagline: "La que convierte el servicio en experiencia.",
    description:
      "Janine es estrategia, precisión y empatía en movimiento. Su especialidad es el servicio al cliente, pero su talento va mucho más allá: entiende el negocio, resuelve con elegancia y eleva cada interacción. Junto a Laila, forma una dupla imparable: visión y ejecución, magia y método.",
    image: "/Personas/Janine.png",
    accent: "violet",
  },
  {
    name: "María Clara Giménez",
    role: "La clienta pionera",
    tagline: "La primera en creer, probar y transformar.",
    description:
      "María Clara no espera a que el futuro llegue: lo prueba antes que nadie. Es curiosa, activa y siempre está lista para descubrir nuevos productos, generar casos y poner a prueba las innovaciones de Laila. Más que una cliente, es la chispa que confirma que cada idea puede convertirse en una gran experiencia.",
    image: "/Personas/Maria-Clara.png",
    accent: "sky",
  },
];

const accentStyles = {
  indigo: {
    badge: "bg-indigo-100 text-indigo-700",
    ring: "ring-indigo-200",
    bar: "from-indigo-400 to-indigo-600",
    tagline: "text-indigo-600",
  },
  violet: {
    badge: "bg-violet-100 text-violet-700",
    ring: "ring-violet-200",
    bar: "from-violet-400 to-violet-600",
    tagline: "text-violet-600",
  },
  sky: {
    badge: "bg-sky-100 text-sky-700",
    ring: "ring-sky-200",
    bar: "from-sky-400 to-sky-600",
    tagline: "text-sky-600",
  },
};

export default function PersonasPage() {
  return (
    <main>
      <PageHero
        eyebrow="Laila / Personas"
        title="Las personas que dan vida al universo Laila."
        description="Cada una representa una dimensión distinta: la creadora, la ejecutora y la exploradora. Juntas, definen cómo Laila se imagina, se construye y se experimenta."
      />

      <section className="mx-auto max-w-[1360px] px-8 pb-20">
        <div className="grid gap-8 md:grid-cols-3">
          {personas.map((persona) => {
            const a = accentStyles[persona.accent];
            return (
              <article
                key={persona.name}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Portrait */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                  <Image
                    src={persona.image}
                    alt={persona.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-7">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-bold tracking-tight text-gray-950">
                        {persona.name}
                      </h2>
                      <p className={`mt-0.5 text-sm font-semibold ${a.tagline}`}>
                        {persona.tagline}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${a.badge}`}
                    >
                      {persona.role}
                    </span>
                  </div>

                  <p className="flex-1 text-[0.95rem] leading-7 text-gray-600">
                    {persona.description}
                  </p>
                </div>

                {/* Color bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${a.bar}`} />
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

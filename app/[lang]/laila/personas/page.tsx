import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import PageHero from "@/components/PageHero";

type PersonaAccent = "indigo" | "violet" | "sky";

const personaImages = [
  "/Personas/Laila-Agent.png",
  "/Personas/Janine.png",
  "/Personas/Maria-Clara.png",
];

const personaAccents: PersonaAccent[] = ["indigo", "violet", "sky"];

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

export default async function PersonasPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const d = dict.personas;

  return (
    <main>
      <PageHero eyebrow={d.eyebrow} title={d.title} description={d.description} />

      <section className="mx-auto w-[min(90%,1600px)] pb-16 sm:pb-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {d.items.map((persona, idx) => {
            const accent = personaAccents[idx];
            const a = accentStyles[accent];
            return (
              <article
                key={persona.name}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Portrait */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                  <Image
                    src={personaImages[idx]}
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

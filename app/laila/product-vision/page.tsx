import Image from "next/image";
import PageHero from "@/components/PageHero";

export default function LailaProductVisionPage() {
  return (
    <main>
      <PageHero
        eyebrow="Laila / Product Vision"
        title="Una visión para convertir conocimiento, contexto y creatividad en activos accionables."
        description="Aquí se documenta el propósito de Laila, sus usuarios, sus principios de diseño y el valor que busca generar."
      />

      <section className="mx-auto max-w-4xl px-5 py-8 sm:px-8">
        <p className="text-lg leading-8 text-gray-700">
          Laila nace como una forma de acelerar la construcción de soluciones,
          narrativas, demos y contenido profesional mediante el uso estructurado de IA.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-6 sm:px-8">
        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
          <Image
            src="/Laila/Org/Laila-console.png"
            alt="Laila Org Console"
            width={1600}
            height={900}
            className="w-full object-cover"
            priority
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-16 sm:px-8">
        <div
          className="relative overflow-hidden rounded-3xl p-8 text-white sm:p-12"
          style={{ background: "linear-gradient(150deg,#066afe 0%,#022ac0 45%,#001e5b 100%)" }}
        >
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#00b3ff]/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-[#066afe]/30 blur-3xl" />

          <div className="relative z-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#90d0fe]">
                Live Org
              </p>
              <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
                Explora Laila en acción.
              </h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-white/70">
                Navega la org de demostración de Laila directamente en Salesforce y descubre cómo está construida desde adentro.
              </p>
            </div>

            <a
              href="https://clicktologin.herokuapp.com/?un=jgr%40laila.demo&pw=Salesforce2025"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-2xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:border-[#00b3ff]/60 hover:bg-[#00b3ff]/20"
            >
              Navegar la Org de Laila →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

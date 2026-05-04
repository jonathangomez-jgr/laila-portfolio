import PageHero from "@/components/PageHero";

export default function LailaProductVisionPage() {
  return (
    <main>
      <PageHero
        eyebrow="Laila / Product Vision"
        title="Una visión para convertir conocimiento, contexto y creatividad en activos accionables."
        description="Aquí se documenta el propósito de Laila, sus usuarios, sus principios de diseño y el valor que busca generar."
      />

      <section className="mx-auto max-w-4xl px-8 py-8 text-lg leading-8 text-gray-700">
        <p>
          Laila nace como una forma de acelerar la construcción de soluciones,
          narrativas, demos y contenido profesional mediante el uso estructurado de IA.
        </p>
      </section>
    </main>
  );
}
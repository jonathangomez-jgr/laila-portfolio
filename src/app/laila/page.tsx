import PageHero from "@/components/PageHero";
import SectionCard from "@/components/SectionCard";

export default function LailaPage() {
  return (
    <main>
      <PageHero
        eyebrow="All About Laila"
        title="Laila es el núcleo del portafolio: una plataforma conceptual para acelerar soluciones con IA."
        description="Esta sección explica qué es Laila, cómo está pensada, qué capacidades contiene, cómo se ve la experiencia, cuál es su arquitectura y hacia dónde puede evolucionar."
      />

      <section className="mx-auto grid max-w-7xl gap-6 px-8 py-8 md:grid-cols-3">
        <SectionCard
          title="Product Vision"
          description="La visión de producto detrás de Laila: propósito, usuarios, valor y evolución esperada."
          href="/laila/product-vision"
        />

        <SectionCard
          title="Experience Design"
          description="Cómo se piensa la experiencia de usuario, flujos, momentos clave y comportamiento."
          href="/laila/experience-design"
        />

        <SectionCard
          title="Demo"
          description="La demostración funcional o conceptual de Laila y sus capacidades principales."
          href="/laila/demo"
        />

        <SectionCard
          title="Architecture"
          description="Vista conceptual de componentes, agentes, datos, flujos e integraciones."
          href="/laila/architecture"
        />

        <SectionCard
          title="Roadmap"
          description="Evolución futura, fases, prioridades y posibles extensiones."
          href="/laila/roadmap"
        />
      </section>
    </main>
  );
}
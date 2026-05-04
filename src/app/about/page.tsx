import PageHero from "@/components/PageHero";
import SectionCard from "@/components/SectionCard";

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About Me"
        title="Un perfil entre estrategia, tecnología, storytelling y construcción de soluciones."
        description="Esta sección profundiza en quién soy, cómo trabajo, qué capacidades he desarrollado y cómo conecto problemas de negocio con demos, arquitectura y experiencias accionables."
      />

      <section className="mx-auto grid max-w-7xl gap-6 px-8 py-8 md:grid-cols-3">
        <SectionCard
          title="My Approach"
          description="Cómo abordo problemas, diseño narrativas y convierto ideas complejas en soluciones demostrables."
          href="/about/approach"
        />

        <SectionCard
          title="Skills & Expertise"
          description="Áreas de experiencia: Salesforce, AI, Agentforce, Data Cloud, demos, customer experience y arquitectura de solución."
          href="/about/skills"
        />

        <SectionCard
          title="Career Timeline"
          description="Evolución profesional, hitos relevantes y experiencias que han formado mi enfoque actual."
          href="/about/timeline"
        />
      </section>
    </main>
  );
}
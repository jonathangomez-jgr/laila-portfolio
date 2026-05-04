import PageHero from "@/components/PageHero";

const skills = [
  "Salesforce Solution Engineering",
  "Agentforce & AI storytelling",
  "Data Cloud & customer profile unification",
  "Consumer Goods Cloud demos",
  "Field Service solution design",
  "Demo strategy and executive storytelling",
  "Experience design",
  "Rapid prototyping with AI",
];

export default function SkillsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Skills & Expertise"
        title="Capacidades que combinan tecnología, negocio y experiencia."
        description="Una vista estructurada de las áreas donde construyo, diseño y comunico soluciones."
      />

      <section className="mx-auto max-w-7xl px-8 py-8">
        <div className="grid gap-4 md:grid-cols-2">
          {skills.map((skill) => (
            <div key={skill} className="rounded-2xl border border-gray-200 p-5">
              {skill}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
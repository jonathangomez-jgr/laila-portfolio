import PageHero from "@/components/PageHero";

export default function ApproachPage() {
  return (
    <main>
      <PageHero
        eyebrow="My Approach"
        title="De problema de negocio a historia demostrable."
        description="Mi enfoque combina entendimiento del cliente, diseño de narrativa, arquitectura de solución y construcción rápida de activos que permitan visualizar valor."
      />

      <section className="mx-auto max-w-4xl px-8 py-8 text-lg leading-8 text-gray-700">
        <p>
          Trabajo conectando tres niveles: el problema de negocio, la solución tecnológica
          y la historia que permite que un cliente entienda el valor. Mi objetivo no es
          solamente mostrar funcionalidades, sino construir una conversación clara,
          creíble y accionable.
        </p>
      </section>
    </main>
  );
}
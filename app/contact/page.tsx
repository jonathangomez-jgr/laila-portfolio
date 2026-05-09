import PageHero from "@/components/PageHero";

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Conversemos sobre demos, soluciones y oportunidades."
        description="Esta página puede funcionar como punto de contacto para conversaciones internas, clientes, colegas o stakeholders interesados en conocer más del trabajo."
      />

      <section className="mx-auto max-w-4xl px-8 py-8">
        <div className="rounded-2xl border border-gray-200 p-8">
          <h2 className="mb-4 text-2xl font-semibold">Contacto directo</h2>
          <p className="mb-2 text-gray-600">
            jonathan.gomez@salesforce.com
          </p>

          <a
            href="mailto:jonathan.gomez@salesforce.com"
            className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
          >
            Enviar correo
          </a>
        </div>
      </section>
    </main>
  );
}
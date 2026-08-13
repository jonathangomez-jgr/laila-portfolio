import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import SurveyRunner from "@/components/survey/SurveyRunner";

export const metadata = {
  title: "Encuesta Descubrimiento — Laila",
  description:
    "Encuesta de descubrimiento renderizada por un frontend externo, con Salesforce Feedback Management como motor headless.",
};

export default async function SurveyDemoPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const surveyName =
    process.env.SF_LAILA_SURVEY_DEV_NAME ?? "Descubrimiento_Agentforce";

  return (
    <main className="px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 md:px-8 md:pt-16">
      <section className="mx-auto w-full max-w-3xl">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
            Demo · Headless Feedback Management
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            Descubrimiento con Laila
          </h1>
          <p className="mt-4 text-base leading-7 text-gray-600">
            Esta encuesta vive en Salesforce Feedback Management. El frontend
            que estás usando es un componente React externo que consume la
            Business API oficial (unAuth Response API) — Salesforce evalúa
            la ramificación y decide qué página mostrarte a continuación.
          </p>
        </div>

        <SurveyRunner
          surveyName={surveyName}
          intro={{
            eyebrow: "Encuesta anónima · ~2 min",
            title: "Cuéntanos brevemente sobre ti",
            body: "Tus respuestas se guardan directamente en Salesforce. No pedimos email hasta el final, y solo si quieres que un arquitecto te contacte.",
            startLabel: "Comenzar",
          }}
        />
      </section>
    </main>
  );
}

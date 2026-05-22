import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import LailaHero from "@/components/LailaHero";

export default async function LailaPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const d = dict.laila;

  return (
    <main className="mx-auto max-w-[1360px] px-5 py-10 sm:px-8 sm:py-16">
      <LailaHero
        accountsEyebrow={d.heroAccountsEyebrow}
        closeHint={d.heroCloseHint}
        accountsMore={d.heroAccountsMore}
        accountsLabel={d.heroAccountsLabel}
      />

      {/* Manifiesto */}
      <section className="mb-10">
        <blockquote className="relative px-1 py-2 sm:px-4">
          <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-[#066afe]/40 via-[#730394]/30 to-transparent" />
          <p className="pl-6 text-sm font-light leading-8 tracking-wide text-gray-500 sm:text-base sm:leading-9">
            {d.manifesto
              .split(/(\{bold1\}|\{bold2\}|\{bold3\})/)
              .map((part, i) => {
                if (part === "{bold1}")
                  return (
                    <span key={i} className="font-medium text-gray-700">
                      {d.bold1}
                    </span>
                  );
                if (part === "{bold2}")
                  return (
                    <span key={i} className="font-medium text-gray-700">
                      {d.bold2}
                    </span>
                  );
                if (part === "{bold3}")
                  return (
                    <span key={i} className="font-medium text-gray-700">
                      {d.bold3}
                    </span>
                  );
                return part;
              })}
          </p>
        </blockquote>
      </section>

      {/* Mini dashboard */}
      <section className="mb-10">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
                {d.dashboardEyebrow}
              </p>
              <h2 className="text-xl font-semibold text-gray-950">
                {d.dashboardTitle}
              </h2>
            </div>
            <a
              href={`/${lang}/laila/architecture`}
              className="text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-800"
            >
              {d.dashboardLink}
            </a>
          </div>

          <div className="flex flex-col gap-3 sm:grid sm:grid-cols-3 sm:gap-6">
            <div className="flex items-center gap-4 rounded-2xl border border-violet-100 bg-violet-50 px-5 py-4 sm:flex-col sm:items-center sm:text-center">
              <p className="text-3xl font-bold tabular-nums text-violet-600 sm:text-4xl">
                17
              </p>
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-500 sm:mt-1.5">
                {d.agentsLabel}
              </p>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-indigo-100 bg-indigo-50 px-5 py-4 sm:flex-col sm:items-center sm:text-center">
              <p className="text-3xl font-bold tabular-nums text-indigo-600 sm:text-4xl">
                31
              </p>
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500 sm:mt-1.5">
                {d.objectsLabel}
              </p>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-sky-100 bg-sky-50 px-5 py-4 sm:flex-col sm:items-center sm:text-center">
              <p className="text-3xl font-bold tabular-nums text-sky-600 sm:text-4xl">
                17.1K
              </p>
              <p className="text-xs font-semibold uppercase tracking-wider text-sky-500 sm:mt-1.5">
                {d.recordsLabel}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-3xl font-bold text-gray-950">{d.exploreTitle}</h2>
          <a
            href={`/${lang}/laila/demo`}
            className="primary-button flex items-center gap-2 px-6 py-3 text-sm font-semibold"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.531 5.856L0 24l6.305-1.508A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.667-.523-5.184-1.43l-.371-.22-3.742.895.928-3.648-.242-.381A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            {d.talkBtn}
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {d.sections.map((section) => (
            <a
              key={section.href}
              href={`/${lang}${section.href}`}
              className="rounded-2xl border border-gray-200 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="mb-3 text-xl font-semibold text-gray-950">
                {section.title}
              </h3>
              <p className="leading-7 text-gray-600">{section.description}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

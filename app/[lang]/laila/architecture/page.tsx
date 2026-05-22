import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import PageHero from "@/components/PageHero";
import LailaMetadataDashboard from "@/components/LailaMetadataDashboard";
import LailaRecordsDashboard from "@/components/LailaRecordsDashboard";
import LailaSystemLandscape from "@/components/LailaSystemLandscape";

export default async function LailaArchitecturePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const d = dict.architecture;

  return (
    <main>
      <PageHero eyebrow={d.eyebrow} title={d.title} description={d.description} />

      {/* Laila en Números */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-8">
        <div className="mb-10">
          <p className="eyebrow mb-4">{d.metricsEyebrow}</p>
          <h2 className="section-title text-3xl font-semibold text-gray-950 sm:text-4xl">
            {d.metricsTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
            {d.metricsDesc}
          </p>
        </div>

        <div className="space-y-10">
          <LailaMetadataDashboard />
          <LailaRecordsDashboard />
        </div>
      </section>

      {/* System Landscape */}
      <section className="mx-auto max-w-7xl px-6 pb-12 md:px-8">
        <div className="mb-8">
          <p className="eyebrow mb-4">{d.infraEyebrow}</p>
          <h2 className="section-title text-3xl font-semibold text-gray-950 sm:text-4xl">
            {d.infraTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
            {d.infraDesc}
          </p>
        </div>

        <LailaSystemLandscape />
      </section>

      {/* Assets */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-8">
        <div className="mb-8">
          <p className="eyebrow mb-4">{d.assetsEyebrow}</p>
          <h2 className="section-title text-3xl font-semibold text-gray-950 sm:text-4xl">
            {d.assetsTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
            {d.assetsDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href="/Laila/laila-landscape.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 transition group-hover:bg-indigo-100">
              <svg
                className="h-6 w-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900">
                {d.landscapeAssetName}
              </p>
              <p className="mt-0.5 text-xs text-gray-500">{d.landscapeAssetDesc}</p>
            </div>
            <svg
              className="ml-auto h-4 w-4 shrink-0 text-gray-300 transition group-hover:text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
}

import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const d = dict.about;

  return (
    <main className="px-4 pb-16 pt-10 sm:px-6 sm:pt-12 md:px-8 md:pt-16">
      <section className="mx-auto w-full sm:w-[min(90%,1600px)]">
        <div className="mb-8">
          <p className="eyebrow mb-4">{d.eyebrow}</p>

          <h1 className="section-title max-w-4xl text-3xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
            {d.title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            {d.description}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] grid-cols-1">
          <div className="soft-card p-8 md:p-10">
            <p className="eyebrow mb-4">{d.approachEyebrow}</p>

            <h2 className="text-2xl font-semibold leading-tight text-gray-950 sm:text-4xl">
              {d.approachTitle}
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              {d.approachDesc1}
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              {d.approachDesc2}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="soft-pill px-4 py-2 text-sm text-gray-700">
                Solution Design
              </span>
              <span className="soft-pill px-4 py-2 text-sm text-gray-700">
                Executive Storytelling
              </span>
              <span className="soft-pill px-4 py-2 text-sm text-gray-700">
                Salesforce
              </span>
              <span className="soft-pill px-4 py-2 text-sm text-gray-700">
                Agentforce
              </span>
              <span className="soft-pill px-4 py-2 text-sm text-gray-700">
                Data Cloud
              </span>
              <span className="soft-pill px-4 py-2 text-sm text-gray-700">
                AI Solutions
              </span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[32px] border border-indigo-200/50 bg-gradient-to-br from-indigo-500 via-blue-500 to-sky-400 p-8 text-white shadow-[0_24px_70px_rgba(79,70,229,0.25)]">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-blue-200/25 blur-3xl" />

            <div className="relative z-10">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/75">
                {d.profileEyebrow}
              </p>

              <div className="mt-6 flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
                <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full border-4 border-white/30 bg-white/15 shadow-lg sm:h-32 sm:w-32">
                  <Image
                    src="/jonathan-profile.jpg"
                    alt="Jonathan Gomez"
                    fill
                    sizes="(max-width: 640px) 160px, 128px"
                    className="rounded-full object-cover object-center"
                    priority
                  />
                </div>

                <div>
                  <h2 className="text-3xl font-semibold text-white">
                    {d.profileName}
                  </h2>
                  <p className="mt-2 text-base text-white/85">{d.profileRole}</p>
                  <p className="mt-1 text-sm text-white/75">{d.profileTagline}</p>
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {d.highlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-white/15 p-4 backdrop-blur"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="soft-card p-7">
            <p className="eyebrow mb-3">{d.enjoyEyebrow}</p>
            <h3 className="text-2xl font-semibold text-gray-950">
              {d.enjoyTitle}
            </h3>
            <p className="mt-4 leading-7 text-gray-600">{d.enjoyDesc}</p>
          </div>

          <div className="soft-card p-7">
            <p className="eyebrow mb-3">{d.howEyebrow}</p>
            <h3 className="text-2xl font-semibold text-gray-950">
              {d.howTitle}
            </h3>
            <p className="mt-4 leading-7 text-gray-600">{d.howDesc}</p>
          </div>

          <div className="soft-card p-7">
            <p className="eyebrow mb-3">{d.whyEyebrow}</p>
            <h3 className="text-2xl font-semibold text-gray-950">
              {d.whyTitle}
            </h3>
            <p className="mt-4 leading-7 text-gray-600">{d.whyDesc}</p>
          </div>
        </section>

        {/* CTA Banner */}
        <div
          className="relative mt-8 overflow-hidden rounded-3xl p-8 text-white sm:p-12"
          style={{
            background:
              "linear-gradient(150deg,#066afe 0%,#022ac0 45%,#001e5b 100%)",
          }}
        >
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#00b3ff]/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-[#066afe]/30 blur-3xl" />

          <div className="relative z-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#90d0fe]">
                {d.ctaEyebrow}
              </p>
              <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
                {d.ctaTitle}
              </h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-white/70">
                {d.ctaDesc}
              </p>
            </div>

            <a
              href={`/${lang}/contact`}
              className="shrink-0 rounded-2xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:border-[#00b3ff]/60 hover:bg-[#00b3ff]/20"
            >
              {d.ctaBtn}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

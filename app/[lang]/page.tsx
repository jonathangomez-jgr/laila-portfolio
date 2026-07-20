import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import SiteQRModal from "@/components/SiteQRModal";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const d = dict.home;

  return (
    <main className="px-4 pb-10 pt-24 sm:px-6 sm:pt-36 md:px-8">
      <section className="grid gap-6 lg:grid-cols-[1.25fr_0.95fr]">
        <div className="glass-card p-6 sm:p-8 md:p-12">
          <p className="eyebrow mb-4">{d.eyebrow}</p>

          <h1 className="section-title max-w-4xl text-3xl font-semibold leading-tight text-gray-900 sm:text-5xl md:text-6xl">
            {d.headline1}
            <br />
            {d.headline2}
            <br />
            <span className="bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
              {d.headline3}
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            {d.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={`/${lang}/laila`}
              className="primary-button px-6 py-3 text-sm font-semibold"
            >
              {d.exploreBtn}
            </a>

            <a
              href={`/${lang}/general-demos`}
              className="secondary-button px-6 py-3 text-sm font-semibold"
            >
              {d.viewDemosBtn}
            </a>

            <SiteQRModal
              btnLabel={d.viewQrBtn}
              modalTitle={d.qrModalTitle}
              modalSub={d.qrModalSub}
            />
          </div>
        </div>

        <div className="grid gap-6">
          <div className="relative overflow-hidden rounded-[32px] border border-indigo-200/50 bg-gradient-to-br from-indigo-500 via-blue-500 to-sky-400 p-6 text-white shadow-[0_24px_70px_rgba(79,70,229,0.25)] sm:min-h-[260px] sm:p-8">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-blue-200/25 blur-3xl" />

            <div className="relative z-10">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/75">
                {d.featuredFocusEyebrow}
              </p>

              <h2 className="mt-5 max-w-lg text-3xl font-semibold leading-tight text-white">
                {d.featuredFocusTitle}
              </h2>

              <p className="mt-5 max-w-md text-base leading-7 text-white/85">
                {d.featuredFocusDesc}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                  {d.tag1}
                </span>
                <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                  {d.tag2}
                </span>
                <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                  {d.tag3}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="soft-card p-6">
              <p className="text-sm font-medium text-gray-500">
                {d.coreAreasLabel}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="soft-pill px-4 py-2 text-sm text-gray-700">
                  AI
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
              </div>
            </div>

            <div className="soft-card p-6">
              <p className="text-sm font-medium text-gray-500">
                {d.approachLabel}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-gray-900">
                {d.approachTitle}
              </h3>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                {d.approachDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {d.cards.map((card) => (
          <a
            key={card.href}
            href={`/${lang}${card.href}`}
            className="soft-card p-7 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="eyebrow mb-3">{d.sectionEyebrow}</p>
            <h3 className="text-2xl font-semibold text-gray-900">
              {card.title}
            </h3>
            <p className="mt-4 leading-7 text-gray-600">{card.description}</p>
          </a>
        ))}
      </section>

      <section className="mt-8">
        <div className="soft-card p-8 md:p-10">
          <p className="eyebrow mb-4">{d.whyEyebrow}</p>
          <h2 className="section-title text-3xl font-semibold text-gray-900 md:text-4xl">
            {d.whyTitle}
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            {d.whyDesc}
          </p>

          <div className="relative mt-8 border-t border-gray-100 px-1 pt-8">
            <div className="absolute left-1 top-8 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-[#066afe]/40 via-[#730394]/30 to-transparent" />
            <p className="eyebrow mb-4 pl-6">{d.thanksEyebrow}</p>
            <p className="max-w-3xl pl-6 text-sm font-light leading-8 tracking-wide text-gray-500 sm:text-base sm:leading-9">
              {d.thanksText
                .split(/(\{larissa\}|\{gabo\}|\{caro\}|\{aura\}|\{juanes\}|\{cami\}|\{juli\}|\{luisfa\})/)
                .map((part, i) => {
                  const names: Record<string, string> = {
                    "{larissa}": "Larissa",
                    "{gabo}": "Gabo",
                    "{caro}": "Caro",
                    "{aura}": "Aura",
                    "{juanes}": "Juanes",
                    "{cami}": "Cami",
                    "{juli}": "Juli",
                    "{luisfa}": "Luisfa",
                  };
                  if (names[part]) {
                    return (
                      <span key={i} className="font-medium text-gray-700">
                        {names[part]}
                      </span>
                    );
                  }
                  return part;
                })}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

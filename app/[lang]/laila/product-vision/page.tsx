import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import PageHero from "@/components/PageHero";

export default async function LailaProductVisionPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const d = dict.productVision;

  return (
    <main>
      <PageHero eyebrow={d.eyebrow} title={d.title} description={d.description} />

      <section className="mx-auto max-w-4xl px-5 py-8 sm:px-8">
        <p className="text-lg leading-8 text-gray-700">{d.body}</p>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-6 sm:px-8">
        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
          <Image
            src="/Laila/Org/Laila-console.png"
            alt="Laila Org Console"
            width={1600}
            height={900}
            className="w-full object-cover"
            priority
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-16 sm:px-8">
        <div
          className="relative overflow-hidden rounded-3xl p-8 text-white sm:p-12"
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
                {d.liveOrgEyebrow}
              </p>
              <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
                {d.liveOrgTitle}
              </h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-white/70">
                {d.liveOrgDesc}
              </p>
            </div>

            <a
              href="https://clicktologin.herokuapp.com/?un=jgr%40laila.demo&pw=Salesforce2025"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-2xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:border-[#00b3ff]/60 hover:bg-[#00b3ff]/20"
            >
              {d.liveOrgBtn}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

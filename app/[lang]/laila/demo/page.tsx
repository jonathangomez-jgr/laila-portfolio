import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import PageHero from "@/components/PageHero";
import LailaDemoQR from "./LailaDemoQR";

export default async function LailaDemoPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const d = dict.demo;

  return (
    <main>
      <PageHero eyebrow={d.eyebrow} title={d.title} description={d.description} />

      <section className="mx-auto max-w-[1540px] px-6 pb-16 md:px-8">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-16">
          {/* QR Card — client component for QRCodeSVG */}
          <LailaDemoQR
            qrEyebrow={d.qrEyebrow}
            qrTitle={d.qrTitle}
            qrSub={d.qrSub}
            qrBtn={d.qrBtn}
          />

          {/* Right: placeholder content */}
          <div className="flex-1">
            <p className="eyebrow mb-4">{d.comingSoonEyebrow}</p>
            <h2 className="section-title text-2xl font-semibold text-gray-950 sm:text-3xl">
              {d.comingSoonTitle}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-gray-600">
              {d.comingSoonDesc}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

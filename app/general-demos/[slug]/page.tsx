import { notFound } from "next/navigation";
import { generalDemos } from "@/data/generalDemos";

function youtubeEmbedUrl(url: string): string {
  const match = url.match(/(?:youtu\.be\/|watch\?v=)([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

export function generateStaticParams() {
  return generalDemos.map((d) => ({ slug: d.slug }));
}

export default async function GeneralDemoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const demo = generalDemos.find((d) => d.slug === slug);
  if (!demo) notFound();

  return (
    <main className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
        General Demo
      </p>

      <div className="mb-4 space-y-2">
        <div className="flex flex-wrap gap-1.5">
          {demo.industries.map((ind) => (
            <span key={ind} className="rounded-full bg-[#eaf5fe] px-3 py-1 text-xs font-medium text-[#066afe]">
              {ind}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {demo.solutions.map((sol) => (
            <span key={sol} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              {sol}
            </span>
          ))}
        </div>
      </div>

      <h1 className="mb-6 text-3xl font-bold text-gray-950 sm:text-4xl">{demo.title}</h1>

      <p className="mb-10 text-lg leading-8 text-gray-600">{demo.description}</p>

      {demo.videoUrl && (
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-gray-950">Demo en Video</h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={youtubeEmbedUrl(demo.videoUrl)}
                title={demo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

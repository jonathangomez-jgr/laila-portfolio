import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { customerProjects } from "@/data/customerProjects";

export default async function CustomerProjectsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const d = dict.customerProjects;

  return (
    <main className="px-6 pb-16 pt-12 md:px-8 md:pt-16">
      <section className="mx-auto w-[min(90%,1600px)]">
        <div className="mb-10">
          <p className="eyebrow mb-4">{d.eyebrow}</p>

          <h1 className="section-title max-w-4xl text-3xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
            {d.title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            {d.description}
          </p>
        </div>

        <div className="mb-8 rounded-3xl border border-yellow-200 bg-yellow-50/80 p-6">
          <h2 className="mb-2 text-xl font-semibold text-gray-950">
            {d.confidentialityTitle}
          </h2>

          <p className="leading-7 text-gray-700">{d.confidentialityText}</p>

          <p className="mt-2 leading-7 text-gray-700">
            <b>{d.confidentialityNote}</b>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {customerProjects.filter((project) => !project.hidden).map((project) => {
            const i18n = lang === "en" ? project.translations?.en : lang === "pt" ? project.translations?.pt : undefined;
            const title = i18n?.title ?? project.title;
            const description = i18n?.description ?? project.description;
            const industry = i18n?.industry ?? project.industry;
            return (
              <a
                key={project.slug}
                href={`/${lang}/customer-projects/${project.slug}`}
                className="soft-card group overflow-hidden p-7 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow mb-3">{industry}</p>

                    <h2 className="text-2xl font-semibold text-gray-950">
                      {project.customerName}
                    </h2>
                  </div>

                  <div className="shrink-0">
                    {project.logo ? (
                      <Image
                        src={project.logo}
                        alt={`${project.customerName} logo`}
                        width={160}
                        height={80}
                        className="h-auto max-h-16 w-auto object-contain"
                      />
                    ) : (
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
                        Logo
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm font-semibold text-indigo-600">
                  {title}
                </p>

                <p className="mt-4 leading-7 text-gray-600">{description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </main>
  );
}

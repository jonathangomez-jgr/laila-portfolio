import Link from "next/link";

type Crumb = { label: string; href?: string };

type Props = {
  eyebrow: string;
  title: string;
  blurb?: string;
  crumbs: Crumb[];
  downloadHref: string;
  downloadName: string;
};

export default function AgentforceDocHeader({
  eyebrow,
  title,
  blurb,
  crumbs,
  downloadHref,
  downloadName,
}: Props) {
  return (
    <header className="mb-10">
      {crumbs.length > 0 && (
        <nav className="mb-4 text-sm text-gray-500">
          {crumbs.map((c, i) => (
            <span key={i}>
              {c.href ? (
                <Link href={c.href} className="hover:text-[#5f6fff]">
                  {c.label}
                </Link>
              ) : (
                <span>{c.label}</span>
              )}
              {i < crumbs.length - 1 && <span className="px-2 text-gray-300">/</span>}
            </span>
          ))}
        </nav>
      )}

      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
        {eyebrow}
      </p>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
          {title}
        </h1>

        <a
          href={downloadHref}
          download={downloadName}
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:border-[#5f6fff] hover:text-[#5f6fff]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M10 3a.75.75 0 0 1 .75.75v6.69l2.22-2.22a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 1 1 1.06-1.06l2.22 2.22V3.75A.75.75 0 0 1 10 3Z" />
            <path d="M3.75 13a.75.75 0 0 1 .75.75v1.75a.75.75 0 0 0 .75.75h9.5a.75.75 0 0 0 .75-.75v-1.75a.75.75 0 0 1 1.5 0v1.75A2.25 2.25 0 0 1 14.75 18h-9.5A2.25 2.25 0 0 1 3 15.5v-1.75a.75.75 0 0 1 .75-.75Z" />
          </svg>
          Download .md
        </a>
      </div>

      {blurb && (
        <p className="mt-5 max-w-3xl text-base leading-7 text-gray-600">{blurb}</p>
      )}
    </header>
  );
}

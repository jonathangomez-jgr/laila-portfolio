import type { KnowledgeLibraryInventoryData } from "../data/customerDemos";

const toneStyles: Record<
  KnowledgeLibraryInventoryData["libraries"][number]["tone"],
  {
    badge: string;
    accent: string;
    bullet: string;
    iconBg: string;
    iconColor: string;
    chip: string;
  }
> = {
  indigo: {
    badge: "bg-indigo-100 text-indigo-700",
    accent: "border-l-indigo-500",
    bullet: "text-indigo-500",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    chip: "bg-indigo-50 text-indigo-700",
  },
  violet: {
    badge: "bg-violet-100 text-violet-700",
    accent: "border-l-violet-500",
    bullet: "text-violet-500",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    chip: "bg-violet-50 text-violet-700",
  },
  sky: {
    badge: "bg-sky-100 text-sky-700",
    accent: "border-l-sky-500",
    bullet: "text-sky-500",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    chip: "bg-sky-50 text-sky-700",
  },
  emerald: {
    badge: "bg-emerald-100 text-emerald-700",
    accent: "border-l-emerald-500",
    bullet: "text-emerald-500",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    chip: "bg-emerald-50 text-emerald-700",
  },
  amber: {
    badge: "bg-amber-100 text-amber-700",
    accent: "border-l-amber-500",
    bullet: "text-amber-500",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    chip: "bg-amber-50 text-amber-700",
  },
};

function formatFileExt(file: string) {
  const m = file.match(/\.([a-z0-9]+)$/i);
  return m ? m[1].toUpperCase() : "FILE";
}

function kbHref(path: string) {
  return `/Customers/PAM/kb/${path.split("/").map(encodeURIComponent).join("/")}`;
}

export default function KnowledgeLibraryInventory({
  data,
}: {
  data: KnowledgeLibraryInventoryData;
}) {
  return (
    <div className="mt-10 space-y-8">
      {data.libraries.map((lib, idx) => {
        const tone = toneStyles[lib.tone];
        return (
          <article
            key={lib.id}
            className={`overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm ${tone.accent} border-l-4`}
          >
            <header className="flex flex-col gap-4 border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white px-6 py-6 sm:px-8 sm:py-7">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${tone.iconBg} text-sm font-bold ${tone.iconColor}`}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${tone.badge}`}
                >
                  Data Library
                </span>
                {lib.fileCount !== undefined && (
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                    {lib.fileCount} {lib.fileCount === 1 ? "archivo" : "archivos"}
                  </span>
                )}
                {lib.indexed === false && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                      />
                    </svg>
                    No indexada · System prompt
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-950 sm:text-3xl">
                  {lib.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-gray-500">
                  {lib.focus}
                </p>
              </div>
              <p className="max-w-3xl text-base leading-7 text-gray-600">
                {lib.description}
              </p>
            </header>

            <div className="px-6 py-6 sm:px-8 sm:py-7">
              {lib.fileGroups.length > 1 ? (
                <div className="space-y-6">
                  {lib.fileGroups.map((group) => (
                    <div key={group.label}>
                      <div className="mb-3 flex items-center gap-2">
                        <span
                          className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${tone.chip}`}
                        >
                          {group.label}
                        </span>
                        {group.note && (
                          <span className="text-xs text-gray-500">
                            {group.note}
                          </span>
                        )}
                      </div>
                      <ul className="space-y-1.5">
                        {group.files.map((file) => (
                          <li key={file}>
                            <a
                              href={kbHref(file)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/file flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-2 transition hover:border-indigo-300 hover:bg-white hover:shadow-sm"
                            >
                              <span className="mt-0.5 inline-flex h-6 shrink-0 items-center justify-center rounded bg-white px-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500 ring-1 ring-gray-200 group-hover/file:text-indigo-600 group-hover/file:ring-indigo-300">
                                {formatFileExt(file)}
                              </span>
                              <code className="flex-1 break-all font-mono text-xs leading-6 text-gray-700 group-hover/file:text-indigo-700">
                                {file}
                              </code>
                              <svg
                                className="mt-1 h-3.5 w-3.5 shrink-0 text-gray-400 transition group-hover/file:text-indigo-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                              </svg>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-1.5">
                  {lib.fileGroups[0]?.files.map((file) => (
                    <li key={file}>
                      <a
                        href={kbHref(file)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/file flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-2 transition hover:border-indigo-300 hover:bg-white hover:shadow-sm"
                      >
                        <span className="mt-0.5 inline-flex h-6 shrink-0 items-center justify-center rounded bg-white px-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500 ring-1 ring-gray-200 group-hover/file:text-indigo-600 group-hover/file:ring-indigo-300">
                          {formatFileExt(file)}
                        </span>
                        <code className="flex-1 break-all font-mono text-xs leading-6 text-gray-700 group-hover/file:text-indigo-700">
                          {file}
                        </code>
                        <svg
                          className="mt-1 h-3.5 w-3.5 shrink-0 text-gray-400 transition group-hover/file:text-indigo-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {lib.pending && lib.pending.length > 0 && (
                <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/60 p-4">
                  <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                    Pendientes / por solicitar al cliente
                  </p>
                  <ul className="space-y-1">
                    {lib.pending.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm leading-6 text-amber-900"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

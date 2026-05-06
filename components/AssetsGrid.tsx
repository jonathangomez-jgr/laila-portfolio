import type { AssetsData, AssetItem } from "../data/customerDemos";

const typeConfig: Record<AssetItem["type"], { label: string; icon: React.ReactNode; color: string }> = {
  doc: {
    label: "Documento",
    color: "bg-indigo-50 text-indigo-600",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  deck: {
    label: "Presentación",
    color: "bg-violet-50 text-violet-600",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
  },
  mockup: {
    label: "Mockup",
    color: "bg-sky-50 text-sky-600",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  arch: {
    label: "Arquitectura",
    color: "bg-emerald-50 text-emerald-600",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
      </svg>
    ),
  },
  video: {
    label: "Video",
    color: "bg-rose-50 text-rose-600",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
      </svg>
    ),
  },
};

export default function AssetsGrid({ data }: { data: AssetsData }) {
  const available = data.items.filter((i) => i.available);
  const pending = data.items.filter((i) => !i.available);

  return (
    <div className="mt-8 space-y-6">
      {available.length > 0 && (
        <div>
          <p className="eyebrow mb-3">Disponibles</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {available.map((item) => {
              const cfg = typeConfig[item.type];
              const Wrapper = item.url ? "a" : "div";
              const wrapperProps = item.url
                ? { href: item.url, target: "_blank", rel: "noopener noreferrer" }
                : {};
              return (
                <Wrapper
                  key={item.name}
                  {...wrapperProps}
                  className={`flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm ${item.url ? "transition hover:-translate-y-0.5 hover:shadow-md" : ""}`}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${cfg.color}`}>
                    {cfg.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-950">{item.name}</p>
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600">
                        Listo
                      </span>
                      {item.url && (
                        <svg className="ml-auto h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs leading-5 text-gray-500">{item.description}</p>
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </div>
      )}

      {pending.length > 0 && (
        <div>
          <p className="eyebrow mb-3">Por desarrollar</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {pending.map((item) => {
              const cfg = typeConfig[item.type];
              return (
                <div
                  key={item.name}
                  className="flex gap-4 rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 p-4"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl opacity-50 ${cfg.color}`}>
                    {cfg.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-600">{item.name}</p>
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-400">
                        Pendiente
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs leading-5 text-gray-400">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

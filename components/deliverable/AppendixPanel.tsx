import type { AppendixSection } from "@/data/agentDeliverables";

export default function AppendixPanel({ data }: { data: AppendixSection }) {
  return (
    <div className="mt-8 space-y-6">
      <p className="text-base leading-8 text-gray-700 sm:text-lg">
        {data.intro}
      </p>

      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 shadow-[0_24px_60px_rgba(30,27,75,0.32)] ring-1 ring-white/10">
        <div className="flex items-center gap-2.5 border-b border-white/10 px-6 py-4">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
            Fuente autoritativa
          </p>
          <span className="ml-auto rounded-full bg-rose-500/20 px-2.5 py-0.5 text-[10px] font-bold text-rose-300">
            Confidencial
          </span>
        </div>

        <div className="grid gap-6 px-6 py-6 md:grid-cols-[1fr_260px]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
              Documento
            </p>
            <p className="mt-1 text-xl font-semibold leading-snug text-white">
              {data.pdfName}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {data.disclaimer}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={data.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(95,111,255,0.28)] transition hover:opacity-90"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Abrir en pestaña nueva
              </a>
              <a
                href={data.pdfUrl}
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
                  />
                </svg>
                Descargar PDF
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-300">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </span>
            <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
              Tipo
            </p>
            <p className="text-sm font-semibold text-white">PDF · Coppel</p>
          </div>
        </div>

        <div className="border-t border-white/10 bg-slate-950/60 px-6 py-4">
          <p className="flex items-center gap-2 text-[11px] leading-5 text-slate-400">
            <svg
              className="h-3.5 w-3.5 shrink-0 text-amber-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            Aviso técnico: este documento se sirve directamente por Next.js.
            Cualquier persona con la URL exacta puede acceder al archivo sin
            pasar por el código de acceso — mueva el asset a un route handler
            protegido antes de compartir la ruta pública.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-5 py-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gray-500">
            Vista previa
          </p>
          <a
            href={data.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
          >
            Abrir en ventana completa →
          </a>
        </div>
        <div className="aspect-[4/5] w-full bg-gray-100 sm:aspect-[16/10]">
          <iframe
            src={data.pdfUrl}
            title={data.pdfName}
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}

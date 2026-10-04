import Link from "next/link";
import Image from "next/image";

export default function PortalAuthSentPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex items-center gap-3">
          <Image
            src="/Assets Salesforce Brand/Logo/Main Salesforce Cloud - Primary.svg"
            alt="Salesforce"
            width={40}
            height={40}
          />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600">
              Portal de Proyectos
            </p>
            <h1 className="text-xl font-semibold text-slate-900">
              Revisá tu correo
            </h1>
          </div>
        </div>

        <div className="mb-5 flex items-center justify-center rounded-xl bg-blue-50 py-8">
          <div className="text-5xl">📬</div>
        </div>

        <p className="text-sm leading-relaxed text-slate-700">
          Si tu correo está autorizado, en los próximos minutos recibirás un
          enlace de acceso al portal.
        </p>

        <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
          <li>⏳ El enlace es válido por <strong>15 minutos</strong>.</li>
          <li>📨 Si no lo ves, revisá tu carpeta de <strong>spam</strong>.</li>
          <li>↻ Si expira, podés pedir uno nuevo desde la pantalla de login.</li>
        </ul>

        <Link
          href="/portal/login"
          className="mt-6 inline-block text-xs font-semibold text-blue-600 hover:text-blue-700"
        >
          ← Volver al login
        </Link>
      </div>
    </main>
  );
}

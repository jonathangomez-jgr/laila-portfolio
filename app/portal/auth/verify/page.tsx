export default function PortalAuthVerifyPage() {
  // Esta página es fallback visual. El flujo real redirige desde
  // /api/portal/auth/verify al target final. Si el user cae acá por error,
  // ve este mensaje.
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        <div className="mb-4 text-5xl">⏳</div>
        <h1 className="mb-2 text-lg font-semibold text-slate-900">
          Verificando tu enlace…
        </h1>
        <p className="text-sm text-slate-600">
          Si no te redirigimos en unos segundos, el enlace puede haber expirado.
        </p>
        <a
          href="/portal/login"
          className="mt-4 inline-block text-xs font-semibold text-blue-600 hover:text-blue-700"
        >
          Pedir uno nuevo
        </a>
      </div>
    </main>
  );
}

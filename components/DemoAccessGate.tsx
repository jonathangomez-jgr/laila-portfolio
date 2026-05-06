"use client";

import { useState } from "react";
import { verifyPasscode } from "../app/customer-demos/[slug]/actions";

type DemoAccessGateProps = {
  slug: string;
  customerName: string;
  logo?: string;
};

export default function DemoAccessGate({
  slug,
  customerName,
  logo,
}: DemoAccessGateProps) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const result = await verifyPasscode(slug, passcode);

    if (result.success) {
      window.location.reload();
    } else {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="soft-card p-10">
          {logo && (
            <div className="mb-8 flex justify-center">
              <img
                src={logo}
                alt={`${customerName} logo`}
                className="h-auto max-h-14 w-auto object-contain"
              />
            </div>
          )}

          <p className="eyebrow mb-3 text-center">Acceso restringido</p>

          <h1 className="mb-2 text-center text-2xl font-semibold text-gray-950">
            {customerName}
          </h1>

          <p className="mb-8 text-center text-sm leading-6 text-gray-500">
            Esta demo es privada. Ingresa el código de acceso para continuar.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Código de acceso"
              className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              autoFocus
            />

            {error && (
              <p className="text-center text-sm font-medium text-red-500">
                Código incorrecto. Inténtalo de nuevo.
              </p>
            )}

            <button
              type="submit"
              disabled={loading || passcode.length === 0}
              className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(95,111,255,0.28)] transition hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Verificando..." : "Acceder"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

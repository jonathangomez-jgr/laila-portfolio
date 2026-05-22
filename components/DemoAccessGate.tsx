"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { requestPageAccess } from "../app/actions/request-page-access";
import { verifyPasscode } from "../app/[lang]/customer-demos/[slug]/actions";
import type { Dictionary } from "@/lib/i18n";

type DemoAccessGateProps = {
  slug: string;
  customerName: string;
  logo?: string;
  dict: Dictionary;
};

export default function DemoAccessGate({
  slug,
  customerName,
  logo,
  dict,
}: DemoAccessGateProps) {
  const t = dict.demoAccess;
  const pathname = usePathname();
  const [passcode, setPasscode] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);

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

  async function handleAccessRequest(e: React.FormEvent) {
    e.preventDefault();
    setRequestLoading(true);
    setRequestSuccess(false);
    setRequestError(null);

    const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!EMAIL_PATTERN.test(email.trim())) {
      setRequestError(t.requestError);
      setRequestLoading(false);
      return;
    }

    const result = await requestPageAccess(email, pathname);

    if (result.success) {
      setRequestSuccess(true);
      setEmail("");
    } else {
      setRequestError(result.message);
    }

    setRequestLoading(false);
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

          <p className="eyebrow mb-3 text-center">{t.restricted}</p>

          <h1 className="mb-2 text-center text-2xl font-semibold text-gray-950">
            {customerName}
          </h1>

          <p className="mb-8 text-center text-sm leading-6 text-gray-500">
            {t.privateDemo}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder={t.passcodePlaceholder}
              className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              autoFocus
            />

            {error && (
              <p className="text-center text-sm font-medium text-red-500">
                {t.wrongCode}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || passcode.length === 0}
              className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(95,111,255,0.28)] transition hover:opacity-90 disabled:opacity-50"
            >
              {loading ? t.verifying : t.enter}
            </button>
          </form>

          <div className="my-8 border-t border-gray-200" />

          <div className="space-y-4">
            <div>
              <h2 className="text-center text-lg font-semibold text-gray-950">
                {t.noCode}
              </h2>
              <p className="mt-2 text-center text-sm leading-6 text-gray-500">
                {t.requestDesc}
              </p>
            </div>

            <form onSubmit={handleAccessRequest} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setRequestSuccess(false);
                  setRequestError(null);
                }}
                placeholder={t.emailPlaceholder}
                className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                autoComplete="email"
              />

              {requestSuccess && (
                <p className="text-center text-sm font-medium text-emerald-600">
                  {t.requestSuccess}
                </p>
              )}

              {requestError && (
                <p className="text-center text-sm leading-6 text-red-500">
                  {requestError}
                </p>
              )}

              <button
                type="submit"
                disabled={requestLoading || email.trim().length === 0}
                className="secondary-button w-full px-5 py-3 text-sm font-semibold disabled:opacity-50"
              >
                {requestLoading ? t.requestLoading : t.requestBtn}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

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
    <main className="flex min-h-[80vh] items-center justify-center px-4 py-10 sm:px-6">
      <div className="w-full max-w-5xl">
        {/* Header — shared across both columns */}
        <div className="mb-8 text-center">
          {logo && (
            <div className="mb-6 flex justify-center">
              <img
                src={logo}
                alt={`${customerName} logo`}
                className="h-auto max-h-16 w-auto object-contain"
              />
            </div>
          )}

          <p className="eyebrow mb-3">{t.restricted}</p>

          <h1 className="text-2xl font-semibold tracking-tight text-gray-950 sm:text-3xl">
            {customerName}
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base sm:leading-7">
            {t.privateDemo}
          </p>
        </div>

        {/* Two-column shell */}
        <div className="relative grid gap-5 lg:grid-cols-2 lg:gap-8">
          {/* ── Column 1 · Have a code ─────────────────────────────────── */}
          <section
            aria-labelledby="have-code-title"
            className="soft-card relative flex flex-col p-7 sm:p-9"
          >
            <div className="mb-6 flex items-start gap-4">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75M6.75 10.5h10.5a1.5 1.5 0 0 1 1.5 1.5v6.75a1.5 1.5 0 0 1-1.5 1.5H6.75a1.5 1.5 0 0 1-1.5-1.5V12a1.5 1.5 0 0 1 1.5-1.5Z"
                  />
                </svg>
              </span>
              <div>
                <h2
                  id="have-code-title"
                  className="text-lg font-semibold leading-snug text-gray-950 sm:text-xl"
                >
                  {t.haveCodeTitle}
                </h2>
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  {t.haveCodeSub}
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-auto flex flex-col gap-4"
            >
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder={t.passcodePlaceholder}
                aria-label={t.passcodePlaceholder}
                aria-invalid={error}
                className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-base text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                autoFocus
              />

              {error && (
                <p
                  role="alert"
                  className="text-sm font-medium text-red-500"
                >
                  {t.wrongCode}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || passcode.length === 0}
                className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(95,111,255,0.28)] transition hover:opacity-90 disabled:opacity-50"
              >
                {loading ? t.verifying : t.enter}
              </button>
            </form>
          </section>

          {/* ── Divider with "o" — horizontal on mobile, vertical on desktop ── */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center lg:flex"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 shadow-md">
              {t.or}
            </span>
          </div>

          <div
            aria-hidden="true"
            className="relative flex items-center gap-3 lg:hidden"
          >
            <span className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              {t.or}
            </span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          {/* ── Column 2 · Request access ──────────────────────────────── */}
          <section
            aria-labelledby="request-title"
            className="soft-card relative flex flex-col p-7 sm:p-9"
          >
            <div className="mb-6 flex items-start gap-4">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5A2.25 2.25 0 0 1 19.5 19.5h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
              </span>
              <div>
                <h2
                  id="request-title"
                  className="text-lg font-semibold leading-snug text-gray-950 sm:text-xl"
                >
                  {t.noCode}
                </h2>
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  {t.requestDesc}
                </p>
              </div>
            </div>

            <form
              onSubmit={handleAccessRequest}
              className="mt-auto flex flex-col gap-4"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setRequestSuccess(false);
                  setRequestError(null);
                }}
                placeholder={t.emailPlaceholder}
                aria-label={t.emailPlaceholder}
                className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-base text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                autoComplete="email"
              />

              {requestSuccess && (
                <p
                  role="status"
                  className="text-sm font-medium text-emerald-600"
                >
                  {t.requestSuccess}
                </p>
              )}

              {requestError && (
                <p
                  role="alert"
                  className="text-sm leading-6 text-red-500"
                >
                  {requestError}
                </p>
              )}

              <button
                type="submit"
                disabled={requestLoading || email.trim().length === 0}
                className="w-full rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(167,139,250,0.32)] transition hover:opacity-90 disabled:opacity-50"
              >
                {requestLoading ? t.requestLoading : t.requestBtn}
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

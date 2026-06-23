import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";

const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "laila", href: "/laila" },
  { key: "generalDemos", href: "/general-demos" },
  { key: "customerSolutions", href: "/customer-demos" },
  { key: "insights", href: "/insights" },
] as const;

export default function SiteFooter({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: string;
}) {
  return (
    <footer className="px-6 pb-8 pt-2 md:px-8">
      <div className="mx-auto w-[min(90%,1600px)]">
        <div className="rounded-3xl border border-slate-200/60 bg-white/70 px-8 py-10 shadow-[0_8px_32px_rgba(99,102,241,0.07)] backdrop-blur-sm md:px-12 md:py-12">
          {/* Top grid */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
            {/* Brand + bio */}
            <div className="flex flex-col gap-5">
              <a href={`/${lang}`} className="flex items-center gap-3 self-start">
                <Image
                  src="/laila-logo.png"
                  alt="Laila Portfolio logo"
                  width={100}
                  height={50}
                  className="h-9 w-auto object-contain"
                />
                <div>
                  <p className="text-sm font-semibold leading-tight text-gray-900">
                    Laila | Solutions Hub
                  </p>
                  <p className="text-xs text-gray-500">Personal-professional hub</p>
                </div>
              </a>
              <p className="max-w-sm text-sm leading-7 text-gray-500">
                {dict.footer.tagline}
              </p>

              {/* Social quick links */}
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/jonathangomezr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-gray-500 transition hover:border-[#0a66c2]/40 hover:text-[#0a66c2]"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>

                <a
                  href="http://www.youtube.com/@laila-jgr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-gray-500 transition hover:border-[#ff0000]/40 hover:text-[#ff0000]"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                <a
                  href="https://www.salesforce.com/trailblazer/jgomez30"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Trailblazer"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-gray-500 transition hover:border-[#00a1e0]/40 hover:text-[#00a1e0]"
                >
                  <Image
                    src="/trailhead.png"
                    alt="Trailhead"
                    width={16}
                    height={16}
                    className="h-4 w-4 object-contain opacity-60"
                  />
                </a>

                <a
                  href="mailto:jonathan.gomez@salesforce.com"
                  aria-label="Email"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-gray-500 transition hover:border-indigo-300 hover:text-indigo-600"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-gray-400">
                {dict.footer.navTitle}
              </p>
              <ul className="space-y-3">
                {NAV_LINKS.map((item) => (
                  <li key={item.key}>
                    <a
                      href={`/${lang}${item.href === "/" ? "" : item.href}`}
                      className="text-sm text-gray-600 transition hover:text-indigo-600"
                    >
                      {dict.nav[item.key as keyof typeof dict.nav]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-gray-400">
                {dict.footer.connectTitle}
              </p>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`/${lang}/contact`}
                    className="text-sm text-gray-600 transition hover:text-indigo-600"
                  >
                    {dict.footer.contactPageLabel}
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/524775815010?text=Hola,%20conoc%C3%AD%20a%20Laila"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 transition hover:text-indigo-600"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:jonathan.gomez@salesforce.com"
                    className="text-sm text-gray-600 transition hover:text-indigo-600"
                  >
                    jonathan.gomez@salesforce.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/jonathangomezr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 transition hover:text-indigo-600"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-200/70 pt-6 sm:flex-row">
            <p className="text-xs text-gray-400">{dict.footer.copyright}</p>
            <p className="text-xs text-gray-300">
              Built with Next.js · Tailwind CSS · Salesforce
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

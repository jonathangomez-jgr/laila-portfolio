"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";

const locales: Locale[] = ["es", "en", "pt"];

function buildLangUrl(currentPathname: string, targetLang: string): string {
  const segments = currentPathname.split("/");
  segments[1] = targetLang;
  return segments.join("/") || "/";
}

function LanguageSwitcher({
  lang,
  dict,
}: {
  lang: string;
  dict: Dictionary;
}) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/60 bg-white/60 px-2 py-1.5 backdrop-blur-sm">
      <span className="mr-1 text-xs font-medium text-gray-500 hidden sm:block">
        {dict.langSwitcher.label}:
      </span>
      {locales.map((locale) => (
        <a
          key={locale}
          href={buildLangUrl(pathname, locale)}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition ${
            locale === lang
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-gray-600 hover:bg-white/80 hover:text-gray-950"
          }`}
        >
          {locale}
        </a>
      ))}
    </div>
  );
}

export default function SiteHeader({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: string;
}) {
  const pathname = usePathname();
  // Determine isHome by checking if pathname is exactly /<lang>
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: dict.nav.home, href: `/${lang}` },
    { label: dict.nav.aboutMe, href: `/${lang}/about` },
    { label: dict.nav.laila, href: `/${lang}/laila` },
    { label: dict.nav.generalDemos, href: `/${lang}/general-demos` },
    { label: dict.nav.customerSolutions, href: `/${lang}/customer-demos` },
  ];

  /* Close menu on route change */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  /* Prevent body scroll while menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={
          isHome
            ? "fixed left-0 right-0 top-8 z-50 px-8 md:px-12 lg:px-20"
            : "relative z-40 px-6 pt-6 md:px-8"
        }
      >
        <div
          className={
            isHome
              ? "mx-auto flex w-full max-w-[1380px] items-center justify-between rounded-full border border-white/60 bg-white/45 px-5 py-3 shadow-[0_20px_60px_rgba(99,102,241,0.18)] backdrop-blur-2xl backdrop-saturate-150 md:px-6"
              : "mx-auto flex w-full max-w-[1360px] items-center justify-between rounded-full border border-white/70 bg-white/80 px-5 py-3 shadow-[0_14px_35px_rgba(99,102,241,0.10)] backdrop-blur-xl md:px-6"
          }
        >
          <a href={`/${lang}`} className="flex items-center gap-3">
            <Image
              src="/laila-logo.png"
              alt="Laila Portfolio logo"
              width={120}
              height={60}
              className="h-11 w-auto object-contain"
              priority
            />
            <div className="hidden sm:block">
              <p className="text-base font-semibold leading-tight tracking-tight text-gray-900">
                Jonathan Gomez | Laila
              </p>
              <p className="text-xs text-gray-500">Personal-professional hub</p>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => {
              const isActive =
                item.href === `/${lang}` || item.href === `/${lang}/`
                  ? pathname === `/${lang}` || pathname === `/${lang}/`
                  : pathname.startsWith(item.href);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition ${
                    isActive
                      ? "text-indigo-600"
                      : "text-gray-700 hover:text-gray-950"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher lang={lang} dict={dict} />

            <a
              href={`/${lang}/contact`}
              className="hidden rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(95,111,255,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(95,111,255,0.42)] lg:block"
            >
              {dict.nav.letsTalk}
            </a>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
              aria-expanded={menuOpen}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-white/60 bg-white/60 backdrop-blur-sm transition hover:bg-white/90 lg:hidden"
            >
              <span
                className={`block h-[2px] w-5 rounded-full bg-gray-800 transition-all duration-300 ${
                  menuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-5 rounded-full bg-gray-800 transition-all duration-300 ${
                  menuOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-5 rounded-full bg-gray-800 transition-all duration-300 ${
                  menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 lg:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer */}
        <nav
          className={`absolute right-4 top-24 w-[calc(100vw-2rem)] max-w-xs overflow-hidden rounded-3xl border border-white/70 bg-white/95 shadow-[0_24px_60px_rgba(99,102,241,0.22)] backdrop-blur-2xl transition-all duration-300 sm:w-72 ${
            menuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          {/* Nav items */}
          <ul className="px-3 py-3">
            {navItems.map((item) => {
              const isActive =
                item.href === `/${lang}` || item.href === `/${lang}/`
                  ? pathname === `/${lang}` || pathname === `/${lang}/`
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-[0.95rem] font-medium transition-colors ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-950"
                    }`}
                  >
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                    )}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Divider + CTA */}
          <div className="border-t border-gray-100 px-3 py-3">
            <a
              href={`/${lang}/contact`}
              className="block w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-3.5 text-center text-sm font-semibold text-white shadow-[0_8px_20px_rgba(95,111,255,0.3)] transition hover:shadow-[0_12px_28px_rgba(95,111,255,0.4)]"
            >
              {dict.nav.letsTalk}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}

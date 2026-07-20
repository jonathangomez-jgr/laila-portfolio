"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";

const locales: Locale[] = ["es", "en", "pt"];

const LANG_META: Record<Locale, { flag: string; label: string }> = {
  es: { flag: "🇲🇽", label: "Español" },
  en: { flag: "🇺🇸", label: "English" },
  pt: { flag: "🇧🇷", label: "Português" },
};

function buildLangUrl(currentPathname: string, targetLang: string): string {
  const segments = currentPathname.split("/");
  segments[1] = targetLang;
  return segments.join("/") || "/";
}

function LanguageSwitcher({ lang }: { lang: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const current = LANG_META[lang as Locale] ?? LANG_META.es;

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = () => setOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [open]);

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-xl border border-white/60 bg-white/60 px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm backdrop-blur-sm transition hover:bg-white/80"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:block">{current.label}</span>
        <svg
          className={`h-3.5 w-3.5 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-white/40 bg-white/80 shadow-[0_20px_50px_rgba(99,102,241,0.18)] backdrop-blur-2xl">
          <ul role="listbox" className="p-1.5 space-y-1">
            {locales.map((locale) => {
              const meta = LANG_META[locale];
              const isActive = locale === lang;
              return (
                <li key={locale} role="option" aria-selected={isActive}>
                  <a
                    href={buildLangUrl(pathname, locale)}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-950"
                    }`}
                  >
                    <span className="text-lg leading-none">{meta.flag}</span>
                    <span>{meta.label}</span>
                    {isActive && (
                      <svg className="ml-auto h-3.5 w-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
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
    { label: dict.nav.laila, href: `/${lang}/laila` },
    { label: dict.nav.generalDemos, href: `/${lang}/general-demos` },
    { label: dict.nav.customerSolutions, href: `/${lang}/customer-demos` },
    { label: dict.nav.insights, href: `/${lang}/insights` },
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
            ? "fixed left-0 right-0 top-4 z-50 px-4 sm:top-8 sm:px-8 md:px-12 lg:px-20"
            : "relative z-40 px-4 pt-4 sm:px-6 sm:pt-6 md:px-8"
        }
      >
        <div
          className={
            isHome
              ? "mx-auto flex w-full items-center justify-between rounded-full border border-white/60 bg-white/45 px-4 py-2.5 shadow-[0_20px_60px_rgba(99,102,241,0.18)] backdrop-blur-2xl backdrop-saturate-150 sm:w-[min(90%,1600px)] sm:px-5 sm:py-3 md:px-6"
              : "mx-auto flex w-full items-center justify-between rounded-full border border-white/70 bg-white/80 px-4 py-2.5 shadow-[0_14px_35px_rgba(99,102,241,0.10)] backdrop-blur-xl sm:w-[min(90%,1600px)] sm:px-5 sm:py-3 md:px-6"
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
                Laila | Solutions Hub
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
            <LanguageSwitcher lang={lang} />

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

          {/* Language switcher — mobile */}
          <div className="border-t border-gray-100 px-3 pt-3">
            <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
              {dict.langSwitcher.label}
            </p>
            <ul className="space-y-1">
              {locales.map((locale) => {
                const meta = LANG_META[locale];
                const isActive = locale === lang;
                return (
                  <li key={locale}>
                    <a
                      href={buildLangUrl(pathname, locale)}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-950"
                      }`}
                    >
                      <span className="text-lg leading-none">{meta.flag}</span>
                      <span>{meta.label}</span>
                      {isActive && (
                        <svg className="ml-auto h-3.5 w-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

        </nav>
      </div>
    </>
  );
}

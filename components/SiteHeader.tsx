"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Me", href: "/about" },
  { label: "Laila", href: "/laila" },
  { label: "General Demos", href: "/general-demos" },
  { label: "Customer's Demos", href: "/customer-demos" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
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
        <a href="/" className="flex items-center gap-3">
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

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
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

        <a
          href="/contact"
          className="rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(95,111,255,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(95,111,255,0.42)]"
        >
          Let&apos;s Talk
        </a>
      </div>
    </header>
  );
}
"use client";

import { useState, type ReactNode } from "react";

type Props = {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
  // Optional small subtitle shown to the right of the title in the header.
  meta?: string;
};

export default function CollapsibleSection({
  title,
  defaultOpen = true,
  children,
  meta,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="my-10 overflow-hidden rounded-2xl border border-gray-200 bg-white/60">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-gray-50 sm:px-6"
        aria-expanded={open}
      >
        <span className="flex items-baseline gap-3">
          <span className="text-lg font-semibold tracking-tight text-gray-950 sm:text-xl">
            {title}
          </span>
          {meta && <span className="text-xs text-gray-500">{meta}</span>}
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className={`h-5 w-5 text-gray-400 transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          <path
            fillRule="evenodd"
            d="M5.22 7.22a.75.75 0 0 1 1.06 0L10 10.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="border-t border-gray-200 px-5 py-5 sm:px-6">{children}</div>
      )}
    </section>
  );
}

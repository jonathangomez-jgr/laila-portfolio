"use client";

import { usePathname } from "next/navigation";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import type { Dictionary } from "@/lib/i18n";

const PRESENTATION_PATH = /^\/[a-z]{2}\/customer-demos\/[^/]+\/deck\//;

export default function SiteChrome({
  children,
  dict,
  lang,
}: {
  children: React.ReactNode;
  dict: Dictionary;
  lang: string;
}) {
  const pathname = usePathname();
  const isPresentation = PRESENTATION_PATH.test(pathname ?? "");

  if (isPresentation) {
    return <>{children}</>;
  }

  return (
    <div className="site-shell">
      <SiteHeader dict={dict} lang={lang} />
      {children}
      <SiteFooter dict={dict} lang={lang} />
    </div>
  );
}

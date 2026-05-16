"use client";

import { usePathname } from "next/navigation";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

const PRESENTATION_PATH = /^\/customer-demos\/[^/]+\/deck\//;

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPresentation = PRESENTATION_PATH.test(pathname ?? "");

  if (isPresentation) {
    return <>{children}</>;
  }

  return (
    <div className="site-shell">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}

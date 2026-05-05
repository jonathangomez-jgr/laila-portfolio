import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "JGR - Laila",
  description:
    "Personal-professional portfolio for Laila, demos, customer presentations and solution storytelling.",
  icons: {
    icon: "/laila-favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <div className="site-shell">
  <SiteHeader />
  <div className="pt-28">
    {children}
  </div>
  <SiteFooter />
</div>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JGR - Laila",
  description:
    "Personal-professional portfolio for Laila, demos, customer presentations and solution storytelling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

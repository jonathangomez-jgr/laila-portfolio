import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JGR - Laila",
    short_name: "Laila",
    description:
      "Personal-professional portfolio for Laila, demos, customer presentations and solution storytelling.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/laila-favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

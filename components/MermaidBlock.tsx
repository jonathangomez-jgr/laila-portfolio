"use client";

import { useEffect, useMemo, useState } from "react";

type MermaidBlockProps = {
  code: string;
};

let initialized = false;

export default function MermaidBlock({ code }: MermaidBlockProps) {
  const [svg, setSvg] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Stable id per code content so React doesn't try to re-parse identical diagrams.
  const renderId = useMemo(
    () => "mermaid-" + Math.random().toString(36).slice(2, 10),
    [code],
  );

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        if (!initialized) {
          mermaid.initialize({
            startOnLoad: false,
            securityLevel: "loose",
            theme: "default",
            themeVariables: {
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
              fontSize: "13px",
              primaryColor: "#eef2ff",
              primaryTextColor: "#1f2937",
              primaryBorderColor: "#5f6fff",
              lineColor: "#64748b",
              secondaryColor: "#f1f5f9",
              tertiaryColor: "#ffffff",
            },
            flowchart: {
              curve: "basis",
              htmlLabels: true,
              padding: 12,
              nodeSpacing: 40,
              rankSpacing: 55,
            },
          });
          initialized = true;
        }

        const { svg: rendered } = await mermaid.render(renderId, code);

        if (cancelled) return;

        // Force responsive sizing on the SVG string before React commits it.
        const responsiveSvg = rendered
          .replace(/<svg([^>]*)\swidth="[^"]*"/, "<svg$1")
          .replace(/<svg([^>]*)\sheight="[^"]*"/, "<svg$1")
          .replace(
            /<svg /,
            '<svg style="width:100%;max-width:100%;height:auto;" ',
          );

        setSvg(responsiveSvg);
        setErrorMessage(null);
      } catch (err) {
        if (cancelled) return;
        setErrorMessage(err instanceof Error ? err.message : String(err));
        setSvg(null);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [code, renderId]);

  if (errorMessage) {
    return (
      <div className="my-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
        <div className="font-semibold">No se pudo renderizar el diagrama</div>
        <pre className="mt-2 overflow-x-auto whitespace-pre-wrap text-xs">{errorMessage}</pre>
        <details className="mt-3">
          <summary className="cursor-pointer text-xs text-red-700 underline">Ver fuente Mermaid</summary>
          <pre className="mt-2 overflow-x-auto rounded bg-white p-3 text-xs text-slate-700">{code}</pre>
        </details>
      </div>
    );
  }

  return (
    <div className="my-6 -mx-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-4 sm:mx-0 sm:p-6">
      {svg ? (
        <div
          className="mermaid-container flex justify-center"
          // React treats this subtree as opaque — no reconciliation attempted.
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div className="mermaid-container flex justify-center py-8 text-sm italic text-slate-400">
          Renderizando diagrama…
        </div>
      )}
    </div>
  );
}

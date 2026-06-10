import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownProps = {
  source: string;
  rewriteLink?: (href: string) => string | null;
};

const isInternalMd = (href: string) =>
  /^\.\.?\//.test(href) && href.endsWith(".md");

export default function Markdown({ source, rewriteLink }: MarkdownProps) {
  return (
    <div className="agentforce-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: () => null, // page already shows H1
          h2: ({ children }) => (
            <h2 className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-gray-950">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 mb-3 text-lg font-semibold text-gray-900">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="my-4 leading-7 text-gray-700">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="my-4 list-disc space-y-1.5 pl-6 text-gray-700">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-4 list-decimal space-y-1.5 pl-6 text-gray-700">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-7">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="my-5 rounded-xl border-l-4 border-[#5f6fff] bg-[#eef2ff]/60 px-5 py-3 text-gray-700">
              {children}
            </blockquote>
          ),
          code: (props) => {
            const { children, className } = props as { children: React.ReactNode; className?: string };
            const isBlock = className?.startsWith("language-");
            if (isBlock) {
              return (
                <code className="block whitespace-pre overflow-x-auto rounded-lg bg-gray-900 px-4 py-3 text-sm leading-6 text-gray-100">
                  {children}
                </code>
              );
            }
            return (
              <code className="rounded bg-gray-100 px-1.5 py-0.5 text-[0.85em] font-mono text-gray-800">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="my-5 overflow-x-auto rounded-xl bg-gray-900 p-0 text-sm">
              {children}
            </pre>
          ),
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-gray-100">{children}</tbody>
          ),
          tr: ({ children }) => <tr className="align-top">{children}</tr>,
          th: ({ children }) => (
            <th className="px-4 py-2.5 font-semibold">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2.5 text-gray-700">{children}</td>
          ),
          a: ({ href, children }) => {
            const url = href ?? "";
            if (rewriteLink && isInternalMd(url)) {
              const next = rewriteLink(url);
              if (next) {
                return (
                  <a href={next} className="text-[#5f6fff] underline-offset-2 hover:underline">
                    {children}
                  </a>
                );
              }
              // Drop links to docs we don't render — render label as plain text.
              return <span>{children}</span>;
            }
            const external = /^https?:/.test(url);
            return (
              <a
                href={url}
                className="text-[#5f6fff] underline-offset-2 hover:underline"
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {children}
              </a>
            );
          },
          hr: () => <hr className="my-8 border-gray-200" />,
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}

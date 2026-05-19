type DemoCardProps = {
  title: string;
  description: string;
  industries?: string[];
  solutions?: string[];
  href: string;
};

export default function DemoCard({
  title,
  description,
  industries = [],
  solutions = [],
  href,
}: DemoCardProps) {
  return (
    <a
      href={href}
      className="block rounded-2xl border border-gray-200 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      {(industries.length > 0 || solutions.length > 0) && (
        <div className="mb-4 space-y-2">
          {industries.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {industries.map((ind) => (
                <span
                  key={ind}
                  className="rounded-full bg-[#eaf5fe] px-3 py-1 text-xs font-medium text-[#066afe]"
                >
                  {ind}
                </span>
              ))}
            </div>
          )}
          {solutions.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {solutions.map((sol) => (
                <span
                  key={sol}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                >
                  {sol}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <h2 className="mb-3 text-xl font-semibold text-gray-950">{title}</h2>
      <p className="leading-7 text-gray-600">{description}</p>
    </a>
  );
}

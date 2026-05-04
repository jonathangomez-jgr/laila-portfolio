type DemoCardProps = {
  title: string;
  description: string;
  industry?: string;
  product?: string;
  href: string;
};

export default function DemoCard({
  title,
  description,
  industry,
  product,
  href,
}: DemoCardProps) {
  return (
    <a
      href={href}
      className="block rounded-2xl border border-gray-200 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {industry && (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            {industry}
          </span>
        )}

        {product && (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            {product}
          </span>
        )}
      </div>

      <h2 className="mb-3 text-xl font-semibold text-gray-950">{title}</h2>
      <p className="leading-7 text-gray-600">{description}</p>
    </a>
  );
}
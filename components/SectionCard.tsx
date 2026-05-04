type SectionCardProps = {
  title: string;
  description: string;
  href?: string;
};

export default function SectionCard({ title, description, href }: SectionCardProps) {
  const content = (
    <div className="rounded-2xl border border-gray-200 p-6 shadow-sm transition hover:shadow-md">
      <h2 className="mb-3 text-xl font-semibold text-gray-950">{title}</h2>
      <p className="leading-7 text-gray-600">{description}</p>
    </div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return content;
}
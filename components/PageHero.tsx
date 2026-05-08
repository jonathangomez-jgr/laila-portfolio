type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export default function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="mx-auto max-w-[1360px] px-8 py-16">
      {eyebrow && (
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
          {eyebrow}
        </p>
      )}

      <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-gray-950">
        {title}
      </h1>

      <p className="mt-6 max-w-3xl text-xl leading-8 text-gray-600">
        {description}
      </p>
    </section>
  );
}
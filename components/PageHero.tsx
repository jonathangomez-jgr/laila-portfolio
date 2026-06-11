type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export default function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="mx-auto max-w-[1540px] px-5 py-10 sm:px-8 sm:py-16">
      {eyebrow && (
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
          {eyebrow}
        </p>
      )}

      <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-gray-950 sm:text-5xl">
        {title}
      </h1>

      <p className="mt-6 max-w-3xl text-base leading-8 text-gray-600 sm:text-xl">
        {description}
      </p>
    </section>
  );
}
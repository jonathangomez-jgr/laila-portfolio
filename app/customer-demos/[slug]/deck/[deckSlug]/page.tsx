import { cookies } from "next/headers";
import Link from "next/link";
import DemoAccessGate from "../../../../../components/DemoAccessGate";
import ExecutiveDeckPlayer from "../../../../../components/executive-deck/ExecutiveDeckPlayer";
import { customerDemos } from "../../../../../data/customerDemos";
import { getExecutiveDeck } from "../../../../../data/executiveDecks";

type ExecutiveDeckPageProps = {
  params: Promise<{
    slug: string;
    deckSlug: string;
  }>;
};

export default async function ExecutiveDeckPage({
  params,
}: ExecutiveDeckPageProps) {
  const { slug, deckSlug } = await params;

  const demo = customerDemos.find((item) => item.slug === slug);
  const deck = getExecutiveDeck(slug, deckSlug);

  if (!demo) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold">Demo no encontrada</h1>
          <Link href="/customer-demos" className="mt-6 inline-block text-indigo-400">
            Volver a customer demos
          </Link>
        </div>
      </main>
    );
  }

  if (!deck) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold">Presentación no encontrada</h1>
          <p className="mt-3 text-slate-400">
            No existe un deck configurado para este slug.
          </p>
          <Link
            href={`/customer-demos/${slug}`}
            className="mt-6 inline-block text-indigo-400"
          >
            Volver a {demo.customerName}
          </Link>
        </div>
      </main>
    );
  }

  const cookieStore = await cookies();
  const hasAccess =
    cookieStore.get(`demo-access-${slug}`)?.value === "granted";

  if (!hasAccess) {
    return (
      <DemoAccessGate
        slug={slug}
        customerName={demo.customerName}
        logo={demo.logo}
      />
    );
  }

  return (
    <ExecutiveDeckPlayer
      deck={deck}
      customerName={demo.customerName}
      logo={demo.logo}
      backHref={`/customer-demos/${slug}`}
    />
  );
}

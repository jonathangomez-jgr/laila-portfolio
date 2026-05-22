import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { hasLocale, getDictionary } from "@/lib/i18n";
import DemoAccessGate from "@/components/DemoAccessGate";
import ExecutiveDeckPlayer from "@/components/executive-deck/ExecutiveDeckPlayer";
import { customerDemos } from "@/data/customerDemos";
import { getExecutiveDeck } from "@/data/executiveDecks";

type ExecutiveDeckPageProps = {
  params: Promise<{
    lang: string;
    slug: string;
    deckSlug: string;
  }>;
};

export default async function ExecutiveDeckPage({
  params,
}: ExecutiveDeckPageProps) {
  const { lang, slug, deckSlug } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const t = dict.customerDetail;

  const demo = customerDemos.find((item) => item.slug === slug);
  const deck = getExecutiveDeck(slug, deckSlug);

  if (!demo) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold">{t.demoNotFound}</h1>
          <Link
            href={`/${lang}/customer-demos`}
            className="mt-6 inline-block text-indigo-400"
          >
            {t.backToCustomerDemos}
          </Link>
        </div>
      </main>
    );
  }

  if (!deck) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold">{t.deckNotFound}</h1>
          <p className="mt-3 text-slate-400">
            {t.deckNotFoundDesc}
          </p>
          <Link
            href={`/${lang}/customer-demos/${slug}`}
            className="mt-6 inline-block text-indigo-400"
          >
            {t.backTo} {demo.customerName}
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
        dict={dict}
      />
    );
  }

  return (
    <ExecutiveDeckPlayer
      deck={deck}
      customerName={demo.customerName}
      logo={demo.logo}
      backHref={`/${lang}/customer-demos/${slug}`}
    />
  );
}

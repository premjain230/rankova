import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryBySlug, categories } from "@/data/categories";
import { getRankingsByCategory } from "@/data/rankings";
import { getProductsByCategory } from "@/data/products";
import { constructMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return {};
  return constructMetadata({
    title: `${cat.name} Rankings & Products`,
    description: cat.description,
    path: `/categories/${slug}`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  const catRankings = getRankingsByCategory(cat.name);
  const catProducts = getProductsByCategory(cat.name);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl mb-3">
        {cat.name}
      </h1>
      <p className="text-neutral-400 mb-12 max-w-2xl">{cat.description}</p>

      {catRankings.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6">Rankings</h2>
          <div className="space-y-3">
            {catRankings.map((r) => (
              <Link
                key={r.id}
                href={`/rankings/${r.slug}`}
                className="block rounded-xl border border-neutral-800 bg-neutral-950 p-5 hover:border-neutral-700 transition-all"
              >
                <h3 className="font-medium text-white">{r.title}</h3>
                <p className="mt-1 text-sm text-neutral-400">{r.items.length} items · Updated {formatDate(r.lastUpdated)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {catProducts.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-white mb-6">Products</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {catProducts.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.slug}`}
                className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 hover:border-neutral-700 transition-all"
              >
                <h3 className="font-medium text-white">{p.name}</h3>
                <p className="mt-1 text-sm text-neutral-400 line-clamp-2">{p.shortDescription}</p>
                <p className="mt-2 text-sm text-blue-400">{p.score.toFixed(1)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

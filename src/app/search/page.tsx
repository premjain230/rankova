import Link from "next/link";
import { products } from "@/data/products";
import { rankings } from "@/data/rankings";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Search",
  path: "/search",
  noIndex: true,
});

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q || "").toLowerCase().trim();

  const matchedProducts = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      )
    : [];

  const matchedRankings = query
    ? rankings.filter(
        (r) =>
          r.title.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query) ||
          r.category.toLowerCase().includes(query)
      )
    : [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-white mb-6">
        {query ? `Results for “${q}”` : "Search Rankova"}
      </h1>

      <form className="mb-10">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search products, rankings..."
          className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        />
      </form>

      {!query && (
        <p className="text-neutral-400">Enter a search term to find products and rankings.</p>
      )}

      {query && matchedProducts.length === 0 && matchedRankings.length === 0 && (
        <p className="text-neutral-400">No results found.</p>
      )}

      {matchedRankings.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-medium text-white mb-4">Rankings</h2>
          <ul className="space-y-3">
            {matchedRankings.map((r) => (
              <li key={r.id}>
                <Link href={`/rankings/${r.slug}`} className="text-blue-400 hover:underline">
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {matchedProducts.length > 0 && (
        <section>
          <h2 className="text-lg font-medium text-white mb-4">Products</h2>
          <ul className="space-y-3">
            {matchedProducts.map((p) => (
              <li key={p.id}>
                <Link href={`/products/${p.slug}`} className="text-blue-400 hover:underline">
                  {p.name}
                </Link>
                <span className="text-neutral-500 text-sm ml-2">{p.shortDescription.slice(0, 60)}...</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

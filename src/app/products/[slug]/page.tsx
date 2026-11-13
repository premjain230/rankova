import { notFound } from "next/navigation";
import Link from "next/link";
import { products, getProductBySlug, getProductById } from "@/data/products";
import { rankings } from "@/data/rankings";
import { formatDate } from "@/lib/utils";
import { constructMetadata } from "@/lib/seo";
import { ExternalLink, ChevronRight, Check, X, Star } from "lucide-react";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return constructMetadata({
    title: `${product.name} — Overview, Features & Rankings`,
    description: product.shortDescription,
    path: `/products/${slug}`,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  // Find rankings this product appears in
  const relatedRankings = rankings
    .map((r) => {
      const item = r.items.find((i) => i.productId === product.id);
      return item ? { ranking: r, rank: item.rank, score: item.score } : null;
    })
    .filter(Boolean) as { ranking: typeof rankings[0]; rank: number; score: number }[];

  const alternatives = product.alternatives
    .map((id) => getProductById(id))
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-8 flex items-center gap-2 text-sm text-neutral-500">
        <Link href="/" className="hover:text-neutral-300">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/categories" className="hover:text-neutral-300">Products</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-neutral-300">{product.name}</span>
      </nav>

      {/* Hero */}
      <header className="mb-12 flex flex-col sm:flex-row gap-8 items-start">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-neutral-900 text-3xl font-bold text-blue-400">
          {product.name.charAt(0)}
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-lg text-neutral-400">{product.shortDescription}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-blue-400 fill-blue-400" />
              <span className="font-semibold text-white">{product.score.toFixed(1)}</span>
              <span className="text-sm text-neutral-500">overall score</span>
            </div>
            <span className="text-neutral-700">·</span>
            <span className="text-sm text-neutral-400 capitalize">{product.pricing.model}</span>
            {product.pricing.startingPrice && (
              <>
                <span className="text-neutral-700">·</span>
                <span className="text-sm text-neutral-400">{product.pricing.startingPrice}</span>
              </>
            )}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={product.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
            >
              Visit Official Website
              <ExternalLink className="h-4 w-4" />
            </a>
            <Link
              href={`/compare?products=${product.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-900 transition-colors"
            >
              Compare
            </Link>
          </div>
        </div>
      </header>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-12">
          {/* Overview */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Overview</h2>
            <p className="text-neutral-300 leading-relaxed">{product.description}</p>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Key Features</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-neutral-300">
                  <Check className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </section>

          {/* Pros & Cons */}
          <section className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5">
              <h3 className="font-medium text-green-400 mb-3">Pros</h3>
              <ul className="space-y-2">
                {product.pros.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-neutral-300">
                    <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5">
              <h3 className="font-medium text-red-400 mb-3">Cons</h3>
              <ul className="space-y-2">
                {product.cons.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-neutral-300">
                    <X className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Pricing */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Pricing</h2>
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5">
              <p className="text-neutral-300">{product.pricing.details}</p>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Rankings */}
          {relatedRankings.length > 0 && (
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5">
              <h3 className="font-medium text-white mb-4">Appears in Rankings</h3>
              <ul className="space-y-3">
                {relatedRankings.map(({ ranking, rank, score }) => (
                  <li key={ranking.id}>
                    <Link
                      href={`/rankings/${ranking.slug}`}
                      className="flex items-center justify-between gap-2 group"
                    >
                      <span className="text-sm text-neutral-300 group-hover:text-blue-300 transition-colors line-clamp-1">
                        {ranking.title}
                      </span>
                      <span className="shrink-0 rounded-md bg-neutral-900 px-2 py-0.5 text-xs font-medium text-blue-400">
                        #{rank}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Score breakdown */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5">
            <h3 className="font-medium text-white mb-4">Score Breakdown</h3>
            <ul className="space-y-3">
              {Object.entries(product.rankingCriteria).map(([key, value]) => (
                <li key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-400 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                    <span className="text-neutral-200">{value}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Meta */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 text-sm text-neutral-400 space-y-2">
            {product.founded && <p>Founded: {product.founded}</p>}
            {product.headquarters && <p>HQ: {product.headquarters}</p>}
            <p>Last updated: {formatDate(product.lastUpdated)}</p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {product.tags.map((t) => (
                <span key={t} className="rounded bg-neutral-900 px-2 py-0.5 text-xs text-neutral-400">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Alternatives */}
          {alternatives.length > 0 && (
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5">
              <h3 className="font-medium text-white mb-4">Alternatives</h3>
              <ul className="space-y-2">
                {alternatives.map((alt) => (
                  <li key={alt!.id}>
                    <Link
                      href={`/products/${alt!.slug}`}
                      className="text-sm text-neutral-300 hover:text-blue-300 transition-colors"
                    >
                      {alt!.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

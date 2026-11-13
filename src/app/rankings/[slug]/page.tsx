import { notFound } from "next/navigation";
import Link from "next/link";
import { getRankingBySlug, rankings } from "@/data/rankings";
import { getProductById } from "@/data/products";
import { formatDate } from "@/lib/utils";
import { constructMetadata } from "@/lib/seo";
import { ExternalLink, ChevronRight, Award, Calendar, Info } from "lucide-react";

export async function generateStaticParams() {
  return rankings.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ranking = getRankingBySlug(slug);
  if (!ranking) return {};
  return constructMetadata({
    title: ranking.seo.title,
    description: ranking.seo.description,
    path: `/rankings/${slug}`,
  });
}

export default async function RankingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ranking = getRankingBySlug(slug);
  if (!ranking) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-neutral-500">
        <Link href="/" className="hover:text-neutral-300">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/rankings" className="hover:text-neutral-300">Rankings</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-neutral-300">{ranking.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
            {ranking.category}
          </span>
          {ranking.isTrending && (
            <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400">
              Trending
            </span>
          )}
          <span className="flex items-center gap-1.5 text-xs text-neutral-500">
            <Calendar className="h-3.5 w-3.5" />
            Updated {formatDate(ranking.lastUpdated)}
          </span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {ranking.title}
        </h1>
        <p className="mt-4 text-lg text-neutral-400 leading-relaxed max-w-3xl">
          {ranking.description}
        </p>
        {ranking.editorialNote && (
          <div className="mt-6 flex gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4">
            <Info className="h-5 w-5 shrink-0 text-blue-400 mt-0.5" />
            <p className="text-sm text-neutral-300">{ranking.editorialNote}</p>
          </div>
        )}
      </header>

      {/* Ranking list */}
      <div className="space-y-6">
        {ranking.items.map((item) => {
          const product = getProductById(item.productId);
          if (!product) return null;
          return (
            <article
              key={item.productId}
              className="rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row gap-6 p-6">
                {/* Rank badge */}
                <div className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-2 shrink-0">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold ${
                    item.rank === 1
                      ? "bg-gradient-to-br from-blue-500 to-blue-700 text-white"
                      : item.rank === 2
                      ? "bg-neutral-800 text-neutral-200"
                      : "bg-neutral-900 text-neutral-400"
                  }`}>
                    #{item.rank}
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="text-2xl font-semibold text-white">{item.score.toFixed(1)}</div>
                    <div className="text-xs text-neutral-500">Score</div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <Link
                        href={`/products/${product.slug}`}
                        className="text-xl font-semibold text-white hover:text-blue-300 transition-colors"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-1 text-sm text-neutral-400">{product.shortDescription}</p>
                    </div>
                    <a
                      href={product.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-sm text-neutral-300 hover:border-neutral-600 hover:text-white transition-colors"
                    >
                      Visit site
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>

                  {/* Key metrics */}
                  {item.keyMetrics && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.keyMetrics.map((m) => (
                        <span
                          key={m}
                          className="rounded-md bg-neutral-900 px-2.5 py-1 text-xs text-neutral-300"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Features */}
                  <div className="mt-4">
                    <h4 className="text-xs font-medium uppercase tracking-wider text-neutral-500 mb-2">
                      Key Features
                    </h4>
                    <ul className="grid gap-1.5 sm:grid-cols-2">
                      {product.features.slice(0, 6).map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-neutral-300">
                          <span className="text-blue-400 mt-1">•</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing */}
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                    <span className="text-neutral-500">Pricing:</span>
                    <span className="font-medium text-neutral-200 capitalize">
                      {product.pricing.model}
                      {product.pricing.startingPrice && ` · ${product.pricing.startingPrice}`}
                    </span>
                  </div>

                  {/* Explanation */}
                  <div className="mt-6 rounded-xl border border-neutral-800 bg-black/50 p-4">
                    <h4 className="text-xs font-medium uppercase tracking-wider text-neutral-500 mb-2 flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5" />
                      Why ranked #{item.rank}
                    </h4>
                    <p className="text-sm text-neutral-300 leading-relaxed">{item.explanation}</p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Methodology */}
      <section className="mt-16 rounded-2xl border border-neutral-800 bg-neutral-950 p-8">
        <h2 className="text-lg font-semibold text-white mb-3">Ranking Methodology</h2>
        <p className="text-sm text-neutral-400 leading-relaxed">{ranking.methodology}</p>
        <Link
          href="/methodology"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300"
        >
          Full methodology & editorial standards
          <ChevronRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}

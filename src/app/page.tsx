import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Award, Search, BookOpen, Zap } from "lucide-react";
import { getFeaturedRankings, getTrendingRankings } from "@/data/rankings";
import { getFeaturedProducts, getProductById } from "@/data/products";
import { categories } from "@/data/categories";
import { formatDate } from "@/lib/utils";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Discover. Compare. Rank.",
  description:
    "Rankova helps you discover the best products, AI tools, websites, apps, and technologies through expert rankings, comparisons, and AI-powered research.",
});

export default function HomePage() {
  const featuredRankings = getFeaturedRankings().slice(0, 4);
  const trending = getTrendingRankings().slice(0, 3);
  const featuredProducts = getFeaturedProducts().slice(0, 6);
  const topCategories = categories.slice(0, 8);

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-neutral-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/80 px-3 py-1 text-sm text-neutral-300">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              AI-powered rankings & discovery
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl text-balance">
              Discover the best.
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Compare. Rank.
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-400 text-balance">
              Rankova is the global platform for discovering, comparing, and ranking the best products,
              AI tools, websites, apps, and technologies — powered by research and transparent methodology.
            </p>

            {/* Search */}
            <form action="/search" method="GET" className="mt-10 mx-auto max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
                <input
                  name="q"
                  type="search"
                  placeholder="Search AI tools, study platforms, software..."
                  className="w-full rounded-2xl border border-neutral-700 bg-neutral-950 py-4 pl-12 pr-4 text-base text-white placeholder:text-neutral-500 shadow-2xl shadow-blue-500/5 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition"
                />
              </div>
            </form>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/rankings/best-ai-study-tools"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
              >
                Best AI Study Tools
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/rankings"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-900 transition-colors"
              >
                Browse all rankings
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="border-b border-neutral-800 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Trending Rankings</h2>
            </div>
            <Link href="/rankings?filter=trending" className="text-sm text-blue-400 hover:text-blue-300">
              View all →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {trending.map((ranking) => (
              <Link
                key={ranking.id}
                href={`/rankings/${ranking.slug}`}
                className="group rounded-2xl border border-neutral-800 bg-neutral-950 p-6 hover:border-neutral-700 hover:bg-neutral-900/50 transition-all"
              >
                <div className="flex items-center gap-2 text-xs font-medium text-blue-400 mb-3">
                  <span className="rounded-full bg-blue-500/10 px-2 py-0.5">{ranking.category}</span>
                  <span className="text-neutral-500">Updated {formatDate(ranking.lastUpdated)}</span>
                </div>
                <h3 className="text-lg font-medium text-white group-hover:text-blue-300 transition-colors">
                  {ranking.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-400 line-clamp-2">{ranking.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rankings / Top 10s */}
      <section className="border-b border-neutral-800 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Popular Top Lists</h2>
            </div>
            <Link href="/rankings" className="text-sm text-blue-400 hover:text-blue-300">
              All rankings →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredRankings.map((ranking) => {
              const topItem = ranking.items[0];
              const topProduct = topItem ? getProductById(topItem.productId) : null;
              return (
                <Link
                  key={ranking.id}
                  href={`/rankings/${ranking.slug}`}
                  className="group flex flex-col rounded-2xl border border-neutral-800 bg-gradient-to-b from-neutral-950 to-black p-6 hover:border-blue-500/30 transition-all"
                >
                  <h3 className="font-medium text-white group-hover:text-blue-300 transition-colors">
                    {ranking.title}
                  </h3>
                  {topProduct && (
                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900 text-xs font-bold text-blue-400">
                        #1
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-200">{topProduct.name}</p>
                        <p className="text-xs text-neutral-500">{topProduct.shortDescription.slice(0, 40)}...</p>
                      </div>
                    </div>
                  )}
                  <div className="mt-auto pt-4 text-xs text-neutral-500">
                    {ranking.items.length} ranked · {formatDate(ranking.lastUpdated)}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-neutral-800 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-white mb-8">Explore Categories</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {topCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="flex flex-col items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-5 text-center hover:border-neutral-700 hover:bg-neutral-900 transition-all"
              >
                <span className="text-2xl">
                  {cat.icon === "Sparkles" && "✨"}
                  {cat.icon === "GraduationCap" && "🎓"}
                  {cat.icon === "Zap" && "⚡"}
                  {cat.icon === "Cpu" && "🖥️"}
                  {cat.icon === "Globe" && "🌐"}
                  {cat.icon === "Smartphone" && "📱"}
                  {cat.icon === "Box" && "📦"}
                  {cat.icon === "Briefcase" && "💼"}
                </span>
                <span className="text-sm font-medium text-neutral-200">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Discovery */}
      <section className="border-b border-neutral-800 py-16 bg-gradient-to-b from-blue-950/10 to-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-sm text-blue-300 mb-4">
                <Zap className="h-3.5 w-3.5" />
                Powered by research-grade AI
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                AI-powered discovery & ranking research
              </h2>
              <p className="mt-4 text-neutral-400 leading-relaxed">
                Our ranking engine uses advanced models to research products, analyze evidence, compare features,
                and generate structured ranking drafts. Every AI-assisted ranking is reviewed by editors before
                publication. We never fabricate reviews, statistics, or user experiences.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-neutral-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">✓</span>
                  Transparent methodology published for every ranking
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">✓</span>
                  Clear distinction between editorial judgment and objective metrics
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">✓</span>
                  Continuous monitoring for outdated information
                </li>
              </ul>
              <Link
                href="/methodology"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300"
              >
                Read our ranking methodology
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-8">
              <h3 className="text-sm font-medium text-neutral-400 mb-4">Featured insight</h3>
              <p className="text-lg text-white leading-relaxed">
                “Learning Allied currently leads our Best AI Study Tools ranking because it optimizes for long-term
                conceptual mastery rather than short-term answer generation — a meaningful distinction for high-stakes
                exam preparation.”
              </p>
              <p className="mt-4 text-sm text-neutral-500">— Rankova Editorial, Nov 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="border-b border-neutral-800 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-white">Featured Products & Platforms</h2>
            <Link href="/categories" className="text-sm text-blue-400 hover:text-blue-300">
              Browse all →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group flex gap-4 rounded-2xl border border-neutral-800 bg-neutral-950 p-5 hover:border-neutral-700 transition-all"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-lg font-bold text-blue-400">
                  {product.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-white group-hover:text-blue-300 transition-colors truncate">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-400 line-clamp-2">{product.shortDescription}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs font-medium text-blue-400">{product.score.toFixed(1)}</span>
                    <span className="text-xs text-neutral-600">·</span>
                    <span className="text-xs text-neutral-500 capitalize">{product.pricing.model}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-950 to-black px-8 py-12 text-center sm:px-16">
            <BookOpen className="mx-auto h-8 w-8 text-blue-400 mb-4" />
            <h2 className="text-2xl font-semibold text-white">Stay ahead of the rankings</h2>
            <p className="mt-3 text-neutral-400 max-w-xl mx-auto">
              Get notified when we publish major ranking updates, new category deep-dives, and AI research insights.
            </p>
            <form className="mt-8 mx-auto flex max-w-md gap-3">
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 rounded-xl border border-neutral-700 bg-black px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              />
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-3 text-xs text-neutral-600">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import { rankings } from "@/data/rankings";
import { formatDate } from "@/lib/utils";
import { constructMetadata } from "@/lib/seo";
import { Award } from "lucide-react";

export const metadata = constructMetadata({
  title: "All Rankings",
  description: "Browse all Rankova rankings across AI tools, education, productivity, technology, and more.",
  path: "/rankings",
});

export default function RankingsIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-12">
        <div className="flex items-center gap-2 mb-3">
          <Award className="h-5 w-5 text-blue-400" />
          <span className="text-sm font-medium text-blue-400">Rankings</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          All Rankings
        </h1>
        <p className="mt-3 text-neutral-400 max-w-2xl">
          Expert-curated and AI-assisted rankings of products, tools, and platforms. Every ranking includes transparent methodology and scoring criteria.
        </p>
      </header>

      <div className="grid gap-4">
        {rankings.map((ranking) => (
          <Link
            key={ranking.id}
            href={`/rankings/${ranking.slug}`}
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-neutral-800 bg-neutral-950 p-6 hover:border-neutral-700 transition-all"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-blue-400">{ranking.category}</span>
                {ranking.isTrending && (
                  <span className="text-xs text-orange-400">· Trending</span>
                )}
              </div>
              <h2 className="text-lg font-medium text-white group-hover:text-blue-300 transition-colors">
                {ranking.title}
              </h2>
              <p className="mt-1 text-sm text-neutral-400 line-clamp-1">{ranking.description}</p>
            </div>
            <div className="shrink-0 text-sm text-neutral-500">
              {ranking.items.length} items · {formatDate(ranking.lastUpdated)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
import { products } from "@/data/products";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Compare Products",
  description: "Compare products and tools side by side on features, pricing, scores, and more.",
  path: "/compare",
});

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl mb-4">
        Compare
      </h1>
      <p className="text-neutral-400 mb-10 max-w-2xl">
        Select products to compare features, pricing, scores, and strengths. Full interactive comparison engine coming soon — for now explore individual product profiles and rankings.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.slice(0, 9).map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.slug}`}
            className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 hover:border-neutral-700 transition-all"
          >
            <h3 className="font-medium text-white">{p.name}</h3>
            <p className="mt-1 text-sm text-neutral-400 line-clamp-2">{p.shortDescription}</p>
            <p className="mt-2 text-sm text-blue-400">Score {p.score.toFixed(1)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

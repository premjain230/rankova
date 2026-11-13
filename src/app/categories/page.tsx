import Link from "next/link";
import { categories } from "@/data/categories";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Categories",
  description: "Browse Rankova rankings and products by category: AI Tools, Education, Productivity, Technology, and more.",
  path: "/categories",
});

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl mb-4">
        Categories
      </h1>
      <p className="text-neutral-400 mb-12 max-w-2xl">
        Explore rankings and products across the domains that matter most.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 hover:border-neutral-700 transition-all"
          >
            <h2 className="text-lg font-medium text-white">{cat.name}</h2>
            <p className="mt-2 text-sm text-neutral-400 line-clamp-2">{cat.description}</p>
            <p className="mt-4 text-xs text-neutral-500">
              {cat.rankingCount} rankings · {cat.productCount} products
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

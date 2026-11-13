import { constructMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "About Rankova",
  description: "Rankova is a global AI-powered ranking and discovery platform helping people find the best products, tools, and technologies.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl mb-6">
        About Rankova
      </h1>
      <div className="space-y-6 text-neutral-300 leading-relaxed">
        <p>
          Rankova is a global platform for discovering, comparing, and ranking the best products, websites, AI tools, applications, companies, services, and technologies.
        </p>
        <p>
          Our tagline — <strong className="text-white">Discover. Compare. Rank.</strong> — captures what we help people do every day: find what is actually good, understand the trade-offs, and make better decisions.
        </p>
        <p>
          We combine transparent editorial methodology with AI-assisted research. Rankings are not popularity contests or paid advertisements. They are structured evaluations based on clear criteria, evidence, and human judgment.
        </p>
        <p>
          Whether you are a student looking for the most effective study tools, a founder evaluating infrastructure, or a professional comparing productivity software, Rankova aims to be the place you trust for clear, high-signal rankings.
        </p>
        <div className="pt-4">
          <Link href="/methodology" className="text-blue-400 hover:text-blue-300">
            Read our ranking methodology →
          </Link>
        </div>
      </div>
    </div>
  );
}

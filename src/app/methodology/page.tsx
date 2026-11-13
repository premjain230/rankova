import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Ranking Methodology",
  description: "How Rankova researches, scores, and ranks products, tools, and platforms. Transparent criteria and editorial standards.",
  path: "/methodology",
});

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl mb-6">
        Ranking Methodology
      </h1>
      <div className="prose prose-invert prose-neutral max-w-none space-y-8 text-neutral-300">
        <section>
          <h2 className="text-xl font-semibold text-white">Our Approach</h2>
          <p className="leading-relaxed">
            Rankova rankings combine structured research, transparent scoring criteria, and editorial judgment. We use AI to accelerate research and draft analysis, but every published ranking is reviewed by humans. We never fabricate statistics, user reviews, or sources.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white">Scoring Dimensions</h2>
          <p className="leading-relaxed mb-4">
            Depending on category, we evaluate products across dimensions such as:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-white">Pedagogical quality</strong> — for education tools: does it build real understanding?</li>
            <li><strong className="text-white">Feature depth & reliability</strong></li>
            <li><strong className="text-white">Usability and design quality</strong></li>
            <li><strong className="text-white">Value for money / pricing fairness</strong></li>
            <li><strong className="text-white">Innovation and differentiation</strong></li>
            <li><strong className="text-white">Curriculum or domain alignment</strong> where relevant</li>
            <li><strong className="text-white">Transparency and trust signals</strong></li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white">AI Assistance</h2>
          <p className="leading-relaxed">
            We use advanced AI models (including Grok via xAI) to research products, summarize evidence, compare features, and generate draft ranking rationales. AI-generated content is always reviewed, fact-checked where possible, and clearly distinguished from pure editorial judgment. We do not publish unverified claims or synthetic user experiences.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white">Updates & Corrections</h2>
          <p className="leading-relaxed">
            Rankings are living documents. We update them when significant product changes, new competitors, or better evidence emerge. Corrections are made promptly when we identify errors.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-white">Independence</h2>
          <p className="leading-relaxed">
            Rankings are not paid placements. While we may accept product submissions and partnerships in the future, editorial rankings remain independent. Featured placement is clearly labeled when used.
          </p>
        </section>
      </div>
    </div>
  );
}

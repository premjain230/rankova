import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Terms",
  path: "/terms",
});

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl mb-6 capitalize">
        Terms
      </h1>
      <p className="text-neutral-400 leading-relaxed">
        This is the terms page for Rankova. Full legal and policy content will be expanded here. Rankova is committed to transparency, user privacy, and responsible AI-assisted ranking practices.
      </p>
    </div>
  );
}

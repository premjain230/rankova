import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Admin",
  noIndex: true,
  path: "/admin",
});

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold text-white mb-4">Admin Dashboard</h1>
      <p className="text-neutral-400 mb-6">
        Secure admin area for managing rankings, products, AI draft review, and publishing.
        Authentication and full CRUD will be connected to your preferred auth provider and database.
      </p>
      <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6 text-sm text-neutral-300 space-y-2">
        <p>• Manage rankings & publish status</p>
        <p>• Create / edit categories and products</p>
        <p>• Generate ranking drafts with Grok (server-side)</p>
        <p>• Review AI research before publication</p>
        <p>• Track updates and featured items</p>
      </div>
      <p className="mt-6 text-xs text-neutral-500">
        Protect this route with authentication in production. Never expose admin actions without authorization.
      </p>
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Docs | Indian States Safety Index",
  description: "REST API documentation for India Safety Index endpoints",
};

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen p-6">
      <section className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-3xl font-bold">API Documentation</h1>
        <p className="text-slate-700">
          This section documents the read endpoints for safety data. Write endpoints will require an API key.
        </p>
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
          <h2 className="text-lg font-semibold">Endpoints</h2>
          <ul className="list-disc pl-6 mt-2 text-sm text-slate-700">
            <li>GET /api/safety - List all states and latest safety metrics</li>
            <li>GET /api/safety/[state_code] - Get metrics for a single state</li>
            <li>GET /api/safety/compare?codes=MH,GJ,DL - Compare multiple states</li>
          </ul>
          <div className="mt-4 text-sm text-slate-600">
            Full schema and examples will be provided after data integration.
          </div>
        </div>
      </section>
    </div>
  );
}

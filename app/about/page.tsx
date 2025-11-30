import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About / Methodology | Indian States Safety Index",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen p-6">
      <section className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-3xl font-bold">About / Methodology</h1>
        <p className="text-slate-700">
          The Indian States Safety Index is a composite metric indicating overall safety across multiple dimensions.
          This page outlines the accessible color scale, legend, and methodology used to compute the safety percentage.
        </p>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-3">High-Contrast Legend (Colorblind-friendly)</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded bg-[#d73027]" />
              <span className="text-sm">Low</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded bg-[#fee08b]" />
              <span className="text-sm">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded bg-[#1a9850]" />
              <span className="text-sm">High</span>
            </div>
          </div>
          <div className="mt-3 text-xs text-slate-600">Palette based on ColorBrewer recommendations for colorblind accessibility.</div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-3">Methodology</h2>
          <p className="text-slate-700">
            Safety Percentage = weighted combination of normalized metrics:
          </p>
          <ul className="list-disc text-slate-700 pl-6 mt-2 text-sm">
            <li>Crime Rate</li>
            <li>Police per Capita</li>
            <li>Road Safety</li>
            <li>Healthcare Access</li>
            <li>Emergency Response Time</li>
            <li>Disaster Risk</li>
            <li>Women's Safety</li>
          </ul>
          <p className="text-slate-700 mt-3 text-sm">
            Detailed formula and weights will be added once data integration is complete.
          </p>
        </div>
      </section>
    </div>
  );
}

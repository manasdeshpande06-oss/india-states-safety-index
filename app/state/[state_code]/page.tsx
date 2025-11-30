// ... existing code ...
          <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm p-6 transition hover:shadow-lg hover:-translate-y-0.5">
            <h2 className="text-lg font-semibold mb-4">Safety Percentage</h2>
// ... existing code ...
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="region" aria-label="State image gallery">
                {gallery.map((g, idx) => (
                  <figure key={idx} className="group rounded-lg overflow-hidden border border-slate-200 bg-white hover:border-emerald-600 hover:shadow-md transition">
                    <img
                      src={g.url}
                      alt={g.caption}
                      loading="lazy"
                      className="w-full h-48 object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
// ... existing code ...
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 transition hover:shadow-lg hover:-translate-y-0.5">
            <h2 className="text-lg font-semibold mb-4">Raw Data</h2>
// ... existing code ...
                    <tr key={m.label} className="border-b hover:bg-slate-50/70 transition">
// ... existing code ...

"use client";

import { useEffect, useMemo, useState } from "react";
import RadarChart from "../components/RadarChart";
import { safetyService } from "@/lib/services/safetyService";
import type { CompareData, State } from "@/lib/services/safetyService";

export default function ComparePage() {
  const [allStates, setAllStates] = useState([] as State[]);
  const [selected, setSelected] = useState([] as string[]);
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingCompare, setLoadingCompare] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [compareData, setCompareData] = useState([] as CompareData[]);

  useEffect(() => {
    const loadStates = async () => {
      try {
        const { data } = await safetyService.getAllStates();
        setAllStates(data);
      } catch (e) {
        setError("Failed to load states");
      } finally {
        setLoadingStates(false);
      }
    };
    loadStates();
    // check server status to detect mock mode
    fetch('/api/_status').then(r => r.json()).then(j => {
      if (j && j.usingSupabase === false) {
        setError('Running in demo/mock mode — Supabase not configured. Using sample data.');
      }
    }).catch(() => {
      setError('Unable to check server status (continuing with sample data).');
    });
  }, []);

  const canAddMore = selected.length < 4;
  const disabledCodes = useMemo(() => new Set(selected), [selected]);

  const toggleSelect = (code: string) => {
    setSelected((prev: string[]) => {
      if (prev.includes(code)) {
        return prev.filter((c: string) => c !== code);
      }
      if (prev.length >= 4) return prev;
      return [...prev, code];
    });
  };

  const handleCompare = async () => {
    if (selected.length < 2) {
      setError("Please select at least 2 states");
      return;
    }
    setError(null);
    setLoadingCompare(true);
    try {
      const { data } = await safetyService.compareStates(selected);
      setCompareData(data);
      // Smooth scroll to chart
      document.getElementById('radar-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (e) {
      setError("Failed to compare states");
    } finally {
      setLoadingCompare(false);
    }
  };

  const sampleStates = useMemo(
    () =>
      compareData.length > 0
        ? compareData.map((c: CompareData) => ({ name: c.name, metrics: c.metrics }))
        : [
            {
              name: "Maharashtra",
              metrics: {
                crime: 62,
                police: 70,
                road: 66,
                health: 72,
                emergency: 58,
                disaster: 64,
                women: 60,
              },
            },
            {
              name: "Gujarat",
              metrics: {
                crime: 75,
                police: 74,
                road: 71,
                health: 78,
                emergency: 65,
                disaster: 70,
                women: 68,
              },
            },
            {
              name: "Delhi",
              metrics: {
                crime: 50,
                police: 68,
                road: 60,
                health: 70,
                emergency: 55,
                disaster: 60,
                women: 52,
              },
            },
          ],
    [compareData]
  );

  return (
    <div className="min-h-screen p-6">
      <section className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold">Compare States</h1>
            <p className="text-slate-600">Select 2–4 states to compare metrics side-by-side.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-2 rounded-md border border-slate-300 bg-white hover:bg-slate-100 text-sm"
              onClick={() => {
                if (compareData.length === 0) return;
                const rows = compareData.map((d: CompareData) => ({
                  name: d.name,
                  ...d.metrics,
                  safety_percentage: d.safety_percentage,
                  state_code: d.state_code,
                }));
                const headers = Object.keys(rows[0] || {});
                const csv = [headers.join(","), ...rows.map((r: Record<string, unknown>) => headers.map((h) => (r as Record<string, unknown>)[h]).join(","))].join("\n");
                const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "state_comparison.csv";
                link.click();
                URL.revokeObjectURL(url);
              }}
            >
              Export CSV
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Select States</h3>
              <div className="text-xs text-slate-600">Selected: {selected.length} / 4</div>
            </div>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {loadingStates ? (
                <div className="col-span-full text-slate-600">Loading states...</div>
              ) : (
                allStates
                  .slice()
                  .sort((a: State, b: State) => a.name.localeCompare(b.name))
                  .map((s: State) => {
                    const isSelected = disabledCodes.has(s.code);
                    const isDisabled = !isSelected && !canAddMore;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        className={`text-left px-3 py-2 rounded-md border text-sm transition group ${
                          isSelected
                            ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                            : "border-slate-200 bg-white hover:border-emerald-600 hover:bg-emerald-50/40 hover:shadow-sm"
                        } ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:-translate-y-0.5"}`}
                        onClick={() => toggleSelect(s.code)}
                        disabled={isDisabled}
                        aria-pressed={isSelected}
                        aria-label={`Select ${s.name}`}
                        title={s.name}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate group-hover:text-emerald-700">{s.name}</span>
                          <span className="text-xs text-slate-500">{s.code}</span>
                        </div>
                      </button>
                    );
                  })
              )}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={handleCompare}
                className="px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-md hover:-translate-y-0.5 transition text-sm disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                disabled={selected.length < 2 || loadingCompare}
              >
                {loadingCompare ? "Comparing..." : "Compare"}
              </button>
              {selected.length > 0 && (
                <button
                  onClick={() => {
                    setSelected([]);
                    setCompareData([]);
                    setError(null);
                  }}
                  className="px-3 py-2 rounded-md border border-slate-300 bg-white hover:bg-slate-100 text-sm"
                >
                  Clear
                </button>
              )}
              {error && <div className="text-sm text-red-700">{error}</div>}
            </div>
          </div>

          <div id="radar-section" className="mt-6">
            <h3 className="text-base font-semibold mb-2">Radar Chart Comparison</h3>
            <div className="rounded-lg border border-slate-200 bg-white p-4 hover:shadow-md hover:-translate-y-0.5 transition">
              <RadarChart states={sampleStates} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

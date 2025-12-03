"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { safetyService, StateDetail } from '@/lib/services/safetyService';
import GaugeChart from '@/app/components/GaugeChart';
import RadarChart from '@/app/components/RadarChart';
import TrendChart from '@/app/components/TrendChart';
import { findStateByCode } from '@/lib/mock/sampleData';

interface Props {
  stateCode: string;
}

export default function StateDetailsClient({ stateCode }: Props) {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null as string | null);
  const [usingSupabase, setUsingSupabase] = useState(null as boolean | null);
  const [usingMockData, setUsingMockData] = useState(false);
  const [data, setData] = useState(null as StateDetail | null);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      setErrorMessage(null);
      try {
        const res = await safetyService.getStateSafetyData(stateCode.toUpperCase());
        if (res?.data) setData(res.data);
        setUsingMockData(false);
      } catch (err) {
        setErrorMessage('Failed to load from server — attempting demo fallback');
        const s = findStateByCode(stateCode);
        if (s) {
          setData({
            state: { id: s.id, code: s.state_code, name: s.state_name },
            safety_percentage: s.safety_percentage,
            metrics: s.metrics,
            data_source_url: s.data_source_url,
            recorded_at: s.recorded_at,
            trend: [
              { year: 2020, value: Math.max(40, s.safety_percentage - 4) },
              { year: 2021, value: Math.max(45, s.safety_percentage - 2) },
              { year: 2022, value: s.safety_percentage }
            ]
          });
          setUsingMockData(true);
        } else {
          setErrorMessage('State not found — returning to home');
          setTimeout(() => router.push('/'), 1600);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [stateCode, router]);

  useEffect(() => {
    fetch('/api/_status').then(r => r.json()).then((j) => setUsingSupabase(!!j?.usingSupabase)).catch(() => setUsingSupabase(false));
  }, []);

  const retryLoad = async () => {
    setLoading(true);
    setErrorMessage(null);
    setUsingMockData(false);
    try {
      const res = await safetyService.getStateSafetyData(stateCode.toUpperCase());
      if (res?.data) setData(res.data);
      setUsingMockData(false);
    } catch (e) {
      setErrorMessage('Retry failed — still using demo data');
      const s = findStateByCode(stateCode);
      if (s) setUsingMockData(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-slate-600">Loading state data…</div>
    </div>
  );

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-slate-600">State not found</div>
    </div>
  );

  const gallery = [
    { url: `https://picsum.photos/seed/${data.state.code}/800/420`, caption: `${data.state.name} — overview` },
    { url: `https://picsum.photos/seed/${data.state.code}-2/800/420`, caption: `${data.state.name} — infrastructure` }
  ];

  const metricsList = [
    { label: 'Crime', value: data.metrics.crime },
    { label: 'Police', value: data.metrics.police },
    { label: 'Road safety', value: data.metrics.road },
    { label: 'Health', value: data.metrics.health },
    { label: 'Emergency', value: data.metrics.emergency },
    { label: 'Disaster', value: data.metrics.disaster },
    { label: "Women's safety", value: data.metrics.women }
  ];

  return (
    <div>
      {/* Demo mode banner (page-level) */}
      {usingSupabase === false && (
        <div className="mx-auto max-w-7xl mb-4 rounded-md border border-amber-200 bg-amber-50 dark:bg-amber-900/30 dark:border-amber-800 text-amber-800 px-4 py-2 text-sm flex items-center justify-between">
          <div>Demo mode active — Supabase is not configured for this environment. Showing example data.</div>
          <div className="flex items-center gap-2">
            <a href="https://supabase.com/dashboard/project/_/settings/api" className="underline text-xs">Add Supabase keys</a>
            <button onClick={retryLoad} className="px-2 py-1 rounded-md bg-amber-100 dark:bg-amber-800/30 text-xs">Retry</button>
          </div>
        </div>
      )}

      {usingMockData && (
        <div className="mx-auto max-w-7xl mb-4 rounded-md border border-slate-200 bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-200 px-4 py-2 text-sm">Using local demo data (mock)</div>
      )}

      {errorMessage && (
        <div className="mx-auto max-w-7xl mb-4 rounded-md border border-red-200 bg-red-50 text-red-700 px-4 py-2 text-sm">{errorMessage}</div>
      )}

      <div className="min-h-screen p-0">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">{data.state.name}</h1>
              <div className="text-sm text-slate-500 mt-1">Code: {data.state.code} • Recorded: {data.recorded_at || '—'}</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-600">Safety</div>
              <GaugeChart value={data.safety_percentage} label="Safety" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm p-6 card-hover">
              <h2 className="text-lg font-semibold mb-4">Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="region" aria-label="State image gallery">
                {gallery.map((g, idx) => (
                  <figure key={idx} className="group rounded-lg overflow-hidden border border-slate-200 bg-white dark:bg-slate-900/40 hover:border-emerald-600 hover:shadow-md transition">
                    <img src={g.url} alt={g.caption} loading="lazy" className="w-full h-48 object-cover group-hover:scale-[1.03] transition-transform duration-300" />
                  </figure>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="text-base font-semibold mb-2">Trend</h3>
                <div className="h-44">
                  <TrendChart data={data.trend.map((t: any) => ({ year: t.year, value: t.value ?? 0 }))} />
                </div>
              </div>
            </div>

            <aside className="rounded-xl border border-slate-200 bg-white dark:bg-slate-900/40 shadow-sm p-6 space-y-4 card-hover">
              <div>
                <h3 className="text-base font-semibold">Top Metrics</h3>
                <div className="mt-3 grid gap-3">
                  {metricsList.map((m) => (
                    <div key={m.label} className="flex items-center justify-between border rounded-md p-3">
                      <div className="text-sm text-slate-700 dark:text-slate-200">{m.label}</div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100">{m.value ?? '—'}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold">Radar</h3>
                <div className="mt-3 h-48">
                  {/* ensure metrics values are numeric (coerce null -> 0) before passing */}
                  {(() => {
                    const sanitized: { [k: string]: number } = Object.fromEntries(
                      Object.entries(data.metrics).map(([k, v]) => [k, (v ?? 0)])
                    );
                    return <RadarChart states={[{ name: data.state.name, metrics: sanitized }]} />;
                  })()}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300">Data source</h3>
                <div className="text-xs text-slate-500 dark:text-slate-200 mt-1 break-words">{data.data_source_url || '—'}</div>
              </div>
            </aside>
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 bg-white dark:bg-slate-900/40 shadow-sm p-6 card-hover">
            <h2 className="text-lg font-semibold mb-4">Raw Data</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs text-slate-500 border-b">
                  <tr>
                    <th className="py-2">Metric</th>
                    <th className="py-2">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {metricsList.map((m) => (
                    <tr key={m.label} className="border-b hover:bg-slate-50/70 transition dark:hover:bg-slate-800/30">
                      <td className="py-2 dark:text-slate-200">{m.label}</td>
                      <td className="py-2 font-semibold dark:text-slate-100">{m.value ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

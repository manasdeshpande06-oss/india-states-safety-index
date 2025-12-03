"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { safetyService } from '@/lib/services/safetyService';
import Tooltip from './components/Tooltip';
import type { SafetyData } from '@/lib/services/safetyService';

// Dynamically import IndiaMap with SSR disabled
const IndiaMap = dynamic(() => import('./components/IndiaMap'), { 
  ssr: false,
  loading: () => (
    <div className="aspect-[16/9] rounded-b-xl border-t border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-slate-600">Loading interactive map...</div>
    </div>
  )
});

// All Indian states and union territories with realistic safety data
const allIndianStates: SafetyData[] = [
  { id: '1', state_code: 'GJ', state_name: 'Gujarat', safety_percentage: 80, metrics: { crime: 75, police: 74, road: 71, health: 78, emergency: 65, disaster: 70, women: 68 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '2', state_code: 'CH', state_name: 'Chandigarh', safety_percentage: 78, metrics: { crime: 72, police: 75, road: 76, health: 74, emergency: 72, disaster: 76, women: 74 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '3', state_code: 'GA', state_name: 'Goa', safety_percentage: 77, metrics: { crime: 70, police: 74, road: 72, health: 70, emergency: 68, disaster: 74, women: 72 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '4', state_code: 'LD', state_name: 'Lakshadweep', safety_percentage: 73, metrics: { crime: 68, police: 71, road: 69, health: 67, emergency: 65, disaster: 71, women: 69 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '5', state_code: 'UK', state_name: 'Uttarakhand', safety_percentage: 73, metrics: { crime: 67, police: 72, road: 70, health: 70, emergency: 66, disaster: 72, women: 70 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '6', state_code: 'SK', state_name: 'Sikkim', safety_percentage: 74, metrics: { crime: 68, police: 72, road: 70, health: 68, emergency: 65, disaster: 68, women: 72 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '7', state_code: 'KL', state_name: 'Kerala', safety_percentage: 76, metrics: { crime: 70, police: 74, road: 72, health: 74, emergency: 68, disaster: 70, women: 74 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '8', state_code: 'AN', state_name: 'Andaman and Nicobar Islands', safety_percentage: 75, metrics: { crime: 68, police: 72, road: 70, health: 68, emergency: 65, disaster: 72, women: 70 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '9', state_code: 'TN', state_name: 'Tamil Nadu', safety_percentage: 75, metrics: { crime: 70, police: 75, road: 72, health: 78, emergency: 65, disaster: 70, women: 68 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '10', state_code: 'MH', state_name: 'Maharashtra', safety_percentage: 72, metrics: { crime: 62, police: 70, road: 66, health: 72, emergency: 58, disaster: 64, women: 60 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '11', state_code: 'AR', state_name: 'Arunachal Pradesh', safety_percentage: 70, metrics: { crime: 65, police: 70, road: 68, health: 66, emergency: 64, disaster: 68, women: 66 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '12', state_code: 'PY', state_name: 'Puducherry', safety_percentage: 70, metrics: { crime: 64, police: 69, road: 67, health: 65, emergency: 63, disaster: 65, women: 69 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '13', state_code: 'KA', state_name: 'Karnataka', safety_percentage: 68, metrics: { crime: 65, police: 72, road: 68, health: 70, emergency: 60, disaster: 66, women: 64 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '14', state_code: 'HR', state_name: 'Haryana', safety_percentage: 68, metrics: { crime: 62, police: 68, road: 66, health: 66, emergency: 62, disaster: 64, women: 68 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '15', state_code: 'TS', state_name: 'Telangana', safety_percentage: 66, metrics: { crime: 61, police: 67, road: 65, health: 63, emergency: 61, disaster: 63, women: 67 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '16', state_code: 'ML', state_name: 'Meghalaya', safety_percentage: 66, metrics: { crime: 60, police: 68, road: 64, health: 62, emergency: 60, disaster: 62, women: 68 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '17', state_code: 'WB', state_name: 'West Bengal', safety_percentage: 65, metrics: { crime: 62, police: 70, road: 68, health: 68, emergency: 60, disaster: 66, women: 70 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '18', state_code: 'TR', state_name: 'Tripura', safety_percentage: 65, metrics: { crime: 60, police: 66, road: 64, health: 62, emergency: 60, disaster: 62, women: 63 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '19', state_code: 'AP', state_name: 'Andhra Pradesh', safety_percentage: 65, metrics: { crime: 58, police: 66, road: 64, health: 62, emergency: 60, disaster: 62, women: 64 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '20', state_code: 'PB', state_name: 'Punjab', safety_percentage: 71, metrics: { crime: 66, police: 71, road: 69, health: 69, emergency: 65, disaster: 67, women: 71 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '21', state_code: 'MZ', state_name: 'Mizoram', safety_percentage: 69, metrics: { crime: 64, police: 70, road: 68, health: 66, emergency: 62, disaster: 66, women: 70 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '22', state_code: 'NL', state_name: 'Nagaland', safety_percentage: 67, metrics: { crime: 62, police: 69, road: 66, health: 64, emergency: 61, disaster: 64, women: 69 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '23', state_code: 'DD', state_name: 'Daman and Diu', safety_percentage: 72, metrics: { crime: 68, police: 70, road: 68, health: 68, emergency: 64, disaster: 66, women: 70 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '24', state_code: 'CG', state_name: 'Chhattisgarh', safety_percentage: 64, metrics: { crime: 60, police: 66, road: 62, health: 62, emergency: 58, disaster: 62, women: 66 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '25', state_code: 'AS', state_name: 'Assam', safety_percentage: 62, metrics: { crime: 55, police: 64, road: 60, health: 60, emergency: 56, disaster: 60, women: 64 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '26', state_code: 'MP', state_name: 'Madhya Pradesh', safety_percentage: 63, metrics: { crime: 60, police: 68, road: 66, health: 66, emergency: 60, disaster: 64, women: 60 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '27', state_code: 'MN', state_name: 'Manipur', safety_percentage: 63, metrics: { crime: 58, police: 66, road: 62, health: 60, emergency: 58, disaster: 60, women: 62 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '28', state_code: 'OD', state_name: 'Odisha', safety_percentage: 61, metrics: { crime: 56, police: 65, road: 62, health: 62, emergency: 58, disaster: 60, women: 58 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '29', state_code: 'RJ', state_name: 'Rajasthan', safety_percentage: 61, metrics: { crime: 58, police: 65, road: 62, health: 68, emergency: 56, disaster: 62, women: 58 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '30', state_code: 'JH', state_name: 'Jharkhand', safety_percentage: 60, metrics: { crime: 55, police: 64, road: 62, health: 62, emergency: 58, disaster: 60, women: 64 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '31', state_code: 'JK', state_name: 'Jammu and Kashmir', safety_percentage: 58, metrics: { crime: 53, police: 62, road: 60, health: 60, emergency: 56, disaster: 58, women: 62 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '32', state_code: 'UP', state_name: 'Uttar Pradesh', safety_percentage: 58, metrics: { crime: 55, police: 66, road: 64, health: 64, emergency: 56, disaster: 60, women: 56 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '33', state_code: 'BR', state_name: 'Bihar', safety_percentage: 56, metrics: { crime: 52, police: 62, road: 58, health: 58, emergency: 54, disaster: 58, women: 54 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '34', state_code: 'LA', state_name: 'Ladakh', safety_percentage: 55, metrics: { crime: 50, police: 60, road: 58, health: 56, emergency: 52, disaster: 56, women: 60 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '35', state_code: 'DL', state_name: 'Delhi', safety_percentage: 54, metrics: { crime: 50, police: 68, road: 60, health: 70, emergency: 55, disaster: 60, women: 52 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
  { id: '36', state_code: 'HP', state_name: 'Himachal Pradesh', safety_percentage: 74, metrics: { crime: 68, police: 72, road: 70, health: 68, emergency: 66, disaster: 68, women: 72 }, data_source_url: 'https://example.com/data-source', recorded_at: '2023-01-01' },
];

export default function Home() {
  const [states, setStates] = useState([] as SafetyData[]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState('name' as 'name' | 'safety');
  const [sortDir, setSortDir] = useState('asc' as 'asc' | 'desc');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchSafetyData();
  }, []);

  const fetchSafetyData = async () => {
    try {
      const { data } = await safetyService.getAllSafetyData();
      if (data && data.length > 0) {
        setStates(data);
      } else {
        // Use all Indian states if API returns empty
        setStates(allIndianStates);
      }
    } catch (error) {
      console.error('Failed to fetch safety data:', error);
      // Use all Indian states as fallback
      setStates(allIndianStates);
    } finally {
      setLoading(false);
    }
  };

  const topSafest = [...states].sort((a, b) => b.safety_percentage - a.safety_percentage).slice(0, 4);
  const topWorst = [...states].sort((a, b) => a.safety_percentage - b.safety_percentage).slice(0, 4);

  const handleStateClick = (stateCode: string) => {
    window.location.href = `/state/${stateCode}`;
  };

  const filteredStates = states.filter((s) =>
    s.state_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.state_code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedStates = [...filteredStates].sort((a, b) => {
    const dir = sortDir === 'asc' ? 1 : -1;
    if (sortKey === 'name') return a.state_name.localeCompare(b.state_name) * dir;
    return (a.safety_percentage - b.safety_percentage) * dir;
  });

  const randomState = () => {
    const s = states[Math.floor(Math.random() * states.length)];
    if (s) window.location.href = `/state/${s.state_code}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50">
        <div className="text-slate-600">Loading safety data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-0">
      <section
        className="relative w-full"
        aria-label="Hero India Safety Index"
      >
        <picture>
          <source
            media="(min-width:1024px)"
            srcSet="https://images.unsplash.com/photo-1581594693700-5f6b2b5a9e59?q=80&w=1600&auto=format&fit=crop"
          />
          <img
            src="https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?q=80&w=1600&auto=format&fit=crop"
            alt="Safety and emergency services concept background"
            loading="lazy"
            className="h-[42vh] md:h-[56vh] w-full object-cover scale-100 transition-transform duration-700 ease-out will-change-transform hover:scale-[1.02]"
          />
        </picture>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-white">
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">India Safety Index — Safety % by State</h1>
              <p className="mt-2 md:mt-4 max-w-2xl text-sm md:text-lg text-white/90">
                Explore safety across all {states.length} Indian states and union territories. Click a state, search, or compare to dive deeper. Colorblind-friendly choropleth and accessible charts included.
              </p>
              <div className="mt-4 md:mt-6 flex flex-wrap items-center gap-3">
                <a href="/compare" className="btn">Compare States</a>
                <a href="/about" className="btn-muted">Methodology</a>
                <Tooltip text="Jump to a random state" id="surprise-me-tip">
                  <button
                    type="button"
                    onClick={randomState}
                    className="btn-muted"
                    aria-label="Jump to a random state"
                    title="Feeling lucky? Jump to a random state"
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 mr-2 animate-float" />
                    Surprise Me
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-slate-600 mt-2 max-w-2xl">
              Use search, the interactive map, or browse the top/bottom lists to find insights per state.
            </p>
          </div>
          <div className="w-full md:w-[30rem] flex flex-col gap-2">
            <label htmlFor="state-search" className="sr-only">Search states</label>
            <div className="relative">
              <input
                id="state-search"
                type="text"
                placeholder="Search states..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="peer w-full rounded-lg border border-slate-300 bg-white px-4 py-2 pr-24 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <span className="absolute right-3 top-2.5 text-slate-400" aria-hidden="true">⌕</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <button
                type="button"
                className={`px-3 py-1.5 rounded-md border transition ${sortKey === 'name' ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-300 hover:bg-slate-100'}`}
                onClick={() => setSortKey('name')}
              >
                Sort by Name
              </button>
              <button
                type="button"
                className={`px-3 py-1.5 rounded-md border transition ${sortKey === 'safety' ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-300 hover:bg-slate-100'}`}
                onClick={() => setSortKey('safety')}
              >
                Sort by Safety
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-md border border-slate-300 hover:bg-slate-100"
                onClick={() => setSortDir((d: 'asc' | 'desc') => (d === 'asc' ? 'desc' : 'asc'))}
                aria-label="Toggle sort direction"
                title="Toggle sort direction"
              >
                {sortDir === 'asc' ? 'Asc ↑' : 'Desc ↓'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Interactive Map</h2>
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-block w-3 h-3 rounded-full bg-[#d73027]" /> Low
                <span className="inline-block w-3 h-3 rounded-full bg-[#fee08b]" /> Medium
                <span className="inline-block w-3 h-3 rounded-full bg-[#1a9850]" /> High
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[16/9] rounded-b-xl border-t border-slate-200 overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                <IndiaMap 
                  states={states.map((s: SafetyData) => ({ code: s.state_code, name: s.state_name, safety: s.safety_percentage }))} 
                  onStateClick={handleStateClick}
                />
              </div>
            </div>
            <div className="px-4 pb-3 text-xs text-slate-500">Tip: Click a state to view details</div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="p-4 border-b border-slate-200">
                <h3 className="text-base font-semibold">Top 10 Safest</h3>
              </div>
              <div className="p-4 grid grid-cols-1 gap-3">
                {topSafest.map((s: SafetyData) => (
                  <a
                    key={s.id}
                    href={`/state/${s.state_code}`}
                    className="group flex items-center gap-3 rounded-lg border border-slate-200 p-3 card-hover animate-fade-in-up scale-pop"
                    data-state-card
                    data-state-name={s.state_name}
                  >
                    <img
                      alt={`${s.state_name} thumbnail`}
                      loading="lazy"
                      src={`https://picsum.photos/seed/${s.state_code}-safe/64/64`}
                      className="w-12 h-12 rounded-md object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium group-hover:text-emerald-700 transition-colors">{s.state_name}</div>
                        <div className="font-semibold text-emerald-700">{s.safety_percentage}%</div>
                      </div>
                      <div className="text-xs text-slate-600 mt-1">Insight: Crime rate down 8% vs last year</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="p-4 border-b border-slate-200">
                <h3 className="text-base font-semibold">Bottom 10</h3>
              </div>
              <div className="p-4 grid grid-cols-1 gap-3">
                {topWorst.map((s: SafetyData) => (
                  <a
                    key={s.id}
                    href={`/state/${s.state_code}`}
                    className="group flex items-center gap-3 rounded-lg border border-slate-200 p-3 card-hover animate-fade-in-up scale-pop"
                    data-state-card
                    data-state-name={s.state_name}
                  >
                    <img
                      alt={`${s.state_name} thumbnail`}
                      loading="lazy"
                      src={`https://picsum.photos/seed/${s.state_code}-risk/64/64`}
                      className="w-12 h-12 rounded-md object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium group-hover:text-red-700 transition-colors">{s.state_name}</div>
                        <div className="font-semibold text-red-700">{s.safety_percentage}%</div>
                      </div>
                      <div className="text-xs text-slate-600 mt-1">Insight: Road incidents up 5% vs last year</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">All States & Union Territories ({states.length})</h2>
              <a href="/compare" className="text-sm px-3 py-1 rounded-md bg-slate-900 text-white hover:bg-slate-700">Compare</a>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sortedStates.map((s: SafetyData) => (
                <a
                  key={s.id}
                  href={`/state/${s.state_code}`}
                    className="group rounded-lg border border-slate-200 p-4 card-hover transition"
                  data-state-card
                  data-state-name={s.state_name}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium group-hover:text-emerald-700 transition-colors">{s.state_name}</div>
                    <div className="text-sm text-slate-500">{s.state_code}</div>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-2 rounded-full transition-all duration-300 group-hover:scale-x-[1.01] origin-left"
                      style={{
                        width: `${s.safety_percentage}%`,
                        background:
                          s.safety_percentage >= 70 ? 'linear-gradient(to right, #22c55e, #16a34a)' :
                          s.safety_percentage >= 60 ? 'linear-gradient(to right, #fde047, #f59e0b)' :
                          'linear-gradient(to right, #fca5a5, #ef4444)',
                      }}
                    />
                  </div>
                  <div className="mt-2 text-sm flex items-center justify-between">
                    <span>
                      Safety: 
                      <Tooltip text={`Crime: ${s.metrics.crime} · Police: ${s.metrics.police} · Road: ${s.metrics.road}`} id={`metrics-${s.id}`}>
                        <span className="font-semibold ml-1 cursor-help underline-offset-2 hover:underline">{s.safety_percentage}%</span>
                      </Tooltip>
                    </span>
                    <span className="text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">View details →</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

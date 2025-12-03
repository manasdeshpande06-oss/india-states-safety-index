"use client";

import { useEffect, useRef } from 'react';
import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface StateMetrics {
  name: string;
  metrics: { [key: string]: number };
}

interface RadarChartProps {
  // multi-state comparison
  states?: StateMetrics[];
  // single dataset mode (per-state details)
  data?: number[];
  labels?: string[];
}

const RadarChart: React.FC<RadarChartProps> = ({ states, data, labels }) => {
  const canvasRef = useRef(null as HTMLCanvasElement | null);
  const chartRef = useRef(null as any);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

      // (metricKeys will be computed later depending on the input shape)

      // single declaration of color arrays for dataset styling
      const colors = ['#1a9850', '#d73027', '#fee08b', '#4575b4'];
      const backgroundColors = [
        'rgba(26, 169, 80, 0.2)',
        'rgba(215, 48, 39, 0.2)',
        'rgba(254, 224, 139, 0.2)',
        'rgba(69, 117, 180, 0.2)'
      ];

    // Support either `states` (array of metrics) or single `data`+`labels` mode.
    let chartLabels: string[] = [];
    let datasets: any[] = [];

    if (Array.isArray(states) && states.length > 0) {
      const metricKeys = Object.keys(states[0]?.metrics ?? {});
      if (metricKeys.length === 0) return;
      chartLabels = metricKeys.map(k => k.charAt(0).toUpperCase() + k.slice(1));
      datasets = states.map((state, index) => ({
        label: state.name,
        data: metricKeys.map(key => state.metrics?.[key] ?? 0),
        borderColor: colors[index % colors.length],
        backgroundColor: backgroundColors[index % backgroundColors.length],
        borderWidth: 2,
        pointBackgroundColor: colors[index % colors.length],
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: colors[index % colors.length]
      }));
    } else if (Array.isArray(data) && Array.isArray(labels) && data.length > 0 && labels.length === data.length) {
      chartLabels = labels;
      datasets = [{
        label: 'Metrics',
        data: data.map(v => (typeof v === 'number' ? v : 0)),
        borderColor: colors[0],
        backgroundColor: backgroundColors[0],
        borderWidth: 2,
        pointBackgroundColor: colors[0],
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: colors[0]
      }];
    } else {
      return; // nothing usable to render
    }
    
    // single declaration of color arrays for dataset styling
    // (these are intentionally defined once to avoid redeclaration errors)

    chartRef.current = new Chart(ctx, {
      type: 'radar',
        data: {
        labels: chartLabels,
        datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const parsed = (context?.parsed as any) || {};
                const r = parsed.r ?? parsed[0] ?? 0;
                const label = context?.dataset?.label ?? '';
                return `${label}: ${r}%`;
              }
            }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            angleLines: { color: '#e5e7eb' },
            grid: { color: '#e5e7eb' },
            pointLabels: { color: '#334155' },
            ticks: {
              stepSize: 20,
              callback: (value: any) => `${value}%`
            }
          }
        },
        animation: {
          duration: 900,
          easing: 'easeOutCubic'
        }
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [states, data, labels]);

  return (
    <div className="w-full h-96">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default RadarChart;

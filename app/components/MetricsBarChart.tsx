'use client';

import { useEffect, useRef } from 'react';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Metric {
  label: string;
  value: number;
}

interface MetricsBarChartProps {
  metrics: Metric[];
}

const MetricsBarChart: React.FC<MetricsBarChartProps> = ({ metrics }) => {
  const canvasRef = useRef(null as HTMLCanvasElement | null);
  const chartRef = useRef(null as any);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (!Array.isArray(metrics) || metrics.length === 0) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const getBackgroundColor = (value: number): string => {
      if (value >= 70) return '#1a9850';
      if (value >= 60) return '#fee08b';
      return '#d73027';
    };

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: metrics.map(m => m.label),
        datasets: [{
          data: metrics.map(m => (typeof m.value === 'number' ? m.value : 0)),
          backgroundColor: metrics.map(m => getBackgroundColor(m.value)),
          borderWidth: 0,
          borderRadius: 4,
          hoverBackgroundColor: metrics.map(m => '#10b981'),
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const parsed = (context?.parsed as any) || {};
                const x = parsed.x ?? parsed[0] ?? 0;
                return `${x}%`;
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            grid: { color: '#e5e7eb' },
            ticks: {
              callback: (value: any) => `${value}%`
            }
          }
        },
        animation: {
          duration: 900,
          easing: 'easeOutCubic'
        },
        hover: {
          mode: 'nearest',
          intersect: true
        }
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [metrics]);

  return (
    <div className="w-full h-80 card-hover animate-fade-in-up" role="img" aria-label="Metrics bar chart showing metric values">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default MetricsBarChart;

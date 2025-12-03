'use client';

import { useEffect, useRef } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

interface GaugeChartProps {
  value: number;
  label?: string;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ value, label = "Safety" }) => {
  const canvasRef = useRef(null as HTMLCanvasElement | null);
  const chartRef = useRef(null as any);

  useEffect(() => {
    if (!canvasRef.current) return;

    // coerce value to a valid 0-100 number
    const safeValue = Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 0;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const getColor = (value: number): string => {
      if (value >= 70) return '#1a9850';
      if (value >= 60) return '#fee08b';
      return '#d73027';
    };

    chartRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [safeValue, 100 - safeValue],
          backgroundColor: [getColor(safeValue), '#e5e7eb'],
          borderWidth: 0,
          hoverBackgroundColor: [ '#10b981', '#d1d5db' ],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        rotation: -90,
        circumference: 180,
        cutout: '70%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        },
        animation: {
          animateRotate: true,
          animateScale: false,
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
  }, [value]);

  return (
    <div className="relative w-56 h-28 group card-hover animate-fade-in-up" role="img" aria-label={`${label} chart showing ${value}%`}>
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center transition-transform duration-300 group-hover:scale-105">
          <div className="text-3xl font-bold">{value}%</div>
          <div className="text-xs text-slate-600">{label}</div>
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;

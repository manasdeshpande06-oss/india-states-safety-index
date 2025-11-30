'use client';

import { useEffect, useRef } from 'react';
import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface StateMetrics {
  name: string;
  metrics: { [key: string]: number };
}

interface RadarChartProps {
  states: StateMetrics[];
}

const RadarChart: React.FC<RadarChartProps> = ({ states }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current || states.length === 0) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Get all metric keys from the first state
    const metricKeys = Object.keys(states[0].metrics);
    
    const colors = ['#1a9850', '#d73027', '#fee08b', '#4575b4'];
    const backgroundColors = [
      'rgba(26, 169, 80, 0.2)',
      'rgba(215, 48, 39, 0.2)',
      'rgba(254, 224, 139, 0.2)',
      'rgba(69, 117, 180, 0.2)'
    ];

    chartRef.current = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: metricKeys.map(key => key.charAt(0).toUpperCase() + key.slice(1)),
        datasets: states.map((state, index) => ({
          label: state.name,
          data: metricKeys.map(key => state.metrics[key]),
          borderColor: colors[index % colors.length],
          backgroundColor: backgroundColors[index % backgroundColors.length],
          borderWidth: 2,
          pointBackgroundColor: colors[index % colors.length],
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: colors[index % colors.length],
        }))
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
              label: (context) => `${context.dataset.label}: ${context.parsed.r}%`
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
              callback: (value) => `${value}%`
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
  }, [states]);

  return (
    <div className="w-full h-96">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default RadarChart;

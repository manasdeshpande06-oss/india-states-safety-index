'use client';

import { useEffect, useRef } from 'react';
import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

interface TrendData {
  year: number;
  value: number;
}

interface TrendChartProps {
  data: TrendData[];
  label?: string;
}

const TrendChart: React.FC<TrendChartProps> = ({ data, label = "Safety %" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(d => d.year),
        datasets: [{
          label: label,
          data: data.map(d => d.value),
          borderColor: '#1a9850',
          backgroundColor: 'rgba(26, 169, 80, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#1a9850',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.parsed.y}%`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            min: 40,
            max: 100,
            ticks: {
              callback: (value) => `${value}%`
            }
          }
        },
        animation: {
          duration: 2000,
          easing: 'easeInOutQuart'
        }
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, label]);

  return (
    <div className="w-full h-64">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default TrendChart;

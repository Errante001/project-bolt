import React from 'react';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { CodeMetrics } from '../../types';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MetricsOverviewProps {
  metrics: CodeMetrics;
}

const MetricsOverview: React.FC<MetricsOverviewProps> = ({ metrics }) => {
  const chartData = {
    labels: ['NOC', 'RFC', 'LCOM', 'WMC', 'DIT', 'CC'],
    datasets: [
      {
        label: 'Current Values',
        data: [metrics.noc, metrics.rfc, metrics.lcom, metrics.wmc, metrics.dit, metrics.cc],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)', // primary-500
          'rgba(14, 165, 233, 0.7)', // secondary-500
          'rgba(139, 92, 246, 0.7)', // accent-500
          'rgba(34, 197, 94, 0.7)',  // success-500
          'rgba(245, 158, 11, 0.7)', // warning-500
          'rgba(239, 68, 68, 0.7)',  // error-500
        ],
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.raw;
            const label = context.label;
            
            // Add additional information based on the metric
            switch(label) {
              case 'NOC':
                return `Number of Classes: ${value}`;
              case 'RFC':
                return `Response for Class: ${value}`;
              case 'LCOM':
                return `Lack of Cohesion: ${value}`;
              case 'WMC':
                return `Weighted Methods: ${value}`;
              case 'DIT':
                return `Depth of Inheritance: ${value}`;
              case 'CC':
                return `Cyclomatic Complexity: ${value}`;
              default:
                return `${label}: ${value}`;
            }
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Metrics Overview</h3>
      <div className="h-60">
        <Bar data={chartData} options={chartOptions} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
        <div className="bg-gray-50 p-2 rounded">
          <p className="text-gray-500">Lines of Code</p>
          <p className="font-semibold text-lg">{metrics.loc.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <p className="text-gray-500">Classes</p>
          <p className="font-semibold text-lg">{metrics.noc}</p>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <p className="text-gray-500">Avg. Complexity</p>
          <p className="font-semibold text-lg">{metrics.cc.toFixed(1)}</p>
        </div>
      </div>
    </div>
  );
};

export default MetricsOverview;
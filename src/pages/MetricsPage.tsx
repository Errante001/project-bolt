import React from 'react';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import MainLayout from '../components/layout/MainLayout';
import { MetricsHistory, CodeMetrics } from '../types';
import { computeMetrics } from '../utils/api';
import { useState } from 'react';
import FileUploadMetrics from '../components/FileUploadMetrics';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Mock data for metrics history
const generateMetricsHistory = (): MetricsHistory[] => {
  const dates = [
    '2025-01-15',
    '2025-02-15',
    '2025-03-15',
    '2025-04-15',
    '2025-05-15',
    '2025-06-15',
  ];
  
  return dates.map((date, index) => ({
    date,
    metrics: {
      noc: 40 + Math.floor(Math.random() * 10),
      rfc: 20 + Math.floor(Math.random() * 8),
      lcom: 8 - (index * 0.2) + (Math.random() * 0.5), // Improving over time
      wmc: 17 - (index * 0.5) + (Math.random() * 1),   // Improving over time
      dit: 3,
      cc: 9 - (index * 0.2) + (Math.random() * 0.8),   // Improving over time
      loc: 12000 + (index * 200) + (Math.random() * 100)
    }
  }));
};

const metricsHistory = generateMetricsHistory();

const MetricsPage: React.FC = () => {
  const lineChartData = {
    labels: metricsHistory.map(entry => {
      const date = new Date(entry.date);
      return date.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });
    }),
    datasets: [
      {
        label: 'LCOM (Falta de Cohesión)',
        data: metricsHistory.map(entry => entry.metrics.lcom),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.3,
      },
      {
        label: 'CC (Complejidad Ciclomática)',
        data: metricsHistory.map(entry => entry.metrics.cc),
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.3,
      },
      {
        label: 'WMC (Métodos Ponderados)',
        data: metricsHistory.map(entry => entry.metrics.wmc),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
      }
    ]
  };

  // Get last metrics for thresholds
  const latestMetrics = metricsHistory[metricsHistory.length - 1].metrics;
  const [file, setFile] = useState<File | null>(null);
const [metricsFromUpload, setMetricsFromUpload] = useState<CodeMetrics | null>(null);

const handleUpload = async () => {
  if (!file) return;
  const result = await computeMetrics(file);
  setMetricsFromUpload(result);
};
  
  // Define thresholds for good/warning/bad metrics
  const getMetricStatus = (metric: keyof CodeMetrics, value: number): { status: string; color: string } => {
    switch(metric) {
      case 'lcom':
        if (value <= 3) return { status: 'Bueno', color: 'text-success-500' };
        if (value <= 5) return { status: 'Aceptable', color: 'text-warning-500' };
        return { status: 'Problemático', color: 'text-error-500' };
      case 'cc':
        if (value <= 5) return { status: 'Bueno', color: 'text-success-500' };
        if (value <= 10) return { status: 'Aceptable', color: 'text-warning-500' };
        return { status: 'Problemático', color: 'text-error-500' };
      case 'wmc':
        if (value <= 10) return { status: 'Bueno', color: 'text-success-500' };
        if (value <= 15) return { status: 'Aceptable', color: 'text-warning-500' };
        return { status: 'Problemático', color: 'text-error-500' };
      default:
        return { status: 'No evaluado', color: 'text-gray-500' };
    }
  };

  return (
    <MainLayout pageTitle="Métricas de Mantenibilidad">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Evolución de Métricas Clave</h2>
        <div className="h-80">
          <Line 
            data={lineChartData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: false,
                  grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                  }
                },
                x: {
                  grid: {
                    display: false
                  }
                }
              },
              plugins: {
                tooltip: {
                  mode: 'index',
                  intersect: false,
                }
              }
            }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Nota: Las métricas están mejorando con el tiempo tras aplicar refactorizaciones sugeridas por la IA.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[
          { name: 'LCOM', key: 'lcom' as keyof CodeMetrics, description: 'Falta de Cohesión de Métodos', value: latestMetrics.lcom.toFixed(1) },
          { name: 'CC', key: 'cc' as keyof CodeMetrics, description: 'Complejidad Ciclomática', value: latestMetrics.cc.toFixed(1) },
          { name: 'WMC', key: 'wmc' as keyof CodeMetrics, description: 'Métodos Ponderados por Clase', value: latestMetrics.wmc.toFixed(1) }
        ].map((metric) => {
          const { status, color } = getMetricStatus(metric.key, parseFloat(metric.value));
          return (
            <div key={metric.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{metric.name}</h3>
                  <p className="text-sm text-gray-500">{metric.description}</p>
                </div>
                <div className="text-2xl font-bold">{metric.value}</div>
              </div>
              <div className="flex justify-between items-center">
                <p className={`text-sm font-medium ${color}`}>
                  Estado: {status}
                </p>
                <div className="text-xs text-gray-500">
                  Umbral recomendado: {metric.key === 'lcom' ? '≤ 3' : metric.key === 'cc' ? '≤ 5' : '≤ 10'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Acerca de las Métricas</h2>
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="text-lg font-medium text-gray-900">LCOM (Falta de Cohesión de Métodos)</h3>
            <p>Mide cuánto los métodos de una clase trabajan con los mismos atributos. Un valor alto indica una clase con responsabilidades dispersas que probablemente debería ser dividida.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">CC (Complejidad Ciclomática)</h3>
            <p>Mide la complejidad del flujo de control en métodos. Valores altos indican código difícil de entender, probar y mantener. Se recomienda mantener este valor por debajo de 10.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">WMC (Métodos Ponderados por Clase)</h3>
            <p>Suma de las complejidades de todos los métodos en una clase. Valores altos pueden indicar clases con demasiadas responsabilidades o excesivamente complejas.</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
  <h2 className="text-xl font-semibold text-gray-900 mb-4">Subir Código y Calcular Métricas</h2>
  <input
    type="file"
    className="mb-4"
    onChange={(e) => setFile(e.target.files?.[0] || null)}
  />
  <button
    onClick={handleUpload}
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
  >
    Calcular Métricas
  </button>

  {metricsFromUpload && (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Resultados</h3>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(metricsFromUpload, null, 2)}</pre>
    </div>
  )}
  <FileUploadMetrics />
</div>

    </MainLayout>
  );
};


export default MetricsPage;

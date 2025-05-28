import React, { useState } from 'react';
import { ChevronDown, GitMerge, AlertTriangle, Check, X } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';

interface MergeRequest {
  id: number;
  title: string;
  author: string;
  author_avatar: string;
  created_at: string;
  source_branch: string;
  target_branch: string;
  status: 'open' | 'merged' | 'closed';
  analysis_status: 'passed' | 'failed' | 'pending';
  metrics_change: {
    lcom: number;
    cc: number;
    loc: number;
  };
}

// Mock data for merge requests
const mockMergeRequests: MergeRequest[] = [
  {
    id: 123,
    title: 'Refactorizar módulo de matrícula',
    author: 'Ana Rodríguez',
    author_avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    created_at: '2025-06-10T14:30:00Z',
    source_branch: 'feature/matricula-refactor',
    target_branch: 'develop',
    status: 'open',
    analysis_status: 'passed',
    metrics_change: {
      lcom: -1.2,
      cc: -2.5,
      loc: +150
    }
  },
  {
    id: 122,
    title: 'Implementar validación de usuarios',
    author: 'Carlos Martínez',
    author_avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    created_at: '2025-06-09T10:15:00Z',
    source_branch: 'feature/user-validation',
    target_branch: 'develop',
    status: 'open',
    analysis_status: 'failed',
    metrics_change: {
      lcom: +0.8,
      cc: +4.2,
      loc: +320
    }
  },
  {
    id: 121,
    title: 'Corregir errores en el sistema de calificaciones',
    author: 'Elena Torres',
    author_avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    created_at: '2025-06-08T16:45:00Z',
    source_branch: 'fix/grades-calculation',
    target_branch: 'develop',
    status: 'merged',
    analysis_status: 'passed',
    metrics_change: {
      lcom: -0.5,
      cc: -1.2,
      loc: -45
    }
  },
  {
    id: 120,
    title: 'Actualizar dependencias y bibliotecas',
    author: 'Roberto Sánchez',
    author_avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    created_at: '2025-06-07T09:30:00Z',
    source_branch: 'chore/update-dependencies',
    target_branch: 'develop',
    status: 'merged',
    analysis_status: 'passed',
    metrics_change: {
      lcom: 0,
      cc: 0,
      loc: -120
    }
  },
  {
    id: 119,
    title: 'Implementar módulo de reportes',
    author: 'María López',
    author_avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    created_at: '2025-06-05T14:20:00Z',
    source_branch: 'feature/reports-module',
    target_branch: 'develop',
    status: 'closed',
    analysis_status: 'failed',
    metrics_change: {
      lcom: +2.1,
      cc: +5.6,
      loc: +560
    }
  }
];

const MergeRequestsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'open' | 'merged' | 'closed'>('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  
  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  const filteredRequests = filter === 'all' 
    ? mockMergeRequests 
    : mockMergeRequests.filter(mr => mr.status === filter);
    
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };
  
  const getStatusBadge = (status: MergeRequest['status']) => {
    switch (status) {
      case 'open':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-50 text-primary-700">Abierto</span>;
      case 'merged':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-success-50 text-success-700">Fusionado</span>;
      case 'closed':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">Cerrado</span>;
    }
  };
  
  const getAnalysisStatusIcon = (status: MergeRequest['analysis_status']) => {
    switch (status) {
      case 'passed':
        return <Check className="h-5 w-5 text-success-500" />;
      case 'failed':
        return <X className="h-5 w-5 text-error-500" />;
      case 'pending':
        return <AlertTriangle className="h-5 w-5 text-warning-500" />;
    }
  };
  
  const getMetricChangeClass = (value: number) => {
    if (value === 0) return 'text-gray-500';
    return value < 0 ? 'text-success-600' : 'text-error-600';
  };

  return (
    <MainLayout pageTitle="Solicitudes de Fusión">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-xl font-semibold text-gray-900">Solicitudes de Fusión</h2>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Filtrar:</span>
            <div className="flex items-center">
              <button 
                className={`px-3 py-1 text-sm rounded-l-md ${filter === 'all' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setFilter('all')}
              >
                Todos
              </button>
              <button 
                className={`px-3 py-1 text-sm ${filter === 'open' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setFilter('open')}
              >
                Abiertos
              </button>
              <button 
                className={`px-3 py-1 text-sm ${filter === 'merged' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setFilter('merged')}
              >
                Fusionados
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-r-md ${filter === 'closed' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setFilter('closed')}
              >
                Cerrados
              </button>
            </div>
          </div>
        </div>
        
        {filteredRequests.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <GitMerge className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>No hay solicitudes de fusión que coincidan con el filtro actual.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredRequests.map((mr) => (
              <li key={mr.id} className="hover:bg-gray-50">
                <div 
                  className="px-4 py-3 cursor-pointer"
                  onClick={() => toggleExpand(mr.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full overflow-hidden mt-1">
                        <img 
                          src={mr.author_avatar} 
                          alt={mr.author} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base font-medium text-gray-900">{mr.title}</h3>
                          {getStatusBadge(mr.status)}
                        </div>
                        <div className="text-sm text-gray-500">
                          <span>!{mr.id}</span> · <span>Por {mr.author}</span> · <span>{formatDate(mr.created_at)}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          <span>{mr.source_branch}</span> → <span>{mr.target_branch}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        {getAnalysisStatusIcon(mr.analysis_status)}
                        <span className="text-xs text-gray-500">Análisis</span>
                      </div>
                      <ChevronDown 
                        className={`h-5 w-5 text-gray-400 transform transition-transform ${expandedId === mr.id ? 'rotate-180' : ''}`} 
                      />
                    </div>
                  </div>
                </div>
                
                {expandedId === mr.id && (
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Cambios en Métricas</h4>
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                              <p className="text-xs text-gray-500">LCOM</p>
                              <p className={`text-base font-medium ${getMetricChangeClass(mr.metrics_change.lcom)}`}>
                                {mr.metrics_change.lcom > 0 ? '+' : ''}{mr.metrics_change.lcom.toFixed(1)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">CC</p>
                              <p className={`text-base font-medium ${getMetricChangeClass(mr.metrics_change.cc)}`}>
                                {mr.metrics_change.cc > 0 ? '+' : ''}{mr.metrics_change.cc.toFixed(1)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">LOC</p>
                              <p className={`text-base font-medium ${mr.metrics_change.loc !== 0 ? (Math.abs(mr.metrics_change.loc) > 500 ? 'text-warning-600' : 'text-gray-700') : 'text-gray-500'}`}>
                                {mr.metrics_change.loc > 0 ? '+' : ''}{mr.metrics_change.loc}
                              </p>
                            </div>
                          </div>
                          
                          {mr.analysis_status === 'failed' && (
                            <div className="mt-3 p-2 bg-error-50 border border-error-100 rounded text-xs text-error-700">
                              <p className="font-medium">Análisis fallido</p>
                              <p className="mt-1">Esta solicitud de fusión aumenta significativamente la complejidad ciclomática (+{mr.metrics_change.cc.toFixed(1)}) y supera el umbral permitido (10).</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Recomendaciones</h4>
                        <div className="bg-white p-3 rounded border border-gray-200">
                          {mr.analysis_status === 'failed' ? (
                            <div className="space-y-2">
                              <p className="text-sm text-gray-700">Para mejorar esta solicitud:</p>
                              <ul className="text-sm text-gray-700 space-y-1">
                                <li className="flex items-start gap-1">
                                  <span className="text-primary-500">•</span>
                                  <span>Extraer métodos pequeños y con una sola responsabilidad</span>
                                </li>
                                <li className="flex items-start gap-1">
                                  <span className="text-primary-500">•</span>
                                  <span>Revisar lógica condicional anidada y simplificarla</span>
                                </li>
                                <li className="flex items-start gap-1">
                                  <span className="text-primary-500">•</span>
                                  <span>Aplicar patrones como Estrategia para reducir la complejidad</span>
                                </li>
                              </ul>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <p className="text-sm text-gray-700">
                                {mr.status === 'merged' 
                                  ? 'Esta solicitud cumple con los criterios de calidad y fue fusionada correctamente.' 
                                  : 'Esta solicitud cumple con los criterios de calidad y puede ser fusionada.'}
                              </p>
                              {mr.metrics_change.lcom < 0 && (
                                <p className="text-xs text-success-600">
                                  ✓ Mejora la cohesión de métodos en {Math.abs(mr.metrics_change.lcom).toFixed(1)} puntos
                                </p>
                              )}
                              {mr.metrics_change.cc < 0 && (
                                <p className="text-xs text-success-600">
                                  ✓ Reduce la complejidad ciclomática en {Math.abs(mr.metrics_change.cc).toFixed(1)} puntos
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex justify-end">
                      <button className="px-3 py-1.5 text-sm font-medium text-white bg-primary-500 rounded-md hover:bg-primary-600">
                        Ver detalles completos
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </MainLayout>
  );
};

export default MergeRequestsPage;
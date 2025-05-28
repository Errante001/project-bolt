import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import ChatInterface from '../components/assistant/ChatInterface';

const AssistantPage: React.FC = () => {
  return (
    <MainLayout pageTitle="Asistente de IA">
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-9rem)]">
        <div className="col-span-12 lg:col-span-9 h-full">
          <ChatInterface />
        </div>
        
        <div className="hidden lg:block lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Información</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">Capacidades del Asistente</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Análisis de métricas de código</li>
                  <li>• Sugerencias de refactorización</li>
                  <li>• Explicación de patrones de diseño</li>
                  <li>• Identificación de problemas de mantenibilidad</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">Ejemplos de Preguntas</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• "¿Cómo puedo mejorar la cohesión de esta clase?"</li>
                  <li>• "Analiza este código para identificar problemas"</li>
                  <li>• "Explica qué significa un LCOM de 7.8"</li>
                  <li>• "Ayúdame a refactorizar este método"</li>
                </ul>
              </div>
              
              <div className="bg-primary-50 p-3 rounded-md border border-primary-100">
                <h4 className="text-sm font-medium text-primary-800 mb-1">Nota Técnica</h4>
                <p className="text-xs text-primary-700">
                  El asistente utiliza un modelo CodeBERT entrenado con datos específicos de la UCI. Prioriza las buenas prácticas para entornos académicos y sistemas legacy (PHP, Java, C#).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AssistantPage;
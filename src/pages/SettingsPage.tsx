import React, { useState } from 'react';
import { Save, Trash2 } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';

const SettingsPage: React.FC = () => {
  const [thresholds, setThresholds] = useState({
    lcom: 5,
    cc: 10,
    wmc: 15
  });
  
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    slackNotifications: false,
    mergeRequestAnalysis: true,
    dailyReports: false
  });
  
  const [projectSettings, setProjectSettings] = useState({
    excludedDirectories: 'vendor/*, node_modules/*, build/*',
    analysisLanguages: ['java', 'php', 'javascript', 'csharp']
  });
  
  const handleThresholdsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setThresholds(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };
  
  const handleNotificationsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleExcludedDirsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProjectSettings(prev => ({
      ...prev,
      excludedDirectories: e.target.value
    }));
  };
  
  const handleLanguageToggle = (language: string) => {
    setProjectSettings(prev => {
      const languages = [...prev.analysisLanguages];
      
      if (languages.includes(language)) {
        return {
          ...prev,
          analysisLanguages: languages.filter(lang => lang !== language)
        };
      } else {
        return {
          ...prev,
          analysisLanguages: [...languages, language]
        };
      }
    });
  };
  
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here would be the API call to save settings
    alert('Configuración guardada exitosamente');
  };

  return (
    <MainLayout pageTitle="Configuración">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSaveSettings}>
          <div className="space-y-6">
            {/* Thresholds Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Umbrales de Métricas</h2>
                <p className="text-sm text-gray-500">Define los valores máximos aceptables para las métricas de mantenibilidad</p>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      LCOM (Falta de Cohesión)
                    </label>
                    <input
                      type="number"
                      name="lcom"
                      value={thresholds.lcom}
                      onChange={handleThresholdsChange}
                      min="0"
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">Recomendado: ≤ 3</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CC (Complejidad Ciclomática)
                    </label>
                    <input
                      type="number"
                      name="cc"
                      value={thresholds.cc}
                      onChange={handleThresholdsChange}
                      min="0"
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">Recomendado: ≤ 5</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      WMC (Métodos Ponderados)
                    </label>
                    <input
                      type="number"
                      name="wmc"
                      value={thresholds.wmc}
                      onChange={handleThresholdsChange}
                      min="0"
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">Recomendado: ≤ 10</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Notifications Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Notificaciones</h2>
                <p className="text-sm text-gray-500">Configura cuándo y cómo recibir alertas sobre el análisis de código</p>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      name="emailNotifications"
                      checked={notifications.emailNotifications}
                      onChange={handleNotificationsChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="emailNotifications" className="ml-2 block text-sm font-medium text-gray-700">
                      Notificaciones por correo electrónico
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="slackNotifications"
                      name="slackNotifications"
                      checked={notifications.slackNotifications}
                      onChange={handleNotificationsChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="slackNotifications" className="ml-2 block text-sm font-medium text-gray-700">
                      Notificaciones en Slack
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="mergeRequestAnalysis"
                      name="mergeRequestAnalysis"
                      checked={notifications.mergeRequestAnalysis}
                      onChange={handleNotificationsChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="mergeRequestAnalysis" className="ml-2 block text-sm font-medium text-gray-700">
                      Análisis en solicitudes de fusión
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="dailyReports"
                      name="dailyReports"
                      checked={notifications.dailyReports}
                      onChange={handleNotificationsChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="dailyReports" className="ml-2 block text-sm font-medium text-gray-700">
                      Reportes diarios de calidad
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Project Analysis Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Análisis de Proyecto</h2>
                <p className="text-sm text-gray-500">Configura qué analizar y qué ignorar en el código del proyecto</p>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Directorios excluidos
                  </label>
                  <textarea
                    rows={3}
                    value={projectSettings.excludedDirectories}
                    onChange={handleExcludedDirsChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="vendor/*, node_modules/*, etc."
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Utiliza patrones glob, separados por comas
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lenguajes a analizar
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['java', 'php', 'javascript', 'typescript', 'csharp', 'python', 'ruby', 'cpp'].map(lang => (
                      <div key={lang} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`lang-${lang}`}
                          checked={projectSettings.analysisLanguages.includes(lang)}
                          onChange={() => handleLanguageToggle(lang)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`lang-${lang}`} className="ml-2 block text-sm text-gray-700">
                          {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex justify-between">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4 text-gray-500" />
                Restablecer valores predeterminados
              </button>
              
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Guardar configuración
              </button>
            </div>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
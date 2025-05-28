import React from 'react';
import { Lightbulb, Code } from 'lucide-react';
import { AiSuggestion } from '../../types';

interface AiSuggestionsProps {
  suggestions: AiSuggestion[];
}

const AiSuggestions: React.FC<AiSuggestionsProps> = ({ suggestions }) => {
  const getTypeIcon = (type: AiSuggestion['type']) => {
    switch (type) {
      case 'extract-method':
      case 'extract-class':
        return <Code className="h-4 w-4 text-accent-500" />;
      default:
        return <Lightbulb className="h-4 w-4 text-accent-500" />;
    }
  };

  const formatType = (type: string): string => {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          AI Suggestions
        </h3>
        <span className="text-sm text-gray-500">
          Powered by CodeBERT
        </span>
      </div>
      
      {suggestions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Lightbulb className="h-10 w-10 mx-auto mb-2 text-gray-400" />
          <p>No suggestions available yet</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} className="py-3 first:pt-0 last:pb-0 group">
              <div className="flex gap-3">
                <div className="mt-0.5">
                  {getTypeIcon(suggestion.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">
                      {formatType(suggestion.type)}
                    </span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      suggestion.confidence > 0.8 
                        ? 'bg-success-50 text-success-700' 
                        : suggestion.confidence > 0.5 
                          ? 'bg-warning-50 text-warning-700' 
                          : 'bg-error-50 text-error-700'
                    }`}>
                      {Math.round(suggestion.confidence * 100)}% confidence
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{suggestion.description}</p>
                  
                  <div className="text-xs text-gray-500 mb-2">
                    {suggestion.file && `File: ${suggestion.file}`}
                    {suggestion.line && ` • Line: ${suggestion.line}`}
                  </div>
                  
                  <div className="overflow-hidden rounded-md bg-gray-50 transition-all duration-200 max-h-0 group-hover:max-h-40">
                    <pre className="p-2 text-xs overflow-x-auto">
                      <code className="text-gray-700">{suggestion.codeSnippet}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      {suggestions.length > 0 && (
        <div className="mt-4 text-center">
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            View all suggestions
          </button>
        </div>
      )}
    </div>
  );
};

export default AiSuggestions;
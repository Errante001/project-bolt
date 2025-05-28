import React from 'react';
import { AlertCircle } from 'lucide-react';
import { CodeIssue } from '../../types';

interface IssuesListProps {
  issues: CodeIssue[];
}

const IssuesList: React.FC<IssuesListProps> = ({ issues }) => {
  const getSeverityColor = (severity: CodeIssue['severity']): string => {
    switch (severity) {
      case 'critical': return 'text-error-700 bg-error-50';
      case 'high': return 'text-error-500 bg-error-50';
      case 'medium': return 'text-warning-700 bg-warning-50';
      case 'low': return 'text-warning-500 bg-warning-50';
      case 'info': return 'text-secondary-700 bg-secondary-50';
      default: return 'text-gray-700 bg-gray-50';
    }
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Top Issues</h3>
        <span className="text-sm text-gray-500">
          {issues.length} issues found
        </span>
      </div>
      
      {issues.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <AlertCircle className="h-10 w-10 mx-auto mb-2 text-gray-400" />
          <p>No issues found in this project</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {issues.map((issue) => (
            <li key={issue.id} className="py-3 first:pt-0 last:pb-0">
              <div className="flex items-start">
                <div className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(issue.severity)} mr-3 mt-0.5`}>
                  {issue.severity}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {issue.message}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                    <span>{issue.file}</span>
                    <span>Line: {issue.line}</span>
                    <span>Rule: {issue.rule}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      {issues.length > 0 && (
        <div className="mt-4 text-center">
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            View all issues
          </button>
        </div>
      )}
    </div>
  );
};

export default IssuesList;
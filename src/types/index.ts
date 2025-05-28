export interface Project {
  id: number;
  name: string;
  description: string;
  web_url: string;
  last_activity_at: string;
}

export interface CodeMetrics {
  noc: number; // Number of Classes
  rfc: number; // Response for Class
  lcom: number; // Lack of Cohesion of Methods
  wmc: number; // Weighted Methods per Class
  dit: number; // Depth of Inheritance Tree
  cc: number; // Cyclomatic Complexity
  loc: number; // Lines of Code
}

export interface CodeIssue {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  message: string;
  rule: string;
  file: string;
  line: number;
  column?: number;
}

export interface AiSuggestion {
  id: string;
  type: 'extract-method' | 'extract-class' | 'rename' | 'simplify' | 'other';
  description: string;
  codeSnippet: string;
  suggestedFix: string;
  confidence: number;
  line?: number;
  file?: string;
}

export interface MetricsHistory {
  date: string;
  metrics: CodeMetrics;
}

export interface User {
  id: number;
  name: string;
  username: string;
  avatar_url: string;
}
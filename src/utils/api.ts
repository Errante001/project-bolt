import axios from 'axios';
import { Project, CodeMetrics, CodeIssue, AiSuggestion } from '../types';

// Base config for API requests
const apiClient = axios.create({
  baseURL: 'https://api.gitlab.com/v4', // This would be replaced with actual GitLab instance URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a token to requests
const setAuthToken = (token: string) => {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Remove token
const removeAuthToken = () => {
  delete apiClient.defaults.headers.common['Authorization'];
};

// Get projects
const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await apiClient.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

// Get project details
const getProject = async (projectId: number): Promise<Project> => {
  try {
    const response = await apiClient.get(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project ${projectId}:`, error);
    throw error;
  }
};

// Get code metrics from SonarQube
const getCodeMetrics = async (projectId: number): Promise<CodeMetrics> => {
  try {
    // This would call a backend service that interfaces with SonarQube
    const response = await apiClient.get(`/sonarqube/metrics/${projectId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching metrics for project ${projectId}:`, error);
    throw error;
  }
};

// Get issues from code analysis
const getCodeIssues = async (projectId: number): Promise<CodeIssue[]> => {
  try {
    const response = await apiClient.get(`/sonarqube/issues/${projectId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching issues for project ${projectId}:`, error);
    throw error;
  }
};

// Get AI suggestions
const getAiSuggestions = async (projectId: number): Promise<AiSuggestion[]> => {
  try {
    const response = await apiClient.get(`/ai/suggestions/${projectId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching AI suggestions for project ${projectId}:`, error);
    throw error;
  }
};

// Ask AI for code analysis
const askAi = async (codeSnippet: string): Promise<string> => {
  try {
    const response = await apiClient.post('/ai/analyze', { code: codeSnippet });
    return response.data.analysis;
  } catch (error) {
    console.error('Error getting AI analysis:', error);
    throw error;
  }
};

export {
  setAuthToken,
  removeAuthToken,
  getProjects,
  getProject,
  getCodeMetrics,
  getCodeIssues,
  getAiSuggestions,
  askAi
};

 export async function computeMetrics(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('http://localhost:8000/metrics', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Error al calcular las métricas');
  }

  return response.json();
}
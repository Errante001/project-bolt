import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import ProjectCard from '../components/dashboard/ProjectCard';
import MetricsOverview from '../components/dashboard/MetricsOverview';
import IssuesList from '../components/dashboard/IssuesList';
import AiSuggestions from '../components/dashboard/AiSuggestions';
import { Project, CodeMetrics, CodeIssue, AiSuggestion } from '../types';

// Mock data for demonstration
const mockProjects: Project[] = [
  {
    id: 1,
    name: 'Sistema de Matrícula UCI',
    description: 'Sistema para la gestión de matrículas de estudiantes en la Universidad de Ciencias Informáticas.',
    web_url: '#',
    last_activity_at: '2025-06-10T14:30:00Z',
  },
  {
    id: 2,
    name: 'Portal Académico',
    description: 'Portal para la gestión académica, incluyendo calificaciones, asistencia y materiales de cursos.',
    web_url: '#',
    last_activity_at: '2025-06-08T09:15:00Z',
  },
  {
    id: 3,
    name: 'Sistema de Gestión de Investigaciones',
    description: 'Aplicación para la gestión de proyectos de investigación, publicaciones y resultados científicos.',
    web_url: '#',
    last_activity_at: '2025-06-05T16:45:00Z',
  }
];

const mockMetrics: CodeMetrics = {
  noc: 45,
  rfc: 23,
  lcom: 7.8,
  wmc: 15,
  dit: 3,
  cc: 8.2,
  loc: 12540
};

const mockIssues: CodeIssue[] = [
  {
    id: 'issue-1',
    severity: 'critical',
    message: 'Método demasiado complejo (CC=19)',
    rule: 'complexity',
    file: 'src/matricula/EstudianteService.java',
    line: 78
  },
  {
    id: 'issue-2',
    severity: 'high',
    message: 'Clase con baja cohesión (LCOM=7.2)',
    rule: 'cohesion',
    file: 'src/comun/GestorDatos.java',
    line: 25
  },
  {
    id: 'issue-3',
    severity: 'medium',
    message: 'Método con demasiados parámetros (8)',
    rule: 'params',
    file: 'src/academico/CalificacionController.java',
    line: 122
  }
];

const mockSuggestions: AiSuggestion[] = [
  {
    id: 'sug-1',
    type: 'extract-method',
    description: 'Extraer lógica de validación a un método separado',
    codeSnippet: 'if (estudiante.edad >= 18 && estudiante.promedio >= 4 && estudiante.creditos >= 30) { ... }',
    suggestedFix: 'boolean cumpleRequisitos(Estudiante e) { return e.edad >= 18 && e.promedio >= 4 && e.creditos >= 30; }',
    confidence: 0.92,
    file: 'src/matricula/EstudianteService.java',
    line: 78
  },
  {
    id: 'sug-2',
    type: 'extract-class',
    description: 'Extraer responsabilidades de datos a una clase separada poque me sale de los cojononone',
    codeSnippet: '// GestorDatos.java tiene 15 métodos no relacionados',
    suggestedFix: 'Crear GestorMatricula, GestorCalificaciones y GestorUsuarios',
    confidence: 0.85,
    file: 'src/comun/GestorDatos.java',
    line: 25
  }
];

const Dashboard: React.FC = () => {
  return (
    <MainLayout pageTitle="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {mockProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MetricsOverview metrics={mockMetrics} />
        <IssuesList issues={mockIssues} />
      </div>
      
      <div className="mt-6">
        <AiSuggestions suggestions={mockSuggestions} />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
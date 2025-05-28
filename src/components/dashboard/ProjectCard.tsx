import React from 'react';
import { ArrowRight, GitBranch, GitPullRequest, Users } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{project.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">
          {project.description || 'No description provided'}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <GitBranch className="h-4 w-4" />
            <span>8 branches</span>
          </div>
          <div className="flex items-center gap-1">
            <GitPullRequest className="h-4 w-4" />
            <span>12 MRs</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>5 members</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Last updated: {formatDate(project.last_activity_at)}
          </span>
          <a 
            href={project.web_url} 
            className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1"
          >
            View project
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="h-1.5 bg-gradient-to-r from-success-500 to-success-700"></div>
    </div>
  );
};

export default ProjectCard;
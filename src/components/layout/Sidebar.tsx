import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlignCenter, BarChart2, GitMerge, Home, MessagesSquare, Settings } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: Home },
  { name: 'Metrics', path: '/metrics', icon: BarChart2 },
  { name: 'Merge Requests', path: '/merge-requests', icon: GitMerge },
  
  { name: 'Mike Productions', path: '/', icon: AlignCenter },
  { name: 'AI Assistant', path: '/assistant', icon: MessagesSquare },
  { name: 'Settings', path: '/settings', icon: Settings },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="h-full w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <BarChart2 className="h-6 w-6 text-primary-600" />
          <h1 className="text-xl font-semibold text-gray-900">Code Analyzer</h1>
        </div>
        <p className="text-xs text-gray-500 mt-1">GitLab Maintenance Plugin</p>
      </div>
      
      <nav className="flex-1 pt-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Avatar" 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">UCI Developer</p>
            <p className="text-xs text-gray-500">developer@uci.cu</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
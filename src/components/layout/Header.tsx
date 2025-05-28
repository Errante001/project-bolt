import React, { useState } from 'react';
import { Bell, ChevronDown, Search } from 'lucide-react';

interface HeaderProps {
  projectName?: string;
}

const Header: React.FC<HeaderProps> = ({ projectName = 'All El de mike' }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 sticky top-0 z-10">
      <div className="flex-1 flex items-center">
        <h2 className="text-lg font-semibold text-gray-900">{projectName}</h2>
        <div className="relative ml-8 hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search projects or code"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell className="h-5 w-5 text-gray-600" />
        </button>
        
        <div className="relative">
          <button 
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span>Projects</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sistema de Matrícula</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Portal Académico</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sistema de Gestión</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
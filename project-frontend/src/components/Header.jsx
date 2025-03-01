import React from 'react';
import { Database, Users, UserCog, GraduationCap, Search } from 'lucide-react';

const Header = ({ searchTerm, setSearchTerm, activeCategory, setActiveCategory }) => {
  return (
    <header className="sticky top-0 z-10 bg-background border-b border-gray-800 shadow-md py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Database className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-2xl font-bold terminal-text glow-text">
              NIT Jalandhar <span className="text-gray-400">|</span> People Wiki
            </h1>
          </div>
          
          <div className="w-full md:w-auto flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="search-input w-full py-2 pl-10 pr-4 rounded-md focus:outline-none"
                placeholder="Search people..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2 w-full md:w-auto justify-between">
              <button
                className={`category-btn px-3 py-2 rounded-md flex items-center ${
                  activeCategory === 'all' ? 'active text-primary border-primary' : 'text-gray-300'
                }`}
                onClick={() => setActiveCategory('all')}
              >
                <Users className="w-4 h-4 mr-1" />
                <span>All</span>
              </button>
              <button
                className={`category-btn px-3 py-2 rounded-md flex items-center ${
                  activeCategory === 'student' ? 'active text-primary border-primary' : 'text-gray-300'
                }`}
                onClick={() => setActiveCategory('student')}
              >
                <GraduationCap className="w-4 h-4 mr-1" />
                <span>Students</span>
              </button>
              <button
                className={`category-btn px-3 py-2 rounded-md flex items-center ${
                  activeCategory === 'faculty' ? 'active text-primary border-primary' : 'text-gray-300'
                }`}
                onClick={() => setActiveCategory('faculty')}
              >
                <UserCog className="w-4 h-4 mr-1" />
                <span>Faculty</span>
              </button>
              <button
                className={`category-btn px-3 py-2 rounded-md flex items-center ${
                  activeCategory === 'staff' ? 'active text-primary border-primary' : 'text-gray-300'
                }`}
                onClick={() => setActiveCategory('staff')}
              >
                <Users className="w-4 h-4 mr-1" />
                <span>Staff</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
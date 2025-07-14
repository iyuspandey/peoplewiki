import React, { useState } from 'react';
import { Database, Users, UserCog, GraduationCap, Search, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = ({ searchTerm, setSearchTerm, activeCategory, setActiveCategory }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 bg-background border-b border-gray-800 shadow-md py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Title */}
          <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
            <div className="flex items-center">
              <Database className="h-8 w-8 text-primary mr-2" />
              <h1 className="text-2xl font-bold terminal-text glow-text">
                <Link to="/" className="text-primary hover:text-primary/80">
                  NIT Jalandhar <span className="text-gray-400">|</span> People Wiki
                </Link>
              </h1>
            </div>

            {/* Hamburger Menu - visible only on mobile */}
            <button
              className="md:hidden text-primary focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64 mb-3 md:mb-0">
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

          {/* Buttons - visible on desktop, dropdown on mobile */}
          <div
            className={`${
              menuOpen ? 'flex flex-col space-y-2' : 'hidden'
            } md:flex md:flex-row md:items-center md:space-x-4 w-full md:w-auto`}
          >
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
            <Link to="/chat">
              <button className="category-btn px-3 py-2 rounded-md flex items-center">
                Message
              </button>
            </Link>
            <Link to="/send-receive">
              <button className="category-btn px-3 py-2 rounded-md flex items-center">
                Send & Receive
              </button>
            </Link>
            <Link to="/discussions">
              <button className="category-btn px-3 py-2 rounded-md flex items-center">
                Discussion
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

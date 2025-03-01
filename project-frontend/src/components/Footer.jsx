import React from 'react';
import { Github, Code, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card-bg border-t border-gray-800 py-6 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} NIT Jalandhar People Wiki | <span className="text-primary">v1.0.0</span>
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Code className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Shield className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>This is a fictional representation for educational purposes only. Personal data is not real.</p>
          <p className="mt-1">
            <span className="text-primary terminal-text">[root@nitj]# </span>
            <span className="typing-animation">access_granted</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
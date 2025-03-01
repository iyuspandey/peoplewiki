import React from 'react';
import { Mail, Phone, Award, BookOpen, Briefcase } from 'lucide-react';

const PersonCard = ({ person, onClick }) => {
  return (
    <div 
      className="card rounded-lg overflow-hidden cursor-pointer"
      onClick={() => onClick(person)}
    >
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="relative">
            <img 
              src={person.image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'} 
              alt={person.name} 
              className="w-16 h-16 rounded-full object-cover border-2 border-primary"
            />
            <div className="absolute -bottom-1 -right-1 bg-card-bg rounded-full p-1 border border-gray-700">
              {person.category === 'student' && <GraduationCap className="w-4 h-4 text-primary" />}
              {person.category === 'faculty' && <BookOpen className="w-4 h-4 text-primary" />}
              {person.category === 'staff' && <Briefcase className="w-4 h-4 text-primary" />}
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold terminal-text">{person.name}</h3>
            <p className="text-gray-400 text-sm">{person.role}</p>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          {person.department && (
            <p className="text-gray-300">
              <span className="text-primary">Department:</span> {person.department}
            </p>
          )}
          
          {person.rollNumber && (
            <p className="text-gray-300">
              <span className="text-primary">Roll No:</span> {person.rollNumber}
            </p>
          )}
          
          {person.position && (
            <p className="text-gray-300">
              <span className="text-primary">Position:</span> {person.position}
            </p>
          )}
          
          <div className="flex items-center text-gray-400">
            <Mail className="w-4 h-4 mr-1 text-primary" />
            <span className="truncate">{person.email}</span>
          </div>
          
          {person.phone && (
            <div className="flex items-center text-gray-400">
              <Phone className="w-4 h-4 mr-1 text-primary" />
              <span>{person.phone}</span>
            </div>
          )}
          
          {person.achievements && person.achievements.length > 0 && (
            <div className="flex items-center text-gray-400">
              <Award className="w-4 h-4 mr-1 text-primary" />
              <span>{person.achievements.length} achievements</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Import at the top of the file
const GraduationCap = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
  </svg>
);

export default PersonCard;
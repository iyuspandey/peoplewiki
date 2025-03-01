import React from 'react';
import { X, Mail, Phone, Award, BookOpen, Briefcase, User, Calendar, Hash, MapPin } from 'lucide-react';

const PersonDetail = ({ person, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-20 p-4">
      <div className="bg-card-bg rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card-bg border-b border-gray-700 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold terminal-text">Profile Details</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-700 transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
            <img 
              src={person.image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'} 
              alt={person.name} 
              className="w-32 h-32 rounded-full object-cover border-2 border-primary mb-4 md:mb-0 md:mr-6"
            />
            
            <div>
              <h3 className="text-2xl font-bold terminal-text glow-text">{person.name}</h3>
              <p className="text-gray-400 mb-2">{person.role}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-800 text-primary px-3 py-1 rounded-full text-sm flex items-center">
                  {person.category === 'student' && <GraduationCap className="w-4 h-4 mr-1" />}
                  {person.category === 'faculty' && <BookOpen className="w-4 h-4 mr-1" />}
                  {person.category === 'staff' && <Briefcase className="w-4 h-4 mr-1" />}
                  {person.category.charAt(0).toUpperCase() + person.category.slice(1)}
                </span>
                
                {person.department && (
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-primary" />
                    {person.department}
                  </span>
                )}
                
                {person.year && (
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-primary" />
                    Year {person.year}
                  </span>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-gray-300">
                  <Mail className="w-5 h-5 mr-2 text-primary" />
                  <span>{person.email}</span>
                </div>
                
                {person.phone && (
                  <div className="flex items-center text-gray-300">
                    <Phone className="w-5 h-5 mr-2 text-primary" />
                    <span>{person.phone}</span>
                  </div>
                )}
                
                {person.rollNumber && (
                  <div className="flex items-center text-gray-300">
                    <Hash className="w-5 h-5 mr-2 text-primary" />
                    <span>Roll Number: {person.rollNumber}</span>
                  </div>
                )}
                
                {person.position && (
                  <div className="flex items-center text-gray-300">
                    <User className="w-5 h-5 mr-2 text-primary" />
                    <span>Position: {person.position}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {person.bio && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2 terminal-text">Biography</h4>
              <p className="text-gray-300">{person.bio}</p>
            </div>
          )}
          
          {person.specialization && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2 terminal-text">Specialization</h4>
              <p className="text-gray-300">{person.specialization}</p>
            </div>
          )}
          
          {person.achievements && person.achievements.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-2 terminal-text flex items-center">
                <Award className="w-5 h-5 mr-2 text-primary" />
                Achievements
              </h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {person.achievements.map((achievement, index) => (
                  <li key={index} className="ml-4">
                    <span className="text-primary">{'>'}</span> {achievement}
                  </li>
                ))}
              </ul>
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

export default PersonDetail;
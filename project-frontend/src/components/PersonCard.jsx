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
             src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${person.name}&gender=${person.gender?.toLowerCase()}`}

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

        <div className="space-y-1 text-sm text-gray-300">
          {person.department && <p><span className="text-primary">Department:</span> {person.department}</p>}
          {person.rollno && <p><span className="text-primary">Roll No:</span> {person.rollno}</p>}
          {person.cgpa && <p><span className="text-primary">CGPA:</span> {person.cgpa}</p>}
          {person.batch && <p><span className="text-primary">Batch:</span> {person.batch}</p>}
          {person.gender && <p><span className="text-primary">Gender:</span> {person.gender}</p>}

          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-1 text-primary" />
            <span className="truncate">{person.email}</span>
          </div>

          {person.phone && (
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-1 text-primary" />
              <span>{person.phone}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const GraduationCap = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
  </svg>
);

export default PersonCard;

import React from 'react';
import { X, Mail, Phone, Award, BookOpen, Briefcase, User, Calendar, Hash, MapPin, GraduationCap as IconGrad } from 'lucide-react';

const PersonDetail = ({ person, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-20 p-4">
      <div className="bg-card-bg rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card-bg border-b border-gray-700 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold terminal-text">Profile Details</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-700 transition-colors">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
          <img
  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${person.name}&gender=${person.gender?.toLowerCase()}`}

  alt={person.name}
  className="w-16 h-16 rounded-full object-cover border-2 border-primary"
/>

            <div>
              <h3 className="text-2xl font-bold terminal-text glow-text">{person.name}</h3>
              <p className="text-gray-400 mb-2">{person.role}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-800 text-primary px-3 py-1 rounded-full text-sm flex items-center">
                  {person.category === 'student' && <IconGrad className="w-4 h-4 mr-1" />}
                  {person.category === 'faculty' && <BookOpen className="w-4 h-4 mr-1" />}
                  {person.category === 'staff' && <Briefcase className="w-4 h-4 mr-1" />}
                  {person.category?.charAt(0).toUpperCase() + person.category?.slice(1)}
                </span>

                {person.department && (
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-primary" />
                    {person.department}
                  </span>
                )}

                {person.batch && (
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-primary" />
                    Batch {person.batch}
                  </span>
                )}
              </div>

              <div className="space-y-2 text-gray-300">
                <div className="flex items-center"><Mail className="w-5 h-5 mr-2 text-primary" /><span>{person.email}</span></div>
                {person.phone && <div className="flex items-center"><Phone className="w-5 h-5 mr-2 text-primary" /><span>{person.phone}</span></div>}
                {person.rollno && <div className="flex items-center"><Hash className="w-5 h-5 mr-2 text-primary" /><span>Roll No: {person.rollno}</span></div>}
                {person.cgpa && <div className="flex items-center"><User className="w-5 h-5 mr-2 text-primary" /><span>CGPA: {person.cgpa}</span></div>}
                {person.gender && <div className="flex items-center"><User className="w-5 h-5 mr-2 text-primary" /><span>Gender: {person.gender}</span></div>}
                {person.course && <div className="flex items-center"><BookOpen className="w-5 h-5 mr-2 text-primary" /><span>Course: {person.course}</span></div>}
              </div>
            </div>
          </div>

          {person.bio && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2 terminal-text">Biography</h4>
              <p className="text-gray-300">{person.bio}</p>
            </div>
          )}

          {person.achievements?.length > 0 && (
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

export default PersonDetail;

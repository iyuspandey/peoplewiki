import React from 'react';
import PersonCard from './PersonCard';

const PeopleGrid = ({ people = [], onPersonClick }) => {
  console.log('PeopleGrid people:', people); // Debugging line
  console.log('PeopleGrid people length:', Array.isArray(people) ? people.length : 'Not an array'); // Debugging line

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.isArray(people) && people.length > 0 ? (
        people.map((person) => (
          <PersonCard 
            key={person.id} 
            person={person} 
            onClick={onPersonClick} 
          />
        ))
      ) : (
        <div className="col-span-full text-center py-10">
          <p className="text-gray-400 text-lg">No results found</p>
          <p className="text-primary mt-2 terminal-text">
            [system]: access_denied || query_invalid
          </p>
        </div>
      )}
    </div>
  );
};

export default PeopleGrid;
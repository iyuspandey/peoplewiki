// Home.jsx
import React, { useState, useEffect } from 'react';
import Header from './Header';
import PeopleGrid from './PeopleGrid';
import PersonDetail from './PersonDetail';
import Footer from './Footer';
import AppRoutes from './routes';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://192.168.1.6:4000/api/people');
        const data = await response.json();
        const peopleArray = data.data || [];
        setPeople(Array.isArray(peopleArray) ? peopleArray : []);
        setFilteredPeople(Array.isArray(peopleArray) ? peopleArray : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!Array.isArray(people)) return;

    const conditions = searchTerm
      .split('&&')
      .map((c) => c.trim().toLowerCase())
      .filter(Boolean);

    const filtered = people.filter((person) => {
      const matchesCategory =
        activeCategory === 'all' ||
        (person.category && person.category.toLowerCase() === activeCategory.toLowerCase());

      const satisfiesAllConditions = conditions.every((cond) => {
        if ((cond.startsWith('>') || cond.startsWith('<')) && !isNaN(parseFloat(cond.slice(1)))) {
          const value = parseFloat(cond.slice(1));
          const cgpa = parseFloat(person.cgpa);
          if (cond.startsWith('>')) return cgpa > value;
          if (cond.startsWith('<')) return cgpa < value;
          return false;
        }

        return (
          (person.name || "").toLowerCase().includes(cond) ||
          (person.role || "").toLowerCase().includes(cond) ||
          (person.department || "").toLowerCase().includes(cond) ||
          (person.rollno || "").toLowerCase().includes(cond) ||
          (person.position || "").toLowerCase().includes(cond) ||
          (person.email || "").toLowerCase().includes(cond)
        );
      });

      return satisfiesAllConditions && matchesCategory;
    });

    setFilteredPeople(filtered);
  }, [searchTerm, activeCategory, people]);

  const handlePersonClick = (person) => {
    setSelectedPerson(person);
  };

  const closePersonDetail = () => {
    setSelectedPerson(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 terminal-text animate-pulse">
            NIT Jalandhar People Wiki
          </h1>
          <div className="flex flex-col items-center">
            <div className="terminal-text text-xl mb-2">Initializing database...</div>
            <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary animate-[matrix-fall_2s_ease-in-out_infinite]"></div>
            </div>
            <div className="mt-4 text-gray-400 font-mono">
              <span className="text-primary">[system]</span> Accessing secure records...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold terminal-text">
            <span className="text-primary">[</span> 
            {activeCategory === 'all' ? 'All People' : 
              activeCategory === 'student' ? 'Students' : 
              activeCategory === 'faculty' ? 'Faculty' : 'Staff'}
            <span className="text-primary"> ]</span>
          </h2>
          <div className="text-gray-400 text-sm">
            Showing <span className="text-primary">{filteredPeople.length}</span> results
          </div>
        </div>

        <PeopleGrid 
          people={filteredPeople} 
          onPersonClick={handlePersonClick} 
        />
      </main>

      <Footer />

      {selectedPerson && (
        <PersonDetail 
          person={selectedPerson} 
          onClose={closePersonDetail} 
        />
      )}
    </div>
  );
}

export default Home;

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PeopleGrid from './components/PeopleGrid';
import PersonDetail from './components/PersonDetail';
import Footer from './components/Footer';
//import MatrixBackground from './components/MatrixBackground';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:4000/api/people');
        console.log("Raw Response:", response); // ✅ Log the raw response
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("Fetched data:", data); // Debugging line
        console.log("Parsed JSON Data:", data); // ✅ Log the parsed response

        const peopleArray = data.data || []; // Adjust this line based on the actual structure
        setPeople(Array.isArray(peopleArray) ? peopleArray : []);
        setFilteredPeople(Array.isArray(peopleArray) ? peopleArray : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    fetchData();
  }, []);
  
  // Filter people based on search term and category
  useEffect(() => {
    if (!Array.isArray(people)) return;

    const filtered = people.filter((person) => {
      const matchesSearch = 
        person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (person.department && person.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (person.rollNumber && person.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (person.position && person.position.toLowerCase().includes(searchTerm.toLowerCase())) ||
        person.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = activeCategory === 'all' || person.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredPeople(filtered);
  }, [searchTerm, activeCategory, people]);

  const handlePersonClick = (person) => {
    setSelectedPerson(person);
  };

  const closePersonDetail = () => {
    setSelectedPerson(null);
  };

  // useEffect(() => {
  //   console.log("People state:", people); // ✅ Log the people state
  //   console.log("Filtered People state:", filteredPeople); // ✅ Log the filtered people state
  // }, [people, filteredPeople]);

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

export default App;
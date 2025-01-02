import React, { useState } from 'react';
import './ClientDashboard.css';
import ExpertProfileCard from './ExpertProfile';

const ClientDashboard = () => {
  const [experts, setExperts] = useState([
    { id: 1, name: 'Dr. john stapen', summary: 'Expert in Math and Physics', image: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Dr. Jane Doe', summary: 'Specialist in Computer Science', image: 'https://via.placeholder.com/100' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const addExpert = () => {
    // Prompt the user to enter the expert's designation
    const newDesignation = prompt("Please enter the new expert's Name:");
    const newsummary = prompt("Please enter the new expert's specialization:");
    const newExpert = {
      id: experts.length + 1,
      name: 'New Expert',
      name: newDesignation,
      summary: 'Specialist in AI and ML',
      summary: newsummary,
      image: 'https://via.placeholder.com/100',
    };  
    setExperts((prevExperts) => [...prevExperts, newExpert]);
  };

  
  const removeExpert = (id) => {
    setExperts((prevExperts) => prevExperts.filter((expert) => expert.id !== id));
  };

  const updateExpert = (id) => {
    const newName = prompt("Please enter the new name for the expert:");
    const Designation = prompt("Please enter the new expertize for the expert:");
    
      setExperts((prevExperts) =>
      prevExperts.map((expert) =>
        expert.id === id ? { ...expert, name: newName, specialty: Designation } : expert )
    );
  };
  

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Client Dashboard</h1>
        <button onClick={addExpert}>Add Expert</button> {/* Add Expert Button */}
      </header>

      <main className="dashboard-main">
        <div className="dashboard-title">
          <h2>Experts</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search experts..."
              value={searchQuery}
              onChange={handleSearch}   
            />
          </div>
        </div>

        <div className="expert-list">
          {experts
            .filter((expert) =>
              expert.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((expert) => (
              <div key={expert.id}>
                <ExpertProfileCard expert={expert} />
                <button onClick={() => removeExpert(expert.id)}>Remove</button>
                <button
                  onClick={() =>
                    updateExpert(expert.id, { name: 'Updated Expert', summary: 'Updated summary' })
                  }
                >
                  Update
                </button>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;

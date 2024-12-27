import React, { useState } from 'react';
import './ClientDashboard.css';
import ExpertProfileCard from './ExpertProfile';

const ClientDashboard = () => {
  const [experts, setExperts] = useState([
    { id: 1, name: 'John Doe', summary: 'Expert in Math and Physics', image: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Jane Smith', summary: 'Specialist in Computer Science', image: 'https://via.placeholder.com/100' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const addExpert = () => {
    const newExpert = {
      id: experts.length + 1,
      name: 'New Expert',
      summary: 'Specialist in AI and ML',
      image: 'https://via.placeholder.com/100'
    };
    setExperts((prevExperts) => [...prevExperts, newExpert]);
  };

  const removeExpert = (id) => {
    setExperts((prevExperts) => prevExperts.filter((expert) => expert.id !== id));
  };

  const updateExpert = (id, updatedData) => {
    setExperts((prevExperts) =>
      prevExperts.map((expert) =>
        expert.id === id ? { ...expert, ...updatedData } : expert
      )
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

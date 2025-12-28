import React, { useEffect, useState } from "react";
import { db } from "../../Firebase"; // Import Firestore
import { collection, getDocs } from "firebase/firestore"; // Firestore functions
import ExpertCard from "./../components/ExpertCard.tsx";
import { Link, NavLink } from "react-router-dom"; // For navigation to chat
import "./HomePage.css";

interface Expert {
  id: string;
  name: string;
  photoUrl: string;
  specialization: string;
  availability: string;
  bio: string;
  email: string;
}

const HomePage: React.FC = () => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // State to track errors
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const expertsCollection = collection(db, "Experts");
        const expertsSnapshot = await getDocs(expertsCollection);

        const expertsList = expertsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setExperts(expertsList);
      } catch (err) {
        console.error("Error fetching experts:", err);
        setError("Failed to load experts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

  if (loading) {
    return (
      <div className="homepage-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="homepage-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Tech Consultants World Wide</h1>
          <nav className="homepage-nav" aria-label="Main navigation">
            <ul className="flex gap-6 items-center">
              <li>
                <NavLink to="/dashboard" className={({isActive})=> isActive? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}>Dashboard</NavLink>
              </li>
              <li>
                <NavLink to="/profile" className={({isActive})=> isActive? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}>Profile</NavLink>
              </li>
              <li>
                <NavLink to="/settings" className={({isActive})=> isActive? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'} aria-label="Settings">Settings</NavLink>
              </li>
              <li>
                <NavLink to="/About" className={({isActive})=> isActive? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}>About</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="homepage-main">
        <h2>Meet Our Experts</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search experts..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="expert-list">
          {experts.filter((expert) =>
            expert.name.toLowerCase().includes(searchQuery.toLowerCase())
          ).length > 0 ? (
            experts
              .filter((expert) =>
                expert.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((expert) => (
                <div key={expert.id} className="expert-card-container">
                  <div className="expert-card">
                    <div className="expert-card-left">
                      <img
                        src={process.env.PUBLIC_URL + expert.photoUrl}
                        alt={expert.name}
                      />
                    </div>
                    <div className="expert-card-right">
                      <h3>{expert.name}</h3>
                      <p>{expert.specialization}</p>
                      <p>{expert.bio}</p>
                      <p className="availability">
                        Availability: <strong>{expert.availability}</strong>
                      </p>
                      <Link to={`/chat/${expert.id}`} className="chat-button">
                        Chat Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <p className="no-experts">No experts found.</p>
          )}
        </div>
      </main>
      <footer className="homepage-footer">
        <p>&copy; 2024 Your Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
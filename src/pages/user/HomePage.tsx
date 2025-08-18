import React, { useEffect, useState } from "react";
import { db } from "../../Firebase"; // Import Firestore
import { collection, getDocs } from "firebase/firestore"; // Firestore functions
import ExpertCard from "./../components/ExpertCard.tsx"; 
import { Link } from "react-router-dom"; // For navigation to chat
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
        <h1>Welcome to Your Portal</h1>
        <nav className="homepage-nav">
          <ul>
            <li>
              <a href="/ConsultProtal/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/ConsultProtal/profile">Profile</a>
            </li>
            <li>
              <a href="/ConsultProtal/settings">Settings</a>
            </li>
          </ul>
        </nav>
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
                  <ExpertCard
                    id={expert.id}
                    name={expert.name}
                    photoUrl={process.env.PUBLIC_URL + expert.photoUrl} // Assuming it's stored in the 'public' folder
                    specialization={expert.specialization}
                    availability={expert.availability}
                    bio={expert.bio}
                  />
                  {/* Display Real-Time Availability */}
                  <p className="availability">
                    Availability: <strong>{expert.availability}</strong>
                  </p>
                  {/* Chat Now Button */}
                  <Link to={`/chat/${expert.id}`} className="chat-button">
                    Chat Now
                  </Link>
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
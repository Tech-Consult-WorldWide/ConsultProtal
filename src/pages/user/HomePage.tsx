import React, { useEffect, useState } from "react";
import { db } from "../../Firebase";
import { collection, getDocs } from "firebase/firestore";
import "./HomePage.css";

function HomePage() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <a href="/settings">Settings</a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="homepage-main">
        <h2>Meet Our Experts</h2>
        <div className="expert-list">
          {experts.length > 0 ? (
            experts.map((expert) => (
              <div className="expert-card" key={expert.id}>
                <img
                  src={expert.photoUrl || "https://via.placeholder.com/150"}
                  alt={expert.name}
                  className="expert-photo"
                />
                <div className="expert-details">
                  <h3>{expert.name}</h3>
                  <p>
                    <strong>Specialization:</strong> {expert.specialization}
                  </p>
                  <p>
                    <strong>Availability:</strong> {expert.availability}
                  </p>
                  <p>{expert.bio}</p>
                </div>
                <button className="book-button">
                  Book Appointment
                  </button>
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
}

export default HomePage;

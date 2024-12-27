import React, { useEffect, useState } from "react";
import { db } from "../../Firebase"; // Import Firestore
import { collection, getDocs } from "firebase/firestore"; // Firestore functions
import "./HomePage.css";

function HomePage() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        // Reference the Firestore collection
        const expertsCollection = collection(db, "Experts");
        const expertsSnapshot = await getDocs(expertsCollection);

        // Map through the documents to extract data
        const expertsList = expertsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Update state with fetched experts
        setExperts(expertsList);
      } catch (err) {
        console.error("Error fetching experts:", err);
        setError("Failed to load experts. Please try again later."); // Set error message
      } finally {
        setLoading(false); // Always stop loading
      }
    };

    fetchExperts(); // Call the fetch function
  }, []);

  if (loading) {
    return <div className="homepage-container">Loading...</div>;
  }

  if (error) {
    return <div className="homepage-container">{error}</div>;
  }

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Welcome to Your Portal</h1>
        <nav className="homepage-nav">
          <ul>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/settings">Settings</a></li>
          </ul>
        </nav>
      </header>
      <main className="homepage-main">
        <h2>Experts</h2>
        <div className="expert-list">
          {experts.length > 0 ? (
            experts.map((expert) => (
              <div className="expert-card" key={expert.id}>
                <img
                  src={expert.photoUrl || "https://via.placeholder.com/150"} // Fallback image
                  alt={expert.name}
                  className="expert-photo"
                />
                <h3>{expert.name}</h3>
                <p><strong>Specialization:</strong> {expert.specialization}</p>
                <p><strong>Availability:</strong> {expert.availability}</p>
                <p>{expert.bio}</p>
                <button>Book Appointment</button>
              </div>
            ))
          ) : (
            <p>No experts found.</p>
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

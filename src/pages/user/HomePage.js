import React from 'react';
import './HomePage.css';

function HomePage() {
  const handleLogout = () => {
    alert("You have been logged out."); // Placeholder for logout functionality
    // Logic to redirect to login page can be added here
  };

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Welcome to Your Portal</h1>
        <nav className="homepage-nav">
          <a href="#dashboard">Dashboard</a>
          <a href="#profile">Profile</a>
          <a href="#settings">Settings</a>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </nav>
      </header>
      <main className="homepage-main">
        <h2>Dashboard</h2>
        <p>This is where you can view your activities and manage your account.</p>
      </main>
      <footer className="homepage-footer">
        <p>&copy; 2024 Your Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;

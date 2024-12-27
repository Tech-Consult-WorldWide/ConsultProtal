import React from 'react';
import { Link } from "react-router-dom";
import './HomePage.css';

function HomePage() {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Welcome to Your Portal</h1>
        <nav className="homepage-nav">
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/settings">Settings</Link></li>
          </ul>
        </nav>
      </header>
      <main className="homepage-main">
        <h2>Home Page</h2>
        <p>This is the home page of your portal.</p>
      </main>
      <footer className="homepage-footer">
        <p>&copy; 2024 Your Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;

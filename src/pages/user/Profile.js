import React from 'react';
import './Profile.css';

function Profile() {
  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p>Update your personal details and preferences below.</p>

      <form className="profile-form">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" placeholder="Enter your name" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter your password" />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default Profile;

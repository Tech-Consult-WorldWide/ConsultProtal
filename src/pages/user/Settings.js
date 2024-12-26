import React from 'react';
import './Setting.css';

function Settings() {
  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <p>Configure your account and application preferences below.</p>

      <div className="settings-options">
        <div className="settings-option">
          <h3>Notification Settings</h3>
          <p>Manage how you receive notifications.</p>
        </div>
        <div className="settings-option">
          <h3>Privacy Settings</h3>
          <p>Adjust your privacy preferences.</p>
        </div>
        <div className="settings-option">
          <h3>Account Management</h3>
          <p>Update account information or delete your account.</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;

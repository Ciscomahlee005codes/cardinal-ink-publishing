import React, { useState } from "react";
import { FaUserCircle, FaEnvelope, FaLock, FaMoon, FaBell } from "react-icons/fa";
import "./UserProfileSettings.css";

const UserProfileSettings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <div className="profile-settings">
      <h2>Profile & Settings</h2>
      
      {/* Profile Picture */}
      <div className="profile-picture">
        <FaUserCircle className="avatar-icon" />
        <button className="upload-btn">Change Picture</button>
      </div>

      {/* Settings Form */}
      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <div className="input-box">
            <FaUserCircle className="input-icon" />
            <input type="text" placeholder="Enter full name" />
          </div>
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <div className="input-box">
            <FaEnvelope className="input-icon" />
            <input type="email" placeholder="Enter email" />
          </div>
        </div>

        <div className="form-group">
          <label>Username</label>
          <div className="input-box">
            <FaUserCircle className="input-icon" />
            <input type="text" placeholder="Enter username" />
          </div>
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="input-box">
            <FaLock className="input-icon" />
            <input type="password" placeholder="Enter new password" />
          </div>
        </div>

        {/* Preferences */}
        <div className="preferences">
          <h3>Preferences</h3>
          <div className="toggle-option">
            <FaMoon className="toggle-icon" />
            <span>Dark Mode</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="toggle-option">
            <FaBell className="toggle-icon" />
            <span>Notifications</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <button type="submit" className="save-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserProfileSettings;

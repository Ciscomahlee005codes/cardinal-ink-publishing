import React, { useState } from "react";
import { motion } from "framer-motion";
import "./AdminProfileSettings.css";

const AdminProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@example.com",
    phone: "+234 813 000 0000",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [activeTab, setActiveTab] = useState("profile");

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    alert("Password updated successfully!");
  };

  return (
    <motion.div
      className="admin-profile-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="title">Admin Profile Settings</h1>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => setActiveTab("profile")}
        >
          Profile Info
        </button>
        <button
          className={activeTab === "security" ? "active" : ""}
          onClick={() => setActiveTab("security")}
        >
          Security
        </button>
        <button
          className={activeTab === "preferences" ? "active" : ""}
          onClick={() => setActiveTab("preferences")}
        >
          Preferences
        </button>
      </div>

      {/* Profile Info */}
      {activeTab === "profile" && (
        <div className="card">
          <div className="avatar-section">
            <img
              src="https://via.placeholder.com/150"
              alt="Admin Avatar"
              className="avatar"
            />
            <div>
              <h2>{profile.name}</h2>
              <p className="text-muted">{profile.email}</p>
            </div>
          </div>

          <form className="form" onSubmit={handleProfileUpdate}>
            <label>
              Name
              <input
                type="text"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </label>
            <label>
              Phone
              <input
                type="text"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
              />
            </label>
            <button type="submit" className="btn">
              Update Profile
            </button>
          </form>
        </div>
      )}

      {/* Security */}
      {activeTab === "security" && (
        <div className="card">
          <form className="form" onSubmit={handlePasswordUpdate}>
            <label>
              Current Password
              <input
                type="password"
                value={passwords.currentPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, currentPassword: e.target.value })
                }
              />
            </label>
            <label>
              New Password
              <input
                type="password"
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, newPassword: e.target.value })
                }
              />
            </label>
            <label>
              Confirm New Password
              <input
                type="password"
                value={passwords.confirmPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </label>
            <button type="submit" className="btn">
              Update Password
            </button>
          </form>
        </div>
      )}

      {/* Preferences */}
      {activeTab === "preferences" && (
        <div className="card">
          <div className="preference">
            <span>Enable Dark Mode</span>
            <input type="checkbox" />
          </div>
          <div className="preference">
            <span>Email Notifications</span>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="preference">
            <span>Notifications Alerts</span>
            <input type="checkbox" />
          </div>
          <button className="btn">Save Preferences</button>
        </div>
      )}
    </motion.div>
  );
};

export default AdminProfileSettings;

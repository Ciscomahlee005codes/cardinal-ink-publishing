import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBook,
  FaUsers,
  FaBell,
  FaCogs,
  FaSignOutAlt,
  FaTimes,
  FaBars,
  FaUserShield,
} from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import "./AdminSidebar.css";
import useUserId from "../../../Hooks/useUserId";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const data = useUserId();

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 830);
      if (window.innerWidth > 830) setIsOpen(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthToken");
    window.location.href = "/#/authentication";
  };

  return (
    <>
      {/* Mobile hamburger */}
      {isMobile && !isOpen && (
        <button className="admin-hamburger" onClick={toggleSidebar}>
          <FaBars />
        </button>
      )}

      {isMobile && isOpen && (
        <div className="admin-overlay" onClick={toggleSidebar}></div>
      )}

      <div
        className={`admin-sidebar ${isMobile ? (isOpen ? "open" : "") : "desktop"}`}
      >
        {isMobile && (
          <button className="admin-close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
        )}

        {/* Admin Info */}
        <div className="admin-info">
          <FaUserShield className="admin-avatar" />
          <div>
            <h3 className="admin-name">
              {data?.firstname} {data?.lastname}
            </h3>
            <p className="admin-role">{data?.role}</p>
          </div>
        </div>

        {/* NavLinks */}
        <ul>
          <li>
            <NavLink to="/admindashboard/home" className="admin-link">
              <FaTachometerAlt /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admindashboard/usermanagement" className="admin-link">
              <FaUsers /> User Management
            </NavLink>
          </li>
          <li>
            <NavLink to="/admindashboard/bookmanagement" className="admin-link">
              <FaBook /> Book Management
            </NavLink>
          </li>
          <li>
            <NavLink to="/admindashboard/bookcategory" className="admin-link">
              <BiSolidCategory /> Book Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admindashboard/transactionhistory"
              className="admin-link"
            >
              <GrTransaction /> Transaction History
            </NavLink>
          </li>
          <li>
            <NavLink to="/admindashboard/notification" className="admin-link">
              <FaBell /> Notifications
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admindashboard/profilesettings"
              className="admin-link"
            >
              <FaCogs /> Profile Settings
            </NavLink>
          </li>
        </ul>

        {/* Logout */}
        <div className="admin-logout">
          <button onClick={() => setShowLogoutConfirm(true)}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="logout-modal-overlay">
          <div className="logout-modal">
            <h3>Are you sure you want to log out from your dashboard?</h3>
            <div className="logout-buttons">
              <button className="confirm-btn" onClick={handleLogout}>
                Yes, Log Out
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;

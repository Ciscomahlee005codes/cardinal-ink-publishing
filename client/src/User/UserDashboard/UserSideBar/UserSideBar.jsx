import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBook,
  FaHistory,
  FaFire,
  FaClipboardList,
  FaUserCog,
  FaBell,
  FaQuestionCircle,
  FaSignOutAlt,
  FaTimes,
  FaBars,
  FaUserCircle,
} from "react-icons/fa";
import "./UserSideBar.css";
import useUserId from "../../../Hooks/useUserId";

const UserSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const data = useUserId();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 830);
      if (window.innerWidth > 830) setIsOpen(true); // keep sidebar open on desktop
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile && !isOpen && (
        <button className="hamburger" onClick={toggleSidebar}>
          <FaBars />
        </button>
      )}

      {/* Overlay when sidebar is open on mobile */}
      {isMobile && isOpen && (
        <div className="overlay" onClick={toggleSidebar}></div>
      )}

      <div
        className={`sidebar ${isMobile ? (isOpen ? "open" : "") : "desktop"}`}
      >
        {/* Close button inside sidebar (only on mobile) */}
        {isMobile && (
          <button className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
        )}

        {/* User Info */}
        <div className="user-info">
          <FaUserCircle className="user-avatar" />
          <div>
            <h3 className="user-name">
              {data?.firstname} {data?.lastname}
            </h3>
            <p className="user-role">{data?.role}</p>
          </div>
        </div>

        {/* Navigation Links */}
        <ul>
          <li>
            <NavLink to="/userdashboard/home" className="link">
              <FaTachometerAlt /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/userdashboard/mylibrary" className="link">
              <FaBook /> My Library
            </NavLink>
          </li>
          <li>
            <NavLink to="/userdashboard/purchasehistory" className="link">
              <FaHistory /> Purchase History
            </NavLink>
          </li>
          <li>
            <NavLink to="/userdashboard/trendingbooks" className="link">
              <FaFire /> Trending Books
            </NavLink>
          </li>
          <li>
            <NavLink to="/userdashboard/profilesettings" className="link">
              <FaUserCog /> Profile & Settings
            </NavLink>
          </li>
          <li>
            <NavLink to="/userdashboard/notification" className="link">
              <FaBell /> Notifications
            </NavLink>
          </li>
          <li>
            <NavLink to="/userdashboard/helpsupport" className="link">
              <FaQuestionCircle /> Help & Support
            </NavLink>
          </li>
        </ul>

        {/* Logout */}
        <div className="logout">
          <button
            onClick={() => {
              localStorage.removeItem("userAuthToken");
              window.location.href = "/#/authentication";
            }}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default UserSideBar;

import React, { useState, useEffect, use } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBook,
  FaClipboardList,
  FaUsers,
  FaUserCog,
  FaBell,
  FaCogs,
  FaSignOutAlt,
  FaTimes,
  FaBars,
  FaUserShield,
  FaShoppingCart,
} from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import "./AdminSidebar.css";
import useUserId from "../../../Hooks/useUserId";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const data = useUserId();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 830);
      if (window.innerWidth > 830) setIsOpen(true);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile && !isOpen && (
        <button className="admin-hamburger" onClick={toggleSidebar}>
          <FaBars />
        </button>
      )}

      {isMobile && isOpen && (
        <div className="admin-overlay" onClick={toggleSidebar}></div>
      )}

      <div
        className={`admin-sidebar ${
          isMobile ? (isOpen ? "open" : "") : "desktop"
        }`}
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

        {/* Admin NavLinks */}
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
              <FaCogs />
              Profile Settings
            </NavLink>
          </li>
        </ul>

        {/* Logout */}
        <div className="admin-logout">
          <button
            onClick={() => {
              localStorage.removeItem("adminAuthToken");
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

export default AdminSidebar;

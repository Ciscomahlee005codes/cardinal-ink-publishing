import React from "react";
import { FiSearch } from "react-icons/fi";
import { IoMdNotifications } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { FaSliders } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import "./UserDashboardTop.css";

const UserDashboardTop = () => {
  return (
    <div className="main-top">
      <div className="dashboard-top">
        {/* Left Side - Search */}
        <div className="search-bar">
          <FiSearch className="icon" />
          <input type="text" placeholder="Search listings, tenants..." />
          <button className="filter-btn">
            <FaSliders />
          </button>
        </div>

        {/* Right Side - Actions */}
        <div className="top-actions">
          <div className="t-icons">
            <MdMessage className="top-icon" />
            <IoMdNotifications className="top-icon" />
          </div>
          <div className="user-data">
            <FaUser className="user-icon" />
            <div className="user-info">
              <h4>Anthony Raphael</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardTop;
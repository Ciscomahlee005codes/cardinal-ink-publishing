import React from "react";
import { FaHome, FaUsers, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import { FaBook, FaHeart, FaBookReader } from "react-icons/fa";
import "./UserActivity.css";

const UserActivity = () => {
  
   const activities = [
  {
    id: 1,
    title: "Purchased Books",
    count: 128,
    icon: <FaBook />,
    color: "#4e73df", 
  },
  {
    id: 2,
    title: "Favorite Books",
    count: 54,
    icon: <FaHeart />,
    color: "#1cc88a",
  },
  {
    id: 3,
    title: "Pending Requests",
    count: 12,
    icon: <FaHourglassHalf />,
    color: "#f6c23e", 
  },
  {
    id: 4,
    title: "Books Borrowed",
    count: 76,
    icon: <FaBookReader />,
    color: "#e74a3b", 
  },
];
  return (
    <div className="activity">
      <h2>Hi, Agent Tony</h2>
      <div className="activity-grid">
        {activities.map((item) => (
          <div
            key={item.id}
            className="activity-card"
            style={{ borderLeft: `6px solid ${item.color}` }}
          >
            <div className="activity-content">
              <div className="activity-info">
                <h4>{item.title}</h4>
                <p>{item.count}</p>
              </div>
              <div className="icon-box" style={{ color: item.color }}>
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserActivity;
// src/User/UserDashboard/RecentActivity/RecentActivity.jsx
import React from "react";
import "./RecentActivity.css";

const activities = [
  {
    id: 1,
    action: "Finished",
    book: "Rich Dad Poor Dad",
    cover: "https://covers.openlibrary.org/b/id/240726-S.jpg",
    date: "Sept 18, 2025 - 4:30 PM",
    note: "Completed reading and left a 5-star review.",
  },
  {
    id: 2,
    action: "Added to Wishlist",
    book: "Atomic Habits",
    cover: "https://covers.openlibrary.org/b/id/12509439-S.jpg",
    date: "Sept 16, 2025 - 11:10 AM",
    note: "Planning to read next month.",
  },
  {
    id: 3,
    action: "Borrowed",
    book: "Deep Work",
    cover: "https://covers.openlibrary.org/b/id/8107896-S.jpg",
    date: "Sept 12, 2025 - 9:00 AM",
    note: "Due back on Sept 26, 2025.",
  },
];

const RecentActivity = () => {
  return (
    <div className="activity-container">
      <h2 className="activity-title">📌 Recent Activity</h2>
      <div className="activity-timeline">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-card">
            <div className="activity-dot"></div>
            <img src={activity.cover} alt={activity.book} className="activity-cover" />
            <div className="activity-details">
              <h3 className="activity-action">{activity.action}</h3>
              <p className="activity-book">📖 {activity.book}</p>
              <p className="activity-note">{activity.note}</p>
              <span className="activity-date">{activity.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;

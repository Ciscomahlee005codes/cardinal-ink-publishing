import React from "react";
import {
  FaHome,
  FaUsers,
  FaCheckCircle,
  FaHourglassHalf,
} from "react-icons/fa";
import { FaBook, FaHeart, FaBookReader, FaDollarSign } from "react-icons/fa";
import "./AdminActivity.css";
import useBooks from "../../../Hooks/useBooks";
import useUsers from "../../../Hooks/useUsers";
import useTransactions from "../../../Hooks/useTransactions";

const AdminActivity = () => {
  const { bookCollection } = useBooks();
  const { users } = useUsers();
  const { transactions } = useTransactions();

  const activities = [
    {
      id: 1,
      title: "Total Books",
      count: bookCollection.length,
      icon: <FaBook />,
      color: "#4e73df",
    },
    {
      id: 2,
      title: "Total Sales",
      count: transactions.filter((tx) => tx.status.toLowerCase() === "success")
        .length,
      icon: <FaDollarSign />,
      color: "#1cc88a",
    },
    {
      id: 3,
      title: "Total Users",
      count: users.length,
      icon: <FaUsers />,
      color: "#f6c23e",
    },
    {
      id: 4,
      title: "Pending Requests",
      count: transactions.filter((tx) => tx.status.toLowerCase() === "pending")
        .length,
      icon: <FaHourglassHalf />,
      color: "#e74a3b",
    },
  ];

  return (
    <div className="activity">
      <h2>Hi, Paschal Elechi</h2>
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

export default AdminActivity;

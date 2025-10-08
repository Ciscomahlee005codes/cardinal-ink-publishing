import React, { useEffect } from "react";
import {
  FaHome,
  FaUsers,
  FaCheckCircle,
  FaHourglassHalf,
} from "react-icons/fa";
import { FaBook, FaHeart, FaBookReader } from "react-icons/fa";
import "./UserActivity.css";
import { toast } from "react-toastify";
import endPoint from "../../../API/Interface";

const UserActivity = () => {
  const [purchases, setPurchases] = React.useState([]);

  async function fetchPurchases() {
    try {
      const requestOptions = endPoint.get("/user/transactions", {
        headers: { authorization: localStorage.getItem("userAuthToken") },
      });
      const response = await requestOptions;

      if (response.status === true) {
        setPurchases(response.transactions);
        return;
      }

      toast.error(response.message);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPurchases();
  }, []);

  const activities = [
    {
      id: 1,
      title: "Purchased Books",
      count: purchases.map((item) => item.status === "sucsess").length,
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
      count: purchases.map((item) => item.status === "pending").length,
      icon: <FaHourglassHalf />,
      color: "#f6c23e",
    },
    {
      id: 4,
      title: "Downloaded Books",
      count: purchases.map((item) => item.downloaded === true).length,
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

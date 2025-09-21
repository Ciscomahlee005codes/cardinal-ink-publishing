import React from "react";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import "./UserSubscription.css";

const UserSubscription = () => {
  const plans = [
    {
      id: 1,
      name: "Free Plan",
      price: "$0 / month",
      features: ["Access to free books", "Limited downloads", "Basic support"],
      color: "#6c757d",
      popular: false,
    },
    {
      id: 2,
      name: "Standard Plan",
      price: "$9.99 / month",
      features: [
        "Unlimited book downloads",
        "Favorites & bookmarks",
        "Email support",
      ],
      color: "#4e73df",
      popular: true, // highlight this one
    },
    {
      id: 3,
      name: "Premium Plan",
      price: "$19.99 / month",
      features: [
        "Unlimited downloads",
        "Exclusive premium books",
        "Priority support",
        "Early access to new arrivals",
      ],
      color: "#1cc88a",
      popular: false,
    },
  ];

  return (
    <div className="subscription">
      <h2>Choose Your Subscription</h2>
      <div className="plan-grid">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`plan-card ${plan.popular ? "popular" : ""}`}
          >
            {plan.popular && (
              <div className="popular-badge">
                <FaStar /> Most Popular
              </div>
            )}
            <h3 style={{ color: plan.color }}>{plan.name}</h3>
            <p className="plan-price">{plan.price}</p>
            <ul className="features">
              {plan.features.map((feature, idx) => (
                <li key={idx}>
                  <FaCheckCircle className="feature-icon" /> {feature}
                </li>
              ))}
            </ul>
            <button
              className="subscribe-btn"
              style={{ background: plan.color }}
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSubscription;

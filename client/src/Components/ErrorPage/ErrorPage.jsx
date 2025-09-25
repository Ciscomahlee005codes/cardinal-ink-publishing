import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./ErrorPage.css";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        404
      </motion.h1>
      <motion.h2
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Oops! Page Not Found
      </motion.h2>
      <p>
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className="home-btn"
      >
        Go Back Home
      </motion.button>
    </div>
  );
};

export default ErrorPage;

import React, { useState } from "react";
import endPoint from "../../API/Interface";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      toast.warn("⚠ Please enter your email");
      return;
    }

    setIsLoading(true);
    try {
      const response = await endPoint.post("/forgottenpassword", { email });
      const data = response.data;

      if (data.status !== true) {
        toast.error(data.message || "❌ Something went wrong");
        return;
      }

      toast.success("✅ Password reset link has been sent to your email.");
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to send reset link. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2>Reset Your Password</h2>
        <p>
          Enter your registered email address and we will send you a link to reset
          your password.
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="primary-btn"
          onClick={handleForgotPassword}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ForgotPassword;

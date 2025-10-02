import React, { useEffect, useState } from "react";
import "./ResetPassword.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import endPoint from "../../API/Interface";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //const location = useLocation();
  const navigate = useNavigate();

  // Extract token from URL
  //const queryParams = new URLSearchParams(location.search);
  const token = sessionStorage.getItem("resetPassowrdToken");

  useEffect(() => {
    if (!token || token == "") {
      navigate("/authenicate");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.warn("⚠ Passwords do not match!");
      return;
    }

    if (newPassword.length < 6) {
      toast.warn("⚠ Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await endPoint.put(
        "/passwordReset",
        { password: newPassword, confirmPassword },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      if (data.status !== true) {
        toast.error(data.message || "❌ Reset failed");
        return;
      }

      sessionStorage.removeItem("resetPassowrdToken");
      toast.success("✅ Password reset successful!");
      setTimeout(() => {
        navigate("/authentication"); // redirect to login after success
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("❌ Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="reset-container">
      <h2>Reset Password</h2>
      <p>Enter your new password below to reset your account password.</p>

      <form onSubmit={handleSubmit}>
        {/* New Password */}
        <div className="form-group password-field">
          <label htmlFor="newPassword">New Password</label>
          <div className="input-wrapper">
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
            <span
              className="toggle-icon"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="form-group password-field">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="input-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
            <span
              className="toggle-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <button type="submit" className="reset-btn" disabled={isLoading}>
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      <NavLink to="/authentication" className="back-link">
        Back to Login
      </NavLink>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ResetPassword;

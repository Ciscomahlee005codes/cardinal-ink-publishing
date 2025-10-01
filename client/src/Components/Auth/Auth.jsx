import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import endPoint from "../../API/Interface";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Auth.css";

const Auth = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "reader",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Toggle visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleToggleForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "reader",
    });
    setIsLoginForm((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Signup
  const handleSignUp = async () => {
    const { firstName, lastName, email, password, confirmPassword, role } =
      formData;

    if (password !== confirmPassword) {
      toast.warn("⚠ Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const requestSignup = await endPoint.post("/signup/users", {
        firstname: firstName,
        lastname: lastName,
        email,
        password,
        role,
      });

      const signupResponse = requestSignup.data;

      if (signupResponse.status !== true) {
        toast.error(signupResponse.message || "❌ Signup failed");
        return;
      }

      const newUserData = signupResponse.data;

      if (newUserData.tempToken) {
        localStorage.setItem("tempToken", newUserData.tempToken);
      }

      toast.success(
        "✅ Signup successful! Verify your email with the OTP sent."
      );
      navigate(
        `/user/OTP?email=${newUserData.email}&otpType=${newUserData.otpType}&expiryTime=${newUserData.time}`
      );
    } catch (error) {
      console.error(error);
      toast.error("❌ Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Login
  const handleLogin = async () => {
    const loginEmail = formData.email;
    const loginPassword = formData.password;
    setIsLoading(true);
    try {
      const requestAuthentication = await endPoint.post("/login/users", {
        email: loginEmail,
        password: loginPassword,
      });
      const authResponse = requestAuthentication.data;

      if (authResponse.status !== true) {
        toast.error(authResponse.message || "❌ Login failed");
        return;
      }

      const newAuthData = authResponse.data;

      if (newAuthData.tempToken) {
        localStorage.setItem("tempToken", newAuthData.tempToken);
      }

      toast.success("✅ Login successful!");
      navigate(
        `/user/OTP?email=${newAuthData.email}&otpType=${newAuthData.otpType}&expiryTime=${newAuthData.time}`
      );
    } catch (error) {
      console.error(error);
      toast.error("❌ Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image"></div>
      <div className={`auth-form ${isLoginForm ? "login-mode" : ""}`}>
        <AnimatePresence mode="wait">
          {isLoginForm ? (
            <motion.div
              key="login"
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="form-box"
            >
              <h2>Welcome Back to E-Library</h2>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />

              {/* Password with toggle */}
              <div className="password-wrapper">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <span
                  className="toggle-icon"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "🙈" : "👁"}
                </span>
              </div>

              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="role-select"
              >
                <option value="reader">Reader</option>
              </select>
              <button
                className="primary-btn"
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
              <p onClick={handleToggleForm}>
                Don't have an account? <span>Sign Up</span>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="form-box"
            >
              <h2>Create Your E-Library Account</h2>

              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />

              {/* Password with toggle */}
              <div className="password-wrapper">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <span
                  className="toggle-icon"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "🙈" : "👁"}
                </span>
              </div>

              {/* Confirm Password with toggle */}
              <div className="password-wrapper">
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <span
                  className="toggle-icon"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? "🙈" : "👁"}
                </span>
              </div>

              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="role-select"
              >
                <option value="reader">Reader</option>
              </select>
              <button
                className="primary-btn"
                onClick={handleSignUp}
                disabled={isLoading}
              >
                {isLoading ? "Signing up..." : "Sign Up"}
              </button>
              <p onClick={handleToggleForm}>
                Already have an account? <span>Login</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
};

export default Auth;

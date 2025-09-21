import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Auth.css';


const Auth = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'reader',
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleToggleForm = () => {
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'reader',
    });
    setIsLoginForm(prev => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Placeholder signup (backend guy will connect later)
  const handleSignUp = async () => {
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      console.log("Signup request:", formData);
      alert("Signup successful (dummy). Please login.");
      setIsLoginForm(true);
    } catch (error) {
      alert("Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Placeholder login
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      console.log("Login request:", formData);
      if (formData.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/"); // Reader goes to homepage
      }
    } catch (error) {
      alert("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image"></div>
      <div className={`auth-form ${isLoginForm ? 'login-mode' : ''}`}>
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
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="role-select"
              >
                <option value="reader">Reader</option>
                <option value="admin">Admin</option>
              </select>
              <button
                className="primary-btn"
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
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
                name="fullName"
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="role-select"
              >
                <option value="reader">Reader</option>
                <option value="admin">Admin</option>
              </select>
              <button
                className="primary-btn"
                onClick={handleSignUp}
                disabled={isLoading}
              >
                {isLoading ? 'Signing up...' : 'Sign Up'}
              </button>
              <p onClick={handleToggleForm}>
                Already have an account? <span>Login</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Auth;

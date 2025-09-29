import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import endPoint from "../../API/Interface";
import "react-toastify/dist/ReactToastify.css";
import "./UserOTP.css";

const UserOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // get query params
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const otpType = queryParams.get("otpType");
  const expiryTime = queryParams.get("expiryTime");

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  // Verify OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length < 6) {
      toast.warn("⚠ Please enter the full 6-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
     // Inside handleSubmit
const response = await endPoint.post("/verify-otp", {
  email,
  otp: otpCode,
  otpType,
  // If backend needs the temp token:
  tempToken: localStorage.getItem("tempToken"),
});

const result = response.data;

if (result.status === true) {
  // Save Auth Token securely
  localStorage.setItem("authToken", result.data.token);

  toast.success("✅ OTP verified successfully!");
  setTimeout(() => navigate("/user/dashboard"), 2000);
} else {
  toast.error(result.message || "❌ Invalid OTP");
}

    } catch (error) {
      console.error(error);
      toast.error("❌ Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    setResending(true);
    try {
      const response = await endPoint.post("/resend-otp", {
        email,
        otpType,
      });

      const result = response.data;

      if (result.status === true) {
        toast.success("📩 OTP resent successfully!");
      } else {
        toast.error(result.message || "❌ Failed to resend OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ Could not resend OTP. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-card">
        <h2 className="otp-title">Verify Your Account</h2>
        <p className="otp-subtitle">
          Enter the 6-digit code sent to <strong>{email}</strong>. <br />
          (Expires in {expiryTime} minutes)
        </p>

        <form onSubmit={handleSubmit} className="otp-form">
          <div className="otp-inputs">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>

          <button type="submit" className="otp-btn" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify"}
          </button>
        </form>

        <div className="otp-footer">
          <p>
            Didn’t receive the code?{" "}
            <span
              className={`resend ${resending ? "disabled" : ""}`}
              onClick={!resending ? handleResend : undefined}
            >
              {resending ? "Resending..." : "Resend"}
            </span>
          </p>
        </div>
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

export default UserOTP;

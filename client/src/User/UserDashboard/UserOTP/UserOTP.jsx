import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import endPoint from "../../../API/Interface";
import "react-toastify/dist/ReactToastify.css";
import "./UserOTP.css";

const UserOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(120); // 2 minutes = 120 seconds

  const location = useLocation();
  const navigate = useNavigate();

  // get query params
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const otpType = queryParams.get("otpType");
  const expiryTime = queryParams.get("expiryTime");

  // countdown effect
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Format timer mm:ss
  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleChange = (element, index) => {
    let newOtp = [...otp];
    // Take only the first character and make sure it's alphanumeric
    newOtp[index] = element.value.replace(/[^a-zA-Z0-9]/g, "");
    setOtp(newOtp);

    // move to next input if not empty
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

    const response = await endPoint.post("/verify/otp", {
      email,
      otp: otpCode,
      otpType,
    });
    const result = response.data;
    try {
      if (result.status === true) {
        if (result.type === "verifyEmail") {
          toast.success("✅ OTP verified successfully!");
          setTimeout(() => navigate("/authenticate"), 2000);
          return;
        }
        if (result.type === "passwordReset") {
          sessionStorage.setItem(
            "resetPassowrdToken",
            result.passwordResetToken
          );
          toast.success("✅ OTP verified! Redirecting to reset password...");
          setTimeout(() => {
            navigate("/resetpassword");
          }, 1000);

          return;
        }
        if (result.type === "auth") {
          // localStorage.setItem("authToken", result.data.token);
          toast.success("✅ OTP verified successfully!");
          if (result.role === "admin") {
            localStorage.setItem("adminAuthToken", result.authToken);
            setTimeout(() => navigate("/admindashboard/home"), 2000);
          } else if (result.role === "reader") {
            localStorage.setItem("userAuthToken", result.authToken);
            setTimeout(() => navigate("/userdashboard/home"), 2000);
          }
        }
      } else {
        toast.error(result.message || "❌ Invalid OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        result.message || "❌ Verification failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    setResending(true);
    try {
      const response = await endPoint.post(
        `/resendotp?email=${email}&otpType=${otpType}`
      );

      const result = response.data;

      if (result.status === true) {
        toast.success("📩 OTP resent successfully!");
        setTimer(120); // restart countdown
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
          {timer > 0 ? (
            <p>⏳ Resend available in {formatTime(timer)}</p>
          ) : (
            <p>
              Didn’t receive the code?{" "}
              <span
                className={`resend ${resending ? "disabled" : ""}`}
                onClick={!resending ? handleResend : undefined}
              >
                {resending ? "Resending..." : "Resend"}
              </span>
            </p>
          )}
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

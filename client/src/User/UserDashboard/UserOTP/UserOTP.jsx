import React, { useState } from "react";
import "./UserOTP.css";

const UserOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // move to next input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("OTP Entered: " + otp.join(""));
  };

  return (
    <div className="otp-container">
      <div className="otp-card">
        <h2 className="otp-title">Verify Your Account</h2>
        <p className="otp-subtitle">
          Enter the 6-digit code sent to your email/phone.
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

          <button type="submit" className="otp-btn">
            Verify
          </button>
        </form>

        <div className="otp-footer">
          <p>
            Didn’t receive the code? <span className="resend">Resend</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserOTP;

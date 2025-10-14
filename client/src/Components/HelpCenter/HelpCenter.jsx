import React from "react";
import "./HelpCenter.css";
import { FaQuestionCircle, FaEnvelope, FaPhoneAlt, FaBookOpen } from "react-icons/fa";

const HelpCenter = () => {
  return (
    <div className="help-center">
      <div className="help-container">
        <h1>Help Center</h1>
        <p className="intro-text">
          Welcome to <strong>Cardinal Inks Publishing</strong> Help Center. We’re here to
          assist you with publishing, account, and customer support inquiries.  
          Explore our support categories below or contact us directly for assistance.
        </p>

        {/* Support Categories */}
        <div className="support-categories">
          <div className="category-card">
            <FaBookOpen className="cat-icon" />
            <h3>Publishing Support</h3>
            <p>Guidance for authors submitting or managing manuscripts.</p>
          </div>

          <div className="category-card">
            <FaQuestionCircle className="cat-icon" />
            <h3>Account Help</h3>
            <p>Get help with account access, login issues, or password reset.</p>
          </div>

          <div className="category-card">
            <FaEnvelope className="cat-icon" />
            <h3>Customer Support</h3>
            <p>Need help with orders, payments, or customer care? Contact us.</p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="contact-section">
          <h2>Still Need Help?</h2>
          <p>
            If you couldn’t find what you’re looking for, please reach out to our support
            team. We typically respond within 24–48 hours.
          </p>
          <div className="contact-options">
            <div className="contact-card">
              <FaEnvelope className="contact-icon" />
              <p>
                <strong>Email:</strong> support@cardinalinks.com
              </p>
            </div>
            <div className="contact-card">
              <FaPhoneAlt className="contact-icon" />
              <p>
                <strong>Phone:</strong> +234 809 123 4567
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;

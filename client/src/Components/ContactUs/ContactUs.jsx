import React from "react";
import "./ContactUs.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact E-Library</h2>
      <p className="contact-subtitle">
        We'd love to hear from you! Reach out anytime.
      </p>

      <div className="contact-wrapper">
        <div className="contact-info">
          <div className="info-item">
            <FaPhoneAlt className="icon" />
            <div>
              <h4>Phone</h4>
              <a href="tel:+2348123456789" style={{color: '#009f53'}}>+234 812 345 6789</a>
            </div>
          </div>

          <div className="info-item">
            <FaEnvelope className="icon" />
            <div>
              <h4>Email</h4>
              <a href="mailto:support@arcehousing.com" style={{color: '#009f53'}}>support@arcehousing.com</a>
            </div>
          </div>

          <div className="info-item">
            <FaMapMarkerAlt className="icon" />
            <div>
              <h4>Office</h4>
              <p>Enugu, Nigeria</p>
            </div>
          </div>
        </div>

        <form className="contact-form">
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="text" placeholder="Phone Number (Optional)" />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;

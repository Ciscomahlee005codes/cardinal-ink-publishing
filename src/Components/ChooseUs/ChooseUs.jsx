import React from "react";
import { FaBookOpen, FaHeadset, FaShippingFast } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import "./ChooseUs.css";

const ChooseUs = () => {
  return (
    <section className="why-choose">
      <div className="container">
        <h2>Why Choose Us?</h2>
        <p className="subtitle">
          Discover why readers trust <span>E-Library</span> for their digital learning experience.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <FaBookOpen className="feature-icon" />
            <h3>Vast Collection</h3>
            <p>Thousands of ebooks and audiobooks across all genres and categories.</p>
          </div>

          <div className="feature-card">
            <MdOutlineSecurity className="feature-icon" />
            <h3>Secure Access</h3>
            <p>Enjoy safe, reliable, and seamless access to your digital library anytime.</p>
          </div>

          <div className="feature-card">
            <FaHeadset className="feature-icon" />
            <h3>24/7 Support</h3>
            <p>Our team is always ready to assist you with any inquiry or concern.</p>
          </div>

          <div className="feature-card">
            <FaShippingFast className="feature-icon" />
            <h3>Instant Delivery</h3>
            <p>Start reading immediately with instant ebook and audiobook downloads.</p>
          </div>

          <div className="feature-card">
            <GiNotebook className="feature-icon" />
            <h3>Personalized Library</h3>
            <p>Save, organize, and revisit your favorite books anytime, anywhere.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;

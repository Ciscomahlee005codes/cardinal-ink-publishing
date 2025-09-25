import React from "react";
import "./CTA.css";
import { NavLink } from "react-router-dom";

const CTA = () => {
  return (
    <section className="cta">
      <div className="cta-content">
        <h2>Start Your Reading Journey Today</h2>
        <p>
          Join thousands of readers who enjoy instant access to ebooks,
          audiobooks, and personalized recommendations. Sign up now and get
          your first book at <span>50% off!</span>
        </p>
        <div className="cta-buttons">
          <NavLink to="/authentication" className="btn-primary"> Get Started </NavLink>
          <NavLink to="/bookstore" className="btn-secondary">Browse Library</NavLink>
        </div>
      </div>
    </section>
  );
};

export default CTA;

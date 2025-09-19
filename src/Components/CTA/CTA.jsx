import React from "react";
import "./CTA.css";

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
          <a href="/signup" className="btn-primary">Get Started</a>
          <a href="/books" className="btn-secondary">Browse Library</a>
        </div>
      </div>
    </section>
  );
};

export default CTA;

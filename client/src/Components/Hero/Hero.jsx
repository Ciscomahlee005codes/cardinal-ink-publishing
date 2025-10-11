import React from "react";
import HeroImage from "../../assets/Hero-img.jpg"
import "./Hero.css";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        {/* Left Side */}
        <div className="hero-text">
          <h1>Discover Your Next Favorite Book</h1>
          <p>
            Explore thousands of ebooks and audiobooks from top authors.  
            Enjoy seamless access to your library anytime, anywhere.
          </p>
          <div className="hero-buttons">
            <NavLink to="/bookstore" className="btn-primary1">Shop Now</NavLink>
            <NavLink to="/authentication" className="btn-secondary">Browse Books</NavLink>
          </div>
        </div>

        {/* Right Side */}
        <div className="hero-image">
          <img 
            src="https://dummyimage.com/400x450/00bf63/ffffff&text=Book+Cover" 
            alt="Books banner" 
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

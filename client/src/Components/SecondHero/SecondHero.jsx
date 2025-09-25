import React from "react";
import "./SecondHero.css";
import heroImage from "../../assets/Hero-img.jpg";
import { useNavigate } from "react-router-dom";

const SecondHero = () => {
  const navigate = useNavigate()
  return (
    <section className="second-hero">
      <div className="second-hero__text">
        <h2>Discover Your Next Favorite Book</h2>
        <p>
          Explore our vast collection of trending and timeless books across
          genres. Read, learn, and grow with stories that inspire.
        </p>
        <button onClick={() => navigate("/bookstore")} className="shop-btn">Shop Now</button>
      </div>
      <div className="second-hero__image">
        <img src={heroImage} alt="Books" />
      </div>
    </section>
  );
};

export default SecondHero;

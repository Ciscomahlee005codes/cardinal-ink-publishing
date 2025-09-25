import React from "react";
import { FaBookOpen, FaUsers, FaGlobe, FaCheckCircle } from "react-icons/fa";
import "./AboutUs.css";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <section className="about-section">
      {/* Top Intro Section */}
      <div className="about-hero">
        <div className="about-text">
          <h1>About <span>E-Library</span></h1>
          <p>
            At <strong>E-Library</strong>, we believe books are more than just
            words on pages — they are gateways to knowledge, imagination, and
            growth. Our mission is to make reading accessible to everyone by
            offering a seamless online platform where you can discover, buy, and
            enjoy books anytime, anywhere.
          </p>
          <button onClick={()=> navigate("/bookstore")} className="btn-primary">Shop Now</button>
        </div>
        <div className="about-image">
          <img
            src="https://dummyimage.com/450x400/00bf63/ffffff&text=E-Library+Books"
            alt="E-Library About"
          />
        </div>
      </div>

      {/* Mission / Vision Section */}
      <div className="about-values">
        <div className="value-card">
          <FaBookOpen className="value-icon" />
          <h3>Our Mission</h3>
          <p>
            To inspire and empower readers by providing easy access to quality
            books across all genres, fostering a culture of learning and growth.
          </p>
        </div>
        <div className="value-card">
          <FaGlobe className="value-icon" />
          <h3>Our Vision</h3>
          <p>
            To become the leading online bookstore that connects authors with
            readers globally and builds a vibrant community of book lovers.
          </p>
        </div>
        <div className="value-card">
          <FaUsers className="value-icon" />
          <h3>Our Community</h3>
          <p>
            We believe in creating a welcoming space for authors, readers, and
            publishers to connect, share, and celebrate the love of reading.
          </p>
        </div>
        <div className="value-card">
          <FaCheckCircle className="value-icon" />
          <h3>Our Promise</h3>
          <p>
            Quality books, seamless experience, and reliable service — delivered
            with passion and care for every reader.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

import React, { useState, useEffect, useRef } from "react";
import './Testimonials.css'
import {
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
  FaQuoteRight,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";

const Testimonials = ( { isStandalone } ) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef(null);
  const totalSlides = 5;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      nextSlide();
    }, 4500);
    return () => clearTimeout(timerRef.current);
  }, [currentSlide]);

  const testimonials = [
  {
    name: "Okwuibe Chinedu",
    text: "Before Mentra, I felt stuck coding alone without direction. My mentor helped me structure my learning and guided me through real projects. In just 2 months, my confidence skyrocketed.",
    stars: 4.5,
    image: "./src/assets/customer-6.jpg"
  },
  {
    name: "Emmanuella Ginna",
    text: "I joined Mentra thinking it would be another random learning site, but it’s way more than that. The progress tracking and team challenges pushed me to a level I didn’t think I could reach this fast.",
    stars: 5,
    image: "./src/assets/customer-2.jpg"
  },
  {
    name: "Sarah Umeh",
    text: "As a beginner, I was overwhelmed by where to start. Mentra gave me a roadmap, a mentor to check in with, and a community to share my journey. It made learning feel exciting, not lonely.",
    stars: 3.5,
    image: "./src/assets/customer-4.jpg"
  },
  {
    name: "Obafemi Bolawatife",
    text: "The mentorship sessions are top notch! I’ve been able to join a small dev team through Mentra and we’ve already built two projects together. The experience feels real and job-ready.",
    stars: 4.5,
    image: "./src/assets/customer-3.jpg"
  },
  {
    name: "Ifemelu Obinze",
    text: "The internship opportunity I got through Mentra was a game-changer. It bridged the gap between tutorials and real-life software development. I now have a portfolio that speaks for itself.",
    stars: 5,
    image: "./src/assets/customer-5.jpg"
  },
];


  return (
    <section className={`testimonial-section ${isStandalone ? "standalone" : ""}`} id="Testimonials">
      <div className="testimonial-wrap">
        <h1 className="over-head">Our Readers Reviews...</h1><br />
        
        <span className="arrow left" onClick={prevSlide}><FaChevronLeft /></span>
        <span className="arrow right" onClick={nextSlide}><FaChevronRight /></span>

        <ul className="dots" id="testim-dots">
          {testimonials.map((_, index) => (
            <li
              key={index}
              className={`dot ${currentSlide === index ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            ></li>
          ))}
        </ul>

        <div className="content-test" id="testim-content">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={
                currentSlide === index
                  ? "active"
                  : index === (currentSlide - 1 + totalSlides) % totalSlides
                  ? "inactive"
                  : ""
              }
            >
              <div className="test-img">
               <img src={testimonial.image} alt={testimonial.name} className="customer-pics" />
              </div>
              <h2 className="customer-name">{testimonial.name}</h2>
              <p className="test-text">
                <FaQuoteLeft style={{ marginRight: 5 }} />
                {testimonial.text}
                <FaQuoteRight style={{ marginLeft: 5 }} />
              </p><br />
              <div className="star-box">
                {Array.from({ length: 5 }).map((_, i) => {
                  const rating = testimonial.stars;
                  return (
                    <span key={i}>
                      {rating >= i + 1 ? (
                        <FaStar style={{color: 'goldenrod'}}/>
                      ) : rating >= i + 0.5 ? (
                        <FaStarHalfAlt style={{color: 'goldenrod'}} />
                      ) : (
                        <FaRegStar style={{color: 'goldenrod'}} />
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
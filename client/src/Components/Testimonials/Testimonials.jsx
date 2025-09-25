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
    text: "Cardinal Ink Publishing’s E-Library has completely changed the way I access books. I can now read finance, health, and motivational titles anytime without worrying about availability.",
    stars: 4.5,
    image: "./src/assets/customer-6.jpg"
  },
  {
    name: "Emmanuella Ginna",
    text: "Affordable and easy to use! The wide range of genres on Cardinal Ink’s platform keeps me hooked. I’ve discovered authors I never would have found in physical stores.",
    stars: 5,
    image: "./src/assets/customer-2.jpg"
  },
  {
    name: "Sarah Umeh",
    text: "As a student, buying books was always expensive. But Cardinal Ink’s E-Library makes premium titles affordable and accessible. It’s like carrying a library in my pocket.",
    stars: 4,
    image: "./src/assets/customer-4.jpg"
  },
  {
    name: "Obafemi Bolawatife",
    text: "The experience is smooth and user-friendly! From academic resources to inspirational books, I’ve been able to find everything I need for my studies and personal growth.",
    stars: 4.5,
    image: "./src/assets/customer-3.jpg"
  },
  {
    name: "Ifemelu Obinze",
    text: "Cardinal Ink Publishing gave me access to global bestsellers at local-friendly prices. My reading habit has improved, and I now finish at least 3 books every month!",
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
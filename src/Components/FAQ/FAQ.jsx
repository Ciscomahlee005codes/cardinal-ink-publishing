import React, { useState, useRef, useEffect } from 'react';
import './FAQ.css';

const faqs = [
  {
    question: "What is Mentra?",
    answer: "Mentra is a mentorship-driven platform that connects developers, mentors, and recruiters to learn, collaborate, and grow through real-world projects, challenges, and career opportunities.",
  },
  {
    question: "How does mentorship work on Mentra?",
    answer: "You can sign up as a mentee to be matched with experienced mentors who will guide you through learning paths, projects, and skill-building challenges. Mentors provide feedback, track your progress, and help you achieve your goals.",
  },
  {
    question: "Is Mentra free to use?",
    answer: "Yes! Joining Mentra as a learner or mentor is free. Some advanced programs or premium mentorship plans may have fees, but our core mentorship features remain free for all.",
  },
  {
    question: "Can I team up with other developers?",
    answer: "Absolutely. Mentra allows you to find teammates, join coding groups, and work on collaborative projects — so you never have to build in isolation.",
  },
  {
    question: "What kind of challenges are available?",
    answer: "Mentra offers hands-on challenges ranging from beginner-friendly coding exercises to advanced real-world projects, helping you sharpen your skills and gain portfolio-ready experience.",
  },
  {
    question: "Does Mentra offer internships?",
    answer: "Yes. Through our partner network, active learners can access internship opportunities to apply their skills in real work environments.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            isActive={index === activeIndex}
            onClick={() => toggleFAQ(index)}
          />
        ))}
      </div>
    </div>
  );
};

const FAQItem = ({ faq, isActive, onClick }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      contentRef.current.style.maxHeight = contentRef.current.scrollHeight + "px";
    } else {
      contentRef.current.style.maxHeight = "0px";
    }
  }, [isActive]);

  return (
    <div className="faq-item">
      <div className="faq-question" onClick={onClick}>
        {faq.question}
        <span style={{ fontSize: '24px' }}>{isActive ? "−" : "+"}</span>
      </div>
      <div ref={contentRef} className="faq-answer">
        <p>{faq.answer}</p>
      </div>
    </div>
  );
};

export default FAQ;
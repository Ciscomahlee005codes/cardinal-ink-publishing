import React, { useState, useRef, useEffect } from 'react';
import './FAQ.css';

const faqs = [
  {
    question: "What is Cardinal Ink Publishing’s E-Library?",
    answer: "It is a digital library platform that provides easy and affordable access to a wide range of books, from academics to self-development, health, finance, and fiction."
  },
  {
    question: "How do I access the E-Library?",
    answer: "Simply sign up on our platform, browse our collection, and start reading instantly. You can access the E-Library from your phone, tablet, or computer."
  },
  {
    question: "Is the E-Library free?",
    answer: "We offer both free and premium book collections. Some titles are free to access, while premium or newly released books may require a subscription or one-time purchase."
  },
  {
    question: "Can I read books offline?",
    answer: "Yes! With our download option, you can save books to your device and enjoy reading even without an internet connection."
  },
  {
    question: "What kind of books are available?",
    answer: "Our library covers a wide range of genres including academic, motivational, finance, health, self-help, fiction, and more. We constantly update the catalog with new releases."
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
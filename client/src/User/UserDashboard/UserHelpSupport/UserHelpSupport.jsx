import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaQuestionCircle } from "react-icons/fa";
import "./UserHelpSupport.css";

const faqs = [
  {
    id: 1,
    question: "How do I purchase a book?",
    answer:
      "To purchase a book, go to the Bookstore page, select your desired book, and click 'Buy Now'. You can pay securely using your preferred payment method.",
  },
  {
    id: 2,
    question: "Can I get a refund after purchase?",
    answer:
      "Refunds are only available within 48 hours of purchase if the book has not been downloaded or accessed. Please contact support to initiate the process.",
  },
  {
    id: 3,
    question: "How do I manage my subscription?",
    answer:
      "Go to the Subscription page in your profile settings. From there, you can upgrade, downgrade, or cancel your subscription anytime.",
  },
  {
    id: 4,
    question: "How do I contact customer support?",
    answer:
      "You can reach us via email at support@bookhub.com or call us at +234 801 234 5678. Our support team is available 24/7 to assist you.",
  },
];

const AccordionItem = ({ faq, isOpen, toggle }) => {
  return (
    <div className="accordion-item">
      <button className="accordion-btn" onClick={toggle}>
        <span className="accordion-title">
          <FaQuestionCircle className="icon-question" />
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="accordion-arrow"
        >
          ▼
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="accordion-content"
          >
            {faq.answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const UserHelpSupport = () => {
  const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="help-container">
      <h1 className="help-title">Help & Support</h1>
      <p className="help-intro">
        Welcome to our support center. Here you can find answers to frequently
        asked questions, or reach out to us directly if you need further
        assistance.
      </p>

      {/* Accordion Section */}
      <div className="faq-box">
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.id}
            faq={faq}
            isOpen={openId === faq.id}
            toggle={() => toggleAccordion(faq.id)}
          />
        ))}
      </div>

      {/* Contact Support Section */}
      <div className="contact-box">
        <h2 className="contact-title">Need More Help?</h2>
        <p className="contact-text">
          Our dedicated support team is here 24/7 to assist you with any issues
          or inquiries. Reach out using the options below:
        </p>
        <div className="contact-options">
          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <span>support@bookhub.com</span>
          </div>
          <div className="contact-item">
            <FaPhoneAlt className="contact-icon" />
            <span>+234 801 234 5678</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHelpSupport;

import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPinterestP } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo + Tagline */}
        <div className="footer-col brand-col">
          <h2 className="footer-logo">📚 Cardinal Ink Publishing</h2>
          <p className="footer-tagline">
            Your trusted online bookstore for knowledge, imagination, and growth.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/bookstore">Book Store</NavLink></li>
            <li><NavLink to="/aboutUs">About Us</NavLink></li>
            <li><NavLink to="/blog">Blogs</NavLink></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="footer-col">
          <h3>Customer Service</h3>
          <ul>
            <li><NavLink to="/faqS">FAQs</NavLink></li>
            <li><NavLink to="/testimonials">Testimonials</NavLink></li>
            <li><NavLink to="/privacyPolicy">Privacy Policy</NavLink></li>
            <li><NavLink to="/helpCenter">Help Center</NavLink></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-col">
          <h3>Contact Info</h3>
          <ul>
            <li><MdPhone /> <a href="tel:+19313564926">+19313564926</a></li>
            <li><MdEmail /> <a href="mailto:cardinalinkspublishing@gmail.com"></a></li>
          </ul>
        </div>
      </div>

      {/* Social Icons */}
      <div className="footer-social">
        <a href="#"><FaFacebookF /></a>
        <a href="#"><FaTwitter /></a>
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaLinkedinIn /></a>
        <a href="#"><FaPinterestP /></a>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>
          Copyright <span>Cardinal Ink Publishing</span> | All Rights Reserved © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

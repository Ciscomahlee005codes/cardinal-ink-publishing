import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPinterestP } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo + Tagline */}
        <div className="footer-col brand-col">
          <h2 className="footer-logo">📚 E-Lib</h2>
          <p className="footer-tagline">
            Your trusted online bookstore for knowledge, imagination, and growth.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/featured">Book Store</a></li>
            <li><a href="/arrivals">My Library</a></li>
            <li><a href="/reviews">About Us</a></li>
            <li><a href="/blogs">Blogs</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="footer-col">
          <h3>Customer Service</h3>
          <ul>
            <li><a href="/account">FAQs</a></li>
            <li><a href="/orders">Ordered Items</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/payment">Payment Method</a></li>
            <li><a href="/services">Help Center</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-col">
          <h3>Contact Info</h3>
          <ul>
            <li><MdPhone /> +123-456-7890</li>
            <li><MdPhone /> +111-222-3333</li>
            <li><MdEmail /> support@elibrary.com</li>
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
          Copyright <span>E-Lib</span> | All Rights Reserved © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

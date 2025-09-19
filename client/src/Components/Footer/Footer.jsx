import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPinterestP } from "react-icons/fa";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Our Locations */}
        <div className="footer-col">
          <h3>Our Locations</h3>
          <ul>
            <li><MdLocationOn /> India</li>
            <li><MdLocationOn /> USA</li>
            <li><MdLocationOn /> Russia</li>
            <li><MdLocationOn /> France</li>
            <li><MdLocationOn /> Japan</li>
            <li><MdLocationOn /> Africa</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/featured">Featured</a></li>
            <li><a href="/arrivals">Arrivals</a></li>
            <li><a href="/reviews">Reviews</a></li>
            <li><a href="/blogs">Blogs</a></li>
          </ul>
        </div>

        {/* Extra Links */}
        <div className="footer-col">
          <h3>Extra Links</h3>
          <ul>
            <li><a href="/account">Account Info</a></li>
            <li><a href="/orders">Ordered Items</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/payment">Payment Method</a></li>
            <li><a href="/services">Our Services</a></li>
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
        <p>Copyright <span>E-Lib</span> | All Rights Reserved © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;

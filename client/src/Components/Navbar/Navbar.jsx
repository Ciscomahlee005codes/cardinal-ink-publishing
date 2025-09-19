import React, { useState } from "react";
import { MdFavorite } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { IoSearchOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      {/* Top Row */}
      <div className="top-nav">
        {/* Logo */}
        <div className="logo">E-Library</div>

        {/* Search Bar */}
        <div className="search-box">
          <input type="text" placeholder="Search books, authors..." />
          <button type="submit"><IoSearchOutline /></button>
        </div>

        {/* Icons + Auth */}
        <div className="icons">
          <a href="/wishlist" title="Wishlist"><MdFavorite /></a>
          <a href="/cart" title="Cart"><TiShoppingCart /></a>

          {/* Auth Buttons */}
          <div className="auth-buttons">
            <NavLink to="/signup" className="btn-signup">Sign Up</NavLink>
            <NavLink to="/login" className="btn-login">Login</NavLink>
          </div>

          {/* Hamburger */}
          <button 
            className="menu-toggle" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <IoMdClose /> : <GiHamburgerMenu />}
          </button>
        </div>
      </div>

      {/* Bottom Row Nav Links */}
      <nav className={`bottom-nav ${menuOpen ? "open" : ""}`}>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/bookstore">Book Store</NavLink></li>
          <li><NavLink to="/mylibrary">My Library</NavLink></li>
          <li><NavLink to="/blog">Blogs</NavLink></li>
          <li><NavLink to="/aboutUs">About</NavLink></li>
          <li><NavLink to="/contactUs">Contact</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

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
      {/* Top Row - logo, search, right side */}
      <div className="nav-row">
        <div className="logo">E-Library</div>

        <div className="search-box">
          <input type="text" placeholder="Search books, authors..." />
          <button type="submit" aria-label="Search"><IoSearchOutline /></button>
        </div>

        <div className="right-side">
          <div className="icons">
            <a href="/wishlist" title="Wishlist"><MdFavorite /></a>
            <a href="/cart" title="Cart"><TiShoppingCart /></a>
          </div>

          {/* Auth Buttons (visible on desktop) */}
          <div className="auth-buttons">
            <NavLink to="/authentication" className="btn-signup">Register</NavLink>
          </div>

          {/* Hamburger */}
          <button 
            className="menu-toggle" 
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Menu"
          >
            {menuOpen ? <IoMdClose /> : <GiHamburgerMenu />}
          </button>
        </div>
      </div>

      {/* Bottom Nav Links */}
      <nav className={`bottom-nav ${menuOpen ? "open" : ""}`}>
        <ul>
         <li>
  <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
</li>
<li>
  <NavLink to="/bookstore" onClick={() => setMenuOpen(false)}>Book Store</NavLink>
</li>
<li>
  <NavLink to="/mylibrary" onClick={() => setMenuOpen(false)}>My Library</NavLink>
</li>
<li>
  <NavLink to="/blog" onClick={() => setMenuOpen(false)}>Blogs</NavLink>
</li>
<li>
  <NavLink to="/aboutUs" onClick={() => setMenuOpen(false)}>About</NavLink>
</li>
<li>
  <NavLink to="/contactUs" onClick={() => setMenuOpen(false)}>Contact</NavLink>
</li>


          {/* Auth only visible inside mobile dropdown */}
          <li className="mobile-auth">
            <NavLink to="/authentication" className="btn-signup"  onClick={() => setMenuOpen(false)}>Register</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

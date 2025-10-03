import React, { useContext, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { IoSearchOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { books_store } from "../../../library_list"; 
import { StoreContext } from "../../Context/StoreContext";
import "./Navbar.css";

const Navbar = () => {
  const { cartItems } = useContext(StoreContext);

  // ✅ Count total items in cart
  const cartCount = Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);

  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?query=${query}`);
    setQuery("");
    setFiltered([]);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      const results = books_store.filter((book) =>
        book.title.toLowerCase().includes(value.toLowerCase())
      );
      setFiltered(results);
    } else {
      setFiltered([]);
    }
  };

  return (
    <header className="header">
      <div className="nav-row">
        {/* Logo */}
        <div className="logo">E-Library</div>

        {/* Search */}
        <div className="search-container">
          <form className="search-box" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search books, authors..."
              value={query}
              onChange={handleInputChange}
            />
            <button type="submit" aria-label="Search">
              <IoSearchOutline />
            </button>
          </form>

          {/* Dropdown Results */}
          {filtered.length > 0 && (
            <ul className="search-results">
              {filtered.map((book) => (
                <li
                  key={book.id}
                  onClick={() => {
                    navigate(`/book/${book.id}`);
                    setQuery("");
                    setFiltered([]);
                  }}
                >
                  <img src={book.image} alt={book.title} />
                  <div>
                    <span className="title">{book.title}</span>
                    <span className="author">by {book.author}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Side */}
        <div className="right-side">
          <div className="icons">
            {/* <NavLink to="/wishlist" title="Wishlist">
              <MdFavorite />
            </NavLink> */}
            <div className="navbar-search-icon">
              <NavLink to="/cart" title="Cart">
                <TiShoppingCart className="cart-icon" />
                {/* ✅ Show number instead of dot */}
                {cartCount > 0 && <div className="cart-count">{cartCount}</div>}
              </NavLink>
            </div>
          </div>

          {/* Desktop Auth */}
          <div className="auth-buttons desktop-only">
            <NavLink to="/authentication" className="btn-signup">
              Log In
            </NavLink>
          </div>

          {/* Hamburger */}
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Menu"
          >
            {menuOpen ? <IoMdClose /> : <GiHamburgerMenu />}
          </button>
        </div>
      </div>

      {/* Bottom Nav */}
      <nav className={`bottom-nav ${menuOpen ? "open" : ""}`}>
        <ul>
          <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/bookstore" onClick={() => setMenuOpen(false)}>Book Store</NavLink></li>
          <li><NavLink to="/mylibrary" onClick={() => setMenuOpen(false)}>My Library</NavLink></li>
          <li><NavLink to="/blog" onClick={() => setMenuOpen(false)}>Blogs</NavLink></li>
          <li><NavLink to="/aboutUs" onClick={() => setMenuOpen(false)}>About</NavLink></li>
          <li><NavLink to="/contactUs" onClick={() => setMenuOpen(false)}>Contact</NavLink></li>

          {/* Mobile Auth */}
          <li className="mobile-auth">
            <NavLink 
              to="/authentication" 
              className="btn-signup" 
              onClick={() => setMenuOpen(false)}
            >
              Log In
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

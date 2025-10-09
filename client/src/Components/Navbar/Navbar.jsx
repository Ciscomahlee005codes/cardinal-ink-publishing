import React, { useContext, useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { IoSearchOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import useBooks from "../../Hooks/useBooks";
import { StoreContext } from "../../Context/StoreContext";
import "./Navbar.css";

const Navbar = () => {
  const { bookCollection } = useBooks();
  const { cartItems } = useContext(StoreContext);

  const cartCount = Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);

  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const results = bookCollection.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );

    if (results.length > 0) {
      navigate(`/search?query=${query}`);
    } else {
      setNotFound(true);
      setTimeout(() => {
        navigate("/404");
        setNotFound(false);
      }, 1500);
    }

    setQuery("");
    setFiltered([]);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      const results = bookCollection.filter((book) =>
        book.title.toLowerCase().includes(value.toLowerCase())
      );
      setFiltered(results);
      setNotFound(results.length === 0);
    } else {
      setFiltered([]);
      setNotFound(false);
    }
  };

  return (
    <header className="header">
      <div className="nav-row">
        {/* Logo */}
        <div className="logo">Cardinal Ink Publishing</div>

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

          {/* ✅ Dropdown Results */}
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

          {/* ✅ Dropdown “Book Not Found” */}
          {notFound && query.trim() && (
            <ul className="search-results no-results-dropdown">
              <li className="no-results-item">
                <p>📚 Book Not Found</p>
              </li>
            </ul>
          )}
        </div>

        {/* Right Side */}
        <div className="right-side">
          <div className="icons">
            <div className="navbar-search-icon">
              <NavLink to="/cart" title="Cart">
                <TiShoppingCart className="cart-icon" />
                {cartCount > 0 && <div className="cart-count">{cartCount}</div>}
              </NavLink>
            </div>
          </div>

          {/* Auth Buttons */}
          {localStorage.getItem("adminAuthToken") ? (
            <div className="auth-buttons desktop-only">
              <NavLink to="/admindashboard/home" className="btn-signup">
                Admin
              </NavLink>
            </div>
          ) : localStorage.getItem("userAuthToken") ? (
            <div className="auth-buttons desktop-only">
              <NavLink to="/userdashboard/home" className="btn-signup">
                Dashboard
              </NavLink>
            </div>
          ) : (
            <div className="auth-buttons desktop-only">
              <NavLink to="/authentication" className="btn-signup">
                Log In
              </NavLink>
            </div>
          )}

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
          <li>
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/bookstore" onClick={() => setMenuOpen(false)}>
              Book Store
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" onClick={() => setMenuOpen(false)}>
              Blogs
            </NavLink>
          </li>
          <li>
            <NavLink to="/aboutUs" onClick={() => setMenuOpen(false)}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contactUs" onClick={() => setMenuOpen(false)}>
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

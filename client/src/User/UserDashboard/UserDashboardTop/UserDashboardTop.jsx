import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaSliders } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./UserDashboardTop.css";
import useUserId from "../../../Hooks/useUserId";
import useBooks from "../../../Hooks/useBooks";

const UserDashboardTop = () => {
  const data = useUserId();
  const { bookCollection } = useBooks();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [notFound, setNotFound] = useState(false);

  // Handle input search dynamically
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

  // Handle submit (press Enter or click search)
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
      setTimeout(() => setNotFound(false), 1500);
    }

    setQuery("");
    setFiltered([]);
  };

  return (
    <div className="main-top">
      <div className="dashboard-top">
        {/* Left Side - Search */}
        <div className="search-bar-container">
          <form className="search-bar" onSubmit={handleSearch}>
            <FiSearch className="icon" />
            <input
              type="text"
              placeholder="Search Books, Authors..."
              value={query}
              onChange={handleInputChange}
            />
            <button type="submit" className="filter-btn">
              <FaSliders />
            </button>
          </form>

          {/* ✅ Dropdown Results */}
          {filtered.length > 0 && (
            <ul className="dashboard-search-results">
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
            <ul className="dashboard-search-results no-results-dropdown">
              <li className="no-results-item">
                <p>📚 Book Not Found</p>
              </li>
            </ul>
          )}
        </div>

        {/* Right Side - User Info */}
        <div className="top-actions">
          <div className="user-data">
            <FaUser className="user-icon" />
            <div className="user-info">
              <h4>
                {data?.firstname} {data?.lastname}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardTop;

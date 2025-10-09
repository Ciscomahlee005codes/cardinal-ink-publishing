import React, { useState, useMemo } from "react";
import "./AdminDashboardTop.css";
import { FiSearch } from "react-icons/fi";
import { IoMdNotifications } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { FaSliders } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import useUserId from "../../../Hooks/useUserId";
import useBooks from "../../../Hooks/useBooks"; // Added for search functionality

const AdminDashboardTop = () => {
  const { firstname, lastname } = useUserId() || {};
  const { bookCollection, loading, error } = useBooks();

  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Filtered search results
  const filteredBooks = useMemo(() => {
    if (!bookCollection) return [];
    return bookCollection.filter((book) =>
      book.title?.toLowerCase().includes(search.toLowerCase())
    );
  }, [bookCollection, search]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setShowDropdown(value.trim().length > 0);
  };

  const handleSelect = (title) => {
    setSearch(title);
    setShowDropdown(false);
  };

  return (
    <div className="main-top">
      <div className="dashboard-top">

        {/* LEFT SIDE — SEARCH BAR */}
        <div className="search-bar">
          <FiSearch className="icon" />
          <input
            type="text"
            placeholder="Search Books, Recent Activities..."
            value={search}
            onChange={handleSearch}
            onFocus={() => search && setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          />
          <button className="filter-btn">
            <FaSliders />
          </button>

          {/* DROPDOWN — Search Suggestions */}
          {showDropdown && (
            <div className="search-dropdown">
              {loading ? (
                <p className="dropdown-item">Loading...</p>
              ) : error ? (
                <p className="dropdown-item error">Error loading books</p>
              ) : filteredBooks.length > 0 ? (
                filteredBooks.slice(0, 6).map((book) => (
                  <p
                    key={book.id}
                    className="dropdown-item"
                    onClick={() => handleSelect(book.title)}
                  >
                    {book.title}
                  </p>
                ))
              ) : (
                <p className="dropdown-item no-result">No books found</p>
              )}
            </div>
          )}
        </div>

        {/* RIGHT SIDE — ACTION ICONS + USER INFO */}
        <div className="top-actions">
          <div className="user-data">
            <FaUser className="user-icon" />
            <div className="user-info">
              <h4>{firstname} {lastname}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardTop;

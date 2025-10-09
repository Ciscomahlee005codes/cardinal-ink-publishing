import React, { useState, useMemo } from "react";
import "./UserLibrary.css";
import { FaSearch } from "react-icons/fa";
import useCategory from "../../../Hooks/useCategory";
import useBooks from "../../../Hooks/useBooks";
import { useNavigate } from "react-router-dom";

const UserLibrary = () => {
  const [activeTab, setActiveTab] = useState("available");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [filteredDropdown, setFilteredDropdown] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const { Categories } = useCategory();
  const { bookCollection, loading, error } = useBooks();
  const navigate = useNavigate();

  // My Books (static for now)
  const myBooks = {
    booksRead: ["Atomic Habits", "Sapiens", "Deep Work"],
    readDate: ["1984"],
  };

  // Filtered Books for Display Grid
  const filteredBooks = useMemo(() => {
    if (!bookCollection) return [];
    return bookCollection.filter((book) => {
      const matchesCategory =
        selectedCategory === "All" || book.category === selectedCategory;
      const matchesSearch = book.title
        ?.toLowerCase()
        .includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [bookCollection, selectedCategory, search]);

  // Handle dropdown search typing
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim()) {
      const results = bookCollection.filter((book) =>
        book.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDropdown(results);
      setNotFound(results.length === 0);
    } else {
      setFilteredDropdown([]);
      setNotFound(false);
    }
  };

  return (
    <div className="library">
      <h2>📚 My Library</h2>

      {/* Tabs */}
      <div className="tab-buttons">
        <button
          className={activeTab === "available" ? "active" : ""}
          onClick={() => setActiveTab("available")}
        >
          Available Books
        </button>
        <button
          className={activeTab === "mybooks" ? "active" : ""}
          onClick={() => setActiveTab("mybooks")}
        >
          My Books
        </button>
      </div>

      {/* Available Books Section */}
      {activeTab === "available" && (
        <div className="available-section">
          <h3>Bookstore</h3>

          {/* Search bar + dropdown */}
          <div className="search-bar-container">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search books by title..."
                value={search}
                onChange={handleInputChange}
              />
            </div>

            {/* ✅ Dropdown Results */}
            {filteredDropdown.length > 0 && (
              <ul className="library-search-results">
                {filteredDropdown.map((book) => (
                  <li
                    key={book.id}
                    onClick={() => {
                      navigate(`/book/${book.id}`);
                      setSearch("");
                      setFilteredDropdown([]);
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

            {/* ✅ “Book Not Found” dropdown */}
            {notFound && search.trim() && (
              <ul className="library-search-results no-results-dropdown">
                <li className="no-results-item">
                  <p>📚 Book Not Found</p>
                </li>
              </ul>
            )}
          </div>

          {/* Category filter */}
          <div className="filter-buttons">
            <button
              className={selectedCategory === "All" ? "selected" : ""}
              onClick={() => setSelectedCategory("All")}
            >
              All
            </button>
            {Categories?.length > 0 ? (
              Categories.map((cat) => (
                <button
                  key={cat.id}
                  className={
                    selectedCategory === cat.category ? "selected" : ""
                  }
                  onClick={() => setSelectedCategory(cat.category)}
                >
                  {cat.category}
                </button>
              ))
            ) : (
              <p className="no-results">Loading categories...</p>
            )}
          </div>

          {/* Books Display */}
          <div className="book-grid">
            {loading ? (
              <p>Loading books...</p>
            ) : error ? (
              <p className="error-message">No books.</p>
            ) : filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <div key={book.id} className="book-card">
                  <h4>{book.title}</h4>
                  <p>{book.category}</p>
                </div>
              ))
            ) : (
              <p className="no-results">No books found.</p>
            )}
          </div>
        </div>
      )}

      {/* My Books Section */}
      {activeTab === "mybooks" && (
        <div className="mybooks-section">
          <h3>My Collection</h3>
          <div className="collection">
            <div>
              <h4>Books Read</h4>
              <ul>
                {myBooks.booksRead.map((book, i) => (
                  <li key={i}>{book}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Date Read</h4>
              <ul>
                {myBooks.readDate.map((book, i) => (
                  <li key={i}>{book}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLibrary;

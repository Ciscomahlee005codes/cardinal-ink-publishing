import React, { useState } from "react";
import "./UserLibrary.css";
import { FaSearch } from "react-icons/fa";

const UserLibrary = () => {
  const [activeTab, setActiveTab] = useState("available");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [search, setSearch] = useState("");

  const genres = ["All", "Fiction", "Sci-Fi", "History", "Romance", "Business"];

  const allBooks = [
    { id: 1, title: "Atomic Habits", genre: "Business" },
    { id: 2, title: "The Great Gatsby", genre: "Fiction" },
    { id: 3, title: "1984", genre: "Sci-Fi" },
    { id: 4, title: "Pride and Prejudice", genre: "Romance" },
    { id: 5, title: "Sapiens", genre: "History" },
    { id: 6, title: "Rich Dad Poor Dad", genre: "Business" },
    { id: 7, title: "Deep Work", genre: "Business" },
    { id: 8, title: "Harry Potter", genre: "Fiction" },
  ];

  const myBooks = {
    purchased: ["Atomic Habits", "Sapiens", "Deep Work"],
    favorites: ["The Great Gatsby", "Harry Potter"],
    read: ["1984"],
  };

  const filteredBooks = allBooks.filter((book) => {
    const matchesGenre =
      selectedGenre === "All" || book.genre === selectedGenre;
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase());
    return matchesGenre && matchesSearch;
  });

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

          {/* Search bar */}
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search books by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Genre filter */}
          <div className="filter-buttons">
            {genres.map((genre) => (
              <button
                key={genre}
                className={selectedGenre === genre ? "selected" : ""}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Book cards */}
          <div className="book-grid">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <div key={book.id} className="book-card">
                  <h4>{book.title}</h4>
                  <p>{book.genre}</p>
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
              <h4>Purchased</h4>
              <ul>
                {myBooks.purchased.map((book, i) => (
                  <li key={i}>{book}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Favorites</h4>
              <ul>
                {myBooks.favorites.map((book, i) => (
                  <li key={i}>{book}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Read</h4>
              <ul>
                {myBooks.read.map((book, i) => (
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

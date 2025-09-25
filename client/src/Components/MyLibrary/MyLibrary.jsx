import React from "react";
import "./MyLibrary.css";
import { books_store } from "../../../library_list";

const MyLibrary = () => {
  // Pick 7 books for Favorites
  const favoriteBooks = books_store.slice(0, 7);

  // Pick 5 books for Purchased
  const purchasedBooks = books_store.slice(7, 12);

  return (
    <section className="my-library">
      <h1>📚 My Library</h1>

      {/* Favorites */}
      <div className="library-section">
        <h2>❤️ Favorites</h2>
        <div className="book-grid">
          {favoriteBooks.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
              <button className="read-btn">Read Now</button>
            </div>
          ))}
        </div>
      </div>

      {/* Purchased */}
      <div className="library-section">
        <h2>🛒 Purchased Books</h2>
        <div className="book-grid">
          {purchasedBooks.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>by {book.author}</p>

              {/* Progress Bar */}
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: `${book.progress || 0}%` }}
                ></div>
              </div>
              <span className="progress-text">
                {book.progress || 0}% read
              </span>

              <div className="btn-group">
                <button className="read-btn">Read Now</button>
                <button className="download-btn">Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyLibrary;

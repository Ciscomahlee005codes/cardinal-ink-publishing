import React, { useState } from "react";
import "./BookStore.css";

// Dummy data (20 books)
const books = [
  { id: 1, title: "Atomic Habits", author: "James Clear", price: 15.99, genre: "Self-help", category: "Trending", image: "/images/atomic-habits.jpg" },
  { id: 2, title: "Think Like a Monk", author: "Jay Shetty", price: 14.99, genre: "Self-help", category: "Trending", image: "/images/think-like-a-monk.jpg" },
  { id: 3, title: "The Psychology of Money", author: "Morgan Housel", price: 12.49, genre: "Finance", category: "Featured", image: "/images/psychology-of-money.jpg" },
  { id: 4, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", price: 10.99, genre: "Finance", category: "Featured", image: "/images/rich-dad-poor-dad.jpg" },
  { id: 5, title: "Deep Work", author: "Cal Newport", price: 13.99, genre: "Productivity", category: "New Arrivals", image: "/images/deep-work.jpg" },
  { id: 6, title: "Can’t Hurt Me", author: "David Goggins", price: 11.99, genre: "Motivation", category: "New Arrivals", image: "/images/cant-hurt-me.jpg" },
  { id: 7, title: "Zero to One", author: "Peter Thiel", price: 16.99, genre: "Business", category: "Trending", image: "/images/zero-to-one.jpg" },
  { id: 8, title: "Start With Why", author: "Simon Sinek", price: 15.49, genre: "Business", category: "Featured", image: "/images/start-with-why.jpg" },
  { id: 9, title: "The Alchemist", author: "Paulo Coelho", price: 9.99, genre: "Fiction", category: "Trending", image: "/images/alchemist.jpg" },
  { id: 10, title: "The 48 Laws of Power", author: "Robert Greene", price: 18.99, genre: "Strategy", category: "Featured", image: "/images/48-laws.jpg" },
  { id: 11, title: "Sapiens", author: "Yuval Noah Harari", price: 19.99, genre: "History", category: "New Arrivals", image: "/images/sapiens.jpg" },
  { id: 12, title: "The Lean Startup", author: "Eric Ries", price: 14.49, genre: "Business", category: "Trending", image: "/images/lean-startup.jpg" },
  { id: 13, title: "Educated", author: "Tara Westover", price: 13.99, genre: "Memoir", category: "Featured", image: "/images/educated.jpg" },
  { id: 14, title: "Outliers", author: "Malcolm Gladwell", price: 12.99, genre: "Psychology", category: "Featured", image: "/images/outliers.jpg" },
  { id: 15, title: "Dune", author: "Frank Herbert", price: 21.99, genre: "Sci-Fi", category: "New Arrivals", image: "/images/dune.jpg" },
  { id: 16, title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", price: 11.49, genre: "Self-help", category: "Trending", image: "/images/subtle-art.jpg" },
  { id: 17, title: "The Power of Now", author: "Eckhart Tolle", price: 12.79, genre: "Spirituality", category: "Featured", image: "/images/power-of-now.jpg" },
  { id: 18, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 8.99, genre: "Fiction", category: "New Arrivals", image: "/images/gatsby.jpg" },
  { id: 19, title: "Principles", author: "Ray Dalio", price: 17.49, genre: "Finance", category: "Trending", image: "/images/principles.jpg" },
  { id: 20, title: "How to Win Friends & Influence People", author: "Dale Carnegie", price: 10.49, genre: "Self-help", category: "Featured", image: "/images/how-to-win.jpg" },
];

// Unique genres for filter buttons
const genres = ["All", ...new Set(books.map((book) => book.genre))];

const BookStore = () => {
  const [selectedGenre, setSelectedGenre] = useState("All");

  const filterBooks = (category) => {
    return books.filter(
      (book) =>
        book.category === category &&
        (selectedGenre === "All" || book.genre === selectedGenre)
    );
  };

  return (
    <section className="bookstore">
      <h1>📚 Book Store</h1>

      {/* Filter Buttons */}
      <div className="filters">
        {genres.map((genre) => (
          <button
            key={genre}
            className={selectedGenre === genre ? "active" : ""}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Trending Books */}
      <div className="book-section">
        <h2>📈 Trending Books</h2>
        <div className="book-grid">
          {filterBooks("Trending").map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
              <span>${book.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Books */}
      <div className="book-section">
        <h2>⭐ Featured Books</h2>
        <div className="book-grid">
          {filterBooks("Featured").map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
              <span>${book.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* New Arrivals */}
      <div className="book-section">
        <h2>🆕 New Arrivals</h2>
        <div className="book-grid">
          {filterBooks("New Arrivals").map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
              <span>${book.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookStore;

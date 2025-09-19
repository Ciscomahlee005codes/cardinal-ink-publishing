import React from "react";
import "./MyLibrary.css";

// Dummy data for now
const favorites = [
  { id: 1, title: "Atomic Habits", author: "James Clear", image: "/images/atomic-habits.jpg" },
  { id: 2, title: "Think Like a Monk", author: "Jay Shetty", image: "/images/think-like-a-monk.jpg" },
  { id: 3, title: "The 48 Laws of Power", author: "Robert Greene", image: "/images/48-laws.jpg" },
  { id: 4, title: "The Alchemist", author: "Paulo Coelho", image: "/images/alchemist.jpg" }
];

const recommended = [
  { id: 5, title: "The Psychology of Money", author: "Morgan Housel", image: "/images/psychology-of-money.jpg" },
  { id: 6, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", image: "/images/rich-dad-poor-dad.jpg" },
  { id: 7, title: "Zero to One", author: "Peter Thiel", image: "/images/zero-to-one.jpg" },
  { id: 8, title: "Start With Why", author: "Simon Sinek", image: "/images/start-with-why.jpg" }
];

const purchased = [
  { id: 9, title: "Deep Work", author: "Cal Newport", image: "/images/deep-work.jpg" },
  { id: 10, title: "Can’t Hurt Me", author: "David Goggins", image: "/images/cant-hurt-me.jpg" },
  { id: 11, title: "The Lean Startup", author: "Eric Ries", image: "/images/lean-startup.jpg" },
  { id: 12, title: "Sapiens", author: "Yuval Noah Harari", image: "/images/sapiens.jpg" }
];

const MyLibrary = () => {
  return (
    <section className="my-library">
      <h1>📖 My Library</h1>

      {/* Favorites */}
      <div className="library-section">
        <h2>❤️ Favorites</h2>
        <div className="book-grid">
          {favorites.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended */}
      <div className="library-section">
        <h2>⭐ Recommended for You</h2>
        <div className="book-grid">
          {recommended.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Purchased */}
      <div className="library-section">
        <h2>🛒 Purchased Books</h2>
        <div className="book-grid">
          {purchased.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyLibrary;

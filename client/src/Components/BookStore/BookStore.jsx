import React, { useContext, useState } from "react";
import "./BookStore.css";
import { StoreContext } from "../../Context/StoreContext";

const BookStore = () => {
  const { bookCollection, addToCart, cartItems, loading, error } = useContext(StoreContext);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [addedBooks, setAddedBooks] = useState({});

  // Show loading/error states
  if (loading) return <div className="loading">Loading books...</div>;
  if (error) return <div className="error">{error}</div>;

  const genres = ["All", ...new Set(bookCollection.map((book) => book.genre))];

  const filterBooks = (category) => {
    return bookCollection.filter(
      (book) =>
        book.category === category &&
        (selectedGenre === "All" || book.genre === selectedGenre)
    );
  };

  const handleAddToCart = (bookId) => {
    addToCart(bookId);
    setAddedBooks((prev) => ({ ...prev, [bookId]: true }));

    setTimeout(() => {
      setAddedBooks((prev) => ({ ...prev, [bookId]: false }));
    }, 2000);
  };

  const renderBooks = (books) =>
    books.map((book) => {
      const isInCart = cartItems[book.id] > 0;

      return (
        <div key={book.id} className="book-card">
          <img src={book.image} alt={book.title} />
          <h3>{book.title}</h3>
          <p>by {book.author}</p>
          <span>₦{book.price}</span>
          <button
            className={`library-btn ${isInCart ? "disabled" : ""}`}
            onClick={() => handleAddToCart(book.id)}
            disabled={isInCart}
          >
            {isInCart
              ? addedBooks[book.id]
                ? "Added ✅"
                : "In Cart"
              : "Add to Book Cart"}
          </button>
        </div>
      );
    });

  return (
    <section className="bookstore">
      <h1>📚 Book Store</h1>

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

      <div className="book-section">
        <h2>📈 Trending Books</h2>
        <div className="book-grid">{renderBooks(filterBooks("Trending"))}</div>
      </div>

      <div className="book-section">
        <h2>⭐ Featured Books</h2>
        <div className="book-grid">{renderBooks(filterBooks("Featured"))}</div>
      </div>

      <div className="book-section">
        <h2>🆕 New Arrivals</h2>
        <div className="book-grid">{renderBooks(filterBooks("New Arrivals"))}</div>
      </div>
    </section>
  );
};

export default BookStore;

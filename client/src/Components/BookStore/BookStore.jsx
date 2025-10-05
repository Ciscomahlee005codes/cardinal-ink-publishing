import React, { useContext, useState } from "react";
import "./BookStore.css";
import useBooks from "../../Hooks/useBooks";
import { StoreContext } from "../../Context/StoreContext";

const BookStore = () => {
  const { bookCollection, loading, error } = useBooks();
  const { cartItems, addToCart } = useContext(StoreContext);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [addedBooks, setAddedBooks] = useState({});

  if (loading) return <div className="loading">Loading books...</div>;
  if (error) return <div className="error">{error}</div>;

  // Get unique genres
  const genres = [
    "All",
    ...new Set(bookCollection.map((book) => book.genre || "Unknown")),
  ];

  // Filter by genre
  const filteredBooks =
    selectedGenre === "All"
      ? bookCollection
      : bookCollection.filter((book) => book.genre === selectedGenre);

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
          <img
            src={`http://localhost:3000/${book.cover_url}`}
            alt={book.title}
          />
          <h3>{book.title}</h3>
          <p className="author">by {book.author}</p>
          <p className="price">₦{book.price}</p>

          <button
            className={`btn-buy ${isInCart ? "disabled" : ""}`}
            onClick={() => handleAddToCart(book.id)}
            disabled={isInCart}
          >
            {isInCart
              ? addedBooks[book.id]
                ? "Added ✅"
                : "In Cart"
              : "Add to Cart"}
          </button>
        </div>
      );
    });

  return (
    <section className="bookstore">
      <div className="container">
        <h2>📖 Book Store</h2>
        <p className="subtitle">
          Browse all your favorite books across genres and collections.
        </p>

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

        <div className="books-grid">{renderBooks(filteredBooks)}</div>
      </div>
    </section>
  );
};

export default BookStore;

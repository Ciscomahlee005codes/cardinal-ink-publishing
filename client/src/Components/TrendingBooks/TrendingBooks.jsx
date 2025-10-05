import React, { useContext, useState } from "react";
import "./TrendingBooks.css";
import useBooks from "../../Hooks/useBooks";
import { StoreContext } from "../../Context/StoreContext";

const TrendingBooks = () => {
  const { bookCollection } = useBooks();
  const { cartItems, addToCart } = useContext(StoreContext);
  const [addedBooks, setAddedBooks] = useState({});

  // Pick only 4 books for Trending
  const trendingBooks = bookCollection.slice(0, 4);

  const handleAddToCart = (bookId) => {
    addToCart(bookId);
    setAddedBooks((prev) => ({ ...prev, [bookId]: true }));

    setTimeout(() => {
      setAddedBooks((prev) => ({ ...prev, [bookId]: false }));
    }, 2000); // 2 seconds before switching to "In Cart"
  };

  return (
    <section className="trending-books">
      <div className="container">
        <h2>📚 Trending Books</h2>
        <p className="subtitle">
          Explore the most popular books readers are loving right now.
        </p>

        <div className="books-grid">
          {trendingBooks.map((book) => {
            const isInCart = cartItems[book.id] > 0;

            return (
              <div className="book-card" key={book.id}>
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
          })}
        </div>
      </div>
    </section>
  );
};

export default TrendingBooks;

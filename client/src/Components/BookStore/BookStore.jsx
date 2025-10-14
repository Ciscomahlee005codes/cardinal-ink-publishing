import React, { useContext, useState } from "react";
import "./BookStore.css";
import useBooks from "../../Hooks/useBooks";
import useCategory from "../../Hooks/useCategory";
import { StoreContext } from "../../Context/StoreContext";

const BookStore = () => {
  const { bookCollection, loading, error } = useBooks();
  const { Categories } = useCategory();
  const { cartItems, addToCart } = useContext(StoreContext);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [addedBooks, setAddedBooks] = useState({});

  console.log("BOOK DATA:", bookCollection); // 👈🏽 debug this to confirm structure

  if (loading) return <div className="loading">Loading books...</div>;
  if (error) return <div className="error">{error}</div>;

  const categoryList = ["All", ...(Categories?.map((cat) => cat.category) || [])];

  // ✅ Fixed filtering logic
  const filteredBooks =
    selectedCategory === "All"
      ? bookCollection
      : bookCollection.filter(
          (book) =>
            book.category?.category?.toLowerCase() ===
            selectedCategory.toLowerCase()
        );

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
          <p className="price">${book.price}</p>

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
          Browse all your favorite books across category and collections.
        </p>

        <div className="filters">
          {categoryList.map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="books-grid">{renderBooks(filteredBooks)}</div>
      </div>
    </section>
  );
};

export default BookStore;

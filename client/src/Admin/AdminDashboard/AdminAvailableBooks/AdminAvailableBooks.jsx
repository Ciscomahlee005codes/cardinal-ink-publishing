import React from "react";
import { Star } from "lucide-react";
import "./AdminAvailableBooks.css"; // Import CSS file

const trendingBooks = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://covers.openlibrary.org/b/id/12509439-L.jpg",
    rating: 4.8,
    description:
      "A guide to building good habits and breaking bad ones through small, consistent changes.",
  },
  {
    id: 2,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    cover: "https://covers.openlibrary.org/b/id/10909258-L.jpg",
    rating: 4.7,
    description:
      "Explores how people think about money and how behavior often matters more than knowledge.",
  },
  {
    id: 3,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    cover: "https://covers.openlibrary.org/b/id/240726-L.jpg",
    rating: 4.6,
    description:
      "Personal finance classic contrasting two different approaches to money and wealth.",
  },
  {
    id: 4,
    title: "Deep Work",
    author: "Cal Newport",
    cover: "https://covers.openlibrary.org/b/id/8107896-L.jpg",
    rating: 4.5,
    description:
      "Focuses on the importance of deep, concentrated work in achieving success.",
  },
];

const AdminAvailableBooks = () => {
  return (
    <div className="trending-container">
      <h2 className="trending-title">📚 Available Books</h2>
      <div className="book-grid">
        {trendingBooks.map((book) => (
          <div key={book.id} className="book-card">
            <img src={book.cover} alt={book.title} className="book-cover" />
            <div className="book-content">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">by {book.author}</p>
              <div className="book-rating">
                <Star size={16} className="star-icon" />
                <span>{book.rating}</span>
              </div>
              <p className="book-description">{book.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAvailableBooks;

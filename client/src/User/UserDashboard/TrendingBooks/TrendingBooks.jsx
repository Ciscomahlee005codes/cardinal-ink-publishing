import React from "react";
import { Star } from "lucide-react";
import "./TrendingBooks.css"; 
import useBooks from "../../../Hooks/useBooks";



const TrendingBooks = () => {
  const {bookCollection} = useBooks()
  const trendingBooks = bookCollection.slice(0, 9);
  return (
    <div className="trending-container">
      <h2 className="trending-title">📚 Trending Books</h2>
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

export default TrendingBooks;

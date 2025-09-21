import React from "react";
import "./NewArrival.css";
import { FaStar } from "react-icons/fa";

// Sample new arrival books
const newArrivals = [
  {
    id: 1,
    title: "The Mountain Is You",
    author: "Brianna Wiest",
    cover: "https://covers.openlibrary.org/b/id/12708023-L.jpg",
    rating: 4.6,
    releaseDate: "Sept 15, 2025",
    description: "A guide to transforming self-sabotage into personal power.",
  },
  {
    id: 2,
    title: "The Creative Act",
    author: "Rick Rubin",
    cover: "https://covers.openlibrary.org/b/id/12921184-L.jpg",
    rating: 4.8,
    releaseDate: "Sept 10, 2025",
    description: "Insights on unlocking creativity and embracing the artist within.",
  },
  {
    id: 3,
    title: "Build the Life You Want",
    author: "Arthur Brooks & Oprah Winfrey",
    cover: "https://covers.openlibrary.org/b/id/14226506-L.jpg",
    rating: 4.5,
    releaseDate: "Sept 8, 2025",
    description: "Practical advice on creating happiness and fulfillment.",
  },
  {
    id: 4,
    title: "Hidden Potential",
    author: "Adam Grant",
    cover: "https://covers.openlibrary.org/b/id/14564694-L.jpg",
    rating: 4.7,
    releaseDate: "Sept 1, 2025",
    description: "How to unlock the untapped potential in yourself and others.",
  },
];

const NewArrival = () => {
  return (
    <div className="new-arrival">
      <h2>✨ New Arrivals</h2>
      <p className="subtitle">
        Discover the latest books added to our library collection
      </p>
      <div className="arrival-grid">
        {newArrivals.map((book) => (
          <div key={book.id} className="arrival-card">
            <img src={book.cover} alt={book.title} className="arrival-cover" />
            <div className="arrival-info">
              <h3>{book.title}</h3>
              <p className="author">by {book.author}</p>
              <div className="rating">
                <FaStar className="star" /> {book.rating}
              </div>
              <p className="description">{book.description}</p>
              <p className="release">📅 Released: {book.releaseDate}</p>
              <button className="btn-view">View Book</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrival;

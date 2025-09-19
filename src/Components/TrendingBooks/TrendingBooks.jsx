import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import "./TrendingBooks.css";

const TrendingBooks = () => {
  const books = [
    {
      id: 1,
      title: "The Power of Habit",
      author: "Charles Duhigg",
      price: "$12.99",
      rating: 4.5,
      img: "https://dummyimage.com/200x280/00bf63/ffffff&text=Book+1",
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      price: "$14.99",
      rating: 5,
      img: "https://dummyimage.com/200x280/079b31/ffffff&text=Book+2",
    },
    {
      id: 3,
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      price: "$10.99",
      rating: 4,
      img: "https://dummyimage.com/200x280/333/ffffff&text=Book+3",
    },
    {
      id: 4,
      title: "Think & Grow Rich",
      author: "Napoleon Hill",
      price: "$9.50",
      rating: 4.2,
      img: "https://dummyimage.com/200x280/00bf63/ffffff&text=Book+4",
    },
  ];

  // Render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="star filled" />);
    }

    if (halfStar) {
      stars.push(<FaStarHalfAlt key="half" className="star filled" />);
    }

    while (stars.length < 5) {
      stars.push(<FaRegStar key={stars.length} className="star" />);
    }

    return stars;
  };

  return (
    <section className="trending-books">
      <div className="container">
        <h2>📚 Trending Books</h2>
        <p className="subtitle">
          Explore the most popular books readers are loving right now.
        </p>

        <div className="books-grid">
          {books.map((book) => (
            <div className="book-card" key={book.id}>
              <img src={book.img} alt={book.title} />
              <h3>{book.title}</h3>
              <p className="author">by {book.author}</p>
              <div className="rating">{renderStars(book.rating)}</div>
              <p className="price">{book.price}</p>
              <button className="btn-buy">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingBooks;

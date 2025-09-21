import React, { useState } from "react";
import "./AdminBookManagement.css";
import { FaSearch, FaEdit, FaTrash, FaStar, FaTimesCircle } from "react-icons/fa";

const AdminBookManagement = () => {
  const [search, setSearch] = useState("");

  const books = [
    { id: 1, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", genre: "Finance", price: "$10", status: "Available", date: "Sept 15, 2025" },
    { id: 2, title: "Atomic Habits", author: "James Clear", genre: "Self-help", price: "$12", status: "Featured", date: "Sept 18, 2025" },
    { id: 3, title: "Deep Work", author: "Cal Newport", genre: "Productivity", price: "$15", status: "Out of Stock", date: "Sept 10, 2025" },
    { id: 4, title: "The Lean Startup", author: "Eric Ries", genre: "Business", price: "$20", status: "Available", date: "Sept 8, 2025" },
  ];

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="book-management">
      <h1>Book Management</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search books by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Books Table */}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Price</th>
            <th>Status</th>
            <th>Date Added</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.price}</td>
              <td>
                <span className={`status ${book.status.toLowerCase().replace(/\s/g, "-")}`}>
                  {book.status}
                </span>
              </td>
              <td>{book.date}</td>
              <td className="actions">
                <button className="edit"><FaEdit /></button>
                <button className="delete"><FaTrash /></button>
                <button className="feature"><FaStar /></button>
                <button className="outofstock"><FaTimesCircle /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookManagement;

import React, { useState } from "react";
import "./AdminBookManagement.css";
import { FaSearch, FaEdit, FaTrash, FaStar, FaTimesCircle, FaPlus } from "react-icons/fa";

const AdminBookManagement = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    price: "",
    cover: null,
    pdf: null,
  });

  const books = [
    { 
      id: 1, 
      title: "Rich Dad Poor Dad", 
      author: "Robert Kiyosaki", 
      genre: "Finance", 
      price: "$10", 
      cover: "https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg", 
      date: "Sept 15, 2025" 
    },
    { 
      id: 2, 
      title: "Atomic Habits", 
      author: "James Clear", 
      genre: "Self-help", 
      price: "$12", 
      cover: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg", 
      date: "Sept 18, 2025" 
    },
    { 
      id: 3, 
      title: "The Lean Startup", 
      author: "Eric Ries", 
      genre: "Business", 
      price: "$15", 
      cover: "https://m.media-amazon.com/images/I/81-QB7nDh4L.jpg", 
      date: "Sept 19, 2025" 
    },
    { 
      id: 4, 
      title: "Think and Grow Rich", 
      author: "Napoleon Hill", 
      genre: "Motivation", 
      price: "$9", 
      cover: "https://m.media-amazon.com/images/I/81dQwQlmAXL.jpg", 
      date: "Sept 20, 2025" 
    },
    { 
      id: 5, 
      title: "Deep Work", 
      author: "Cal Newport", 
      genre: "Productivity", 
      price: "$14", 
      cover: "https://m.media-amazon.com/images/I/81n2a2-mSIL.jpg", 
      date: "Sept 21, 2025" 
    }
  ];

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  // Handle file inputs
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setNewBook({ ...newBook, [name]: files[0] });
  };

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    console.log("New Book Added:", newBook);
    setShowModal(false);
    setNewBook({ title: "", author: "", genre: "", price: "", cover: null, pdf: null });
  };

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

      {/* Add New Book Button */}
      <div className="add-btn-container">
        <button className="add-btn" onClick={() => setShowModal(true)}>
          <FaPlus /> Add New Book
        </button>
      </div>

      {/* Books Table */}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Cover</th>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Price</th>
            <th>Date Added</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>
                <img src={book.cover} alt={book.title} className="book-cover" />
              </td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.price}</td>
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

        {/* Modal Popup */}
{showModal && (
  <div className="modal-overlay">
    <div className="modal">
      <h2>Add New Book</h2>
      <form onSubmit={handleAddBook}>
        <input 
          type="text" 
          name="title" 
          placeholder="Book Title" 
          value={newBook.title} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="author" 
          placeholder="Author" 
          value={newBook.author} 
          onChange={handleChange} 
          required 
        />

        {/* ✅ Category as Dropdown */}
        <label>Select Category</label>
        <select
          name="category"
          value={newBook.category || ""}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Category --</option>
          <option value="Business">Business</option>
          <option value="Self-help">Self-help</option>
          <option value="Motivation">Motivation</option>
          <option value="Productivity">Productivity</option>
          <option value="Finance">Finance</option>
          <option value="Fiction">Fiction</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
        </select>

        <input 
          type="text" 
          name="price" 
          placeholder="Price (e.g. $15)" 
          value={newBook.price} 
          onChange={handleChange} 
          required 
        />

        {/* ✅ Cover Image Upload with Preview */}
        <label>Upload Cover Image</label>
        <input 
          type="file" 
          name="cover" 
          accept="image/*" 
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setNewBook({
                ...newBook,
                cover: file,
                coverPreview: URL.createObjectURL(file), // <-- preview URL
              });
            }
          }}
          required 
        />
        {newBook.coverPreview && (
          <img 
            src={newBook.coverPreview} 
            alt="Preview" 
            className="preview-image" 
          />
        )}

        {/* PDF Upload */}
        <label>Upload Book PDF</label>
        <input 
          type="file" 
          name="pdf" 
          accept="application/pdf" 
          onChange={handleFileChange} 
          required 
        />

        <div className="modal-actions">
          <button type="submit" className="save-btn">Save</button>
          <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      </form>
    </div>
  </div>
)}


    </div>
  );
};

export default AdminBookManagement;

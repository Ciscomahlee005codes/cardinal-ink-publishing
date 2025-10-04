import React, { useEffect, useState } from "react";
import "./AdminBookManagement.css";
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaStar,
  FaTimesCircle,
  FaPlus,
} from "react-icons/fa";
import endPoint from "../../../API/Interface";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminBookManagement = () => {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    cover: null,
    pdf: null,
    coverPreview: null,
  });

  // ✅ Fetch all books
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await endPoint.get("/books");
      if (res.data && Array.isArray(res.data)) {
        setBooks(res.data);
      } else {
        toast.error("Invalid response format ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch books ❌");
    }
  };

  // ✅ Handle inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setNewBook({ ...newBook, [name]: files[0] });
  };

  // ✅ Add new book
  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author || !newBook.price) {
      toast.warn("⚠ Please fill in all required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", newBook.title);
      formData.append("author", newBook.author);
      formData.append("description", newBook.description);
      formData.append("price", newBook.price);
      if (newBook.cover) formData.append("fileContent", newBook.cover);
      if (newBook.pdf) formData.append("fileContent", newBook.pdf);

      const res = await endPoint.post("/createnew/books", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${localStorage.getItem("adminAuthToken")}`,
        },
      });

      if (res.data.status === true) {
        toast.success("✅ Book added successfully");
        fetchBooks();
        setShowModal(false);
        setNewBook({
          title: "",
          author: "",
          description: "",
          price: "",
          cover: null,
          pdf: null,
          coverPreview: null,
        });
      } else {
        toast.error(res.data.message || "Failed to add book ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add book ❌");
    }
  };

  // ✅ Delete book
  const handleDeleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      const res = await endPoint.put("/book/delete", { id });
      if (res.data.status) {
        toast.success("✅ Book deleted successfully");
        fetchBooks();
      } else {
        toast.error(res.data.message || "Failed to delete ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete ❌");
    }
  };

  // ✅ Edit book title (simple)
  const handleEditBook = async (book) => {
    const newTitle = prompt("Enter new title:", book.title);
    if (!newTitle) return;
    try {
      const res = await endPoint.put("/book/edit", {
        id: book._id,
        title: newTitle,
      });
      if (res.data.status) {
        toast.success("✅ Book updated successfully");
        fetchBooks();
      } else {
        toast.error(res.data.message || "Failed to update ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update ❌");
    }
  };

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
            <th>Description</th>
            <th>Price</th>
            <th>Date Added</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <tr key={book._id || index}>
                <td data-label="#">{index + 1}</td>
                <td data-label="Cover">
                  <img
                    src={book.coverUrl || ""}
                    alt={book.title}
                    className="book-cover"
                  />
                </td>
                <td data-label="Title">{book.title}</td>
                <td data-label="Author">{book.author}</td>
                <td data-label="Description">{book.description}</td>
                <td data-label="Price">{book.price}</td>
                <td data-label="Date Added">
                  {new Date(book.createdAt).toLocaleDateString()}
                </td>
                <td data-label="Actions" className="actions">
                  <button className="edit" onClick={() => handleEditBook(book)}>
                    <FaEdit />
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDeleteBook(book._id)}
                  >
                    <FaTrash />
                  </button>
                  <button
                    className="feature"
                    onClick={() =>
                      toast.info(`⭐ Marked "${book.title}" as featured`)
                    }
                  >
                    <FaStar />
                  </button>
                  <button
                    className="outofstock"
                    onClick={() =>
                      toast.info(`❌ Marked "${book.title}" as out of stock`)
                    }
                  >
                    <FaTimesCircle />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No books found
              </td>
            </tr>
          )}
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
              />
              <input
                type="text"
                name="author"
                placeholder="Author"
                value={newBook.author}
                onChange={handleChange}
              />

              <textarea
                name="description"
                placeholder="Description"
                value={newBook.description}
                onChange={handleChange}
              ></textarea>

              <input
                type="text"
                name="price"
                placeholder="Price (e.g. $15)"
                value={newBook.price}
                onChange={handleChange}
              />

              <label>Upload Cover Image</label>
              <input
                type="file"
                name="cover"
                accept="image/*"
                onChange={(e) => {
                  handleFileChange(e);
                  const file = e.target.files[0];
                  if (file) {
                    const previewURL = URL.createObjectURL(file);
                    setNewBook((prev) => ({
                      ...prev,
                      coverPreview: previewURL,
                    }));
                  }
                }}
              />
              {newBook.coverPreview && (
                <div className="cover-preview">
                  <img src={newBook.coverPreview} alt="Book Cover Preview" />
                </div>
              )}

              <label>Upload Book PDF</label>
              <input
                type="file"
                name="pdf"
                accept="application/pdf"
                onChange={handleFileChange}
              />

              <div className="modal-actions">
                <button type="submit" className="save-btn">
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminBookManagement;

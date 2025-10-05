import React, { useState } from "react";
import "./AdminBookManagement.css";
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaTimesCircle,
  FaPlus,
} from "react-icons/fa";
import endPoint from "../../../API/Interface";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useBooks from "../../../Hooks/useBooks";
import useCategory from "../../../Hooks/useCategory";

const AdminBookManagement = () => {
  const { bookCollection, refetchBooks } = useBooks();
  const { Categories } = useCategory();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    category: 0,
    cover: null,
    pdf: null,
    coverPreview: null,
  });

  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [viewModal, setViewModal] = useState(null);

  // ✅ Handle input changes
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
      formData.append("price", Number(newBook.price).toFixed(2));
      formData.append("category_id", selectedCategory);

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
        refetchBooks();
        setShowModal(false);
        setNewBook({
          title: "",
          author: "",
          description: "",
          price: "",
          category: "",
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

  // ✅ Edit Book Modal
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await endPoint.put("/book/edit", {
        id: editModal._id,
        title: editModal.title,
      });
      if (res.data.status) {
        toast.success("✅ Book updated successfully");
        refetchBooks();
        setEditModal(null);
      } else {
        toast.error(res.data.message || "Failed to update ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update ❌");
    }
  };

  // ✅ Delete Book Modal
  const confirmDelete = async () => {
    try {
      const res = await endPoint.put("/book/delete", { id: deleteModal._id });
      if (res.data.status) {
        toast.success("✅ Book deleted successfully");
        refetchBooks();
        setDeleteModal(null);
      } else {
        toast.error(res.data.message || "Failed to delete ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete ❌");
    }
  };

  // ✅ Search Filter
  const filteredBooks =
    bookCollection?.filter(
      (book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
    ) || [];

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

      {/* Add Book */}
      <div className="add-btn-container">
        <button className="add-btn" onClick={() => setShowModal(true)}>
          <FaPlus /> Add New Book
        </button>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Cover</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
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
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`http://localhost:3000/${book.cover_url}`}
                    alt={book.title}
                    className="book-cover"
                  />
                </td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category.category}</td>
                <td>{book.description}</td>
                <td>{book.price}</td>
                <td>{new Date(book.createdAt).toLocaleDateString()}</td>
                <td className="actions">
                  <button className="edit" onClick={() => setEditModal(book)}>
                    <FaEdit />
                  </button>
                  <button className="delete" onClick={() => setDeleteModal(book)}>
                    <FaTrash />
                  </button>
                  <button className="view" onClick={() => setViewModal(book)}>
                    <FaEye />
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
              <td colSpan="9" style={{ textAlign: "center" }}>
                No books found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Book Modal */}
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
              <label>Select Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">-- Select Category --</option>
                {Categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.category}
                  </option>
                ))}
              </select>
              <label>Upload Cover Image</label>
              <input type="file" name="cover" accept="image/*" onChange={handleFileChange} />
              <label>Upload Book PDF</label>
              <input type="file" name="pdf" accept="application/pdf" onChange={handleFileChange} />
              <div className="modal-actions">
                <button type="submit" className="save-btn">
                  Save
                </button>
                <button className="cancel-btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Book</h2>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                value={editModal.title}
                onChange={(e) =>
                  setEditModal({ ...editModal, title: e.target.value })
                }
              />
              <div className="modal-actions">
                <button type="submit" className="save-btn">
                  Update
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setEditModal(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal && (
        <div className="modal-overlay">
          <div className="modal delete-modal">
            <h2>Delete Book</h2>
            <p>Are you sure you want to delete <b>{deleteModal.title}</b>?</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setDeleteModal(null)}>
                Cancel
              </button>
              <button className="save-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{viewModal.title}</h2>
            <img
              src={`http://localhost:3000/${viewModal.cover_url}`}
              alt={viewModal.title}
              className="book-cover-large"
            />
            <p><b>Author:</b> {viewModal.author}</p>
            <p><b>Category:</b> {viewModal.category.category}</p>
            <p><b>Description:</b> {viewModal.description}</p>
            <p><b>Price:</b> {viewModal.price}</p>
            <p><b>Added On:</b> {new Date(viewModal.createdAt).toLocaleDateString()}</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setViewModal(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminBookManagement;

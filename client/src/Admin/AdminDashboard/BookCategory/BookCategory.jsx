import React, { useState } from "react";
import "./BookCategory.css";
import endPoint from "../../../API/Interface";
import { toast, ToastContainer } from "react-toastify";
import useCategory from "../../../Hooks/useCategory";
import useGetCategoryId from "../../../Hooks/useGetCategoryId";

const BookCategory = () => {
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({ id: "", name: "", description: "" });

  const { Categories } = useCategory();
  const { CategoryById } = useGetCategoryId();

  // ✅ Add new category
  const handleAdd = async () => {
    const token = localStorage.getItem("adminAuthToken");

    if (!token) {
      toast.error("❌ No admin token found. Please login again.");
      return;
    }

    try {
      const res = await endPoint.post(
        "/create/category",
        { category: newCategory.name },
        { headers: { authorization: `Bearer ${token}` } }
      );

      if (res.data.status === true) {
        toast.success("✅ Category created successfully");
        setNewCategory({ name: "", description: "" });
      } else {
        toast.error(res.data.message || "❌ Failed to create category");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to create category");
    }
  };

  // ✅ Open Edit Modal
  const openEditModal = (cat) => {
    setEditData({ id: cat._id, name: cat.category, description: cat.description || "" });
    setEditModal(true);
  };

  // ✅ Save Edited Category
  const handleSaveEdit = async () => {
    if (!editData.name.trim()) {
      toast.warn("⚠ Please enter a category name");
      return;
    }

    const token =
      localStorage.getItem("adminAuthToken") || localStorage.getItem("token");

    try {
      const res = await endPoint.put(
        "/edit/category",
        {
          id: editData.id,
          name: editData.name,
          description: editData.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.status) {
        toast.success("✅ Category updated successfully");
        setEditModal(false);
      } else {
        toast.error(res.data.message || "❌ Failed to update category");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update category");
    }
  };

  // ✅ Delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    const token =
      localStorage.getItem("adminAuthToken") || localStorage.getItem("token");

    try {
      const res = await endPoint.delete(`/categories/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.status) {
        toast.success("✅ Category deleted successfully");
      } else {
        toast.error(res.data.message || "❌ Failed to delete category");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to delete category");
    }
  };

  return (
    <div className="category-page">
      <h1>Book Categories</h1>

      {/* Add Category Form */}
      <div className="add-category">
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
        />
        <button className="add-btn" onClick={handleAdd}>
          + Add Category
        </button>
      </div>

      {/* Categories Table */}
      <table className="category-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Categories.length > 0 ? (
            Categories.map((cat, index) => (
              <tr key={cat._id}>
                <td>{index + 1}</td>
                <td>{cat.category}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => openEditModal(cat)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(cat._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No categories found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ Edit Category Modal */}
      {editModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Category</h2>
            <input
              type="text"
              placeholder="Category Name"
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />
            <textarea
              placeholder="Description (optional)"
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
            />
            <div className="modal-actions">
              <button className="save-btn" onClick={handleSaveEdit}>
                Save Changes
              </button>
              <button
                className="cancel-btn"
                onClick={() => setEditModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default BookCategory;

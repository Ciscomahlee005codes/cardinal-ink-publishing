import React, { useEffect, useState } from "react";
import "./BookCategory.css";
import endPoint from "../../../API/Interface";
import { toast } from "react-toastify";

const BookCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

  // ✅ Fetch categories from backend
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await endPoint.get("/categories");
      if (res.data && Array.isArray(res.data)) {
        setCategories(res.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to load categories");
    }
  };

  // ✅ Add new category
  const handleAdd = async () => {
    if (newCategory.name.trim() === "" || newCategory.description.trim() === "") {
      toast.error("⚠️ Please fill in both fields");
      return;
    }

    try {
      const res = await endPoint.post("/create/category", newCategory, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ include admin token
        },
      });

      if (res.data.status) {
        toast.success("✅ Category created successfully");
        setNewCategory({ name: "", description: "" });
        fetchCategories();
      } else {
        toast.error(res.data.message || "❌ Failed to create category");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to create category");
    }
  };

  // ✅ Edit category
  const handleEdit = async (cat) => {
    const newName = prompt("Enter new category name:", cat.name);
    const newDesc = prompt("Enter new description:", cat.description);

    if (!newName || !newDesc) return;

    try {
      const res = await endPoint.put(
        "/edit/category",
        { id: cat._id, name: newName, description: newDesc },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.status) {
        toast.success("✅ Category updated successfully");
        fetchCategories();
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

    try {
      const res = await endPoint.delete(`/categories/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.status) {
        toast.success("✅ Category deleted successfully");
        fetchCategories();
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
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newCategory.description}
          onChange={(e) =>
            setNewCategory({ ...newCategory, description: e.target.value })
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
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((cat, index) => (
              <tr key={cat._id}>
                <td data-label="#">{index + 1}</td>
                <td data-label="Category Name">{cat.name}</td>
                <td data-label="Description">{cat.description}</td>
                <td data-label="Actions">
                  <button className="edit-btn" onClick={() => handleEdit(cat)}>
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
    </div>
  );
};

export default BookCategory;

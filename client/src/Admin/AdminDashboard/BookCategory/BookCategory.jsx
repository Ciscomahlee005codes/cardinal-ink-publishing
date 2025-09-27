import React, { useState } from "react";
import "./BookCategory.css";

const BookCategory = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Fiction", description: "Novels, stories, and literature" },
    { id: 2, name: "Science", description: "Science and research-based books" },
    { id: 3, name: "History", description: "Historical events and biographies" },
    { id: 4, name: "Self-help", description: "Motivation and personal growth" },
  ]);

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

  const handleAdd = () => {
    if (newCategory.name.trim() === "" || newCategory.description.trim() === "") {
      alert("Please fill in both fields.");
      return;
    }

    const newCat = {
      id: categories.length + 1,
      name: newCategory.name,
      description: newCategory.description,
    };

    setCategories([...categories, newCat]);
    setNewCategory({ name: "", description: "" }); // reset inputs
  };

  const handleEdit = (id) => {
    alert(`Edit category with ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((cat) => cat.id !== id));
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
          {categories.map((cat, index) => (
            <tr key={cat.id}>
              <td>{index + 1}</td>
              <td>{cat.name}</td>
              <td>{cat.description}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(cat.id)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(cat.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookCategory;

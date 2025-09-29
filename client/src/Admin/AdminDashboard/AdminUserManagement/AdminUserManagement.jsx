import React, { useState } from "react";
import "./AdminUserManagement.css";
import { FaSearch, FaEdit, FaTrash, FaBan } from "react-icons/fa";

const AdminUserManagement = () => {
  const [search, setSearch] = useState("");

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "reader", status: "Active", date: "Sept 20, 2025" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "reader", status: "Inactive", date: "Sept 15, 2025" },
    { id: 3, name: "Chris Lee", email: "chris@example.com", role: "reader", status: "Inactive", date: "Sept 10, 2025" },
    { id: 4, name: "David Johnson", email: "david@example.com", role: "reader", status: "Active", date: "Sept 8, 2025" },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="user-management">
      <h1>User Management</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Users Table */}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Date Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {filteredUsers.map((user, index) => (
    <tr key={user.id}>
      <td data-label="#">{index + 1}</td>
      <td data-label="Name">{user.name}</td>
      <td data-label="Email">{user.email}</td>
      <td data-label="Role">
        <span className={`role ${user.role.toLowerCase()}`}>{user.role}</span>
      </td>
      <td data-label="Status">
        <span className={`status ${user.status.toLowerCase()}`}>{user.status}</span>
      </td>
      <td data-label="Date Joined">{user.date}</td>
      <td data-label="Actions" className="actions">
        <button className="edit"><FaEdit /></button>
        <button className="delete"><FaTrash /></button>
        <button className="suspend"><FaBan /></button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default AdminUserManagement;

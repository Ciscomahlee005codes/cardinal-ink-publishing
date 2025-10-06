import React, { useState } from "react";
import "./AdminUserManagement.css";
import { FaSearch, FaTrash, FaBan } from "react-icons/fa";
import useUsers from "../../../Hooks/useUsers";

const AdminUserManagement = () => {
  const [search, setSearch] = useState("");
  const { users } = useUsers();

  const filteredUsers = users.filter(
    (user) =>
      user.firstname.toLowerCase().includes(search.toLowerCase()) ||
      user.lastname.toLowerCase().includes(search.toLowerCase()) ||
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
                <span className={`role ${user.role.toLowerCase()}`}>
                  {user.role}
                </span>
              </td>
              <td data-label="Status">
                <span className={`status ${"Active"}`}>{"Active"}</span>
              </td>
              <td data-label="Date Joined">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td data-label="Actions" className="actions">
                {/* Removed Edit Button */}
                <button className="delete">
                  <FaTrash />
                </button>
                <button className="suspend">
                  <FaBan />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserManagement;

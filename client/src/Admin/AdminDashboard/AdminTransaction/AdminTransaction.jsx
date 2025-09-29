import React, { useState } from "react";
import "./AdminTransaction.css";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaRedo,
  FaReceipt,
  FaSearch,
} from "react-icons/fa";

const AdminTransaction = () => {
  const [search, setSearch] = useState("");

  const transactions = [
    { id: "TXN001", user: "John Doe", book: "Rich Dad Poor Dad", amount: "$10", status: "Success", date: "Sept 15, 2025" },
    { id: "TXN002", user: "Jane Smith", book: "Atomic Habits", amount: "$12", status: "Pending", date: "Sept 16, 2025" },
    { id: "TXN003", user: "Michael Lee", book: "Deep Work", amount: "$15", status: "Failed", date: "Sept 17, 2025" },
    { id: "TXN004", user: "Sophia Johnson", book: "The Lean Startup", amount: "$20", status: "Refunded", date: "Sept 18, 2025" },
    { id: "TXN005", user: "David Brown", book: "Zero to One", amount: "$18", status: "Success", date: "Sept 18, 2025" },
  ];

  const renderStatus = (status) => {
    switch (status) {
      case "Success":
        return <span className="status success"><FaCheckCircle /> Success</span>;
      case "Pending":
        return <span className="status pending"><FaClock /> Pending</span>;
      case "Failed":
        return <span className="status failed"><FaTimesCircle /> Failed</span>;
      case "Refunded":
        return <span className="status refunded"><FaRedo /> Refunded</span>;
      default:
        return <span className="status">{status}</span>;
    }
  };

  // Filter transactions based on search
  const filteredTransactions = transactions.filter((txn) =>
    Object.values(txn)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="admin-transaction">
      <h1>Transaction History</h1>

      {/* 🔍 Search bar */}
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Transaction ID</th>
            <th>User</th>
            <th>Book</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
  {filteredTransactions.length > 0 ? (
    filteredTransactions.map((txn, index) => (
      <tr key={txn.id}>
        <td data-label="#"> {index + 1}</td>
        <td data-label="Transaction ID">{txn.id}</td>
        <td data-label="User">{txn.user}</td>
        <td data-label="Book">{txn.book}</td>
        <td data-label="Amount">{txn.amount}</td>
        <td data-label="Status">{renderStatus(txn.status)}</td>
        <td data-label="Date">{txn.date}</td>
        <td data-label="Action">
          <button className="view-btn"><FaReceipt /> View</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="8" style={{ textAlign: "center", padding: "15px" }}>
        No transactions found
      </td>
    </tr>
  )}
</tbody>

      </table>
    </div>
  );
};

export default AdminTransaction;

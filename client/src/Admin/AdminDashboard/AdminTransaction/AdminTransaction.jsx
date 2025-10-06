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
import useTransactions from "../../../Hooks/useTransactions";

const AdminTransaction = () => {
  const [search, setSearch] = useState("");
  const { transactions } = useTransactions();

  const renderStatus = (status) => {
    switch (status) {
      case "Success":
        return (
          <span className="status success">
            <FaCheckCircle /> Success
          </span>
        );
      case "Pending":
        return (
          <span className="status pending">
            <FaClock /> Pending
          </span>
        );
      case "Failed":
        return (
          <span className="status failed">
            <FaTimesCircle /> Failed
          </span>
        );
      case "Refunded":
        return (
          <span className="status refunded">
            <FaRedo /> Refunded
          </span>
        );
      default:
        return <span className="status">{status}</span>;
    }
  };

  // Filter transactions based on search
  const filteredTransactions = (transactions || []).filter((txn) =>
    [txn.tnx_ref, txn.user?.firstname, txn.user?.lastname, txn.book?.title]
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
                <td>{index + 1}</td>
                <td>{txn.tnx_ref}</td>
                <td>
                  {txn.transaction?.firstname} {txn.transaction?.lastname}
                </td>
                <td>{txn.book?.title}</td>
                <td>{txn.amount}</td>
                <td>{renderStatus(txn.status)}</td>
                <td>{new Date(txn.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className="view-btn">
                    <FaReceipt /> View
                  </button>
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

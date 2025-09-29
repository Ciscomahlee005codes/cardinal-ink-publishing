import React from "react";
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaDownload } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import "./UserPurchaseHistory.css";

const UserPurchaseHistory = () => {
  const purchases = [
    {
      id: 1,
      book: "Atomic Habits",
      author: "James Clear",
      date: "2025-09-10",
      price: "$12.99",
      status: "Completed",
    },
    {
      id: 2,
      book: "The Subtle Art of Not Giving a F*ck",
      author: "Mark Manson",
      date: "2025-09-12",
      price: "$15.00",
      status: "Pending",
    },
    {
      id: 3,
      book: "Deep Work",
      author: "Cal Newport",
      date: "2025-09-14",
      price: "$10.50",
      status: "Cancelled",
    },
    {
      id: 4,
      book: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      date: "2025-09-16",
      price: "$9.75",
      status: "Completed",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <FaCheckCircle className="status-icon completed" />;
      case "Pending":
        return <FaHourglassHalf className="status-icon pending" />;
      case "Cancelled":
        return <FaTimesCircle className="status-icon cancelled" />;
      default:
        return null;
    }
  };

  return (
    <div className="purchase-history">
      <h2>Purchase History</h2>
      <table className="history-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Book Title</th>
            <th>Author</th>
            <th>Date</th>
            <th>Price</th>
            <th>Status</th>
            <th>Receipt</th>
          </tr>
        </thead>
        <tbody>
  {purchases.map((item, index) => (
    <tr key={item.id}>
      <td data-label="#"> {index + 1}</td>
      <td data-label="Book Title">{item.book}</td>
      <td data-label="Author">{item.author}</td>
      <td data-label="Date">{item.date}</td>
      <td data-label="Price">{item.price}</td>
      <td data-label="Status" className={`status ${item.status.toLowerCase()}`}>
        {getStatusIcon(item.status)} {item.status}
      </td>
      <td data-label="Receipt">
        <button className="download-btn">
          <FaRegEye /> View Receipt
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default UserPurchaseHistory;

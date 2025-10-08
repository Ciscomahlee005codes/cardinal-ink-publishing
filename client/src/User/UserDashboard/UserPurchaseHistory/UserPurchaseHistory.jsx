import React, { useEffect } from "react";
import {
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaDownload,
} from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import "./UserPurchaseHistory.css";
import endPoint from "../../../API/Interface";
import { toast, ToastContainer } from "react-toastify";

const UserPurchaseHistory = () => {
  const [purchases, setPurchases] = React.useState([]);

  async function fetchPurchases() {
    try {
      const requestOptions = endPoint.get("/user/transactions", {
        headers: { authorization: localStorage.getItem("userAuthToken") },
      });
      const response = await requestOptions;

      if (response.status === true) {
        setPurchases(response.transactions);
        return;
      }

      toast.error(response.message);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPurchases();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "sucsess":
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
      <ToastContainer />
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
            <tr key={index}>
              <td data-label="#"> {item.tnx_ref}</td>
              <td data-label="Book Title">{item.book.title}</td>
              <td data-label="Author">{item.book.author}</td>
              <td data-label="Date">{item.createdAt.toLocalDateString()}</td>
              <td data-label="Price">{item.amount}</td>
              <td
                data-label="Status"
                className={`status ${item.status.toLowerCase()}`}
              >
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

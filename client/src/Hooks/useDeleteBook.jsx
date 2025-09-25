// hooks/useDeleteBook.js
import { useState } from "react";
import endPoint from "../API/Interface";

const useDeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const deleteBook = async (bookid) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      setMessage("");

      const response = await endPoint.delete(`/books/delete?bookid=${bookid}`);
      const res = response.data;

      if (res.status) {
        setSuccess(true);
        setMessage(res.message);
      } else {
        setError(res.message || "Failed to delete book");
      }
    } catch (err) {
      setError("Error deleting book");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteBook, loading, error, success, message };
};

export default useDeleteBook;

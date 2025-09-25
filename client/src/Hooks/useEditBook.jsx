// hooks/useEditBook.js
import { useState } from "react";
import endPoint from "../API/Interface";

const useEditBook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const editBook = async (bookid, formData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // formData should be FormData type if you are uploading files
      const response = await endPoint.put(`/books/edit?bookid=${bookid}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const res = response.data;

      if (res.status) {
        setSuccess(true);
      } else {
        setError(res.message || "Failed to update book");
      }
    } catch (err) {
      setError("Error updating book");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { editBook, loading, error, success };
};

export default useEditBook;

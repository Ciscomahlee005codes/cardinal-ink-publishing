import { useEffect, useState } from "react";
import endPoint from "../API/Interface";

const useBook = (id) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return; // don’t fetch if no id is provided

    const fetchBook = async () => {
      try {
        const response = await endPoint.get(`/books/${id}`);
        const res = response.data;

        if (res.status) {
          setBook(res.book);
        } else {
          setError(res.message || "Book not found");
        }
      } catch (err) {
        setError("Error fetching book");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  return { book, loading, error };
};

export default useBook;

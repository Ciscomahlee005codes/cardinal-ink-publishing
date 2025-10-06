import React, { useEffect, useState } from "react";
import endPoint from "../API/Interface";

const useTransactions = () => {
  const [transactions, setTransaction] = useState([]);

  async function Transctions() {
    try {
      const requestAllBooks = await endPoint.get(`/transactions`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("adminAuthToken")}`,
        },
      });
      const res = requestAllBooks.data;
      setTransaction(res.transactions);
    } catch (error) {
      console.error("Error", error);
    }
  }

  useEffect(() => {
    Transctions();
  }, []);
  return { transactions };
};

export default useTransactions;

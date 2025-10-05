import React, { useEffect, useState } from "react";
import endPoint from "../API/Interface";

const useGetCategoryId = (id) => {
  const [CategoryById, setCategories] = useState({});

  useEffect(() => {
    const cotegoryRequest = async () => {
      try {
        const requestAllBooks = await endPoint.get(`/categories/${id}`);
        const res = requestAllBooks.data;
        setCategories(res.data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    cotegoryRequest();
  }, [id]);
  return { CategoryById };
};

export default useGetCategoryId;

import React, { useEffect, useState } from "react";
import endPoint from "../API/Interface";

const useCategory = () => {
  const [Categories, setCategories] = useState([]);

  useEffect(() => {
    const cotegoryRequest = async () => {
      try {
        const requestAllBooks = await endPoint.get("/categories");
        const res = requestAllBooks.data;
        setCategories(res.data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    cotegoryRequest();
  }, []);
  return { Categories };
};

export default useCategory;

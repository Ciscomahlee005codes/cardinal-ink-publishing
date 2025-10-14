import React, { useEffect, useState } from "react";
import endPoint from "../API/Interface";

const useCategory = () => {
  const [Categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await endPoint.get("/categories");
        const res = response.data;

        // 🧠 Check if your data is nested or not
        const data =
          Array.isArray(res.data) ? res.data : res.data?.categories || [];

        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return { Categories };
};

export default useCategory;

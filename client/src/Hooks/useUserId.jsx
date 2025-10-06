import { useEffect, useState } from "react";
import endPoint from "../API/Interface";

const useUserId = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token =
          localStorage.getItem("userAuthToken") ||
          localStorage.getItem("adminAuthToken");

        if (!token) {
          console.warn("No auth token found in localStorage");
          return;
        }
        const res = await endPoint.get("/user/details", {
          headers: { authorization: `Bearer ${token}` },
        });

        const response = res.data;
        if (response.status === true) {
          setData(response.user);

          return;
        }
      } catch (error) {
        console.error("Error fetching user:", error.response || error.message);
      }
    };

    fetchUserData();
  }, []);

  return data;
};

export default useUserId;

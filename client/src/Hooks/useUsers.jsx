import React, { useEffect, useState } from "react";
import endPoint from "../API/Interface";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      const fetch = await endPoint.get("/all/users", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("adminAuthToken")}`,
        },
      });

      const response = fetch.data;
      setUsers(response.users);
    }

    fetchUsers();
  }, []);
  return { users };
};

export default useUsers;

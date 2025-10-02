import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import endPoint from "../API/Interface";

const AdminAuth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    async function checkAuth() {
      const adminToken = localStorage.getItem("adminAuthToken");
      // if (!adminToken || adminToken === "") {
      //   navigate("/authentication");
      // }

      const request = await endPoint.get("/admin/verifytoken", {
        headers: { authorization: `Bearer ${adminToken}` },
      });

      const response = request.data;
      if (response.status !== true) {
        localStorage.removeItem("adminAuthToken");
        navigate("/authentication");
      }
    }

    checkAuth();
  }, [navigate]);
  return <Outlet />; // 👈 renders child routes here
};

export default AdminAuth;

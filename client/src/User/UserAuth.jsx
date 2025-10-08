import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import endPoint from "../API/Interface";

const UserAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      try {
        const userAuthToken = localStorage.getItem("userAuthToken");
        if (!userAuthToken) return navigate("/authentication");

        const request = await endPoint.get("/user/verifytoken", {
          headers: { Authorization: `Bearer ${userAuthToken}` },
        });

        if (!request.data.status) {
          localStorage.removeItem("userAuthToken");
          navigate("/authentication");
        }
      } catch (error) {
        console.error(error);
        navigate("/authentication");
      }
    }
    checkAuth();
  }, [navigate]);

  return (
    <>
      <Outlet />
    </>
  ); // 👈 renders child routes here
};

export default UserAuth;

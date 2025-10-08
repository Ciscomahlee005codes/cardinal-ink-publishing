import React from "react";
import AdminSidebar from "../../AdminDashboard/AdminSidebar/AdminSidebar";
import "./AdminBookPage.css";
import AdminBookManagement from "../../AdminDashboard/AdminBookManagement/AdminBookManagement";
import AdminAuthentication from "../../AdminAuth";

const AdminBookPage = () => {
  return (
    <div className="adminBook-layout">
      <AdminAuthentication />
      <AdminSidebar />
      <div className="adminBook-content">
        <AdminBookManagement />
      </div>
    </div>
  );
};

export default AdminBookPage;

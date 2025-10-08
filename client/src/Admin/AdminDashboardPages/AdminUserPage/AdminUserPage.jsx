import React from "react";
import AdminUserManagement from "../../AdminDashboard/AdminUserManagement/AdminUserManagement";
import AdminSidebar from "../../AdminDashboard/AdminSidebar/AdminSidebar";
import "./AdminUserPage.css";
import AdminAuthentication from "../../AdminAuth";

const AdminUserPage = () => {
  return (
    <div className="adminUser-layout">
      <AdminAuthentication />
      <AdminSidebar />
      <div className="adminUser-content">
        <AdminUserManagement />
      </div>
    </div>
  );
};

export default AdminUserPage;

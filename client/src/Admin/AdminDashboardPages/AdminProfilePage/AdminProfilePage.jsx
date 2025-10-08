import React from "react";
import AdminProfileSettings from "../../AdminDashboard/AdminProfileSettings/AdminProfileSettings";
import "./AdminProfilePage.css";
import AdminSidebar from "../../AdminDashboard/AdminSidebar/AdminSidebar";
import AdminAuthentication from "../../AdminAuth";

const AdminProfilePage = () => {
  return (
    <div className="adminProfile-layout">
      <AdminAuthentication />
      <AdminSidebar />
      <div className="adminProfile-content">
        <AdminProfileSettings />
      </div>
    </div>
  );
};

export default AdminProfilePage;

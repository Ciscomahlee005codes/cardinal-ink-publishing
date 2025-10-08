import React from "react";
import AdminNotification from "../../AdminDashboard/AdminNotification/AdminNotification";
import AdminSidebar from "../../AdminDashboard/AdminSidebar/AdminSidebar";
import "./AdminNotificationPage.css";
import AdminAuthentication from "../../AdminAuth";

const AdminNotificationPage = () => {
  return (
    <div className="adminNotify-layout">
      <AdminAuthentication />
      <AdminSidebar />
      <div className="adminNotify-content">
        <AdminNotification />
      </div>
    </div>
  );
};

export default AdminNotificationPage;

import React from "react";
import AdminSidebar from "../../AdminDashboard/AdminSidebar/AdminSidebar";
import "./AdminHomePage.css";
import AdminActivity from "../../AdminDashboard/AdminActivity/AdminActivity";
import AdminDashboardTop from "../../AdminDashboard/AdminDashboardTop/AdminDashboardTop";
import AdminChart from "../../AdminDashboard/AdminChart/AdminChart";
import AdminAuthentication from "../../AdminAuth";

const AdminHomePage = () => {
  return (
    <div className="adminHome-layout">
      <AdminAuthentication />
      <AdminSidebar />
      <div className="adminHome-content">
        <AdminDashboardTop />
        <AdminActivity />
        <AdminChart />
      </div>
    </div>
  );
};

export default AdminHomePage;

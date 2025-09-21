import React from 'react'
import AdminUserManagement from '../../AdminDashboard/AdminUserManagement/AdminUserManagement'
import AdminSidebar from '../../AdminDashboard/AdminSidebar/AdminSidebar'
import "./AdminUserPage.css"

const AdminUserPage = () => {
  return (
    <div className='adminUser-layout'>
        <AdminSidebar />
       <div className="adminUser-content">
        <AdminUserManagement />
        </div> 
    </div>
  )
}

export default AdminUserPage

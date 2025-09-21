import React from 'react'
import AdminProfileSettings from '../../AdminDashboard/AdminProfileSettings/AdminProfileSettings'
import "./AdminProfilePage.css"
import AdminSidebar from '../../AdminDashboard/AdminSidebar/AdminSidebar'

const AdminProfilePage = () => {
  return (
    <div className='adminProfile-layout'>
      <AdminSidebar />
      <div className="adminProfile-content">
        <AdminProfileSettings />
      </div>
    </div>
  )
}

export default AdminProfilePage

import React from 'react'
import AdminNotification from '../../AdminDashboard/AdminNotification/AdminNotification'
import "./AdminNotificationPage.css"

const AdminNotificationPage = () => {
  return (
    <div className='adminNotify-layout'>
      <AdminSidebar />
      <div className="adminNotify-content">
        <AdminNotification />
      </div>
    </div>
  )
}

export default AdminNotificationPage

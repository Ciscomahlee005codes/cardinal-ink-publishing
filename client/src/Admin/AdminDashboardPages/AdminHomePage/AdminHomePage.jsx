import React from 'react'
import AdminSidebar from '../../AdminDashboard/AdminSidebar/AdminSidebar'
import "./AdminHomePage.css"
import AdminActivity from '../../AdminDashboard/AdminActivity/AdminActivity'
import AdminDashboardTop from '../../AdminDashboard/AdminDashboardTop/AdminDashboardTop'
import AdminAvailableBooks from '../../AdminDashboard/AdminAvailableBooks/AdminAvailableBooks'
import RecentActivity from '../../../User/UserDashboard/RecentActivity/RecentActivity'

const AdminHomePage = () => {
  return (
    <div className='adminHome-layout'>
      <AdminSidebar />
      <div className="adminHome-content">
        <AdminDashboardTop />
        <AdminActivity />
        <AdminAvailableBooks />
        <RecentActivity />
      </div>
    </div>
  )
}

export default AdminHomePage

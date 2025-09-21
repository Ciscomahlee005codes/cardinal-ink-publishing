import React from 'react'
import AdminSidebar from '../../AdminDashboard/AdminSidebar/AdminSidebar'
import AdminTransaction from '../../AdminDashboard/AdminTransaction/AdminTransaction'
import "./AdminTransactionPage.css"

const AdminTransactionPage = () => {
  return (
    <div className='adminTrans-layout'>
        <AdminSidebar />
      <div className="adminTrans-content">
        <AdminTransaction />
      </div>
    </div>
  )
}

export default AdminTransactionPage

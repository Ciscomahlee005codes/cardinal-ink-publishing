import React from 'react'
import "./UserPurchasePage.css"
import UserSideBar from '../../UserDashboard/UserSideBar/UserSideBar'
import UserPurchaseHistory from '../../UserDashboard/UserPurchaseHistory/UserPurchaseHistory'

const UserPurchasePage = () => {
  return (
    <div className="purchase-layout">
        <UserSideBar />
      <div className="purchase-content">
        <UserPurchaseHistory />
      </div>
    </div>
  )
}

export default UserPurchasePage

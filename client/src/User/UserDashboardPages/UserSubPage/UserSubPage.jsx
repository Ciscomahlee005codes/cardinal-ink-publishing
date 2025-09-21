import React from 'react'
import "./UserSubPage.css"
import UserSubscription from '../../UserDashboard/UserSubscription/UserSubscription'
import UserSideBar from '../../UserDashboard/UserSideBar/UserSideBar'

const UserSubPage = () => {
  return (
    <div className='userSub-layout'>
        <UserSideBar />
      <div className="userSub-content">
        <UserSubscription />
      </div>
    </div>
  )
}

export default UserSubPage

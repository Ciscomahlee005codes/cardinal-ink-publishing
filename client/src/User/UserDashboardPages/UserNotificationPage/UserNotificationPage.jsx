import React from 'react'
import "./UserNotificationPage.css"
import UserSideBar from '../../UserDashboard/UserSideBar/UserSideBar'
import UserNotification from '../../UserDashboard/UserNotification/UserNotification'
const UserNotificationPage = () => {
  return (
    <div className='userNotify-layout'>
      <UserSideBar />
      <div className="userNotify-content">
        <UserNotification />
      </div>
    </div>
  )
}

export default UserNotificationPage

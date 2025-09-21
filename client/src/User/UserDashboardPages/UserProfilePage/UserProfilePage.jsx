import React from 'react'
import UserSideBar from '../../UserDashboard/UserSideBar/UserSideBar'
import UserProfileSettings from '../../UserDashboard/UserProfileSettings/UserProfileSettings'
import "./UserProfilePage.css"

const UserProfilePage = () => {
  return (
    <div className='userProfile-layout'>
      <UserSideBar />
      <div className="userProfile-content">
        <UserProfileSettings />
      </div>
    </div>
  )
}

export default UserProfilePage

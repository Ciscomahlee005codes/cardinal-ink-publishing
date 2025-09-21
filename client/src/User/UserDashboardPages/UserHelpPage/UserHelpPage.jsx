import React from 'react'
import "./UserHelpPage.css"
import UserSideBar from '../../UserDashboard/UserSideBar/UserSideBar'
import UserHelpSupport from '../../UserDashboard/UserHelpSupport/UserHelpSupport'


const UserHelpPage = () => {
  return (
    <div className='helpSupport-layout'>
      <UserSideBar />
      <div className="helpSupport-content">
        <UserHelpSupport />
      </div>
    </div>
  )
}

export default UserHelpPage

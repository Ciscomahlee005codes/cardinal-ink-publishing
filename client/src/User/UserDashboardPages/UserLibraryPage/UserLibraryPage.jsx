import React from 'react'
import UserLibrary from '../../UserDashboard/UserLibrary/UserLibrary'
import UserSideBar from '../../UserDashboard/UserSideBar/UserSideBar'
import "./UserLibraryPage.css"

const UserLibraryPage = () => {
  return (
    <div className='library-layout'>
     <UserSideBar />
     <div className="library-content">
         <UserLibrary />
     </div>
    </div>
  )
}

export default UserLibraryPage

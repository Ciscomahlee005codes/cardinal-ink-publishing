import React from 'react'
import "./UserHomePage.css"
import UserSideBar from '../../UserDashboard/UserSideBar/UserSideBar'
import UserDashboardTop from '../../UserDashboard/UserDashboardTop/UserDashboardTop'
import UserActivity from '../../UserDashboard/UserActivity/UserActivity'
import TrendingBooks from '../../UserDashboard/TrendingBooks/TrendingBooks'
import RecentActivity from '../../UserDashboard/RecentActivity/RecentActivity'

const UserHomePage = () => {
  return (
    <div className='userHome-layout'>
      <UserSideBar />
      <div className="userHome-content">
        <UserDashboardTop />
        <UserActivity />
        <TrendingBooks />
        <RecentActivity />
      </div>
    </div>
  )
}

export default UserHomePage

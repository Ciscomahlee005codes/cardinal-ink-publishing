import React from 'react'
import "./UserTrendPage.css"
import NewArrival from '../../UserDashboard/NewArrival/NewArrival'
import UserSideBar from '../../UserDashboard/UserSideBar/UserSideBar'
import TrendingBooks from '../../UserDashboard/TrendingBooks/TrendingBooks'

const UserTrendPage = () => {
  return (
    <div className='trending-layout'>
      <UserSideBar />
      <div className="trending-content">
        <TrendingBooks />
        <NewArrival />
      </div>
    </div>
  )
}

export default UserTrendPage

import React from 'react'
import "./BookCatPage.css"
import AdminSidebar from '../../AdminDashboard/AdminSidebar/AdminSidebar'
import BookCategory from '../../AdminDashboard/BookCategory/BookCategory'

const BookCatPage = () => {
  return (
    <div className="bookCat-layout">
      <AdminSidebar />
      <div className="bookCat-content">
        <BookCategory />
      </div>
    </div>
  )
}

export default BookCatPage

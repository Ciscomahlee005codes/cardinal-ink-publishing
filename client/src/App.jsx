import { Route, Routes, useLocation } from "react-router-dom"
import Footer from "./Components/Footer/Footer"
import Navbar from "./Components/Navbar/Navbar"
import Home from "./Pages/Home/Home"
import ContactPage from "./Pages/ContactPage/ContactPage"
import AboutPage from "./Pages/AboutPage/AboutPage"
import BlogPage from "./Pages/BlogPage/BlogPage"
import LibraryPage from "./Pages/LibraryPage/LibraryPage"
import BookStorePage from "./Pages/BookStorePage/BookStorePage"
import AuthPage from "./Pages/AuthPage/AuthPage"
import UserHomePage from "./User/UserDashboardPages/UserHomePage/UserHomePage"
import UserLibraryPage from "./User/UserDashboardPages/UserLibraryPage/UserLibraryPage"
import UserTrendPage from "./User/UserDashboardPages/UserTrendPage/UserTrendPage"
import UserPurchasePage from "./User/UserDashboardPages/UserPurchasePage/UserPurchasePage"
import UserSubPage from "./User/UserDashboardPages/UserSubPage/UserSubPage"
import UserProfilePage from "./User/UserDashboardPages/UserProfilePage/UserProfilePage"
import UserNotificationPage from "./User/UserDashboardPages/UserNotificationPage/UserNotificationPage"
import UserHelpPage from "./User/UserDashboardPages/UserHelpPage/UserHelpPage"
import UserOTP from "./User/UserDashboard/UserOTP/UserOTP"
import AdminHomePage from "./Admin/AdminDashboardPages/AdminHomePage/AdminHomePage"

function App() {
  const location = useLocation();

  // array of routes where Navbar & Footer should be hidden
  const hiddenRoutes = ["/authentication", "/userdashboard/home"
    ,"/userdashboard/mylibrary", "/userdashboard/trendingbooks",
  "/userdashboard/purchasehistory", "/userdashboard/subscription",
  "/userdashboard/profilesettings", "/userdashboard/notification",
  "/userdashboard/helpsupport", "/user/OTP", "/admindashboard/home"
];
  const hideLayout = hiddenRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactUs" element={<ContactPage />} />
        <Route path="/aboutUs" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/mylibrary" element={<LibraryPage />} />
        <Route path="/bookstore" element={<BookStorePage />} />
        <Route path="/authentication" element={<AuthPage />} />

        {/* User Dashboard Routes */}
        <Route path="/userdashboard/home" element={<UserHomePage />} />
        <Route path="/userdashboard/mylibrary" element={<UserLibraryPage />} />
        <Route path="/userdashboard/trendingbooks" element={<UserTrendPage />} />
        <Route path="/userdashboard/purchasehistory" element={<UserPurchasePage />} />
        <Route path="/userdashboard/subscription" element={<UserSubPage />} />
        <Route path="/userdashboard/profilesettings" element={<UserProfilePage />} />
        <Route path="/userdashboard/notification" element={<UserNotificationPage />} />
        <Route path="/userdashboard/helpsupport" element={<UserHelpPage />} />
        <Route path="/user/OTP" element={<UserOTP />} />

        {/* Admin Dashboard Routes */}
        <Route path="/admindashboard/home" element={<AdminHomePage />} />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  )
}

export default App

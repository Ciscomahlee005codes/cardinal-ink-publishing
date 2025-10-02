import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import Loader from "./Components/Loader/Loader";
import DelayLoader from "./Components/Loader/DelayLoader";
import Cart from "./Components/Cart/Cart";
import GetBook from "./Components/GetBook/GetBook";
import BookCatPage from "./Admin/AdminDashboardPages/BookCatPage/BookCatPage";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import ResetPassword from "./Components/Auth/ResetPassword";
import UserAuth from "./User/UserAuth";

// Lazy-loaded Pages
const Home = DelayLoader(() => import("./Pages/Home/Home"));
const ContactPage = DelayLoader(() =>
  import("./Pages/ContactPage/ContactPage")
);
const AboutPage = DelayLoader(() => import("./Pages/AboutPage/AboutPage"));
const BlogPage = DelayLoader(() => import("./Pages/BlogPage/BlogPage"));
const LibraryPage = DelayLoader(() =>
  import("./Pages/LibraryPage/LibraryPage")
);
const BookStorePage = DelayLoader(() =>
  import("./Pages/BookStorePage/BookStorePage")
);
const AuthPage = DelayLoader(() => import("./Pages/AuthPage/AuthPage"));
const ErrorPage = DelayLoader(() => import("./Components/ErrorPage/ErrorPage"));

// User Dashboard Pages
const UserHomePage = DelayLoader(() =>
  import("./User/UserDashboardPages/UserHomePage/UserHomePage")
);
const UserLibraryPage = DelayLoader(() =>
  import("./User/UserDashboardPages/UserLibraryPage/UserLibraryPage")
);
const UserTrendPage = DelayLoader(() =>
  import("./User/UserDashboardPages/UserTrendPage/UserTrendPage")
);
const UserPurchasePage = DelayLoader(() =>
  import("./User/UserDashboardPages/UserPurchasePage/UserPurchasePage")
);
const UserSubPage = DelayLoader(() =>
  import("./User/UserDashboardPages/UserSubPage/UserSubPage")
);
const UserProfilePage = DelayLoader(() =>
  import("./User/UserDashboardPages/UserProfilePage/UserProfilePage")
);
const UserNotificationPage = DelayLoader(() =>
  import("./User/UserDashboardPages/UserNotificationPage/UserNotificationPage")
);
const UserHelpPage = DelayLoader(() =>
  import("./User/UserDashboardPages/UserHelpPage/UserHelpPage")
);
const UserOTP = DelayLoader(() =>
  import("./User/UserDashboard/UserOTP/UserOTP")
);

// Admin Dashboard Pages
const AdminHomePage = DelayLoader(() =>
  import("./Admin/AdminDashboardPages/AdminHomePage/AdminHomePage")
);
const AdminUserPage = DelayLoader(() =>
  import("./Admin/AdminDashboardPages/AdminUserPage/AdminUserPage")
);
const AdminBookPage = DelayLoader(() =>
  import("./Admin/AdminDashboardPages/AdminBookPage/AdminBookPage")
);
const AdminTransactionPage = DelayLoader(() =>
  import(
    "./Admin/AdminDashboardPages/AdminTransactionPage/AdminTransactionPage"
  )
);
const AdminNotificationPage = DelayLoader(() =>
  import(
    "./Admin/AdminDashboardPages/AdminNotificationPage/AdminNotificationPage"
  )
);
const AdminProfilePage = DelayLoader(() =>
  import("./Admin/AdminDashboardPages/AdminProfilePage/AdminProfilePage")
);
const AdminAuth = DelayLoader(() =>
  import("./Admin/AdminDashboard/AdminAuth/AdminAuth")
);

function App() {
  const location = useLocation();

  // array of routes where Navbar & Footer should be hidden
  const hiddenRoutes = [
    "/authentication",
    "/userdashboard/home",
    "/userdashboard/mylibrary",
    "/userdashboard/trendingbooks",
    "/userdashboard/purchasehistory",
    "/userdashboard/subscription",
    "/userdashboard/profilesettings",
    "/userdashboard/notification",
    "/userdashboard/helpsupport",
    "/user/OTP",
    "/admindashboard/home",
    "/admindashboard/usermanagement",
    "/admindashboard/bookmanagement",
    "/admindashboard/transactionhistory",
    "/admindashboard/notification",
    "/admindashboard/profilesettings",
    "/admin/authentication",
    "/admindashboard/bookcategory",
    "/forgottenpassword",
    "/resetpassword",
  ];

  const hideLayout = hiddenRoutes.includes(location.pathname);

  return (
    <Suspense fallback={<Loader />}>
      {!hideLayout && <Navbar />}
      <ScrollToTop />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/contactUs" element={<ContactPage />} />
        <Route path="/aboutUs" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/mylibrary" element={<LibraryPage />} />
        <Route path="/bookstore" element={<BookStorePage />} />
        <Route path="/authentication" element={<AuthPage />} />
        <Route path="/forgottenpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/getbook" element={<GetBook />} />
        <Route path="*" element={<ErrorPage />} />

        {/* User Dashboard Routes */}
        <Route
          path="/userdashboard/*"
          element={
            <UserAuth>
              <Route path="home" element={<UserHomePage />} />
              <Route path="mylibrary" element={<UserLibraryPage />} />
              <Route path="trendingbooks" element={<UserTrendPage />} />
              <Route path="purchasehistory" element={<UserPurchasePage />} />
              <Route path="subscription" element={<UserSubPage />} />
              <Route path="profilesettings" element={<UserProfilePage />} />
              <Route path="notification" element={<UserNotificationPage />} />
              <Route path="helpsupport" element={<UserHelpPage />} />
            </UserAuth>
          }
        />
        <Route path="/user/OTP" element={<UserOTP />} />

        {/* Admin Dashboard Routes */}
        <Route path="/admin/authentication" element={<AdminAuth />} />
        <Route
          path="/admindashboard/*"
          element={
            <AdminAuth>
              <Route path="home" element={<AdminHomePage />} />
              <Route path="usermanagement" element={<AdminUserPage />} />
              <Route path="bookmanagement" element={<AdminBookPage />} />
              <Route path="bookcategory" element={<BookCatPage />} />
              <Route
                path="transactionhistory"
                element={<AdminTransactionPage />}
              />
              <Route path="notification" element={<AdminNotificationPage />} />
              <Route path="profilesettings" element={<AdminProfilePage />} />
            </AdminAuth>
          }
        />
      </Routes>

      {!hideLayout && <Footer />}
    </Suspense>
  );
}

export default App;

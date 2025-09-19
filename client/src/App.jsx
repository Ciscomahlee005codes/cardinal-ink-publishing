import { Route, Routes } from "react-router-dom"
import Footer from "./Components/Footer/Footer"
import Navbar from "./Components/Navbar/Navbar"
import Home from "./Pages/Home/Home"
import ContactPage from "./Pages/ContactPage/ContactPage"
import AboutPage from "./Pages/AboutPage/AboutPage"
import BlogPage from "./Pages/BlogPage/BlogPage"
import LibraryPage from "./Pages/LibraryPage/LibraryPage"
import BookStorePage from "./Pages/BookStorePage/BookStorePage"

function App() {
  

  return (
   <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contactUs" element={<ContactPage />}/>
      <Route path="/aboutUs" element={<AboutPage />}/>
      <Route path="/blog" element={<BlogPage />}/>
      <Route path="/mylibrary" element={<LibraryPage />}/>
      <Route path="/bookstore" element={<BookStorePage />}/>
    </Routes>
    <Footer />
   </>
  )
}

export default App

const express = require("express");
const routes = express.Router();
const {
  createNewBook,
  allBooks,
  Books,
  editBook,
  deleteBook,
} = require("../controllers/booksController");

const {
  createNewUser,
  loginUser,
  ResendOTP,
  verifyOtp,
  forgottonPassword,
  resetPassword,
} = require("../controllers/usersControllers");

const authTokenValidator = require("../middleware/authTokenValidator");

routes.post("/createnew/books", createNewBook);
routes.get("/books", allBooks);
routes.get("/books/:id", Books);
routes.put("/book/edit", editBook);
routes.put("/book/delete", deleteBook);

//auth routes
routes.post("/signup/users", createNewUser);
routes.post("/login/users", loginUser);
routes.post("/resendotp", ResendOTP);
routes.post("/verify/otp", verifyOtp);
routes.post("/forgottenpassword", forgottonPassword);
routes.put("/passwordReset", authTokenValidator, resetPassword);

module.exports = routes;

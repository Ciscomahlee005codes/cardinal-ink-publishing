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

const {
  createCategory,
  getAllCategories,
  getCategoriesById,
  editCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const {
  getAllNotificationsByUserId,
  markViewedNotifications,
  deleteNotification,
} = require("../controllers/notificationController");

/*const {
  createOrder,
  completePayment,
} = require("../controllers/transactionController");*/

const {
  userPurchasedBooks,
} = require("../controllers/purchasedAndDownloadsController");

const authTokenValidator = require("../middleware/authTokenValidator");
const adminMiddleware = require("../middleware/AdminMiddleware");
const userMiddleware = require("../middleware/userAuth");

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

routes.post(
  "/create/category",
  [authTokenValidator, adminMiddleware],
  createCategory
);
routes.get("/categories", getAllCategories);
routes.get("/categories/:id", getCategoriesById);
routes.put(
  "/edit/category",
  [authTokenValidator, adminMiddleware],
  editCategory
);
routes.delete("/categories/delete/:id", deleteCategory);

routes.get(
  "/user/notification",
  authTokenValidator,
  getAllNotificationsByUserId
);
routes.get(
  "/user/notification/viewed/:notification_id",
  authTokenValidator,
  markViewedNotifications
);
routes.delete(
  "/user/notification/delete/:notification_id",
  authTokenValidator,
  deleteNotification
);

//routes.post("/user/create/order", userMiddleware, createOrder);
/*routes.post(
  "/user/payment/finailized/:orderId",
  userMiddleware,
  completePayment
);
*/
routes.get("/purchased/books", userMiddleware, userPurchasedBooks);

module.exports = routes;

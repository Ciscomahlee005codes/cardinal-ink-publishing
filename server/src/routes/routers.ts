import console = require("console");

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
  allUsers,
  getUserById,
  getUserDetails,
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

const {
  createOrder,
  completePayment,
  getAllTransaction,
  userTransactions,
} = require("../controllers/transactionController");

const {
  userPurchasedBooks,
} = require("../controllers/purchasedAndDownloadsController");

const authTokenValidator = require("../middleware/authTokenValidator");
const adminMiddleware = require("../middleware/AdminMiddleware");
const userMiddleware = require("../middleware/userAuth");
const mailer = require("../utils/Mail");

routes.get("/", async (req: any, res: any) => {
  // mailer("test user", "paschalelechi0@gmail.com", "working test", "all good");

  console.log("it may work");
});

routes.get(
  "/admin/verifytoken",
  [authTokenValidator, adminMiddleware],
  (req: any, res: any) => {
    res.json({
      status: true,
    });
  }
);
routes.get(
  "/user/verifytoken",
  [authTokenValidator, userMiddleware],
  (req: any, res: any) => {
    res.json({
      status: true,
    });
  }
);

routes.post(
  "/createnew/books",
  authTokenValidator,
  adminMiddleware,
  createNewBook
);
routes.get("/books", allBooks);
routes.get("/books/:id", Books);
routes.put("/book/edit", [authTokenValidator, adminMiddleware], editBook);
routes.delete(
  "/book/delete",
  [authTokenValidator, adminMiddleware],
  deleteBook
);

//auth routes
routes.post("/signup/users", createNewUser);
routes.post("/login/users", loginUser);
routes.post("/resendotp", ResendOTP);
routes.post("/verify/otp", verifyOtp);
routes.post("/forgottenpassword", forgottonPassword);
routes.put("/passwordReset", authTokenValidator, resetPassword);
routes.get("/all/users", [authTokenValidator, adminMiddleware], allUsers);
routes.get("/user/details", authTokenValidator, getUserDetails);
routes.get("/user/:id", [authTokenValidator, adminMiddleware], getUserById);

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
routes.delete(
  "/categories/delete/:id",
  [authTokenValidator, adminMiddleware],
  deleteCategory
);

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
routes.get(
  "/transactions",
  [authTokenValidator, adminMiddleware],
  getAllTransaction
);
routes.get(
  "/user/transactions",
  [authTokenValidator, userMiddleware],
  userTransactions
);
routes.get(
  "/purchased/books",
  [authTokenValidator, userMiddleware],
  userPurchasedBooks
);

module.exports = routes;

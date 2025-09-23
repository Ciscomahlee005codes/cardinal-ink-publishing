const Users = require("./users.ts");
const purchasesAndDownloads = require("./purchasesAndDownloads.ts");
const transactions = require("./transactions.ts");
const books = require("./books.ts");
const categories = require("./categories");
const notification = require("./notification");

Users.hasMany(purchasesAndDownloads, {
  foreignKey: "user_id",
  as: "purchasesAndDownload",
});

// A Post belongs to one User
purchasesAndDownloads.belongsTo(Users, {
  foreignKey: "user_id",
  as: "user",
});

purchasesAndDownloads.belongsTo(books, {
  foreignKey: "book_id",
  as: "book",
});

transactions.belongsTo(Users, {
  foreignKey: "user_id",
  as: "transaction",
});

categories.hasMany(books, {
  foreignKey: "category_id",
  as: "category",
});

books.belongsTo(categories, {
  foreignKey: "category_id",
  as: "category",
});

notification.belongsTo(Users, {
  foreignKey: "user_id",
  as: "notification",
});

module.exports = {
  Users,
  purchasesAndDownloads,
  transactions,
  books,
  categories,
  notification,
};

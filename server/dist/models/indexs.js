"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
transactions.belongsTo(books, {
    foreignKey: "book_id",
    as: "book",
});
Users.hasMany(transactions, {
    foreignKey: "user_id",
    as: "transactions", // plural, since one user has many transactions
});
categories.hasMany(books, {
    foreignKey: "category_id",
    as: "books", // plural, since one category has many books
});
books.belongsTo(categories, {
    foreignKey: "category_id",
    as: "category", // singular, since one book belongs to one category
});
notification.belongsTo(Users, {
    foreignKey: "user_id",
    as: "user", // each notification belongs to one user
});
module.exports = {
    Users,
    purchasesAndDownloads,
    transactions,
    books,
    categories,
    notification,
};
//# sourceMappingURL=indexs.js.map
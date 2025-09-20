const Users = require("./users.ts");
const purchasesAndDownloads = require("./purchasesAndDownloads.ts");
const transactions = require("./transactions.ts");
const books = require("./books.ts");

Users.hasMany(purchasesAndDownloads, {
  foreignKey: "user_id",
  as: "purchasesAndDownload",
});

// A Post belongs to one User
purchasesAndDownloads.belongsTo(Users, {
  foreignKey: "user_id",
  as: "user",
});
transactions.belongsTo(Users, {
  foreignKey: "user_id",
  as: "transaction",
});

module.exports = { Users, purchasesAndDownloads, transactions, books };

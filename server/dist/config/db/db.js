"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize } = require("sequelize");
const mysql = require("mysql2");
const DBconnection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectModule: mysql,
});
if (DBconnection.authenticate()) {
    console.log("db connected succeessfully");
}
else {
    console.log("unable to connect to the db");
}
module.exports = DBconnection;
//# sourceMappingURL=db.js.map
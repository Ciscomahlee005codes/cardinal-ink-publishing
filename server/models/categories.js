"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dB = require("../config/db/db.ts");
const { DataTypes } = require("sequelize");
const categories = dB.define("categories", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: "category",
    modelName: "categories",
});
module.exports = categories;
//# sourceMappingURL=categories.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dB = require("../config/db/db.ts");
const { DataTypes } = require("sequelize");
const notification = dB.define("notification", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
    },
    callbackurl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    viewed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
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
    tableName: "notification",
    modelName: "notification",
});
module.exports = notification;
//# sourceMappingURL=notification.js.map
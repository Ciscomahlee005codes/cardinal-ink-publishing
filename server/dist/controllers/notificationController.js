"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { notification } = require("../../models/indexs");
exports.getAllNotificationsByUserId = async (req, res) => {
    try {
        const { id } = req.user;
        if (!id) {
            return res?.json({
                status: false,
                message: "missing arguments",
            });
        }
        const notifications = await notification.findAll({
            where: { user_id: id },
        });
        return res?.json({
            status: true,
            notifications: notifications,
        });
    }
    catch (error) {
        console.log(error);
        return res?.json({
            status: false,
            message: "internal server error",
        });
    }
};
exports.markViewedNotifications = async (req, res) => {
    try {
        const { notification_id } = req.params;
        const { id } = req.user;
        if (!id) {
            return res?.json({
                status: false,
                message: "missing arguments",
            });
        }
        const check = await notification.findAll({ where: { id: id } });
        let notify = {};
        for (const notification of check) {
            if (notification.id != notification_id) {
                return res?.json({
                    status: false,
                    message: "invalid request",
                });
            }
            notify = notification;
            break;
        }
        await notification.update({
            viewed: true,
        }, {
            where: { id: notification_id },
        });
        return res?.json({
            status: true,
            notification: notify,
        });
    }
    catch (error) {
        console.log(error);
        return res?.json({
            status: false,
            message: "internal server error",
        });
    }
};
exports.deleteNotification = async (req, res) => {
    try {
        const { notification_id } = req.params;
        const { id } = req.user;
        if (!id) {
            return res?.json({
                status: false,
                message: "missing arguments",
            });
        }
        const check = await notification.findAll({ where: { id: id } });
        for (const notification of check) {
            if (notification.id != notification_id) {
                return res?.json({
                    status: false,
                    message: "invalid request",
                });
            }
            break;
        }
        await notification.destory({
            where: { id: notification_id },
        });
        return res?.json({
            status: true,
            notification: "notificatin deleted",
        });
    }
    catch (error) {
        console.log(error);
        return res?.json({
            status: false,
            message: "internal server error",
        });
    }
};
//# sourceMappingURL=notificationController.js.map
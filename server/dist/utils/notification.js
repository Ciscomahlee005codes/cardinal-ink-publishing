const { notification } = require("../../models/indexs");
module.exports = async function pushNotification(user_id, message, viewed, callbackurl) {
    try {
        await notification.create({
            message: message,
            user_id: user_id,
            viewed: viewed,
            callbackurl: callbackurl,
        });
    }
    catch (error) {
        console.log(error);
    }
};
export {};
//# sourceMappingURL=notification.js.map
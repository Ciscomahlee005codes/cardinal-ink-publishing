const { notification } = require("../../models/indexs");

module.exports = async function pushNotification(
  user_id: string,
  message: string,
  viewed: boolean,
  callbackurl: string
) {
  try {
    await notification.create({
      message: message,
      user_id: user_id,
      viewed: viewed,
      callbackurl: callbackurl,
    });
  } catch (error) {
    console.log(error);
  }
};

const nodeMailer = require("nodemailer");
const { notification } = require("../../models/indexs");

module.exports = function generateOtp(length: number) {
  const characters =
    "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
  let result = "";

  for (let index = 0; index < length; index++) {
    let otp = Math.floor(Math.random() * characters.length);
    result += characters[otp];
  }

  return result;
};

module.exports = function mailer(
  name: string,
  email: string,
  subject: string,
  message: string
) {
  const transporter = nodeMailer.createTransport({
    host: `${process.env.EMAILHOST}`,
    port: process.env.EMAILPORT,
    secure: true,
    auth: {
      user: process.env.EMAILUSERNAME,
      password: process.env.EMAILPASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAILUSERNAME,
    to: `${email}`,
    subject: `${subject}`,
    html: `<p>hello ${name}, <br/> ${message}</p>`,
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log("email sent", info);
      return true;
    }
  });
};

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

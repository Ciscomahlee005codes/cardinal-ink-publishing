const nodeMailer = require("nodemailer");

module.exports = function mailer(
  name: string,
  email: string,
  subject: string,
  message: string
) {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    host: `${process.env.EMAIL_HOST}`,
    port: 587,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "Cardinal ink",
    to: `${email}`,
    subject: `${subject}`,
    html: `<p>hello ${name}, <br/> ${message}</p>`,
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error);
      return false;
    } else {
      return false;
    }
  });
};

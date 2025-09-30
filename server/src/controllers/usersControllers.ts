const { Users } = require("../../models/indexs");
const bcrypt = require("bcrypt");
const mailer = require("../utils/Mail");
const generateOtp = require("../utils/tokenGeneration");
const jwt = require("jsonwebtoken");

exports.createNewUser = async (req: any, res: any) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;

    if (!firstname || !lastname || !email || !password || !role) {
      return res?.json({
        status: false,
        message: "request can't be processed. some fields ae missing",
      });
    }

    if (role.toLowerCase().trim() !== "reader") {
      return res?.json({
        status: false,
        message: "invalid role",
      });
    }

    const checkIfEmailExists = await Users.findOne({ where: { email: email } });
    if (checkIfEmailExists) {
      return res?.json({
        status: false,
        message: "email already inuse",
      });
    }

    const hashPassword = await bcrypt.hash(password, 15);

    const createNewUserObject = {
      firstname,
      lastname,
      email,
      password: hashPassword,
      role,
    };

    const createUser = await Users.create(createNewUserObject);

    if (!createUser) {
      return res?.json({
        status: false,
        message: "unable to complete your request. please check your network",
      });
    }

    const generateOtpToken = generateOtp(6);
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    await Users.update(
      {
        otp: generateOtpToken,
        otpExpiry: otpExpiry,
      },
      {
        where: { id: checkIfEmailExists.id },
      }
    );

    // email verify OTP
    const sendEmail = mailer(
      `${firstname}, ${lastname}`,
      email,
      "Email Verification",
      ""
    );

    if (sendEmail !== true) {
      return res?.json({
        status: false,
        message: "unable to send otp to email. check your connectivity",
      });
    }

    return res?.json({
      status: true,
      message: "Your account has been created",
      data: { email: email, otpType: "verifyEmail", time: otpExpiry },
    });
  } catch (error) {
    console.log(error);
    return res?.json({
      status: false,
      message: "internal server error",
    });
  }
};

exports.loginUser = async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res?.json({
        status: false,
        message: "request can't be processed. some fields ae missing",
      });
    }

    const checkIfEmailExists = await Users.findOne({ where: { email: email } });
    if (!checkIfEmailExists) {
      return res?.json({
        status: false,
        message: "invalid credentials",
      });
    }

    const decryptPassword = await bcrypt.compare(
      password,
      checkIfEmailExists.password
    );
    if (!decryptPassword) {
      return res?.json({
        status: false,
        message: "invalid credentials",
      });
    }

    const generateOtpToken = generateOtp(6);
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    await Users.update(
      {
        otp: generateOtpToken,
        otpExpiry: otpExpiry,
      },
      {
        where: { id: checkIfEmailExists.id },
      }
    );

    //logic to send otp to email
    mailer(
      `${checkIfEmailExists.firstname} ${checkIfEmailExists.lastname}`,
      email,
      "Email Verification",
      `Here is your authenctication one time password <str>${generateOtpToken}</str> and it expires in 5 minutes`
    );

    return res?.json({
      status: true,
      message: "authentication successful. OTP sent to your email",
      data: { email: email, otpType: "auth", time: otpExpiry },
    });
  } catch (error) {
    console.log(error);
    return res?.json({
      status: false,
      message: "internal server error",
    });
  }
};

exports.ResendOTP = async (req: any, res: any) => {
  try {
    const { email, otpType } = req.query;

    if (!email || !otpType) {
      return res?.json({
        status: false,
        message: "unable to resend token. missing arguments",
      });
    }

    const generateOtpToken = generateOtp(6);
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    const updated = await Users.update(
      {
        otp: generateOtpToken,
        otpExpiry: otpExpiry,
      },
      {
        where: { email: email },
      }
    );

    if (!updated) {
      return res?.json({
        status: false,
        message: "invalid request",
      });
    }

    //logic to send otp to email
    const sendEmail = mailer(
      `${updated.firstname}, ${updated.lastname}`,
      email,
      "Email Verification",
      ""
    );

    if (sendEmail !== true) {
      return res?.json({
        status: false,
        message: "unable to send otp to email. check your connectivity",
      });
    }

    if (otpType == "verifyEmail") {
      return res?.json({
        status: true,
        message: " OTP sent to your email",
        data: { email: email, otpType: "verifyEmail", time: otpExpiry },
      });
    }

    if (otpType == "auth") {
      return res?.json({
        status: true,
        message: " OTP sent to your email",
        data: { email: email, otpType: "auth", time: otpExpiry },
      });
    }
    if (otpType == "passwordReset") {
      return res?.json({
        status: true,
        message: "OTP sent to your email",
        data: { email: email, otpType: "passwordReset", time: otpExpiry },
      });
    }
  } catch (error) {
    console.log(error);
    return res?.json({
      status: false,
      message: "internal server error",
    });
  }
};

exports.verifyOtp = async (req: any, res: any) => {
  try {
    const { otp, email, otpType } = req.body;

    if (!otp || !email || otpType) {
      return res?.json({
        status: false,
        message: "unable to complete request. missing arguments",
      });
    }

    if (
      otpType != "auth" ||
      otpType != "verifyEmail" ||
      otpType != "passwordReset"
    ) {
      return res?.json({
        status: false,
        message: "invalid arguments",
      });
    }

    const checkIfEmailExists = await Users.findOne({ where: { email: email } });
    if (!checkIfEmailExists) {
      return res?.json({
        status: false,
        message: "invalid request",
      });
    }

    if (new Date() >= checkIfEmailExists.otpExpiry) {
      return res?.json({
        status: false,
        message: "Otp has expired",
      });
    }

    if (otp !== checkIfEmailExists.otp) {
      return res?.json({
        status: false,
        message: "invalid Otp",
      });
    }

    if (otpType == "verifyEmail") {
      await Users.update(
        {
          email_verified: true,
        },
        {
          where: { email: email },
        }
      );

      return res?.json({
        status: true,
        message: "email verified",
      });
    }

    if (otpType == "auth") {
      const generateAuthToken = jwt.sign(
        {
          id: checkIfEmailExists.id,
          email: email,
          role: checkIfEmailExists.role,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "90d" }
      );
      return res?.json({
        status: true,
        message: "login successfull",
        authToken: generateAuthToken,
        role: checkIfEmailExists.role,
      });
    }

    if (otpType == "passwordReset") {
      const generatePasswordResetToken = jwt.sign(
        { id: checkIfEmailExists.id, email: email, tokenType: "passwordReset" },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );

      return res?.json({
        status: true,
        message: "verification successful",
        passwordResetToken: generatePasswordResetToken,
      });
    }
  } catch (error) {
    console.log(error);
    return res?.json({
      status: false,
      message: "internal server error",
    });
  }
};

exports.forgottonPassword = async (req: any, res: any) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res?.json({
        status: false,
        message: "request can't be processed. some fields ae missing",
      });
    }

    const checkIfEmailExists = await Users.findOne({ where: { email: email } });
    if (!checkIfEmailExists) {
      return res?.json({
        status: false,
        message: "request could not be completed",
      });
    }
    const generateOtpToken = generateOtp(6);
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    await Users.update(
      {
        otp: generateOtpToken,
        otpExpiry: otpExpiry,
      },
      {
        where: { id: checkIfEmailExists.id },
      }
    );

    //email logic
    const sendEmail = mailer(
      `${checkIfEmailExists.firstname}, ${checkIfEmailExists.lastname}`,
      email,
      "Email Verification",
      ""
    );

    if (sendEmail !== true) {
      return res?.json({
        status: false,
        message: "unable to send otp to email. check your connectivity",
      });
    }

    return res?.json({
      status: true,
      message: "if the email exists you will receive an otp on the email",
      data: { email: email, otpType: "passwordReset", time: otpExpiry },
    });
  } catch (error) {
    console.log(error);
    return res?.json({
      status: false,
      message: "internal server error",
    });
  }
};

exports.resetPassword = async (req: any, res: any) => {
  try {
    const { password, confirmPassword } = req.body;
    const { tokenType, id } = req.user;

    if (
      !password ||
      !confirmPassword ||
      !tokenType ||
      !id ||
      tokenType !== "passwordReset"
    ) {
      return res?.json({
        status: false,
        message: "can't complete request. missing argurments or fields",
      });
    }

    if (password !== confirmPassword) {
      return res?.json({
        status: false,
        message: "password mismatch",
      });
    }

    const hashPassword = await bcrypt.hash(password, 15);

    await Users.update(
      {
        password: hashPassword,
      },
      { where: { id: id } }
    );

    return res?.json({
      status: true,
      message: "password reset successful",
    });
  } catch (error) {
    console.log(error);
    return res?.json({
      status: false,
      message: "internal server error",
    });
  }
};

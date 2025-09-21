const jwt = require("jsonwebtoken");

const authTokenValidator = async (req: any, res: any, next: any) => {
  try {
    const authToken = req.header["authorization"];
    if (!authToken) {
      return res?.json({
        status: false,
        message: "request could to be completed",
      });
    }

    const token = authToken.replace("Bearer ", "");

    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string,
      (err: any, decode: any) => {
        if (err) {
          console.log(err);
          return res?.json({
            status: false,
            message: "token has expired",
          });
        }

        req.user = decode;
        next();
      }
    );
  } catch (error) {
    console.log(error);
    return res?.json({
      status: false,
      message: "internal server error",
    });
  }
};

module.exports = authTokenValidator;

const jwt = require("jsonwebtoken");
const authTokenValidator = async (req, res, next) => {
    try {
        const authToken = req.headers["authorization"];
        if (!authToken) {
            return res?.json({
                status: false,
                message: "request could to be completed",
            });
        }
        const token = authToken.replace("Bearer ", "");
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
            if (err) {
                console.log(err);
                return res?.json({
                    status: false,
                    message: "token has expired",
                });
            }
            req.user = decode;
            next();
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
module.exports = authTokenValidator;
export {};
//# sourceMappingURL=authTokenValidator.js.map
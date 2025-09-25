const { Users } = require("../../models/indexs");

const adminRoleBasedAcess = async (req: any, res: any, next: any) => {
  try {
    const { email, id, role } = req.user;

    if (!email || !id || !role) {
      return res?.json({
        status: false,
        message: "request could not be completed. some arguments are missing",
      });
    }

    const checkIfIdExists = await Users.findOne({ where: { id: id } });

    if (
      !checkIfIdExists ||
      email !== checkIfIdExists.email ||
      role.toLowerCase() !== "admin"
    ) {
      return res?.json({
        status: false,
        message: "unknown request",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res?.json({
      status: false,
      message: "internal server error",
    });
  }
};

module.exports = adminRoleBasedAcess;

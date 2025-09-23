const { purchasesAndDownloads } = require("../../models/indexs");

exports.userPurchasedBooks = async (req: any, res: any) => {
  try {
    const { id } = req.user;

    const getUserPurchasedBooks = await purchasesAndDownloads.findAll(
      {
        where: { user_id: id },
      },
      { include: "book" }
    );

    return res?.json({
      status: true,
      purchasedBooks: getUserPurchasedBooks,
    });
  } catch (error) {
    console.log(error);
    return res?.json({
      status: false,
      message: "internal server error",
    });
  }
};

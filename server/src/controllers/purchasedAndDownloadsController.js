"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { purchasesAndDownloads, books } = require("../../models/indexs");
exports.userPurchasedBooks = async (req, res) => {
    try {
        const { id } = req.user;
        const getUserPurchasedBooks = await purchasesAndDownloads.findAll({
            where: { user_id: id },
        }, {
            include: {
                model: books,
                as: "book",
                attribute: ["title", "author"],
            },
        });
        return res?.json({
            status: true,
            purchasedBooks: getUserPurchasedBooks,
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
//# sourceMappingURL=purchasedAndDownloadsController.js.map
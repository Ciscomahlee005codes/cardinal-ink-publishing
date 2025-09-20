const { books } = require("../../models/indexs");
const upload = require("../middleware/uploads");

exports.createNewBook = [
  upload.array("fileContent", 2),
  async (req: any, res: any) => {
    try {
      const { title, author, description, price, cover_url, content_url } =
        req?.body;
      const file = req?.file;

      if (!Array.isArray(file)) {
        return res?.json({
          status: false,
          message:
            "file upload format wrong. ensure the first file is the cover book and the second is the content",
        });
      }

      if (
        !title ||
        !author ||
        !description ||
        !price ||
        !cover_url ||
        !content_url
      ) {
        return res?.json({
          status: false,
          message: "ensure all fields are filled",
        });
      }

      const createBook = await books.create({
        title,
        author,
        description,
        price,
        cover_url: file[0].path,
        content_url: file[1].path,
      });

      if (!createBook) {
        return res?.json({
          status: false,
          message: "unable to complete request",
        });
      }

      return res?.json({
        status: true,
        message: `${title} has be created`,
      });
    } catch (error) {
      console.log(error);
      res?.json({ status: false, message: "internal server error" });
    }
  },
];

exports.allBooks = async (req: any, res: any) => {
  try {
    const getAllBooks = await books.findAll();

    return res?.json({
      status: true,
      books: getAllBooks,
    });
  } catch (error) {
    console.log(error);
    res?.json({ status: false, message: "internal server error" });
  }
};

exports.Books = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const getABook = await books.findOne({ where: { id: id } });

    if (!getABook) {
      return res?.json({ status: false, message: "internal server error" });
    }

    return res?.json({
      status: true,
      book: getABook,
    });
  } catch (error) {
    console.log(error);
    res?.json({ status: false, message: "internal server error" });
  }
};

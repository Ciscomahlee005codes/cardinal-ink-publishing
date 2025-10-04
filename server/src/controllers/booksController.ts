const { books } = require("../../models/indexs");
const upload = require("../middleware/uploads");
const fs = require("fs");

exports.createNewBook = [
  upload.array("fileContent", 2),
  async (req: any, res: any) => {
    console.log(req.body, req.files);

    try {
      const { title, author, description, price, category_id } = req?.body;
      const file = req?.files;

      if (!Array.isArray(file)) {
        return res?.json({
          status: false,
          message:
            "file upload format wrong. ensure the first file is the cover book and the second is the content",
        });
      }

      if (!title || !author || !description || !price || !category_id) {
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
        category_id,
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
    const getAllBooks = await books.findAll({ include: "categorys" });

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

exports.editBook = [
  upload.array("fileContent", 2),
  async (req: any, res: any) => {
    try {
      const { bookid } = req.query;
      const {
        title,
        author,
        description,
        price,
        cover_url,
        category_id,
        content_url,
      } = req?.body;
      const file = req?.files;

      if (!bookid) {
        return res?.json({ status: false, message: "missing arguments" });
      }

      if (!Array.isArray(file)) {
        return res?.json({
          status: false,
          message:
            "file format wrong. ensure the first file is the cover book and the second is the content",
        });
      }

      if (
        (!title ||
          !author ||
          !description ||
          !price ||
          !cover_url ||
          !content_url ||
          !category_id) &&
        (!file || file.length == 0)
      ) {
        return res?.json({
          status: false,
          message: "missing arguments. you should have atleast one data",
        });
      }

      const checkIfExists = await books.findOne({ where: { id: bookid } });

      if (!checkIfExists) {
        return res?.json({ status: false, message: "invalid request" });
      }

      if (file.length > 0) {
        //don't forget
      }

      await books.update({
        title,
        author,
        description,
        price,
        category_id,
        cover_url,
        content_url,
      });

      return res?.json({
        status: true,
        message: "book has been updated",
      });
    } catch (error) {
      console.log(error);
      return res?.json({ status: false, message: "internal server error" });
    }
  },
];

exports.deleteBook = async (req: any, res: any) => {
  const { bookid } = req.query;

  try {
    if (!bookid) {
      return res?.json({ status: false, message: "missing arguments" });
    }

    const checkIfExists = await books.findOne({ where: { id: bookid } });

    if (!checkIfExists) {
      return res?.json({ status: false, message: "invalid request. unknown" });
    }

    const filePath = [checkIfExists.cover_url, checkIfExists.content_url];

    filePath.forEach((path: string) => {
      fs.unlink(path, (err: any) => {
        if (err) {
          console.log(err);
          return res?.json({
            status: false,
            message: "request could not be completed. something went wrong",
          });
        }
      });
    });

    const deleteBook = await books.destroy({ where: { id: bookid } });

    if (!deleteBook) {
      return res?.json({
        status: false,
        message: "unable to complete your request",
      });
    }

    return res?.json({
      status: true,
      message: `The book ${checkIfExists.title} has been deleted`,
    });
  } catch (error) {
    console.log(error);
    return res?.json({ status: false, message: "internal server error" });
  }
};

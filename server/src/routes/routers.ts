const express = require("express");
const routes = express.Router();
const {
  createNewBook,
  allBooks,
  Books,
  editBook,
  deleteBook,
} = require("../controllers/booksController");

routes.post("/createnew/books", createNewBook);
routes.get("/books", allBooks);
routes.get("/books/:id", Books);
routes.put("/book/edit", editBook);
routes.put("/book/delete", deleteBook);

module.exports = routes;

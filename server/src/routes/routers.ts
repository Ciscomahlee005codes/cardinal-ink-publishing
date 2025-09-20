const express = require("express");
const routes = express.Router();
const { createNewBook } = require("../controllers/booksController");

routes.post("/createnew/books", createNewBook);

module.exports = routes;

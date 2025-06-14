const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");
const bookValidation = require("../validations/book.validation");
const handleValidation = require("../middlewares/validation.middleware");

router.get("/", bookController.getAll);
router.get(
  "/id/:id",
  bookValidation.getBookValidator,
  handleValidation,
  bookController.getBookById
);
router.get(
  "/author/:author",
  bookValidation.getBooksByAuthorValidator,
  handleValidation,
  bookController.getBooksByAuthor
);
router.get(
  "/genre/:genre",
  bookValidation.getBooksByGenreValidator,
  handleValidation,
  bookController.getBooksByGenre
);
router.get("/genres", bookController.getBooksGenres);
router.get("/authors", bookController.getBooksAuthors);

router.post(
  "/",
  bookValidation.createBookValidator,
  handleValidation,
  bookController.createBook
);

router.put(
  "/id/:id",
  bookValidation.updateBookValidator,
  handleValidation,
  bookController.updateBook
);
router.patch(
  "/id/:id",
  bookValidation.updatePartialBookValidator,
  handleValidation,
  bookController.updatePartialBook
);

router.delete(
  "/id/:id",
  bookValidation.deleteBookValidator,
  handleValidation,
  bookController.deleteBook
);

module.exports = router;

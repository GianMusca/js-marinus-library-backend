const { body, param } = require("express-validator");

exports.getBookValidator = [
  param("id")
    .exists()
    .withMessage("Id is required")
    .notEmpty()
    .withMessage("Id cannot be empty")
    .isInt({ gt: 0 })
    .withMessage("Id must be a positive integer"),
];

exports.createBookValidator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("author").notEmpty().withMessage("Author name is required"),
  body("published_year")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Published year must be a positive integer"),
  body("number_of_pages")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Number of pages must be a positive integer"),
  body("language")
    .optional()
    .isString()
    .withMessage("Language must be a string"),
  body("publisher")
    .optional()
    .isString()
    .withMessage("Publisher must be a string"),
  body("synopsis")
    .optional()
    .isString()
    .withMessage("Synopsis must be a string"),
  body("img_url").optional().isURL().withMessage("Image URL must be valid"),
  body("genres")
    .optional()
    .isArray()
    .withMessage("Genres must be an array")
    .custom((arr) => arr.every((g) => typeof g === "string"))
    .withMessage("Each genre must be a string"),
];

exports.updateBookValidator = [
  param("id")
    .exists()
    .withMessage("Id is required")
    .notEmpty()
    .withMessage("Id cannot be empty")
    .isInt({ gt: 0 })
    .withMessage("Id must be a positive integer"),
  body("title")
    .optional()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isString()
    .withMessage("Title must be a string"),
  body("author")
    .optional()
    .notEmpty()
    .withMessage("Author name cannot be empty")
    .isString()
    .withMessage("Author name must be a string"),
  body("published_year")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Published year must be a positive integer"),
  body("number_of_pages")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Number of pages must be a positive integer"),
  body("language")
    .optional()
    .isString()
    .withMessage("Language must be a string"),
  body("publisher")
    .optional()
    .isString()
    .withMessage("Publisher must be a string"),
  body("synopsis")
    .optional()
    .isString()
    .withMessage("Synopsis must be a string"),
  body("img_url").optional().isURL().withMessage("Image URL must be valid"),
  body("genres")
    .optional()
    .isArray()
    .withMessage("Genres must be an array")
    .custom((arr) => arr.every((g) => typeof g === "string"))
    .withMessage("Each genre must be a string"),
];

exports.updatePartialBookValidator = [
  param("id")
    .exists()
    .withMessage("Id is required")
    .notEmpty()
    .withMessage("Id cannot be empty")
    .isInt({ gt: 0 })
    .withMessage("Id must be a positive integer"),
  body("title")
    .optional()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isString()
    .withMessage("Title must be a string"),
  body("author")
    .optional()
    .notEmpty()
    .withMessage("Author name cannot be empty")
    .isString()
    .withMessage("Author name must be a string"),
  body("published_year")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Published year must be a positive integer"),
  body("number_of_pages")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Number of pages must be a positive integer"),
  body("language")
    .optional()
    .isString()
    .withMessage("Language must be a string"),
  body("publisher")
    .optional()
    .isString()
    .withMessage("Publisher must be a string"),
  body("synopsis")
    .optional()
    .isString()
    .withMessage("Synopsis must be a string"),
  body("img_url").optional().isURL().withMessage("Image URL must be valid"),
  body("genres")
    .optional()
    .isArray()
    .withMessage("Genres must be an array")
    .custom((arr) => arr.every((g) => typeof g === "string"))
    .withMessage("Each genre must be a string"),
];

exports.deleteBookValidator = [
  param("id")
    .exists()
    .withMessage("Id is required")
    .notEmpty()
    .withMessage("Id cannot be empty")
    .isInt({ gt: 0 })
    .withMessage("Id must be a positive integer"),
];

exports.getBooksByAuthorValidator = [
  param("author")
    .exists()
    .withMessage("Author name is required")
    .notEmpty()
    .withMessage("Author name cannot be empty")
    .isString()
    .withMessage("Author name must be a string"),
];

exports.getBooksByGenreValidator = [
  param("genre")
    .exists()
    .withMessage("Genre is required")
    .notEmpty()
    .withMessage("Genre cannot be empty")
    .isString()
    .withMessage("Genre must be a string"),
];

import { query } from "express-validator";

const validateSearch = [
  query("search")
    .optional({ checkFalsy: true })
    .isString().withMessage("Search must be a string")
    .isLength({ min: 1, max: 100 }).withMessage("Search must be between 1 and 100 characters")
    .matches(/^[\p{L}\p{N}\s\-_.]*$/u).withMessage("Search is invalid"),
];

export default validateSearch;
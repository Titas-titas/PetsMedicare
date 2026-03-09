import { body } from "express-validator";

const validateUserPassword = [
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
];

export default validateUserPassword;

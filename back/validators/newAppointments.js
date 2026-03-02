import { body } from "express-validator";

const validateNewAppointments = [
    body()
        .notEmpty()
        .withMessage("Request body must contain data"),
    body("pet_name")
        .notEmpty()
        .withMessage("pet name is required"),
    body("owner_name")
        .notEmpty()
        .withMessage("owner name is required"),
    body("appointment_date")
        .notEmpty()
        .withMessage("date is required")
        .isDate()
        .withMessage("date must be a valid date (YYYY-MM-DD)"),
    body("appointment_time")
        .notEmpty()
        .withMessage("time is required")
        .isTime()
        .withMessage("time must be a valid time (HH:MM)"),
    body("notes")
        .isString()
        .withMessage("notes must be a string"),
]

export default validateNewAppointments;
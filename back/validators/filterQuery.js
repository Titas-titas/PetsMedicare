import { query } from "express-validator";

const allowedSortFields = ["pet_name", "appointment_date", "owner_name"];
const allowedOrder = ['ASC', 'DESC']

const validateSort = [
    query("sort")
    .optional()
    .custom(async (value) => {
            if (!allowedSortFields.includes(value)) {
                throw new Error("Sort must be one of these:" + allowedSortFields.join(", "));
            }
            return true;
    }),
    
    query("order")
    .optional()
    .custom(async (value) => {
            if (!allowedOrder.includes(value)) {
                throw new Error("Order must be ASC or DESC");
            }
            return true;
    }),
]

export default validateSort;
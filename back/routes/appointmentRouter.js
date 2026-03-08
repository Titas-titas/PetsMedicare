import express from "express";
import validate from "../validators/validate.js";
import validateNewAppointments from "../validators/newAppointments.js";
import { deleteAppointment, getAllAppointments, getAppointmentsById, getMyAppointments, newPostAppointment, updateAppointment } from "../controllers/appointmentsController.js";
import { allowAccessTo, protect } from "../controllers/authController.js";
import validateSort from "../validators/filterQuery.js";
import validateSearch from "../validators/searchQuery.js";


const appointmentsRouter = express.Router();

appointmentsRouter.route("/").get(protect, allowAccessTo("admin"), validateSort, validateSearch, validate, getAllAppointments).post(protect, allowAccessTo("user"), validateNewAppointments, validate, newPostAppointment);
appointmentsRouter.route("/me").get(protect, allowAccessTo("user"), validateSort, validateSearch, validate, getMyAppointments);
appointmentsRouter.route("/:id").get(protect, allowAccessTo("user", "admin"),getAppointmentsById).patch(protect, allowAccessTo("user", "admin"), updateAppointment).delete(protect, allowAccessTo("user", "admin"), deleteAppointment);


export default appointmentsRouter;
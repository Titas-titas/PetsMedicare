import express from "express";
import validate from "../validators/validate.js";
import validateNewAppointments from "../validators/newAppointments.js";
import { deleteAppointment, getAllAppointments, getAppointmentsById, newPostAppointment, updateAppointment } from "../controllers/appointmentsController.js";
import { allowAccessTo, protect } from "../controllers/authController.js";



const appointmentsRouter = express.Router();

appointmentsRouter.route("/").get(protect, allowAccessTo("admin"), getAllAppointments).post(protect, allowAccessTo("user"), validateNewAppointments, validate, newPostAppointment);
appointmentsRouter.route("/:id").get(protect, allowAccessTo("user", "admin"),getAppointmentsById).patch(protect, allowAccessTo("user", "admin"), updateAppointment).delete(protect, allowAccessTo("user", "admin"), deleteAppointment);

export default appointmentsRouter;
import express from "express";
import validate from "../validators/validate.js";
import validateNewAppointments from "../validators/newAppointments.js";
import { deleteAppointment, getAllAppointments, getAppointmentsById, newPostAppointment, updateAppointment } from "../controllers/appointmentsController.js";



const appointmentsRouter = express.Router();

appointmentsRouter.route("/").get(getAllAppointments).post(validateNewAppointments, validate, newPostAppointment);
appointmentsRouter.route("/:id").get(getAppointmentsById).patch(validateNewAppointments, validate, updateAppointment).delete(deleteAppointment);

export default appointmentsRouter;
import express from "express";
import { deleteAppointment, getAllAppointments, getAppointmentsById, newPostAppointment, updateAppointment } from "../controllers/appointmentsController.js";

const appointmentsRouter = express.Router();

appointmentsRouter.route("/").get(getAllAppointments).post(newPostAppointment);
appointmentsRouter.route("/:id").get(getAppointmentsById).patch(updateAppointment).delete(deleteAppointment);

export default appointmentsRouter;
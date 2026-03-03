import { allAppointments, appointmentById, deleteAppointmentById, postAppointments, updateTheAppointment } from "../models/appointmentsModel.js";
import AppError from "../utils/appError.js";

//get all
export const getAllAppointments = async (req, res, next) => {
    try {
        const appointmentsList = await allAppointments();
        if(appointmentsList.length === 0){
            throw new AppError("No appointments were found", 404);
        }
        res.status(200).json({
            status: "success",
            requestTime: req.requestTime,
            data: appointmentsList,
        });
    } catch (error) {
        next(error);
    }
};

//get id
export const getAppointmentsById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const appointments = await appointmentById(id);

        if (!appointments) {
            throw new AppError("Id is invalid", 404);
        }

        if (
            req.user.role !== "admin" &&
            appointment.user_id !== req.user.id
        ) {
            return next(new AppError("You do not have permission", 403));
        }

        res.status(200).json({
            status: "success",
            data: appointments,
        });
    } catch (error) {
        next(error);
    }
};

//post
export const newPostAppointment = async(req, res, next) => {
    try {
        const newAppointment = {...req.body, user_id: req.user.id};
        const appointment = await postAppointments(newAppointment)
        res.status(201).json({
            status: "success",
            data: appointment,
        });
    } catch (error) {
        next(error)
    }
}

// update
export const updateAppointment = async(req, res, next) => {
    try {
        const { id } = req.params;
        const newAppointmentData = req.body;
        const appointment = await updateTheAppointment(id, newAppointmentData);
        if (!appointment) {
            throw new AppError("Id is invalid", 404);
        }

        if (
            req.user.role !== "admin" &&
            appointment.user_id !== req.user.id
        ) {
            return next(new AppError("You do not have permission", 403));
        }

        res.status(201).json({
            status: "success",
            data: appointment,
        });
    } catch (error) {
        next(error);
    }
};

// delete
export const deleteAppointment = async(req, res, next) => {
    try {
        const { id } = req.params;
        
        if (!appointment) {
            return res.status(404).json({
                status: "fail",
                message: "Id is invalid",
            });
        }

        if (
            req.user.role !== "admin" &&
            appointment.user_id !== req.user.id
        ) {
            return next(new AppError("You do not have permission", 403));
        }
        const appointment = await deleteAppointmentById(id);
        res.status(200).json({
            status: "success",
            message: "The appointment has been deleted.",
        });
    } catch (error) {
        next(error);
    }
};


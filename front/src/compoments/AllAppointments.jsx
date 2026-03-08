import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { handleErrors } from "../utils/errorhandling.js";
import { UserContext } from "../contexts/UserContext.jsx";
import Appointment from "./Appointment.jsx";
import { Link } from "react-router";


const API_URL = import.meta.env.VITE_API_URL;

function AllAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState("");
    const { user } = useContext(UserContext);

    const getAppointments = async () => {
        try {
            const endpoint = user.role === "admin" ? `appointments` : `appointments/me`
            const response = await axios.get(`${API_URL}/${endpoint}`, {withCredentials: true});
            const {data} = response.data;
            await setAppointments(data)
        } catch (error) {
            setError(handleErrors(error));
        }
    }

    const deleteAppointments = async (id) => {
        try {
        await axios.delete(`${API_URL}/appointments/${id}`, {withCredentials: true});

        setAppointments((currentAppointments) => currentAppointments.filter((appointment) => appointment.id !== id));
        } catch (error) {
        setError(handleErrors(error));
        }
    };

    const approveAppointment = async (id) => {
        try {
            await axios.patch(
            `${API_URL}/appointments/${id}`,
            { status: "approved" },
            { withCredentials: true }
            );
            await getAppointments();
        } catch (error) {
            setError(handleErrors(error));
        }
    };

    const cancelAppointment = async (id) => {
        try {
            await axios.patch(
            `${API_URL}/appointments/${id}`,
            { status: "canceled" },
            { withCredentials: true }
            );
            await getAppointments();
        } catch (error) {
            setError(handleErrors(error));
        }
    };


    useEffect(() => {
        const getData = async () =>{
            await getAppointments();
        };
        getData();
    }, []);


    return(
        <div>
            <Link className="text-white bg-purple-500 " to="/appointments/add">Add Appointment</Link>
            <div>{error}</div>
            {appointments.map((appointment) => (
                <Appointment 
                key={appointment.id}
                appointment={appointment}
                onDelete={deleteAppointments}
                onApprove={approveAppointment}
                onCancel={cancelAppointment}
                user={user}
                />
            ))}
        </div>
    )
}

export default AllAppointments;
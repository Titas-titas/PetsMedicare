import axios from "axios";
import { useEffect, useState } from "react";
import { handleErrors } from "../utils/errorhandling.js";
import Appointment from "./Appointment.jsx";


const API_URL = import.meta.env.VITE_API_URL;

function AllAppoitments() {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState("");

    const getAppointments = async () => {
        try {
            const response = await axios.get(`${API_URL}/appointments`, {withCredentials: true});
            const {data} = response.data;
            await setAppointments(data)
        } catch (error) {
            setError(handleErrors(error));
        }
    }

    useEffect(() => {
        const getData = async() =>{
            await getAppointments();
        };
        getData();
    }, []);


    return(
        <div>
            <div>{error}</div>
            {appointments.map((appointment) => (
                <Appointment 
                key={appointment.id}
                appointment={appointment}

                />
            ))}
        </div>
    )
}

export default AllAppoitments;
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { handleErrors } from "../utils/errorhandling.js";
import { UserContext } from "../contexts/UserContext.jsx";
import Appointment from "./Appointment.jsx";
import { Link, Outlet } from "react-router";
import SortDropdown from "./SortDropdown.jsx";
import SearchInput from "./SearchInput.jsx";


const API_URL = import.meta.env.VITE_API_URL;

function AllAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState("");
    const { user } = useContext(UserContext);
    const [sort, setSort] = useState("pet_name");
    const [order, setOrder] = useState("ASC");
    const [search, setSearch] = useState("");


    const getAppointments = async () => {
        try {
            const endpoint = user.role === "admin" ? `appointments` : `appointments/me`
            const response = await axios.get(`${API_URL}/${endpoint}?sort=${sort}&order=${order}&search=${search}`, {withCredentials: true});
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
            setAppointments([]);
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

    const sortChange = ({ sort, order }) =>{
        setSort(sort);
        setOrder(order);
    }


    useEffect(() => {
        const getData = async () =>{
            await getAppointments();
        };
        getData();
    }, [sort, order, search]);


    return(
        <div>
            <div>{user.role === "user" && <Link className="block w-[80%] my-2 mx-auto text-center bg-indigo-800 hover:bg-indigo-900 text-white py-2 rounded text-2xl" to="/appointments/add"> + Add Appointment</Link>}
                <Outlet />
            </div>
           
            <div className="flex justify-center text-xl m-2">
                <SearchInput 
                value={search} 
                onChange={setSearch}
                />
                <SortDropdown
                sort={sort}
                order={order}
                onChange={sortChange}
                />
            </div>

            {appointments.length === 0 && !error && (
                <div className="text-center mt-5 text-xl">No appointments found</div>
            )}

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
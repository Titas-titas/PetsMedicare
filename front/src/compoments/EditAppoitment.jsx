import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { handleErrors } from "../utils/errorhandling";
import { useForm } from "react-hook-form";

const API_URL = import.meta.env.VITE_API_URL;

function EditAppointment() {
    const [error, setError] = useState("");
    const { id } = useParams()
    let navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset
    } = useForm({
        defaultValues:{
            pet_name:"",
            owner_name:"",
            appointment_date:"",
            appointment_time:"",
            notes:""
        }
    });

    const onSubmit = async (formValues) => {
        try {
            await axios.patch(`${API_URL}/appointments/${id}`, formValues, { withCredentials: true });
            alert("Appointment had been updaded");
            reset();
            navigate("/appointments"); 
        } catch (error) {
            setError(handleErrors(error));
        }
    }

    useEffect(()=>{
        const fetchData = async () => {
            const response = await axios.get(`${API_URL}/appointments/${id}`, { withCredentials: true });
            const appointments1 = response.data.data;

            setValue("pet_name", appointments1.pet_name);
            setValue("owner_name", appointments1.owner_name);
            setValue("appointment_date", appointments1.appointment_date.slice(0, 10)); 
            setValue("appointment_time", appointments1.appointment_time);
            setValue("notes", appointments1.notes);
        }

        fetchData();
    }, [id, setValue])
    
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md mx-auto p-4">

        <div>
            <label className="flex flex-col">Pet Name</label>
            <input
            type="text"
            {...register("pet_name", { required: "Pet name is required" })}
            />
            {errors.pet_name && <p className="text-red-500">{errors.pet_name.message}</p>}
        </div>

        <div>
            <label className="flex flex-col">Owner Name</label>
            <input
            type="text"
            {...register("owner_name", { required: "Owner name is required" })}
            />
            {errors.owner_name && <p className="text-red-500">{errors.owner_name.message}</p>}
        </div>

        <div>
            <label className="flex flex-col">Appointment Date</label>
            <input
            type="date"
            {...register("appointment_date", { required: "Date is required" })}
            />
            {errors.appointment_date && <p className="text-red-500">{errors.appointment_date.message}</p>}
        </div>

        <div>
            <label className="flex flex-col">Appointment Time</label>
            <input
            type="time"
            {...register("appointment_time", { required: "Time is required" })}
            />
            {errors.appointment_time && <p className="text-red-500">{errors.appointment_time.message}</p>}
        </div>

        <div>
            <label className="flex flex-col">Notes</label>
            <textarea
            className="border p-2"
            rows={3}
            {...register("notes")}
            />
        </div>

        <button type="submit" className="bg-purple-500 text-white p-2 rounded">
            Add Appointment
        </button>
        <Link className="border text-center rounded p-2 border-gray-400" to="/appointments">Close</Link>
        <div className="text-red-500">{error}</div>
        </form>
    )
}

export default EditAppointment;
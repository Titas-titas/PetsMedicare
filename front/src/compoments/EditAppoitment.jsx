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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 mx-auto p-4 text-xl w-[90%]">

        <div>
            <label>Pet Name
                <input
                type="text"
                className="p-2 m-2 w-[50%]"
                {...register("pet_name", { required: "Pet name is required" })}
                />
                {errors.pet_name && <p className="text-red-500">{errors.pet_name.message}</p>}
            </label>
        </div>

        <div>
            <label>Name
                <input
                type="text"
                className="p-2 m-2 w-[50%]"
                {...register("owner_name", { required: "Owner name is required" })}
                />
                {errors.owner_name && <p className="text-red-500">{errors.owner_name.message}</p>}
            </label>
        </div>

        <div className="flex justify-around">
            <div>
                <label>Date
                    <input
                    type="date"
                    className="p-2 m-2"
                    {...register("appointment_date", { required: "Date is required" })}
                    />
                    {errors.appointment_date && <p className="text-red-500">{errors.appointment_date.message}</p>}
                </label>
            </div>

            <div>
                <label>Appointment Time
                    <input
                    type="time"
                    className="p-2 m-2"
                    {...register("appointment_time", { required: "Time is required" })}
                    />
                    {errors.appointment_time && <p className="text-red-500">{errors.appointment_time.message}</p>}
                </label>
            </div>
        </div>

        <div>
            <label className="flex">Notes
                <textarea
                className="border p-2 m-2 w-full h-50"
                rows={3}
                {...register("notes")}
                />
            </label>
        </div>

        <button type="submit" className="bg-indigo-800 text-white p-2 rounded hover:bg-indigo-900">
            Add Appointment
        </button>
        <Link className="border text-center rounded p-2 border-gray-400" to="/appointments">Close</Link>
        <div className="text-red-500">{error}</div>
        </form>
    )
}

export default EditAppointment;
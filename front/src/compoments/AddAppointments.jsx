import { useState } from "react";
import { useForm } from "react-hook-form";
import { handleErrors } from "../utils/errorhandling";
import axios from "axios";
import { Link, useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

function AddAppointment() {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const {
            register,
            handleSubmit,
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

    const onSubmit = async (formValue) =>{
        try {
            await axios.post(`${API_URL}/appointments`, {
                pet_name: formValue.pet_name,
                owner_name: formValue.owner_name,
                appointment_date: formValue.appointment_date,
                appointment_time: formValue.appointment_time,
                notes: formValue.notes
            }, {withCredentials: true});

            alert("Appointments added");
            reset();
            navigate("/appointments")
        } catch (error) {
            setError(handleErrors(error));
        }
    }
    
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

        <button type="submit" className="bg-purple-500 text-white p-2">
            Add Appointment
        </button>
        <Link className="border text-center rounded p-2 border-gray-400" to="/appointments">Close</Link>
        <div className="text-red-500">{error}</div>
        </form>
    )
}

export default AddAppointment;
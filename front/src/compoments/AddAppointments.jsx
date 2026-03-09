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
            await axios.post(`${API_URL}/appointments`, formValue, { withCredentials: true });

            alert("Appointment added");
            reset();
            navigate("/appointments");
        } catch (error) {
            setError(handleErrors(error));
        }
    }

    return(
        <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="flex flex-col gap-3 mx-auto p-4 text-xl w-[90%]"
        >

            <div>
                <label>Pet Name
                    <input
                        type="text"
                        className="p-2 m-2 w-[50%]"
                        {...register("pet_name", { required: "Pet name is required" })}
                    />
                </label>
                {errors.pet_name && <p className="text-red-500">{errors.pet_name.message}</p>}
            </div>

            <div>
                <label>Owner Name
                    <input
                        type="text"
                        className="p-2 m-2 w-[50%]"
                        {...register("owner_name", { required: "Owner name is required" })}
                    />
                </label>
                {errors.owner_name && <p className="text-red-500">{errors.owner_name.message}</p>}
            </div>

            <div className="flex justify-around">
                <div>
                    <label>Date
                        <input
                            type="date"
                            className="p-2 m-2"
                            {...register("appointment_date", { required: "Date is required" })}
                        />
                    </label>
                    {errors.appointment_date && <p className="text-red-500">{errors.appointment_date.message}</p>}
                </div>

                <div>
                    <label>Time
                        <input
                            type="time"
                            className="p-2 m-2"
                            {...register("appointment_time", { required: "Time is required" })}
                        />
                    </label>
                    {errors.appointment_time && <p className="text-red-500">{errors.appointment_time.message}</p>}
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

            <button 
                type="submit" 
                className="bg-indigo-800 text-white p-2 rounded hover:bg-indigo-900"
            >
                Add Appointment
            </button>

            <Link 
                className="border text-center rounded p-2 border-gray-400" 
                to="/appointments"
            >
                Close
            </Link>

            <div className="text-red-500">{error}</div>
        </form>
    );
}

export default AddAppointment;

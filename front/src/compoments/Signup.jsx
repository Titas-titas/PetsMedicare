import { useState } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router";
import { handleErrors } from "../utils/errorhandling";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function Signup() {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({defaultValues:{name:"", email:"", password:""}});

    const onSubmit = async (formValues) => {
        try {
            await axios.post(`${API_URL}/users/signup`, {
                name:formValues.name,
                email:formValues.email,
                password:formValues.password
            })

            alert("Succesfully regestered");
            reset();
            navigate("/login");
        } catch (error) {
            setError(handleErrors(error));
        }
    }


    return(
        <>
            <div className="text-red-800">{error}</div>
            <form onSubmit={handleSubmit(onSubmit)} className="border">
                <h3>Sign up</h3>

                <div>
                    <label>Name</label>
                    <input
                    id="name"
                    name="name"
                    type="text"
                    {...register("name")}
                    required
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <label>Email</label>
                    <input
                    id="email"
                    name="email"
                    type="email"
                    {...register("email")}
                    placeholder="name@example.com"
                    required
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.username.message}</p>
                    )}
                </div>

                <div>
                    <label>Password</label>
                    <input
                    id="password"
                    name="password"
                    type="password"
                    {...register("password")}
                    required
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </div>

                <button type="submit">Create account</button>
            </form>
        </>
    )
}

export default Signup;
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
    const [error, setError] = useState("");
    const {register, handleSubmit, formState:{errors}} = useForm();
    const navigate = useNavigate();

    const onSubmit = async (formdata) =>{
        try {
            const response = await axios.post(`${API_URL}/users/login`, formdata, {withCredentials:true});

            navigate("/appoitments");
        } catch (error) {
            setError(error.message);
        }
    }
    return(
        <>
            <div className="text-red-800">{error}</div>
            <form onSubmit={handleSubmit(onSubmit)} className="border">
                <h3>Login</h3>
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
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
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

                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Login;
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { handleErrors } from "../utils/errorhandling";

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
    const [error, setError] = useState("");
    const {setUser} = useContext(UserContext);
    const {register, handleSubmit, formState:{errors}} = useForm();
    const navigate = useNavigate();

    const onSubmit = async (formdata) =>{
        try {
            const response = await axios.post(`${API_URL}/users/login`, formdata, {withCredentials:true});

            setUser(response.data.data);
            navigate("/appoitments");
        } catch (error) {
            setError(handleErrors(error));
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
                <div>
                    <p>
                        I dont have account <Link to="/signup" className="text-purple-500 hover:text-purple-900">Sign up</Link>
                    </p>
                </div>
            </form>
        </>
    )
}

export default Login;
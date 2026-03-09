import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext.jsx";
import { useNavigate } from "react-router";
import axios from "axios";
import { handleErrors } from "../utils/errorhandling.js";

const API_URL = import.meta.env.VITE_API_URL;

function LogoutBtn() {
    const {setUser} = useContext(UserContext);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.get(`${API_URL}/users/logout`, { withCredentials: true });

            setUser(null)
            navigate("/login")
        } catch (error) {
            setError(handleErrors(error));
        }
    }


    return(
        <>
            <button className="border-none" onClick={handleLogout}>
                Logout
            </button>
            <div className="text-red-500">{error}</div>
        </>
    )
}

export default LogoutBtn;
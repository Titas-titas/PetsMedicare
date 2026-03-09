import { Link } from "react-router";
import LogoutBtn from "./LogoutBtn.jsx";
import { UserContext } from "../contexts/UserContext.jsx";
import { useContext } from "react";

function Header() {
    const { user } = useContext(UserContext);

    return(
        <>
            <h1 className="text-3xl">Pet Medicare</h1>
            <div className="flex gap-3 justify-center">
                {user && <><LogoutBtn/> <Link to="/appointments" className="p-1">Appointments</Link></>}
                {!user && <>
                    <Link to="/login" className="p-1">Login</Link>
                    <Link to="/signup" className="p-1">Sign Up</Link>
                </>}
            </div>
        </>
    )
}

export default Header;
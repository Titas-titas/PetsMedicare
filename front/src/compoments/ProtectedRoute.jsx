import { UserContext } from "../contexts/UserContext.jsx";
import { useContext } from "react";


function ProtectedRoute({children}) {
    const {user} = useContext(UserContext);

    return user?children: "Please log in";
}

export default ProtectedRoute;
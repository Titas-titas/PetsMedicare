import AddAppointment from "./compoments/AddAppointments.jsx";
import AllAppointments from "./compoments/AllAppointments.jsx";
import EditAppointment from "./compoments/EditAppoitment.jsx";
import Home from "./compoments/Home.jsx";
import Login from "./compoments/Login.jsx";
import LogoutBtn from "./compoments/LogoutBtn.jsx";
import ProtectedRoute from "./compoments/ProtectedRoute.jsx";
import Signup from "./compoments/Signup.jsx";
import { Routes, Route, Link } from "react-router";
import { UserContext } from "./contexts/UserContext.jsx";
import { useContext } from "react";

function App() {
    const { user } = useContext(UserContext);
    
    return(
        <>
            <div className="text-white bg-purple-500 text-center p-3">
                <h1 className="text-2xl">Pet Medicare</h1>
                <div className="flex gap-3 justify-center">
                    {user && <LogoutBtn/>}
                    {!user && <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </>}
                </div>
            </div>
            <div>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/appointments/edit/:id" element={<ProtectedRoute><EditAppointment/></ProtectedRoute>}/>
                    <Route path="/appointments/add" element={<ProtectedRoute><AddAppointment/></ProtectedRoute>}/>
                    <Route path="/appointments" element={<ProtectedRoute><AllAppointments/></ProtectedRoute>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                </Routes>
            </div>      
        </>
    )
}

export default App;
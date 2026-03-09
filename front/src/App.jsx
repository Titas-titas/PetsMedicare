import AddAppointment from "./compoments/AddAppointments.jsx";
import AllAppointments from "./compoments/AllAppointments.jsx";
import EditAppointment from "./compoments/EditAppoitment.jsx";
import Header from "./compoments/Header.jsx";
import Home from "./compoments/Home.jsx";
import Login from "./compoments/Login.jsx";
import ProtectedRoute from "./compoments/ProtectedRoute.jsx";
import Signup from "./compoments/Signup.jsx";
import { Routes, Route } from "react-router";

function App() {
    
    return(
        <>
            <div className="text-white bg-indigo-800 text-center p-3">
                <Header/>
            </div>
            <div>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path="/appointments" element={<ProtectedRoute><AllAppointments/></ProtectedRoute>}>
                        <Route path="add" element={<ProtectedRoute><AddAppointment/></ProtectedRoute>}/>
                        <Route path="edit/:id" element={<ProtectedRoute><EditAppointment/></ProtectedRoute>}/>
                    </Route>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                </Routes>
            </div>      
        </>
    )
}

export default App;
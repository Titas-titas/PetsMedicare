import AddAppoitments from "./compoments/AddAppoitment.jsx";
import AllAppoitments from "./compoments/AllAppoitments.jsx";
import EditAppoitments from "./compoments/EditAppoitment.jsx";
import Home from "./compoments/Home.jsx";
import Login from "./compoments/Login.jsx";
import Signup from "./compoments/Signup.jsx";
import { Routes, Route, Link } from "react-router";

function App() {
    
    return(
        <>
            <div className="text-white bg-purple-500 text-center p-3"><h1 className="text-2xl">Pet Medicare</h1></div>
            <div>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/appoitments/edit" element={<EditAppoitments/>}/>
                    <Route path="/appoitments/add" element={<AddAppoitments/>}/>
                    <Route path="/appoitments" element={<AllAppoitments/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                </Routes>
            </div>      
        </>
    )
}

export default App;
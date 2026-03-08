import { Link } from "react-router";
import deleteIcon from "../assets/close.svg"
import editIcon from "../assets/ink_pen.svg"

function Appointment({appointment, onDelete}) {
    return(
        <div className="appointment-card">
            <div>
                <h1>{appointment.pet_name}</h1>
                <p><span className="font-bold">Owner:</span> {appointment.owner_name}</p>
                <p>{appointment.notes}</p>
                <p>status: {appointment.status}</p>
            </div>
            <div>
                <p>{appointment.appointment_date.slice(0, 10)} {appointment.appointment_time.slice(0, 5)}</p>
            </div>
            <div className="flex gap-2">
                <Link className="text-white bg-purple-500 rounded p-1" to={`/appointments/edit/${appointment.id}`}><img src={editIcon} alt="delete" /></Link>
                <button onClick={() => onDelete(appointment.id)}><img src={deleteIcon} alt="delete" /></button>
            </div>
        </div>
    )
}

export default Appointment;
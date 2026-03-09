import { Link } from "react-router";
import deleteIcon from "../assets/close.svg"
import editIcon from "../assets/ink_pen.svg"

function Appointment({appointment, onDelete, onApprove, onCancel, user}) {
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
            {(appointment.status === "pending" || user.role === "admin") && (
            <div className="flex gap-2">
                <Link className="text-white bg-purple-500 rounded p-1" to={`/appointments/edit/${appointment.id}`}><img src={editIcon} alt="delete" /></Link>
                <button className="border-gray-400" onClick={() => onDelete(appointment.id)}><img src={deleteIcon} alt="delete" /></button>
            </div>
            )}
            {user.role === "admin" &&
                <div>
                    {appointment.status === "pending" && (
                        <>
                            <button
                            className="border p-1 rounded"
                            onClick={() => onApprove(appointment.id)}
                            >
                            Approve
                            </button>

                            <button
                            className="border p-1 rounded"
                            onClick={() => onCancel(appointment.id)}
                            >
                            Cancel
                            </button>
                        </>
                    )}
                </div>
            }

        </div>
    )
}

export default Appointment;
import { Link } from "react-router";
import deleteIcon from "../assets/close.svg"
import editIcon from "../assets/ink_pen.svg"

function Appointment({appointment, onDelete, onApprove, onCancel, user}) {
    return(
        <div className="flex mx-20 border-b-2 my-3 p-3 justify-between">
            <div className="text-2xl">
                <h1 className="text-3xl font-bold text-indigo-800">{appointment.pet_name}</h1>
                <p><span className="font-bold">Owner:</span> {appointment.owner_name}</p>
                <p><span className="font-bold">Status:</span> {appointment.status}</p>
                <p className="text-gray-400 text-xl">{appointment.notes}</p>
            </div>
            <div>
                <div className="text-xl italic">
                    <p>{appointment.appointment_date.slice(0, 10)} {appointment.appointment_time.slice(0, 5)}</p>
                </div>
                {(appointment.status === "pending" || user.role === "admin") && (
                <div className="flex gap-2 justify-end">
                    <Link className="text-white bg-indigo-800 hover:bg-indigo-900 rounded p-2" to={`/appointments/edit/${appointment.id}`}><img src={editIcon} alt="delete" /></Link>
                    <button className="border-gray-400 p-2" onClick={() => onDelete(appointment.id)}><img src={deleteIcon} alt="delete" /></button>
                </div>
                )}
                {user.role === "admin" &&
                    <div className="p-2 text-xl">
                        {appointment.status === "pending" && (
                            <>
                                <button
                                className="bg-indigo-800 text-white hover:bg-indigo-900 p-1 m-1 rounded"
                                onClick={() => onApprove(appointment.id)}
                                >
                                Approve
                                </button>

                                <button
                                className="border p-1 m-1 rounded"
                                onClick={() => onCancel(appointment.id)}
                                >
                                Cancel
                                </button>
                            </>
                        )}
                    </div>
                }
            </div>
        </div>
    )
}

export default Appointment;
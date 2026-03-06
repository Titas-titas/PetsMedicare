import { Link } from "react-router";

function Appointment({appointment}) {
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
            <div>
                <Link className="text-white bg-purple-500 " to={`/appointments/edit/${appointment.id}`}>Edit</Link>
            </div>
        </div>
    )
}

export default Appointment;
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
                <p>{appointment.appointment_date} {appointment.appointment_time}</p>
            </div>
        </div>
    )
}

export default Appointment;
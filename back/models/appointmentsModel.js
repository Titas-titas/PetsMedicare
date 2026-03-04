import { sql } from "../dbConnection.js";

// get all
export const allAppointments = async () => {
  const appointmentsList = await sql`
    select * from appointments
  `;
  return appointmentsList;
};

// get by id
export const appointmentById = async (id) => {
  const appointmentsList = await sql`
    select * from appointments
    where id = ${id}
  `;
  return appointmentsList[0];
};

// post
export const postAppointments = async (newAppointment) => {
  const {
    user_id,
    pet_name,
    owner_name,
    appointment_date,
    appointment_time,
    notes
  } = newAppointment;

  const appointment = {
    user_id,
    pet_name,
    owner_name,
    appointment_date,
    appointment_time,
    notes
  };

  const appointmentsList = await sql`
    insert into appointments ${sql(
      appointment,
      "user_id",
      "pet_name",
      "owner_name",
      "appointment_date",
      "appointment_time",
      "notes"
    )}
    returning *
  `;

  return appointmentsList[0];
};

// patch
export const updateTheAppointment = async (id, data) => {
  const columns = Object.keys(data);

  const appointmentsList = await sql`
    update appointments set ${sql(data, columns)}
    where id = ${id}
    returning *
  `;

  return appointmentsList[0];
};

// delete
export const deleteAppointmentById = async (id) => {
    const appointmentsList = await sql`
      delete from appointments
      where id = ${id}
      returning *
    `;

    return appointmentsList[0];
}

//get all by users id
export const appointmentsByUser = async (userId) => {
  const appointmentsList = await sql`
    select * from appointments
    where user_id = ${userId}
  `;
  return appointmentsList;
};

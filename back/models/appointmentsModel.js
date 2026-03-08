import { sql } from "../dbConnection.js";

const allowedSortFields = {
  pet_name: sql`pet_name`,
  appointment_date: sql`appointment_date`,
  owner_name: sql`owner_name`
};

const allowedOrder = {
  ASC: sql`ASC`,
  DESC: sql`DESC`
};


// get all
export const allAppointments = async ({ sort, order, search }) => {
  let whereAppointments = sql``;
  let orderAppointments = sql``;

  if(search) {
    whereAppointments = sql`
      where pet_name like ${'%' + search + '%'}
      or owner_name like ${'%' + search + '%'}
      or notes like ${'%' + search + '%'}
    `;
  }

  if (sort && order){
    orderAppointments = sql`
      order by ${allowedSortFields[sort]} ${allowedOrder[order]}
    `;
  }

  const appointmentsList = await sql`
    select * from appointments
    ${whereAppointments}
    ${orderAppointments}
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
export const appointmentsByUser = async (userId, { sort, order, search }) => {
  let whereAppointments = sql``;
  let orderAppointments = sql``;

  if (search) {
    whereAppointments = sql`
      and (
        pet_name ilike ${'%' + search + '%'}
        or owner_name ilike ${'%' + search + '%'}
        or notes ilike ${'%' + search + '%'}
      )
    `;
  }

  if (sort && order) {
    orderAppointments = sql`
      order by ${allowedSortFields[sort]} ${allowedOrder[order]}
    `;
  }

  const appointmentsList = await sql`
    select * from appointments
    where user_id = ${userId}
    ${whereAppointments}
    ${orderAppointments}
  `;

  return appointmentsList;
};


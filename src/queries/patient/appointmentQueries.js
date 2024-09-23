import pool from "../../db/connectDB.js";

async function insertAppointment({
  patient_id,
  doctor_id,
  appointment_date,
  appointment_time,
  purpose,
}) {
  try {
    const [result] = await pool.execute(
      `INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, purpose)
       VALUES (?, ?, ?, ?, ?)`,
      [patient_id, doctor_id, appointment_date, appointment_time, purpose]
    );

    return result;
  } catch (error) {
    throw new Error(`Failed to insert appointment ${error?.message}`);
  }
}

async function rescheduleAppointmentQuery({
  id,
  appointment_date,
  appointment_time,
}) {
  try {
    await pool.execute(
      `UPDATE appointments SET appointment_date = ? , appointment_time = ? WHERE id = ?`,
      [appointment_date, appointment_time, id]
    );

    return;
  } catch (error) {
    throw new Error(`Failed to insert appointment ${error?.message}`);
  }
}

async function getAppointmentsListQuery({ id }) {
  try {
    const [result] = await pool.execute(
      `select
      a.id, 
      a.appointment_date, 
      a.appointment_time, 
      a.status, 
      d.name as doctor_name
      from appointments a join doctors d 
      on a.doctor_id = d.id
      where a.patient_id = ?
      order by a.appointment_date desc, a.appointment_time desc;`,
      [id]
    );
    return result;
  } catch (error) {
    throw new Error(`Failed to get appointments list ${error?.message}`);
  }
}

async function cancelAppointmentQuery({ id }) {
  try {
    await pool.execute(
      `UPDATE appointments SET status = 'Cancelled' WHERE id = ? `,
      [id]
    );
    return;
  } catch (error) {
    throw new Error(`Failed to cancel appointment ${error?.message}`);
  }
}

export {
  insertAppointment,
  getAppointmentsListQuery,
  cancelAppointmentQuery,
  rescheduleAppointmentQuery,
};

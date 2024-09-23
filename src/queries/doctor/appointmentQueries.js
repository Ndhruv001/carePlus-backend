import pool from "../../db/connectDB.js";

async function getAppointmentsListQuery({ id }) {
  try {
    const [result] = await pool.execute(
      `
    SELECT 
        a.id,
        a.appointment_date, 
        a.appointment_time, 
        p.name as patient_name, 
        a.purpose, 
        a.status,
        a.patient_id
    FROM 
        appointments a
    JOIN 
        patients p 
    ON a.patient_id = p.id
    WHERE 
        a.doctor_id = ?              
    AND a.status IN ('Pending', 'Scheduled')
    ORDER BY  a.appointment_date DESC, a.appointment_time DESC;`,
      [id]
    );
    return result;
  } catch (error) {
    throw new Error(`Database error: ${error}`);
  }
}

async function acceptAppointmentQuery({ id }) {
  try {
    await pool.execute(
      `
      UPDATE appointments
      SET status = 'Scheduled'
      WHERE ID = ?;`,
      [id]
    );
    return;
  } catch (error) {
    throw new Error(`Database error: ${error}`);
  }
}

async function cancelAppointmentQuery({ id, patient_id, reason }) {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Step 1: Cancel the appointment
    await connection.execute(
      `
      UPDATE appointments
      SET status = 'Rejected'
      WHERE ID = ?;`,
      [id]
    );

    // Step 2: Create notification
    await connection.execute(
      `
      INSERT INTO notifications (recipient_id, recipient_type, message, title)
      VALUES (?, ?, ?, ?);`,
      [
        patient_id,
        `patient`,
        `Your appointment was cancelled. Reason: ${reason}`,
        "Appointment",
      ]
    );

    // Commit the transaction
    await connection.commit();
    return;
  } catch (error) {
    // Rollback if any error occurs
    await connection.rollback();
    throw new Error(`Transaction error: ${error}`);
  } finally {
    connection.release();
  }
}

async function getTodayAppointmentsQuery({ id }) {
  try {
    const [result] = await pool.execute(
      `
    SELECT 
        a.id,
        a.appointment_date, 
        a.appointment_time, 
        p.name as patient_name, 
        a.purpose, 
        a.status,
        a.patient_id
    FROM 
        appointments a
    JOIN 
        patients p 
    ON a.patient_id = p.id
    WHERE 
        a.doctor_id = ?              
    AND a.status = 'Scheduled'
    AND DATE(a.appointment_date) = CURDATE()
    ORDER BY  a.appointment_date DESC, a.appointment_time DESC;`,
      [id]
    );
    return result;
  } catch (error) {
    throw new Error(`Database error: ${error}`);
  }
}

export {
  getAppointmentsListQuery,
  acceptAppointmentQuery,
  cancelAppointmentQuery,
  getTodayAppointmentsQuery,
};

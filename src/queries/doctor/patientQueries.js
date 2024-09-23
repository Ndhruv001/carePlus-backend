import pool from "../../db/connectDB.js";

async function getPatientsListQuery({ id }) {
  try {
    const [result] = await pool.execute(
      `
        select 
        distinct( p.id ) as patient_id,
        p.name as patient_name,
        p.dob as patient_age,
        p.phone_number as patient_phone_number
        from appointments a join patients p 
        on a.patient_id = p.id 
        where doctor_id = ?
        order by patient_id;`,
      [id]
    );
    return result;
  } catch (error) {
    throw new Error(`Database error: ${error}`);
  }
}

export { getPatientsListQuery };

import pool from "../../db/connectDB.js";

async function getPerscriptionsListQuery({ id }) {
  try {
    const [result] = await pool.execute(
      `SELECT 
    p.id,
    p.medication_name,
    p.dosage,
    p.status,
    d.name AS doctor_name
    FROM prescriptions p JOIN doctors d 
    ON p.doctor_id = d.id
    where p.patient_id = ?
    ORDER BY p.status`,
      [id]
    );
    return result;
  } catch (error) {
    throw new Error(`Database Error: ${error}`);
  }
}

export { getPerscriptionsListQuery };

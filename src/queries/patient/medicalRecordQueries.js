import pool from "../../db/connectDB.js";

async function getMedicalRecordsListQuery({ id }) {
  try {
    const [result] = await pool.execute(
      `select id,
    record_type as title,
    created_at as date,
    details
    from medical_records
    where patient_id = ? 
    order by date desc`,
      [id]
    );
    return result;
  } catch (error) {
    throw new Error(`Database Error: ${error}`);
  }
}

export { getMedicalRecordsListQuery };

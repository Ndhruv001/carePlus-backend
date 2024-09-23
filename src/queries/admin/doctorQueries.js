import pool from "../../db/connectDB.js";

async function getDoctorsCountQuery() {
  try {
    const [result] = await pool.execute(
      `select count(*) as count from doctors;`
    );
    return result[0];
  } catch (error) {
    throw new Error(`Database Error: ${error}`);
  }
}

async function getPopularDoctorsListQuery({ limit }) {
  try {
    const [result] = await pool.execute(
      `
      SELECT 
      d.id AS doctor_id,
      d.name AS doctor_name,
      d.experience,
      d.specialization,
      d.education_detail,
      d.gender,
      COUNT(a.id) AS appointment_count
    FROM 
        doctors d
    JOIN 
        appointments a ON d.id = a.doctor_id
    GROUP BY 
        d.id, d.name, d.experience, d.specialization, d.education_detail, d.gender
    ORDER BY 
        appointment_count DESC
    LIMIT ?;`,
      [limit]
    );
    return result;
  } catch (error) {
    throw new Error(`Database Error: ${error}`);
  }
}

async function getDoctorProfileQuery({ doctorId }) {
  try {
    const [result] = await pool.execute(
      `
      SELECT 
          d.name,
          d.gender,
          d.dob as age,
          d.experience,
          d.education_detail, 
          d.profile_picture,  
          d.email,
          d.phone_number,
          d.bio, 
          d.medical_license_number, 
          d.certification,  
          d.identity_document,
          d.specialization
      FROM 
          pending_doctor_verification AS d
      WHERE 
          d.id = ?;`,
      [doctorId]
    );

    return result[0];
  } catch (error) {
    throw new Error(`Database Error: ${error}`);
  }
}

export {
  getDoctorsCountQuery,
  getPopularDoctorsListQuery,
  getDoctorProfileQuery,
};

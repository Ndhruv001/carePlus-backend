import pool from "../../db/connectDB.js";

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
            d.bio, 
            d.medical_license_number, 
            d.certification,  
            d.identity_document,
            d.specialization
        FROM 
            doctors AS d
        WHERE 
            d.id = ?;`,
      [doctorId]
    );

    return result[0];
  } catch (error) {
    throw new Error(`Database Error: ${error}`);
  }
}

export { getDoctorProfileQuery };

import pool from "../../db/connectDB.js";

async function getApprovalListQuery() {
  try {
    const [result] = await pool.execute(`
    select 
        id,
        name,
        email,
        specialization,
        experience
    from 
        pending_doctor_verification;`);
    return result;
  } catch (error) {
    throw new Error(`Database Error: ${error}`);
  }
}

async function approveRegistrationQuery({ registrationId }) {
  try {
    await pool.execute(
      `
      INSERT INTO doctors (
        name, 
        email, 
        dob, 
        gender, 
        phone_number, 
        specialization, 
        medical_license_number, 
        experience, 
        certification, 
        education_detail, 
        profile_picture, 
        identity_type, 
        identity_document, 
        password,
        bio
      )
      SELECT 
        name, 
        email, 
        dob, 
        gender, 
        phone_number, 
        specialization, 
        medical_license_number, 
        experience, 
        certification, 
        education_detail, 
        profile_picture, 
        identity_type, 
        identity_document, 
        password,
        bio
      FROM 
        pending_doctor_verification
      WHERE 
        id = ?;
    `,
      [registrationId]
    );
    await pool.execute(
      "delete from pending_doctor_verification where id  = ?;",
      [registrationId]
    );
    return;
  } catch (error) {
    throw new Error(`Database Error: ${error}`);
  }
}

async function rejectRegistrationQuery({ registrationId }) {
  try {
    await pool.execute(
      "delete from pending_doctor_verification where id  = ?;",
      [registrationId]
    );
    return;
  } catch (error) {
    throw new Error(`Database Error: ${error}`);
  }
}

export {
  getApprovalListQuery,
  approveRegistrationQuery,
  rejectRegistrationQuery,
};

import pool from "../../db/connectDB.js";
import { encryptPassword } from "../../utils/password.js";

async function registerDoctorQuery({
  name,
  email,
  password,
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
  bio,
}) {
  // HASH PASSWORD BEFORE STORE
  const hashedPassword = await encryptPassword(password);
  const query = `
        INSERT INTO pending_doctor_verification (
            name,
            email,
            password,
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
            bio
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  const values = [
    name,
    email,
    hashedPassword,
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
    bio,
  ];

  try {
    const [result] = await pool.execute(query, values);
    return result;
  } catch (error) {
    throw new Error("Database error: " + error.message);
  }
}

async function isEmailExist(email) {
  try {
    const [isExist] = await pool.execute(
      "select name from doctors where email = ?",
      [email]
    );
    console.log("🚀 ~ isEmailExist ~ isExist:", isExist);
    if (isExist.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.log("🚀 ~ isEmailExist ~ error:", error);
    throw new Error("Database error ", error.message);
  }
}

async function findDoctorByEmail(email) {
  try {
    const [doctor] = await pool.execute(
      "select * from doctors where email = ?",
      [email]
    );
    if (doctor.length > 0) {
      return doctor[0];
    }
    return null;
  } catch (error) {
    console.log("🚀 ~ findDoctorByEmail ~ error:", error);
    throw new Error("Database error ", error.message);
  }
}

async function getDoctorsListQuery() {
  try {
    const [doctorsList] = await pool.execute("select id, name from doctors");
    return doctorsList;
  } catch (error) {
    throw new Error(`Database Error: ${error}`);
  }
}

export {
  registerDoctorQuery,
  isEmailExist,
  findDoctorByEmail,
  getDoctorsListQuery,
};

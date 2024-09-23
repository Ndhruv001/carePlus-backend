import pool from "../../db/connectDB.js";
import { encryptPassword } from "../../utils/password.js";

async function registerPatientQuery({
  name,
  email,
  password,
  dob,
  phone_number,
  gender,
  state,
  city,
  emergency_contact_name,
  emergency_contact_number,
}) {
  // HASH PASSWORD BEFORE STORE
  const hashedPassword = await encryptPassword(password);

  const query = `
        INSERT INTO patients (
            name,
            email,
            password,
            dob,
            phone_number,
            gender,
            state,
            city,
            emergency_contact_name,
            emergency_contact_number
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  const values = [
    name,
    email,
    hashedPassword,
    dob,
    phone_number,
    gender,
    state,
    city,
    emergency_contact_name,
    emergency_contact_number,
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
      "select name from patients where email = ?",
      [email]
    );
    if (isExist.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.log("🚀 ~ isEmailExist ~ error:", error);
    throw new Error("Database error ", error.message);
  }
}

async function findPatientByEmail(email) {
  try {
    const [patient] = await pool.execute(
      "select * from patients where email = ?",
      [email]
    );
    if (patient.length > 0) {
      return patient[0];
    }
    return null;
  } catch (error) {
    console.log("🚀 ~ findpatientByEmail ~ error:", error);
    throw new Error("Database error ", error.message);
  }
}

export { registerPatientQuery, isEmailExist, findPatientByEmail };

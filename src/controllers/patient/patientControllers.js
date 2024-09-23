import {
  registerPatientQuery,
  isEmailExist,
} from "../../queries/patient/patientQueries.js";
import { formatDateForMySQL } from "../../utils/formatDateAndTime.js";
import { capitalizeFirstLetter } from "../../utils/formatName.js";

async function registerPatient(req, res) {
  const {
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
  } = req.body;

  const isExist = await isEmailExist(email);
  if (isExist) {
    return res
      .status(409)
      .json({ success: false, message: "Email is already exist" });
  }

  const formatedName = capitalizeFirstLetter(name);
  const formatedDOB = formatDateForMySQL(dob);

  try {
    const result = await registerPatientQuery({
      name: formatedName,
      email,
      password,
      dob: formatedDOB,
      phone_number,
      gender,
      state,
      city,
      emergency_contact_name,
      emergency_contact_number,
    });

    res.status(201).json({
      message: "Patient registered successfully",
      patientId: result.insertId,
    });
  } catch (error) {
    console.log("🚀 ~ registerPatient ~ error:", error);
    res
      .status(500)
      .json({ error: "Error registering patient", details: error.message });
  }
}

export { registerPatient };

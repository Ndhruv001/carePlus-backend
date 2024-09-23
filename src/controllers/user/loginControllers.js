import { verifyPassword } from "../../utils/password.js";
import { findPatientByEmail } from "../../queries/patient/patientQueries.js";
import { findDoctorByEmail } from "../../queries/doctor/doctorQueries.js";
import { findAdminByEmail } from "../../queries/admin/adminQueries.js";
import sendTokensAndResponse from "../../utils/sendTokensAndResponse.js";

async function login(req, res) {
  const { email, password } = req.body;

  try {
    // CHECK FOR ADMIN
    const admin = await findAdminByEmail(email);
    if (admin && (await verifyPassword(password, admin.password))) {
      return sendTokensAndResponse(res, admin, "admin");
    }

    // CHECK FOR PATIENT
    const patient = await findPatientByEmail(email);
    if (patient && (await verifyPassword(password, patient.password))) {
      return sendTokensAndResponse(res, patient, "patient");
    }

    // CHECK FOR DOCTOR
    const doctor = await findDoctorByEmail(email);
    if (doctor && (await verifyPassword(password, doctor.password))) {
      return sendTokensAndResponse(res, doctor, "doctor");
    }

    // NO USER FOUND
    return res
      .status(404)
      .json({ success: false, message: "Invalid email or password" });
  } catch (error) {
    console.error("🚀 ~ login ~ error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export { login };

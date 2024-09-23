import express from "express";
import { patientRegistrationValidationRules } from "../../middlewares/patient/validatePatientRegistration.js";
import { bookAppointmentValidationRules } from "../../middlewares/patient/validateBookAppointments.js";
import { registerPatient } from "../../controllers/patient/patientControllers.js";
import {
  bookAppointment,
  getAppointmentsList,
  cancelAppointment,
  rescheduleAppointment,
} from "../../controllers/patient/appointmentControllers.js";
import { getPerscriptionsList } from "../../controllers/patient/prescriptionControllers.js";
import { getMedicalRecordsList } from "../../controllers/patient/medicalRecordControllers.js";
import {
  getNotificationsList,
  markNotificationAsRead,
} from "../../controllers/patient/notificationControllers.js";
import { getDoctorProfile } from "../../controllers/patient/doctorControllers.js";
import { verifyJWT } from "../../middlewares/user/verifyJWT.js";
import { validate } from "../../utils/validationResult.js";

const router = express.Router();

// AUTH
router.post(
  "/auth/register",
  patientRegistrationValidationRules(),
  validate,
  registerPatient
);

// SECURE ROUTES
router.post(
  "/book-appointment",
  bookAppointmentValidationRules(),
  validate,
  verifyJWT("patient"),
  bookAppointment
);

//  APPOINTMENTS ROUTES
router.get("/appointments/list", verifyJWT("patient"), getAppointmentsList);
router.post("/appointments/cancel", verifyJWT("patient"), cancelAppointment);
router.post(
  "/appointments/reschedule",
  verifyJWT("patient"),
  rescheduleAppointment
); // & add validation

// PRESCRIPTIONS ROUTES
router.get("/prescriptions/list", verifyJWT("patient"), getPerscriptionsList);

//  MEDICAL-RECORDS ROUTES
router.get(
  "/medical-records/list",
  verifyJWT("patient"),
  getMedicalRecordsList
);

// NOTIFICATIONS ROUTES
router.get("/notifications/list", verifyJWT("patient"), getNotificationsList);
router.post(
  "/notifications/mark-as-read",
  verifyJWT("patient"),
  markNotificationAsRead
);

// DOCTOR ROUTES
router.get(
  "/doctors/profile/get/:doctorId",
  verifyJWT("patient"),
  getDoctorProfile
);

export default router;

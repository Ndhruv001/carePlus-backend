import express from "express";
import { verifyJWT } from "../../middlewares/user/verifyJWT.js";
import {
  getAppointmentsList,
  getAppointmentsCount,
  getAppointmentsStatusCount,
} from "../../controllers/admin/appointmentControllers.js";
import {
  getApprovalList,
  approveRegistration,
  rejectRegistration,
} from "../../controllers/admin/managementControllers.js";
import {
  getNotificationsList,
  markNotificationAsRead,
} from "../../controllers/admin/notificationControllers.js";
import { getRegistrationsCount } from "../../controllers/admin/analyticsControllers.js";
import {
  getDoctorsCount,
  getPopularDoctorsList,
  getDoctorProfile,
} from "../../controllers/admin/doctorControllers.js";
import { getPatientsCount } from "../../controllers/admin/patientControllers.js";
import { addNewAdmin } from "../../controllers/admin/adminControllers.js";

const router = express.Router();

// APPOINTMENT ROUTES
router.get("/appointments/overview", verifyJWT("admin"), getAppointmentsList);
router.get("/appointments/count", verifyJWT("admin"), getAppointmentsCount);
router.get(
  "/appointments/status/count",
  verifyJWT("admin"),
  getAppointmentsStatusCount
);

// MANAGEMENT ROUTES
router.get("/management/approval/list", verifyJWT("admin"), getApprovalList);
router.post(
  "/management/approval/approve",
  verifyJWT("admin"),
  approveRegistration
);
router.post(
  "/management/approval/reject",
  verifyJWT("admin"),
  rejectRegistration
);

// NOTIFICATION ROUTES
router.get("/notifications/list", verifyJWT("admin"), getNotificationsList);
router.post(
  "/notifications/mark-as-read",
  verifyJWT("admin"),
  markNotificationAsRead
);

// DOCTOR ROUTES
router.get("/doctors/count", verifyJWT("admin"), getDoctorsCount);
router.get(
  "/doctors/profile/get/:doctorId",
  verifyJWT("admin"),
  getDoctorProfile
);

// PATIENT ROUTES
router.get("/patients/count", verifyJWT("admin"), getPatientsCount);

// ANALYTICS ROUTES
router.get(
  "/analytics/:userType/:timeHorizon",
  verifyJWT("admin"),
  getRegistrationsCount
);
router.get("/doctors/popular", verifyJWT("admin"), getPopularDoctorsList);

// ADMIN ROUTES
router.post("/new-admin/add", verifyJWT("admin"), addNewAdmin); // & create validation

export default router;

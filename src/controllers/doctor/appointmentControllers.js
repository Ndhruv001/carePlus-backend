import {
  getAppointmentsListQuery,
  acceptAppointmentQuery,
  cancelAppointmentQuery,
  getTodayAppointmentsQuery,
} from "../../queries/doctor/appointmentQueries.js";
import {
  formatDateForClient,
  formatTimeForClient,
} from "../../utils/formatDateAndTime.js";

async function getAppointmentsList(req, res) {
  const { id } = req.user;
  try {
    const response = await getAppointmentsListQuery({ id });
    const formatedResponse = response.map((appointment) => {
      return {
        ...appointment,
        appointment_date: formatDateForClient(appointment.appointment_date),
        appointment_time: formatTimeForClient(appointment.appointment_time),
      };
    });

    return res.status(200).json({ success: true, data: formatedResponse });
  } catch (error) {
    console.log("🚀 ~ getAppointmentsList ~ error:", error);
    return res.status(500).json({
      success: false,
      message: "Interval server error",
      errors: error,
    });
  }
}

async function acceptAppointment(req, res) {
  const { id } = req.body;
  try {
    await acceptAppointmentQuery({ id });
    return res
      .status(201)
      .json({ success: true, message: "Accept appointment successfully." });
  } catch (error) {
    console.log("🚀 ~ acceptAppointment ~ error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
}

async function cancelAppointment(req, res) {
  const { id, patient_id, reason } = req.body;
  try {
    await cancelAppointmentQuery({ id, patient_id, reason });
    return res
      .status(201)
      .json({ success: true, message: "Cancel appointment successfully." });
  } catch (error) {
    console.log("🚀 ~ cancelAppointment ~ error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
}

async function getTodayAppointments(req, res) {
  const { id } = req.user;
  try {
    const response = await getTodayAppointmentsQuery({ id });
    const formatedResponse = response.map((appointment) => {
      return {
        ...appointment,
        appointment_date: formatDateForClient(appointment.appointment_date),
        appointment_time: formatTimeForClient(appointment.appointment_time),
      };
    });

    return res.status(200).json({ success: true, data: formatedResponse });
  } catch (error) {
    console.log("🚀 ~ getTodayAppointments ~ error:", error);
    return res.status(500).json({
      success: false,
      message: "Interval server error",
      errors: error,
    });
  }
}

export {
  getAppointmentsList,
  acceptAppointment,
  cancelAppointment,
  getTodayAppointments,
};
